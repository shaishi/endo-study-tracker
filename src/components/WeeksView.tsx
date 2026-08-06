import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import type { EndoData, UserState, LiteratureItem } from '../types';
import { getArticleSummary } from '../utils/summaryHelper';

interface WeeksViewProps {
  data: EndoData;
  userState: UserState;
  toggleLiteratureItem: (id: number) => void;
  toggleWeekChapter: (weekNum: number) => void;
  toggleReviewFlag: (id: number) => void;
  updateNote: (id: number, note: string) => void;
}

export const WeeksView: React.FC<WeeksViewProps> = ({
  data,
  userState,
  toggleLiteratureItem,
  toggleWeekChapter,
  toggleReviewFlag,
  updateNote,
}) => {
  // Default first 2 weeks open
  const [expandedWeeks, setExpandedWeeks] = useState<Record<number, boolean>>({
    1: true,
    2: true,
  });

  const [activeNoteModalId, setActiveNoteModalId] = useState<number | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');
  const [expandedSummaryId, setExpandedSummaryId] = useState<number | null>(null);

  const litMap = new Map<number, LiteratureItem>();
  data.literature.forEach(item => litMap.set(item.id, item));

  const toggleWeekExpand = (weekNum: number) => {
    setExpandedWeeks(prev => ({
      ...prev,
      [weekNum]: !prev[weekNum],
    }));
  };

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-indigo-400" />
              <span>תוכנית 12 השבועות (ספרינט הכנה)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              פריסת הלימוד לפי שבועות: פרקים בספרים, מאמרים קלאסיים והנחיות קליניות
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                const all: Record<number, boolean> = {};
                data.weeks.forEach(w => all[w.week] = true);
                setExpandedWeeks(all);
              }}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition"
            >
              פתח הכל
            </button>
            <button
              onClick={() => setExpandedWeeks({})}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition"
            >
              סגור הכל
            </button>
          </div>
        </div>
      </div>

      {/* Week Cards List */}
      <div className="space-y-4">
        {data.weeks.map((week) => {
          const isChapterDone = userState.completedWeekChapters.includes(week.week);
          
          const weekItems = week.article_ids
            .map(id => litMap.get(id))
            .filter((item): item is LiteratureItem => item !== undefined);

          const completedItemsCount = weekItems.filter(item => userState.completedItemIds.includes(item.id)).length;
          
          const totalUnitsInWeek = weekItems.length + 1; // +1 for chapter
          const completedUnitsInWeek = completedItemsCount + (isChapterDone ? 1 : 0);
          const percent = Math.round((completedUnitsInWeek / totalUnitsInWeek) * 100);
          const isWeekFullyCompleted = percent === 100;
          const isExpanded = Boolean(expandedWeeks[week.week]);

          return (
            <div
              key={week.week}
              className={`glass-card rounded-2xl border transition-all duration-200 overflow-hidden ${
                isWeekFullyCompleted
                  ? 'border-emerald-500/40 bg-slate-900/40'
                  : 'border-slate-700/60 bg-slate-800/50'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleWeekExpand(week.week)}
                className="w-full p-4 sm:p-5 flex items-center justify-between text-right gap-4 hover:bg-slate-800/40 transition"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 border ${
                    isWeekFullyCompleted
                      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                      : 'bg-indigo-600/20 text-indigo-300 border-indigo-500/30'
                  }`}>
                    {week.week}
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-semibold text-indigo-400">{week.dates}</span>
                      {isWeekFullyCompleted && (
                        <span className="text-[11px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>שבוע הושלם!</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white leading-tight mt-0.5 truncate">
                      {week.topic}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Progress Pill */}
                  <div className="text-xs text-right hidden sm:block">
                    <div className="font-bold text-slate-300">{percent}% הושלמו</div>
                    <div className="text-slate-400 text-[11px]">{completedUnitsInWeek}/{totalUnitsInWeek} יחידות</div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-slate-800 border border-slate-700 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="p-4 sm:p-5 pt-0 space-y-4 border-t border-slate-800/80 bg-slate-900/50">
                  
                  {/* Book Reference Unit */}
                  <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <button
                          onClick={() => toggleWeekChapter(week.week)}
                          className="mt-0.5 text-purple-400 hover:text-purple-300 transition"
                        >
                          {isChapterDone ? (
                            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                          ) : (
                            <Circle className="w-5 h-5" />
                          )}
                        </button>
                        <div>
                          <div className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                            חובת קריאה בספר / פרק לימוד
                          </div>
                          <div className="text-sm font-semibold text-white mt-0.5">
                            {week.book_ref}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Articles / Guidelines Checklist */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                      מאמרים והנחיות קליניות ({weekItems.length})
                    </div>

                    {weekItems.map((item) => {
                      const isDone = userState.completedItemIds.includes(item.id);
                      const isReviewFlagged = userState.reviewItemIds.includes(item.id);
                      const hasNote = Boolean(userState.notes[item.id]);
                      const isSummaryExpanded = expandedSummaryId === item.id;
                      const summary = getArticleSummary(item);

                      return (
                        <div
                          key={item.id}
                          className={`p-3 sm:p-4 rounded-xl border transition ${
                            isDone
                              ? 'bg-slate-900/30 border-slate-800 opacity-60'
                              : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => toggleLiteratureItem(item.id)}
                              className="mt-1 shrink-0 text-slate-400 hover:text-indigo-400 transition"
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <Circle className="w-5 h-5" />
                              )}
                            </button>

                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${
                                  item.type === 'guideline'
                                    ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                                    : 'bg-cyan-950/60 text-cyan-300 border-cyan-500/30'
                                }`}>
                                  {item.type === 'guideline' ? 'הנחיה' : 'מאמר'}
                                </span>
                                <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                  {item.category}
                                </span>
                              </div>

                              <div className="citation-text text-sm font-semibold text-slate-100 leading-snug">
                                {item.citation}
                              </div>

                              {hasNote && (
                                <div className="mt-1.5 text-xs bg-slate-900/90 text-amber-200/90 border border-amber-500/20 p-2 rounded-lg flex items-start gap-2">
                                  <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                                  <span>{userState.notes[item.id]}</span>
                                </div>
                              )}

                              {/* Action Tools Toolbar */}
                              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                                
                                {/* Executive Summary Button */}
                                <button
                                  onClick={() => setExpandedSummaryId(isSummaryExpanded ? null : item.id)}
                                  className={`px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1 ${
                                    isSummaryExpanded
                                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                                      : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60'
                                  }`}
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                                  <span>תקציר מנהלים ⚡</span>
                                </button>

                                {/* Direct Link */}
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition flex items-center gap-1"
                                  >
                                    <span>קרא מאמר</span>
                                    <ExternalLink className="w-3 h-3" />
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
                                  <Bookmark className="w-3.5 h-3.5" />
                                  <span>{isReviewFlagged ? 'מסומן לחזרה' : 'לחזור על זה'}</span>
                                </button>

                                {/* Note */}
                                <button
                                  onClick={() => handleOpenNote(item.id)}
                                  className={`px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                                    hasNote
                                      ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
                                  }`}
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>{hasNote ? 'ערוך הערה' : 'הוסף הערה'}</span>
                                </button>

                              </div>

                              {/* Expanded Executive Summary Drawer */}
                              {isSummaryExpanded && (
                                <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/40 space-y-2.5 animate-fadeIn text-xs text-right">
                                  <div className="font-extrabold text-indigo-300 flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                                    <Sparkles className="w-4 h-4 text-amber-400" />
                                    <span>השורה התחתונה לבחינת המומחיות:</span>
                                  </div>
                                  <p className="text-slate-200 font-medium leading-relaxed">
                                    {summary.bottomLine}
                                  </p>
                                  
                                  <div className="space-y-1">
                                    <div className="font-bold text-slate-400 text-[11px]">3 נקודות מפתח שחובה לזכור:</div>
                                    <ul className="list-disc list-inside text-slate-300 space-y-1 pr-1">
                                      {summary.keyPoints.map((pt, idx) => (
                                        <li key={idx}>{pt}</li>
                                      ))}
                                    </ul>
                                  </div>

                                  <div className="pt-1 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                                    <span>💡 דגש קליני:</span>
                                    <span>{summary.clinicalTakeaway}</span>
                                  </div>
                                </div>
                              )}

                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
              placeholder="רשום דגשים חשובים..."
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
