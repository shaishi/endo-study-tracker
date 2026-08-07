import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Calendar, 
  AlertTriangle, 
  ExternalLink, 
  Bookmark, 
  MessageSquare, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import type { UserState, ScheduleCalculation, LiteratureItem } from '../types';
import { exportCalendarICS } from '../utils/calendarExporter';
import { ArticleReaderModal } from './ArticleReaderModal';

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
  const [isExtendingDate, setIsExtendingDate] = useState<boolean>(false);
  const [newTargetDate, setNewTargetDate] = useState<string>(schedule.effectiveTargetDate);

  // Article Reader Modal state
  const [readerArticleIndex, setReaderArticleIndex] = useState<number | null>(null);

  // Extract all literature items from today's units for sequential reader
  const todayArticles = useMemo(() => {
    return schedule.todaysUnits
      .map(u => u.itemRef)
      .filter((item): item is LiteratureItem => item !== undefined);
  }, [schedule.todaysUnits]);

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

  const handleOpenReader = (articleId: number) => {
    const index = todayArticles.findIndex(a => a.id === articleId);
    if (index !== -1) {
      setReaderArticleIndex(index);
    }
  };

  const handleSaveExtendedDate = () => {
    if (newTargetDate) {
      setCustomTargetDate(newTargetDate);
      setIsExtendingDate(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Hero Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>תגאנון אדפטיבי יומי (Adaptive Daily Schedule)</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              משימות הלימוד להיום ({new Date().toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })})
            </h2>

            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              האלגוריתם מחשב אוטומטית את קצב הלימוד היומי הנדרש להשלמת 12 השבועות עד {schedule.effectiveTargetDate}.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex-1 md:w-28">
              <div className="text-slate-400 text-[10px] font-bold">קצב יומי</div>
              <div className="text-2xl font-black text-indigo-400 mt-0.5">{schedule.dailyPace}</div>
              <div className="text-[10px] text-slate-400">יחידות/יום</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex-1 md:w-28">
              <div className="text-slate-400 text-[10px] font-bold">יחידות שנותרו</div>
              <div className="text-2xl font-black text-amber-400 mt-0.5">{schedule.remainingUnits}</div>
              <div className="text-[10px] text-slate-400">מתוך {schedule.totalUnits}</div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center flex-1 md:w-28">
              <div className="text-slate-400 text-[10px] font-bold">ימים ללימוד</div>
              <div className="text-2xl font-black text-emerald-400 mt-0.5">{schedule.remainingDaysCount}</div>
              <div className="text-[10px] text-slate-400">ימים פעילים</div>
            </div>
          </div>

        </div>

        {/* Quick Tools Row */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('weeks')}
              className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md whitespace-nowrap"
            >
              תוכנית 12 השבועות 📅
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 whitespace-nowrap"
            >
              כרטיסיות זהב 📇
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-slate-700 whitespace-nowrap"
            >
              סימולטור שאלות ⏱️
            </button>
          </div>

          <button
            onClick={() => exportCalendarICS(schedule)}
            className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-300 font-bold text-xs transition border border-emerald-500/30 whitespace-nowrap flex items-center justify-center gap-1.5"
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
              <h4 className="font-bold text-amber-100 text-base">שים לב — קצב יומי גבוה ממומלץ ({schedule.dailyPace} יחידות ביום)</h4>
              <p className="text-xs text-amber-200/80 mt-1 leading-relaxed">
                בקצב הנוכחי נדרשות {schedule.dailyPace} יחידות ביום. מומלץ להאריך את תאריך היעד או להמשיך בקצב נוח של 1-2 יחידות ביום.
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

      {/* Extend Target Date Modal */}
      {isExtendingDate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-slate-700 bg-slate-900 space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-400" />
              <span>התאמת תאריך סיום ל-12 השבועות</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              בחר תאריך חדש ליעד סיום 12 השבועות. האלגוריתם יחשב מחדש את העומס היומי:
            </p>
            <input
              type="date"
              value={newTargetDate}
              onChange={(e) => setNewTargetDate(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500 font-mono"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsExtendingDate(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
              >
                ביטול
              </button>
              <button
                onClick={handleSaveExtendedDate}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold"
              >
                עדכן תאריך
              </button>
            </div>
          </div>
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
                  className={`glass-card rounded-2xl p-4 sm:p-5 border transition-all ${
                    unit.isCompleted
                      ? 'bg-slate-900/40 border-slate-800 opacity-70'
                      : 'border-slate-700/60 bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    
                    {/* Synced Checkbox */}
                    <button
                      onClick={() => {
                        if (isChapter && unit.weekRef) {
                          toggleWeekChapter(unit.weekRef.week);
                        } else if (item) {
                          toggleLiteratureItem(item.id);
                        }
                      }}
                      className="mt-1 shrink-0 text-slate-400 hover:text-indigo-400 transition"
                      title={unit.isCompleted ? 'בטל סימון כהושלם' : 'סמן כהושלם'}
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

                      {/* Action Toolbar */}
                      {item && (
                        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
                          
                          {/* Open Sequential Reader Button */}
                          <button
                            onClick={() => handleOpenReader(item.id)}
                            className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold border border-indigo-500 shadow-md transition flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>קרא מאמר ותקציר ⚡</span>
                          </button>

                          {/* Link Button */}
                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition flex items-center gap-1"
                            >
                              <span>PubMed</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}

                          {/* Review Flag */}
                          <button
                            onClick={() => toggleReviewFlag(item.id)}
                            className={`px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                              isReviewFlagged
                                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                            }`}
                          >
                            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                            <span>{isReviewFlagged ? 'מסומן לעיון' : 'סמן לעיון'}</span>
                          </button>

                          {/* Add / Edit Note */}
                          <button
                            onClick={() => handleOpenNote(item.id)}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition flex items-center gap-1"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{hasNote ? 'ערוך הערה' : 'הוסף הערה'}</span>
                          </button>

                        </div>
                      )}

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Note Modal */}
      {activeNoteModalId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-slate-700 bg-slate-900 space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>הערה אישית למאמר</span>
            </h3>
            <textarea
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="רשום דגשים אישיים..."
              className="w-full h-32 p-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setActiveNoteModalId(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold"
              >
                ביטול
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-xs text-white font-bold"
              >
                שמור הערה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Article Reader Modal */}
      {readerArticleIndex !== null && todayArticles[readerArticleIndex] && (
        <ArticleReaderModal
          item={todayArticles[readerArticleIndex]}
          allArticles={todayArticles}
          currentIndex={readerArticleIndex}
          onNavigate={(newIndex) => setReaderArticleIndex(newIndex)}
          onClose={() => setReaderArticleIndex(null)}
          userState={userState}
          toggleLiteratureItem={toggleLiteratureItem}
          toggleReviewFlag={toggleReviewFlag}
          updateNote={updateNote}
        />
      )}

    </div>
  );
};
