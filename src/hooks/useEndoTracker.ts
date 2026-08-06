import { useState, useEffect, useCallback } from 'react';
import type { UserState } from '../types';
import { auth, db, googleProvider, isFirebaseConfigured } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithPopup, 
  signInWithRedirect,
  setPersistence,
  browserLocalPersistence,
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

const STORAGE_KEY = 'endo_residency_tracker_v1';

const defaultState: UserState = {
  completedItemIds: [],
  completedWeekChapters: [],
  reviewItemIds: [],
  notes: {},
  bookDriveLinks: {},
  customTargetDate: null,
  blockedDays: [],
  dailyActivityLog: {},
  maxDailyUnitsThreshold: 6,
  theme: 'dark',
  lastActiveDate: null,
  currentStreak: 0,
  bestStreak: 0,
};

export function useEndoTracker() {
  const [userState, setUserState] = useState<UserState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...defaultState, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.error('Failed to load local storage state:', e);
    }
    return defaultState;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [cloudSyncStatus, setCloudSyncStatus] = useState<'synced' | 'syncing' | 'offline' | 'error'>('offline');

  // Save to LocalStorage on state update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userState));
    } catch (e) {
      console.error('Failed to save state to local storage:', e);
    }
  }, [userState]);

  // Auth Listener & Firestore Real-Time Sync
  useEffect(() => {
    if (!isFirebaseConfigured) {
      setCloudSyncStatus('offline');
      return;
    }

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setCloudSyncStatus('offline');
      }
    });

    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore updates when logged in
  useEffect(() => {
    if (!db || !currentUser || !isFirebaseConfigured) {
      setCloudSyncStatus('offline');
      return;
    }

    let unsubscribeSnapshot: (() => void) | null = null;

    try {
      setCloudSyncStatus('syncing');
      const userDocRef = doc(db, 'users', currentUser.uid);

      unsubscribeSnapshot = onSnapshot(
        userDocRef, 
        (docSnap) => {
          if (docSnap.exists()) {
            const remoteData = docSnap.data() as UserState;
            setUserState(prev => ({
              ...defaultState,
              ...prev,
              ...remoteData
            }));
            setCloudSyncStatus('synced');
          } else {
            // Document doesn't exist yet, save current local state to cloud
            setDoc(userDocRef, userState, { merge: true })
              .then(() => setCloudSyncStatus('synced'))
              .catch((err) => {
                console.warn('Firestore setDoc warning:', err);
                setCloudSyncStatus('offline');
              });
          }
        }, 
        (err) => {
          console.warn('Firestore listener error (falling back to local mode):', err);
          setCloudSyncStatus('offline');
        }
      );
    } catch (err) {
      console.warn('Firestore initialization error:', err);
      setCloudSyncStatus('offline');
    }

    return () => {
      if (unsubscribeSnapshot) {
        try {
          unsubscribeSnapshot();
        } catch (e) {
          // ignore shutdown errors
        }
      }
    };
  }, [currentUser?.uid]);

  // Save state to Firestore on update if user is authenticated
  const saveStateToCloud = useCallback((newState: UserState) => {
    if (!db || !currentUser || !isFirebaseConfigured) return;
    try {
      setCloudSyncStatus('syncing');
      const userDocRef = doc(db, 'users', currentUser.uid);
      setDoc(userDocRef, newState, { merge: true })
        .then(() => setCloudSyncStatus('synced'))
        .catch((err) => {
          console.warn('Cloud sync save warning:', err);
          setCloudSyncStatus('offline');
        });
    } catch (err) {
      console.warn('Cloud sync save exception:', err);
      setCloudSyncStatus('offline');
    }
  }, [currentUser]);

  // Wrapper function to update state locally and in cloud
  const updateStateAndSync = useCallback((updater: (prev: UserState) => UserState) => {
    setUserState(prev => {
      const next = updater(prev);
      saveStateToCloud(next);
      return next;
    });
  }, [saveStateToCloud]);

  // Helper for updating streak and activity log
  const recordActivity = useCallback((todayStr: string = new Date().toISOString().split('T')[0]) => {
    updateStateAndSync(prev => {
      const log = { ...prev.dailyActivityLog };
      log[todayStr] = (log[todayStr] || 0) + 1;

      let currentStreak = prev.currentStreak;
      let bestStreak = prev.bestStreak;

      if (prev.lastActiveDate !== todayStr) {
        const yesterday = new Date(todayStr);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (prev.lastActiveDate === yesterdayStr) {
          currentStreak += 1;
        } else if (prev.lastActiveDate === null || prev.lastActiveDate !== todayStr) {
          currentStreak = 1;
        }

        if (currentStreak > bestStreak) {
          bestStreak = currentStreak;
        }
      }

      return {
        ...prev,
        dailyActivityLog: log,
        lastActiveDate: todayStr,
        currentStreak,
        bestStreak,
      };
    });
  }, [updateStateAndSync]);

  // Toggle literature item completion
  const toggleLiteratureItem = useCallback((id: number) => {
    updateStateAndSync(prev => {
      const exists = prev.completedItemIds.includes(id);
      const updated = exists
        ? prev.completedItemIds.filter(i => i !== id)
        : [...prev.completedItemIds, id];
      
      return {
        ...prev,
        completedItemIds: updated,
      };
    });

    recordActivity();
  }, [updateStateAndSync, recordActivity]);

  // Toggle week chapter reading completion
  const toggleWeekChapter = useCallback((weekNum: number) => {
    updateStateAndSync(prev => {
      const exists = prev.completedWeekChapters.includes(weekNum);
      const updated = exists
        ? prev.completedWeekChapters.filter(w => w !== weekNum)
        : [...prev.completedWeekChapters, weekNum];

      return {
        ...prev,
        completedWeekChapters: updated,
      };
    });

    recordActivity();
  }, [updateStateAndSync, recordActivity]);

  // Toggle review flag ("לחזור על זה")
  const toggleReviewFlag = useCallback((id: number) => {
    updateStateAndSync(prev => {
      const exists = prev.reviewItemIds.includes(id);
      const updated = exists
        ? prev.reviewItemIds.filter(i => i !== id)
        : [...prev.reviewItemIds, id];

      return {
        ...prev,
        reviewItemIds: updated,
      };
    });
  }, [updateStateAndSync]);

  // Update note for literature item
  const updateNote = useCallback((id: number, note: string) => {
    updateStateAndSync(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [id]: note,
      },
    }));
  }, [updateStateAndSync]);

  // Update book Drive link
  const updateBookDriveLink = useCallback((bookKey: string, link: string) => {
    updateStateAndSync(prev => ({
      ...prev,
      bookDriveLinks: {
        ...prev.bookDriveLinks,
        [bookKey]: link,
      },
    }));
  }, [updateStateAndSync]);

  // Update target date
  const setCustomTargetDate = useCallback((dateStr: string | null) => {
    updateStateAndSync(prev => ({ ...prev, customTargetDate: dateStr }));
  }, [updateStateAndSync]);

  // Toggle blocked day
  const toggleBlockedDay = useCallback((dateStr: string) => {
    updateStateAndSync(prev => {
      const exists = prev.blockedDays.includes(dateStr);
      const updated = exists
        ? prev.blockedDays.filter(d => d !== dateStr)
        : [...prev.blockedDays, dateStr];
      return { ...prev, blockedDays: updated };
    });
  }, [updateStateAndSync]);

  // Update threshold
  const setMaxDailyUnitsThreshold = useCallback((threshold: number) => {
    updateStateAndSync(prev => ({ ...prev, maxDailyUnitsThreshold: threshold }));
  }, [updateStateAndSync]);

  // Export state JSON
  const exportStateJson = useCallback(() => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(userState, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `endo_tracker_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [userState]);

  // Import state JSON
  const importStateJson = useCallback((importedData: any) => {
    try {
      if (typeof importedData === 'object' && importedData !== null) {
        const next = {
          ...defaultState,
          ...importedData,
        };
        updateStateAndSync(() => next);
        return true;
      }
    } catch (e) {
      console.error('Failed to parse imported state:', e);
    }
    return false;
  }, [updateStateAndSync]);

  // Reset progress
  const resetAllProgress = useCallback(() => {
    updateStateAndSync(() => defaultState);
  }, [updateStateAndSync]);

  // Auth Functions
  const loginWithGoogle = async () => {
    if (!isFirebaseConfigured) {
      return { 
        success: false, 
        error: 'טרם הוגדר מפתח Firebase API תקין.' 
      };
    }
    try {
      setIsSyncing(true);
      await setPersistence(auth, browserLocalPersistence);
      await signInWithPopup(auth, googleProvider);
      return { success: true };
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      const errCode = err.code || '';
      const errMsg = err.message || '';
      const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

      // Fallback: If popup fails due to IndexedDB closure or popup block, try signInWithRedirect
      if (errMsg.includes('Database is closing') || errMsg.includes('hidden') || errCode.includes('popup-blocked')) {
        try {
          await signInWithRedirect(auth, googleProvider);
          return { success: true };
        } catch (redirectErr: any) {
          console.error('Redirect Fallback Error:', redirectErr);
        }
      }

      let msg = errMsg || 'שגיאה בהתחברות';
      if (errCode.includes('unauthorized-domain') || errMsg.includes('unauthorized-domain')) {
        msg = `הדומיין ${currentHost} טרם אושר ב-Firebase Authorized Domains. יש להוסיף אותו ב-Firebase Console.`;
      } else if (errCode.includes('operation-not-allowed') || errMsg.includes('operation-not-allowed')) {
        msg = 'ספק ההתחברות של Google טרם הופעל ב-Firebase Console (Authentication -> Sign-in method -> Google -> Enable).';
      } else if (errCode.includes('api-key-not-valid') || errMsg.includes('api-key-not-valid')) {
        msg = 'מפתח ה-Firebase API אינו תקין.';
      } else if (errMsg.includes('Database is closing') || errMsg.includes('hidden')) {
        msg = 'דפדפן זה חוסם אחסון IndexedDB (מצב פרטי / Safari). האתר פועל באופן מלא בלחיצה על "כניסה מיידית למערכת המעקב"!';
      } else {
        msg = `שגיאת Firebase [${errCode}]: ${errMsg} (דומיין: ${currentHost})`;
      }
      return { success: false, error: msg };
    } finally {
      setIsSyncing(false);
    }
  };

  const loginWithEmail = async (e: string, p: string) => {
    if (!isFirebaseConfigured) {
      return { 
        success: false, 
        error: 'טרם הוגדר מפתח Firebase API תקין. עליך להגדיר מפתח ב-Vercel, או ללחוץ על "המשך במצב אורח מקומי" לשימוש מיידי!' 
      };
    }
    try {
      setIsSyncing(true);
      await signInWithEmailAndPassword(auth, e, p);
      return { success: true };
    } catch (err: any) {
      let msg = err.message || 'שגיאה בהתחברות';
      if (msg.includes('api-key-not-valid')) {
        msg = 'מפתח ה-Firebase API אינו תקין או טרם הוגדר. ניתן להמשיך במצב אורח מקומי בעזרת הכפתור למטה!';
      }
      return { success: false, error: msg };
    } finally {
      setIsSyncing(false);
    }
  };

  const registerWithEmail = async (e: string, p: string) => {
    if (!isFirebaseConfigured) {
      return { 
        success: false, 
        error: 'טרם הוגדר מפתח Firebase API תקין. עליך להגדיר מפתח ב-Vercel, או ללחוץ על "המשך במצב אורח מקומי" לשימוש מיידי!' 
      };
    }
    try {
      setIsSyncing(true);
      await createUserWithEmailAndPassword(auth, e, p);
      return { success: true };
    } catch (err: any) {
      let msg = err.message || 'שגיאה בהתחברות';
      if (msg.includes('api-key-not-valid')) {
        msg = 'מפתח ה-Firebase API אינו תקין או טרם הוגדר. ניתן להמשיך במצב אורח מקומי בעזרת הכפתור למטה!';
      }
      return { success: false, error: msg };
    } finally {
      setIsSyncing(false);
    }
  };

  const logout = async () => {
    if (isFirebaseConfigured) {
      await signOut(auth);
    }
    setCurrentUser(null);
  };

  const toggleTheme = useCallback(() => {
    updateStateAndSync(prev => ({
      ...prev,
      theme: prev.theme === 'light' ? 'dark' : 'light'
    }));
  }, [updateStateAndSync]);

  return {
    userState,
    currentUser,
    cloudSyncStatus,
    isSyncing,
    isFirebaseConfigured,
    toggleTheme,
    toggleLiteratureItem,
    toggleWeekChapter,
    toggleReviewFlag,
    updateNote,
    updateBookDriveLink,
    setCustomTargetDate,
    toggleBlockedDay,
    setMaxDailyUnitsThreshold,
    exportStateJson,
    importStateJson,
    resetAllProgress,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    logout,
  };
}
