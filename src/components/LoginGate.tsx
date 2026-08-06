import React, { useState } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  LogIn, 
  Mail, 
  Lock, 
  Cloud, 
  FileText, 
  BarChart3, 
  ArrowLeft,
  UserCheck
} from 'lucide-react';

interface LoginGateProps {
  onGoogleLogin: () => Promise<{ success: boolean; error?: string }>;
  onEmailLogin: (e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  onEmailRegister: (e: string, p: string) => Promise<{ success: boolean; error?: string }>;
  onContinueAsGuest: () => void;
  isLoading: boolean;
}

export const LoginGate: React.FC<LoginGateProps> = ({
  onGoogleLogin,
  onEmailLogin,
  onEmailRegister,
  onContinueAsGuest,
  isLoading,
}) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGoogleClick = async () => {
    setErrorMessage(null);
    setIsSubmitting(true);
    const res = await onGoogleLogin();
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMessage(res.error || 'שגיאה בהתחברות באמצעות Google');
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    if (!email || !password) {
      setErrorMessage('אנא הזן אימייל וסיסמה');
      return;
    }

    setIsSubmitting(true);
    const res = mode === 'login' 
      ? await onEmailLogin(email, password) 
      : await onEmailRegister(email, password);
    
    setIsSubmitting(false);
    if (!res.success) {
      setErrorMessage(res.error || 'שגיאה בתהליך ההתחברות');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between font-sans selection:bg-indigo-500 selection:text-white dir-rtl relative overflow-hidden">
      
      {/* Dynamic Background Glow Effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Simple Brand Bar */}
      <header className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-extrabold text-xl text-white">מעקב אנדודונטיה</h1>
            <p className="text-xs text-slate-400">מערכת אדפטיבית להכנה להתמחות • 2026</p>
          </div>
        </div>

        <button
          onClick={onContinueAsGuest}
          className="text-xs text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 px-3.5 py-2 rounded-xl transition flex items-center gap-1.5"
        >
          <span>המשך כמורשה מקומי (אורח)</span>
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Hero & Auth Section */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">
          
          {/* Left Column (Hebrew Text): App Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>מערכת אישית וסנכרון ענן בין-מכשירי</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              התחבר מכל מקום והמשך את מעקב הלימוד בדיוק מאיפה שהפסקת
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
              מערכת המעקב מרכזת את כל 266 פריטי הספרות לבחינה, 7 ספרי הליבה, ואלגוריתם אדפטיבי שמחשב עבורך מחדש את הקצב היומי. כעת עם תמיכה בריבוי משתמשים וסנכרון בזמן אמת.
            </p>

            {/* Feature Bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Cloud className="w-4 h-4" />
                  <span>סנכרון ענן בזמן אמת</span>
                </div>
                <p className="text-xs text-slate-400">
                  סמן מאמר בטלפון בקליניקה, והמחשב בבית יתעדכן מיד באופן אוטומטי.
                </p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
                  <UserCheck className="w-4 h-4" />
                  <span>אזור אישי לכל מתמחה</span>
                </div>
                <p className="text-xs text-slate-400">
                  כל משתמש מקבל מרחב אישי שמור (הערות, סימונים, ספרים וקצב למידה).
                </p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <FileText className="w-4 h-4" />
                  <span>266 פריטי ספרות מועשרים</span>
                </div>
                <p className="text-xs text-slate-400">
                  קישורי PubMed ישירים, הנחיות קליניות ושדות הערות חופשיים.
                </p>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-slate-800 space-y-1.5">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>מפת חום וסטטיסטיקה</span>
                </div>
                <p className="text-xs text-slate-400">
                  מעקב רצף ימים (Streak), התפלגות קטגוריות וגרף פעילות 88 הימים.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Auth Box Card */}
          <div className="lg:col-span-5 w-full">
            <div className="glass-card bg-slate-900/90 border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl relative">
              
              <div className="text-right space-y-1">
                <h3 className="text-2xl font-extrabold text-white">כניסה למערכת המעקב</h3>
                <p className="text-xs text-slate-400">בחר דרך התחברות כדי להתחיל או להמשיך ברצף</p>
              </div>

              {/* 1. Google One-Click Sign In */}
              <button
                onClick={handleGoogleClick}
                disabled={isSubmitting || isLoading}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition shadow-lg disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>התחברות מהירה באמצעות Google</span>
              </button>

              <div className="flex items-center my-4 text-slate-500 text-xs">
                <div className="flex-1 border-t border-slate-800"></div>
                <span className="px-3">או באמצעות אימייל</span>
                <div className="flex-1 border-t border-slate-800"></div>
              </div>

              {/* 2. Email & Password Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">כתובת אימייל:</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="doctor@example.com"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white dir-ltr text-right focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">סיסמה:</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-950/80 border border-rose-500/30 text-rose-300 text-xs font-medium space-y-2">
                    <p>{errorMessage}</p>
                    <button
                      type="button"
                      onClick={onContinueAsGuest}
                      className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
                    >
                      הכנס למערכת במצב מקומי (אורח) ←
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition shadow-lg shadow-indigo-600/30 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>{mode === 'login' ? 'התחבר לחשבון' : 'הרשם וצור חשבון חדש'}</span>
                </button>
              </form>

              <div className="text-center pt-2">
                <button
                  onClick={() => {
                    setMode(mode === 'login' ? 'register' : 'login');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-indigo-400 hover:underline font-medium"
                >
                  {mode === 'login' ? 'אין לך חשבון עדיין? הרשם בלחיצה כאן' : 'כבר רשום? התחבר כאן'}
                </button>
              </div>

              {/* Guest Option Footer inside card */}
              <div className="pt-4 border-t border-slate-800/80 text-center">
                <button
                  onClick={onContinueAsGuest}
                  className="text-xs text-slate-400 hover:text-slate-200 transition underline"
                >
                  המשך ללא התחברות (מצב אורח מקומי בלבד)
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-xs text-slate-500 border-t border-slate-900">
        אפליקציית מעקב לימוד — התמחות באנדודונטיה | סנכרון ענן מאובטח (Firebase)
      </footer>

    </div>
  );
};
