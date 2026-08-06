import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ExternalLink, 
  Bookmark, 
  MessageSquare, 
  AlertTriangle, 
  Calendar, 
  Sparkles, 
  ArrowLeft
} from 'lucide-react';
import type { ScheduleCalculation, UserState } from '../types';
import { formatHebrewDate } from '../utils/adaptiveEngine';
import { exportCalendarICS } from '../utils/calendarExporter';

interface TodayViewProps {
  schedule: ScheduleCalculation;
  userState: UserState;
  toggleLiteratureItem: (id: number) => void;
  toggleWeekChapter: (weekNum: number) => void;
  toggleReviewFlag: (id: number) => void;
  updateNote: (id: number, note: string) => void;
  setCustomTargetDate: (dateStr: string | null) => void;
  setActiveTab: (tab: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  schedule,
  userState,
  toggleLiteratureItem,
  toggleWeekChapter,
  toggleReviewFlag,
  updateNote,
  setCustomTargetDate,
  setActiveTab,
}) => {
  const [activeNoteModalId, setActiveNoteModalId] = useState<number | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [isExtendingDate, setIsExtendingDate] = useState(false);
  const [newTargetDateInput, setNewTargetDateInput] = useState(schedule.effectiveTargetDate);

  const todayStr = new Date().toISOString().split('T')[0];

  const handleOpenNote = (id: number) => {
    setActiveNoteModalId(id);
    setTempNoteText(userState.notes[id] || '');
  };

  const handleSaveNote = () => {
    if (activeNoteModalId !== null) {
      updateNote(activeNoteModalId, tempNoteText);
      setActiveNoteModalId(null);
    }
  };

  const handleExtendingTargetDate = () => {
    if (newTargetDateInput) {
      setCustomTargetDate(newTargetDateInput);
      setIsExtendingDate(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Hero Countdown Header */}
      <div className="glass-card rounded-2xl p-6 relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-1">
              <Calendar className="w-4 h-4" />
              <span>{formatHebrewDate(todayStr)}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              משימות הלימוד להיום
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              מבוסס על האלגוריתם האדפטיבי — מחושב מחדש לפי קצב ההתקדמות שלך בפועל
            </p>
          </div>

          {/* Stats Badges */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Days Left Card */}
            <div className="bg-slate-800/80 border border-indigo-500/30 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-400">נותרו לסיום שלב 1</div>
              <div className="text-xl font-black text-indigo-400 mt-0.5">
                {schedule.remainingDaysCount} ימים
              </div>
            </div>

            {/* Daily Pace Card */}
            <div className="bg-slate-800/80 border border-slate-700/60 rounded-xl px-4 py-2.5 text-center">
              <div className="text-xs text-slate-400">קצב יומי מומלץ</div>
              <div className="text-xl font-black text-cyan-400 mt-0.5">
                {schedule.dailyPace} יחידות/יום
              </div>
            </div>
          </div>
        </div>

        {/* Phase 1 Completion Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs font-medium mb-2">
            <span className="text-slate-300">התקדמות כללית בשלבי 12 השבועות</span>
            <span className="text-indigo-400 font-bold">
              {schedule.completedUnits} מתוך {schedule.totalUnits} יחידות ({Math.round((schedule.completedUnits / (schedule.totalUnits || 1)) * 100)}%)
            </span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-500 shadow-sm shadow-indigo-500/50"
              style={{ width: `${Math.min(100, Math.round((schedule.completedUnits / (schedule.totalUnits || 1)) * 100))}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Daily Active Recall Warmup Card */}
      <div className="glass-card rounded-2xl p-5 border border-indigo-500/30 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
              <span>חימום יומי אדפטיבי (Daily Active Recall)</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full">מומלץ 3 דקות</span>
            </h4>
            <p className="text-xs text-slate-300 mt-0.5">
              חזור על שאלות מפתח קלאסיות מכרטיסיות הזהב או תרגל שאלות בחינה בסימולטור לפני תחילת משימות היום!
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('flashcards')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md whitespace-nowrap"
          >
            כרטיסיות זהב 📇
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 whitespace-nowrap"
          >
            סימולטור שאלות ⏱️
          </button>
          <button
            onClick={() => exportCalendarICS(schedule)}
            className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 font-bold text-xs transition border border-emerald-500/30 whitespace-nowrap flex items-center justify-center gap-1"
            title="ייצא לוח זמנים ליומן Google Calendar / Apple iCal"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>סנכרן ליומן 📅</span>
          </button>
        </div>
      </div>

      {/* Pace Warning Banner */}
      {schedule.isHighPace && (
        <div className="bg-amber-950/40 border border-amber-500/40 rounded-2xl p-5 text-amber-200 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-amber-950/20">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 bg-amber-500/20 rounded-xl text-amber-400 shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-amber-100 text-base">שים לב — קצב יומי גבוה מהרגיל ({schedule.dailyPace} יחידות ביום)</h4>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                בקצב הנוכחי צריך ללמוד {schedule.dailyPace} יחידות ביום כדי לסיים עד {schedule.effectiveTargetDate} — זה כנראה עומס גבוה. אפשר להאריך את תאריך היעד או להמשיך בקצב שלך ולהשלים פערים בהתמחות.
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsExtendingDate(true)}
            className="shrink-0 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-md"
          >
            הארך תאריך יעד
          </button>
        </div>
      )}

      {/* Main Daily Task List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span>היחידות המומלצות להיום ({schedule.todaysUnits.length})</span>
          </h3>

          {schedule.todaysUnits.length === 0 && schedule.remainingUnits > 0 && (
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
              כל המשימות להיום הושלמו! 🎉
            </span>
          )}
        </div>

        {schedule.todaysUnits.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center space-y-3">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-white">כל הכבוד! סיימת את כל יחידות הלימוד להיום</h4>
            <p className="text-slate-400 text-sm max-w-md mx-auto">
              האלגוריתם התאים מחדש את לוח הזמנים. את/ה יכול/ה לנוח או להתחיל לעבור על ספרות חובה נוספת.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('literature')}
                className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 px-4 py-2 rounded-xl text-xs font-semibold transition"
              >
                <span>עבור לספרות המלאה (266)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {schedule.todaysUnits.map((unit) => {
              const isChapter = unit.type === 'chapter';
              const item = unit.itemRef;
              const hasNote = item && Boolean(userState.notes[item.id]);
              const isReviewFlagged = item && userState.reviewItemIds.includes(item.id);

              return (
                <div
                  key={unit.id}
                  className={`glass-card glass-card-hover rounded-2xl p-4 sm:p-5 border transition-all ${
                    unit.isCompleted
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : 'border-slate-700/60 bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Checkbox */}
                    <button
                      onClick={() => {
                        if (isChapter && unit.weekRef) {
                          toggleWeekChapter(unit.weekRef.week);
                        } else if (item) {
                          toggleLiteratureItem(item.id);
                        }
                      }}
                      className="mt-1 shrink-0 text-slate-400 hover:text-indigo-400 transition"
                      title={unit.isCompleted ? 'סמן כלא הושלם' : 'סמן כהושלם'}
                    >
                      {unit.isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Week Badge */}
                        <span className="bg-indigo-950/80 text-indigo-300 border border-indigo-500/30 text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                          שבוע {unit.weekNumber}
                        </span>

                        {/* Type Badge */}
                        <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                          isChapter
                            ? 'bg-purple-950/60 text-purple-300 border-purple-500/30'
                            : item?.type === 'guideline'
                            ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                            : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                        }`}>
                          {isChapter ? 'פרק בספר' : item?.type === 'guideline' ? 'הנחיה / מסמך עמדה' : 'מאמר קלאסי'}
                        </span>

                        {/* Category Badge */}
                        {item?.category && (
                          <span className="text-[11px] text-slate-400 bg-slate-800 border border-slate-700/80 px-2 py-0.5 rounded-md">
                            {item.category}
                          </span>
                        )}

                        {/* Direct PMID vs Search link tag */}
                        {item?.link_type === 'direct_pmid' && (
                          <span className="text-[10px] text-emerald-400 bg-emerald-950/50 border border-emerald-500/20 px-1.5 py-0.5 rounded" title="קישור ישיר ל-PubMed">
                            PMID {item.pmid}
                          </span>
                        )}
                        {item?.link_type?.includes('fallback') && (
                          <span className="text-[10px] text-amber-400 bg-amber-950/50 border border-amber-500/20 px-1.5 py-0.5 rounded" title="קישור חיפוש אוטומטי">
                            ⚠ חיפוש PubMed
                          </span>
                        )}
                      </div>

                      {/* Main Title / Citation */}
                      <div className={`text-sm sm:text-base font-semibold leading-snug ${
                        isChapter ? 'text-white' : 'citation-text text-slate-100'
                      }`}>
                        {unit.title}
                      </div>

                      {/* Subtitle / Book Ref */}
                      {unit.subtitle && (
                        <div className="text-xs text-slate-400 leading-normal">
                          {unit.subtitle}
                        </div>
                      )}

                      {/* Notes Preview if available */}
                      {item && userState.notes[item.id] && (
                        <div className="mt-2 text-xs bg-slate-900/90 text-amber-200/90 border border-amber-500/20 p-2 rounded-lg flex items-start gap-2">
                          <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{userState.notes[item.id]}</span>
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 shrink-0 self-center">
                      {/* Review Flag */}
                      {item && (
                        <button
                          onClick={() => toggleReviewFlag(item.id)}
                          className={`p-2 rounded-xl border transition ${
                            isReviewFlagged
                              ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                          }`}
                          title={isReviewFlagged ? 'הסר דגל חזרה' : 'סמן לחזרה לקראת הבחינה'}
                        >
                          <Bookmark className={`w-4 h-4 ${isReviewFlagged ? 'fill-amber-400' : ''}`} />
                        </button>
                      )}

                      {/* Note Button */}
                      {item && (
                        <button
                          onClick={() => handleOpenNote(item.id)}
                          className={`p-2 rounded-xl border transition ${
                            hasNote
                              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
                              : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200'
                          }`}
                          title="הוסף/ערוך הערה אישית"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                      )}

                      {/* Link Button */}
                      {item?.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-indigo-300 hover:text-indigo-200 transition"
                          title="פתח קישור ישיר / חיפוש"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Target Date Extension Modal */}
      {isExtendingDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl p-6 max-w-md w-full space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>התאמת תאריך היעד לשלב 1</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              בחר תאריך חדש לסיום תוכנית 12 השבועות. האלגוריתם יחשב מחדש את הקצב היומי בהתאם לתאריך שתבחר.
            </p>
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1.5">
                תאריך יעד חדש:
              </label>
              <input
                type="date"
                value={newTargetDateInput}
                onChange={(e) => setNewTargetDateInput(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsExtendingDate(false)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
              >
                ביטול
              </button>
              <button
                onClick={handleExtendingTargetDate}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                שמור תאריך מותאם
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Modal */}
      {activeNoteModalId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>הערה אישית לפריט #{activeNoteModalId}</span>
            </h3>
            <textarea
              rows={4}
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="רשום דגשים חשובים, ממצא מרכזי, או נקודות לבחינה..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveNoteModalId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
              >
                ביטול
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                שמור הערה
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
