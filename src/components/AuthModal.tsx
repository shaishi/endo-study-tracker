import React, { useState } from 'react';
import { X, LogIn, Mail, Lock, Cloud } from 'lucide-react';
import type { User } from 'firebase/auth';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  cloudSyncStatus: 'synced' | 'syncing' | 'offline' | 'error';
  loginWithGoogle: () => Promise<{ success: boolean; error?: string }>;
  loginWithEmail: (e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  registerWithEmail: (e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  cloudSyncStatus,
  loginWithGoogle,
  loginWithEmail,
  registerWithEmail,
  logout,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setLoading(true);
    const res = await loginWithGoogle();
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error || 'שגיאה בהתחברות עם גוגל');
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('אנא הזן אימייל וסיסמה');
      return;
    }

    setLoading(true);
    const res = mode === 'login' 
      ? await loginWithEmail(email, password) 
      : await registerWithEmail(email, password);
    
    setLoading(false);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error || 'שגיאה בתהליך ההתחברות');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-5 text-right shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider">
            <Cloud className="w-4 h-4" />
            <span>סנכרון ענן בין מכשירים</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">
            {currentUser ? 'החשבון המחובר שלך' : 'התחברות לסנכרון בזמן אמת'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            {currentUser
              ? 'כל התקדמות הלימוד שלך מסונכרנת בזמן אמת בין הטלפון למחשב'
              : 'התחבר מכל מכשיר כדי לשמור ולסנכרן את התקדמות הלימוד, ההערות והספרים'}
          </p>
        </div>

        {currentUser ? (
          /* User Logged In State */
          <div className="space-y-4 pt-2">
            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm shrink-0">
                  {currentUser.displayName?.[0] || currentUser.email?.[0] || 'U'}
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-sm truncate">
                    {currentUser.displayName || 'משתמש מחובר'}
                  </div>
                  <div className="text-xs text-slate-400 truncate dir-ltr text-right">
                    {currentUser.email}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
                <span className="text-slate-400">סטטוס סנכרון ענן:</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full ${
                  cloudSyncStatus === 'synced'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                    : cloudSyncStatus === 'syncing'
                    ? 'bg-indigo-950 text-indigo-300 border border-indigo-500/30 animate-pulse'
                    : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                }`}>
                  {cloudSyncStatus === 'synced' ? '☁️ מסונכרן בזמן אמת' : cloudSyncStatus === 'syncing' ? '🔄 מסנכרן...' : '📱 מקומי בלבד'}
                </span>
              </div>
            </div>

            <button
              onClick={logout}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-400 border border-slate-700 text-xs font-bold transition"
            >
              התנתק מהחשבון
            </button>
          </div>
        ) : (
          /* User Unauthenticated Form */
          <div className="space-y-4">
            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs transition shadow-md disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>התחברות מהירה עם Google</span>
            </button>

            <div className="flex items-center my-3 text-slate-500 text-[11px]">
              <div className="flex-1 border-t border-slate-800"></div>
              <span className="px-2">או באמצעות אימייל וסיסמה</span>
              <div className="flex-1 border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleEmailAuth} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">אימייל:</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white dir-ltr text-right focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">סיסמה:</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-medium space-y-2">
                  <p>{errorMessage}</p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="w-full py-1.5 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                  >
                    המשך במצב מקומי
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>{mode === 'login' ? 'התחבר לחשבון' : 'צור חשבון חדש'}</span>
              </button>
            </form>

            <div className="text-center pt-1">
              <button
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login');
                  setErrorMessage(null);
                }}
                className="text-xs text-indigo-400 hover:underline font-medium"
              >
                {mode === 'login' ? 'אין לך חשבון? הרשם כאן' : 'כבר יש לך חשבון? התחבר כאן'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
