import { useState, useMemo, useEffect } from 'react';
import rawData from './data/endo_data.json';
import type { EndoData } from './types';
import { useEndoTracker } from './hooks/useEndoTracker';
import { calculateAdaptiveSchedule } from './utils/adaptiveEngine';

import { Navbar } from './components/Navbar';
import { TodayView } from './components/TodayView';
import { WeeksView } from './components/WeeksView';
import { LiteratureView } from './components/LiteratureView';
import { BooksView } from './components/BooksView';
import { DashboardView } from './components/DashboardView';
import { SettingsView } from './components/SettingsView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal } from './components/AuthModal';
import { LoginGate } from './components/LoginGate';

import { FlashcardsView } from './components/FlashcardsView';
import { CheatSheetsView } from './components/CheatSheetsView';
import { QuizSimulatorView } from './components/QuizSimulatorView';
import { AdminView } from './components/AdminView';
import { FocusTimerModal } from './components/FocusTimerModal';
import { TraumaDecisionTree } from './components/TraumaDecisionTree';

const data = rawData as EndoData;

export function App() {
  const [activeTab, setActiveTab] = useState<string>('today');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isFocusTimerOpen, setIsFocusTimerOpen] = useState<boolean>(false);
  const [isGuestMode, setIsGuestMode] = useState<boolean>(false);

  const {
    userState,
    currentUser,
    cloudSyncStatus,
    isSyncing,
    toggleTheme,
    rateFlashcard,
    recordQuizScore,
    recordQuestionAttempt,
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
  } = useEndoTracker();

  // Apply theme class to body and html
  useEffect(() => {
    const isLight = userState.theme === 'light';
    if (isLight) {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    }
  }, [userState.theme]);

  // Compute adaptive schedule calculation
  const schedule = useMemo(() => {
    return calculateAdaptiveSchedule(data, userState);
  }, [data, userState]);

  const isLight = userState.theme === 'light';

  // Gate Check: If user is not authenticated AND hasn't chosen guest mode -> Show LoginGate
  if (!currentUser && !isGuestMode) {
    return (
      <LoginGate
        onGoogleLogin={loginWithGoogle}
        onEmailLogin={loginWithEmail}
        onEmailRegister={registerWithEmail}
        onContinueAsGuest={() => setIsGuestMode(true)}
        isLoading={isSyncing}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col font-sans selection:bg-indigo-500 selection:text-white dir-rtl transition-colors duration-200 ${
      isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      
      {/* Header / Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openSearch={() => setIsSearchOpen(true)}
        onOpenFocusTimer={() => setIsFocusTimerOpen(true)}
        openAuthModal={() => setIsAuthModalOpen(true)}
        currentStreak={userState.currentStreak}
        completedCount={userState.completedItemIds?.length || 0}
        totalCount={266}
        cloudSyncStatus={cloudSyncStatus === 'synced' || cloudSyncStatus === 'syncing' ? cloudSyncStatus : 'offline'}
        currentUser={currentUser}
        theme={userState.theme || 'dark'}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'today' && (
          <TodayView
            schedule={schedule}
            userState={userState}
            toggleLiteratureItem={toggleLiteratureItem}
            toggleWeekChapter={toggleWeekChapter}
            toggleReviewFlag={toggleReviewFlag}
            updateNote={updateNote}
            setCustomTargetDate={setCustomTargetDate}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'weeks' && (
          <WeeksView
            data={data}
            userState={userState}
            toggleLiteratureItem={toggleLiteratureItem}
            toggleWeekChapter={toggleWeekChapter}
            toggleReviewFlag={toggleReviewFlag}
            updateNote={updateNote}
          />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            userState={userState}
            rateFlashcard={rateFlashcard}
          />
        )}

        {activeTab === 'cheatsheets' && (
          <CheatSheetsView />
        )}

        {activeTab === 'quiz' && (
          <QuizSimulatorView
            userState={userState}
            recordQuizScore={recordQuizScore}
            recordQuestionAttempt={recordQuestionAttempt}
          />
        )}

        {activeTab === 'trauma' && (
          <TraumaDecisionTree />
        )}

        {activeTab === 'literature' && (
          <LiteratureView
            data={data}
            userState={userState}
            toggleLiteratureItem={toggleLiteratureItem}
            toggleReviewFlag={toggleReviewFlag}
            updateNote={updateNote}
          />
        )}

        {activeTab === 'books' && (
          <BooksView
            data={data}
            userState={userState}
            updateBookDriveLink={updateBookDriveLink}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            data={data}
            userState={userState}
          />
        )}

        {activeTab === 'admin' && (
          <AdminView
            userState={userState}
          />
        )}

        {activeTab === 'settings' && (
          <SettingsView
            userState={userState}
            setCustomTargetDate={setCustomTargetDate}
            toggleBlockedDay={toggleBlockedDay}
            setMaxDailyUnitsThreshold={setMaxDailyUnitsThreshold}
            exportStateJson={exportStateJson}
            importStateJson={importStateJson}
            resetAllProgress={resetAllProgress}
            toggleTheme={toggleTheme}
          />
        )}
      </main>

      {/* Cmd+K Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        data={data}
        userState={userState}
        toggleLiteratureItem={toggleLiteratureItem}
        toggleReviewFlag={toggleReviewFlag}
      />

      {/* Firebase Cloud Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        currentUser={currentUser}
        cloudSyncStatus={cloudSyncStatus}
        loginWithGoogle={loginWithGoogle}
        loginWithEmail={loginWithEmail}
        registerWithEmail={registerWithEmail}
        logout={async () => {
          await logout();
          setIsGuestMode(false);
        }}
      />

      {/* Pomodoro Focus Timer Modal */}
      <FocusTimerModal
        isOpen={isFocusTimerOpen}
        onClose={() => setIsFocusTimerOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/50 py-6 mt-12 text-center text-xs text-slate-500 space-y-1">
        <p>אתר מעקב לימוד — התמחות באנדודונטיה | תוכנית 12 שבועות (6.8–1.11.2026)</p>
        <p className="text-slate-600">סנכרון ענן בזמן אמת (Firebase Auth + Firestore) • תמיכה במחשב ובטלפון הנייד</p>
      </footer>

    </div>
  );
}

export default App;
