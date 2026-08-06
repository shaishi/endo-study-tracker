import React, { useState } from 'react';
import { 
  Settings, 
  Download, 
  Upload, 
  Calendar, 
  Sliders, 
  Printer, 
  AlertOctagon,
  Sun,
  Moon
} from 'lucide-react';
import type { UserState } from '../types';

interface SettingsViewProps {
  userState: UserState;
  setCustomTargetDate: (dateStr: string | null) => void;
  toggleBlockedDay: (dateStr: string) => void;
  setMaxDailyUnitsThreshold: (val: number) => void;
  exportStateJson: () => void;
  importStateJson: (data: any) => boolean;
  resetAllProgress: () => void;
  toggleTheme?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  userState,
  setCustomTargetDate,
  toggleBlockedDay,
  setMaxDailyUnitsThreshold,
  exportStateJson,
  importStateJson,
  resetAllProgress,
  toggleTheme,
}) => {
  const [importStatusMessage, setImportStatusMessage] = useState<string | null>(null);
  const [blockedDateInput, setBlockedDateInput] = useState('');
  const [isResetConfirming, setIsResetConfirming] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        const success = importStateJson(parsed);
        if (success) {
          setImportStatusMessage('הנתונים שוחזרו בהצלחה! 🎉');
        } else {
          setImportStatusMessage('שגיאה: קובץ ה-JSON אינו תקין');
        }
      } catch (err) {
        setImportStatusMessage('שגיאה בקריאת הקובץ');
      }
    };
    reader.readAsText(file);
  };

  const handleAddBlockedDay = () => {
    if (blockedDateInput) {
      toggleBlockedDay(blockedDateInput);
      setBlockedDateInput('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          <span>הגדרות, ערכת נושא וגיבוי</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          התאמת ערכת נושא (כהה/בהיר), גיבויים, ימים חסומים ללימוד ותאריך יעד
        </p>
      </div>

      {/* Theme Switcher Bar */}
      <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-800/50 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            {userState.theme === 'light' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-400" />
            )}
            <span>ערכת נושא תצוגתית (Light / Dark Mode)</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            בחר את ערכת הנושא הנוחה לך ללמידה ביום או בלילה
          </p>
        </div>

        {toggleTheme && (
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => userState.theme !== 'dark' && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                userState.theme !== 'light'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-4 h-4 text-indigo-300" />
              <span>כהה (Dark)</span>
            </button>
            <button
              onClick={() => userState.theme !== 'light' && toggleTheme()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition ${
                userState.theme === 'light'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-950" />
              <span>בהיר (Light)</span>
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Backup & Import/Export */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/50 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Download className="w-5 h-5 text-indigo-400" />
            <span>גיבוי ושחזור נתונים (JSON)</span>
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            כל ההתקדמות שלך נשמרת בדפדפן (localStorage). מומלץ לייצא גיבוי JSON תקופתי כדי לא לאבד נתונים או להעביר מכשירים.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {/* Export */}
            <button
              onClick={exportStateJson}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>ייצא גיבוי JSON</span>
            </button>

            {/* Import */}
            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-bold text-xs transition cursor-pointer">
              <Upload className="w-4 h-4 text-cyan-400" />
              <span>ייבא גיבוי מ-JSON</span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {importStatusMessage && (
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-indigo-300 font-medium">
              {importStatusMessage}
            </div>
          )}
        </div>

        {/* 2. Target Date & Pace Settings */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/50 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-indigo-400" />
            <span>פרמטרי האלגוריתם האדפטיבי</span>
          </h3>

          <div className="space-y-4">
            {/* Target Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                תאריך יעד לסיום שלב 1 (ספרינט 12 השבועות):
              </label>
              <div className="flex gap-2">
                <input
                  type="date"
                  value={userState.customTargetDate || '2026-11-01'}
                  onChange={(e) => setCustomTargetDate(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
                {userState.customTargetDate && (
                  <button
                    onClick={() => setCustomTargetDate(null)}
                    className="px-3 py-2 rounded-xl bg-slate-800 text-xs text-slate-400 hover:text-white"
                  >
                    איפוס לתאריך מקורי (1.11.2026)
                  </button>
                )}
              </div>
            </div>

            {/* Threshold */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                סף אזהרת עומס יומי (יחידות ליום): {userState.maxDailyUnitsThreshold}
              </label>
              <input
                type="range"
                min="3"
                max="12"
                value={userState.maxDailyUnitsThreshold}
                onChange={(e) => setMaxDailyUnitsThreshold(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>3 (מתון)</span>
                <span>6 (ברירת מחדל)</span>
                <span>12 (אינטנסיבי)</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Blocked Days Manager */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/50 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>ניהול ימים חסומים (תורנויות / חגים)</span>
          </h3>
          <p className="text-xs text-slate-300">
            תאריכים שתסמן כאן לא ייספרו בימי הלימוד הנותרים, והאלגוריתם יתאים את הקצב בהתאם.
          </p>

          <div className="flex gap-2">
            <input
              type="date"
              value={blockedDateInput}
              onChange={(e) => setBlockedDateInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
            <button
              onClick={handleAddBlockedDay}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition"
            >
              הוסף יום חסום
            </button>
          </div>

          {userState.blockedDays.length > 0 && (
            <div className="space-y-1.5 pt-2">
              <div className="text-xs font-semibold text-slate-400">ימים חסומים שהוגדרו:</div>
              <div className="flex flex-wrap gap-1.5">
                {userState.blockedDays.map((d) => (
                  <span
                    key={d}
                    className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-700 text-rose-300 px-2.5 py-1 rounded-lg text-xs"
                  >
                    <span>{d}</span>
                    <button
                      onClick={() => toggleBlockedDay(d)}
                      className="text-slate-400 hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Print / Reset Danger Zone */}
        <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/50 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Printer className="w-5 h-5 text-indigo-400" />
            <span>הדפסת תוכנית עבודה & איפוס</span>
          </h3>

          <div className="space-y-3">
            <button
              onClick={() => window.print()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold transition"
            >
              <Printer className="w-4 h-4 text-indigo-400" />
              <span>הדפס / ייצא ל-PDF של הדף הנוכחי</span>
            </button>

            <div className="pt-4 border-t border-slate-800 space-y-2">
              <div className="text-xs font-bold text-rose-400 flex items-center gap-1">
                <AlertOctagon className="w-4 h-4" />
                <span>אזור סכנה</span>
              </div>

              {!isResetConfirming ? (
                <button
                  onClick={() => setIsResetConfirming(true)}
                  className="w-full px-4 py-2.5 rounded-xl bg-rose-950/60 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition"
                >
                  אפס את כל ההתקדמות והנתונים
                </button>
              ) : (
                <div className="p-3 rounded-xl bg-rose-950 border border-rose-500/60 space-y-2">
                  <div className="text-xs text-rose-200 font-bold">האם אתה בטוח לחלוטין? כל הנתונים יימחקו!</div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsResetConfirming(false)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
                    >
                      ביטול
                    </button>
                    <button
                      onClick={() => {
                        resetAllProgress();
                        setIsResetConfirming(false);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white font-bold text-xs"
                    >
                      כן, אפס הכל
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
