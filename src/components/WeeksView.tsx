import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  ChevronDown, 
  ChevronUp, 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  MessageSquare,
  Sparkles,
  BarChart2
} from 'lucide-react';
import type { EndoData, UserState, LiteratureItem } from '../types';
import { isHighYieldArticle } from '../utils/summaryHelper';
import { ArticleReaderModal } from './ArticleReaderModal';

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
  const [isHighYieldOnly, setIsHighYieldOnly] = useState<boolean>(false);
  const [showWorkloadAudit, setShowWorkloadAudit] = useState<boolean>(false);

  // Article Reader Modal state
  const [readerArticleIndex, setReaderArticleIndex] = useState<number | null>(null);

  const litMap = useMemo(() => {
    const map = new Map<number, LiteratureItem>();
    data.literature.forEach(item => map.set(item.id, item));
    return map;
  }, [data.literature]);

  // Flattened list of all curriculum articles in sequential order (Weeks 1 to 12)
  const allCurriculumArticles = useMemo(() => {
    const list: LiteratureItem[] = [];
    const sortedWeeks = [...data.weeks].sort((a, b) => a.week - b.week);
    for (const w of sortedWeeks) {
      for (const artId of w.article_ids) {
        const item = litMap.get(artId);
        if (item) {
          if (!isHighYieldOnly || isHighYieldArticle(item)) {
            list.push(item);
          }
        }
      }
    }
    return list;
  }, [data.weeks, litMap, isHighYieldOnly]);

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

  const handleOpenReader = (articleId: number) => {
    const index = allCurriculumArticles.findIndex(a => a.id === articleId);
    if (index !== -1) {
      setReaderArticleIndex(index);
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
              <span>תוכנית 12 השבועות (ספרינט הכנה מובנה)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              פריסת הלימוד לפי שבועות: פרקים בספרים, מאמרים קלאסיים והנחיות קליניות
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            
            {/* Workload Audit Toggle */}
            <button
              onClick={() => setShowWorkloadAudit(!showWorkloadAudit)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-cyan-300 border border-slate-700 transition flex items-center gap-1.5"
            >
              <BarChart2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>הערכת עומס לוגית 📊</span>
            </button>

            {/* High-Yield Filter */}
            <button
              onClick={() => setIsHighYieldOnly(!isHighYieldOnly)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isHighYieldOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>🔥 High-Yield בלבד</span>
            </button>

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

        {/* Workload Evaluation Audit Widget */}
        {showWorkloadAudit && (
          <div className="mt-5 p-5 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-3 animate-fadeIn text-xs sm:text-sm">
            <div className="flex items-center gap-2 font-bold text-cyan-300">
              <BarChart2 className="w-4 h-4" />
              <span>ניתוח והערכת עומס הלימודים בתוכנית (Logical Workload Audit):</span>
            </div>
            
            <p className="text-slate-300 leading-relaxed">
              התוכנית מחולקת באופן לוגי ומאוזן ל-<strong>12 שבועות ספרינט</strong>. 
              בכל שבוע ישנו <strong>פרק ספר לימוד 1 מרכזי + 3 עד 7 מאמרים קלאסיים</strong> (ממוצע של כ-<strong>4 עד 8 יחידות בשבוע</strong>).
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px]">סה"כ שבועות</div>
                <div className="text-white font-bold text-sm">12 שבועות</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px]">סה"כ יחידות ליבה</div>
                <div className="text-cyan-400 font-bold text-sm">69 יחידות</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px]">קצב קריאה יומי מומלץ</div>
                <div className="text-emerald-400 font-bold text-sm">1 יחידה / יום</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center">
                <div className="text-slate-400 text-[10px]">סטטוס עומס</div>
                <div className="text-amber-400 font-bold text-sm">אופטימלי ומאוזן ✓</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Week Cards List */}
      <div className="space-y-4">
        {data.weeks.map((week) => {
          const isChapterDone = userState.completedWeekChapters.includes(week.week);
          
          let weekItems = week.article_ids
            .map(id => litMap.get(id))
            .filter((item): item is LiteratureItem => item !== undefined);

          if (isHighYieldOnly) {
            weekItems = weekItems.filter(item => isHighYieldArticle(item));
          }

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

                      return (
                        <div
                          key={item.id}
                          className={`p-3 sm:p-4 rounded-xl border transition ${
                            isDone
                              ? 'bg-slate-900/30 border-slate-800 opacity-70'
                              : 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            
                            {/* Synced Checkbox Toggle Button */}
                            <button
                              onClick={() => toggleLiteratureItem(item.id)}
                              className="mt-1 shrink-0 text-slate-400 hover:text-indigo-400 transition"
                              title={isDone ? 'בטל סימון כנקרא' : 'סמן כנקרא'}
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
                                
                                {/* Open Reader & Summary Button */}
                                <button
                                  onClick={() => handleOpenReader(item.id)}
                                  className="px-3 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold border border-indigo-500 shadow-md transition flex items-center gap-1.5"
                                >
                                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                                  <span>קרא מאמר ותקציר ⚡</span>
                                </button>

                                {/* Direct Link */}
                                {item.link && (
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition flex items-center gap-1"
                                  >
                                    <span>PubMed</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                )}

                                {/* Flag for Review Toggle */}
                                <button
                                  onClick={() => toggleReviewFlag(item.id)}
                                  className={`px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                                    isReviewFlagged
                                      ? 'bg-amber-500/20 border-amber-500/40 text-amber-300 font-bold'
                                      : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  <Bookmark className="w-3 h-3 text-amber-400" />
                                  <span>{isReviewFlagged ? 'מסומן לעיון' : 'סמן לעיון'}</span>
                                </button>

                                {/* Add / Edit Note */}
                                <button
                                  onClick={() => handleOpenNote(item.id)}
                                  className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition flex items-center gap-1"
                                >
                                  <MessageSquare className="w-3 h-3 text-cyan-400" />
                                  <span>{hasNote ? 'ערוך הערה' : 'הוסף הערה'}</span>
                                </button>
                              </div>

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
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card w-full max-w-md rounded-2xl p-6 border border-slate-700 bg-slate-900 space-y-4">
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

      {/* Article Reader Sequential Navigation Modal */}
      {readerArticleIndex !== null && allCurriculumArticles[readerArticleIndex] && (
        <ArticleReaderModal
          item={allCurriculumArticles[readerArticleIndex]}
          allArticles={allCurriculumArticles}
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
