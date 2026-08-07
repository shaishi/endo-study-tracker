import React, { useEffect } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Circle, 
  Sparkles, 
  ExternalLink, 
  Bookmark, 
  MessageSquare
} from 'lucide-react';
import type { LiteratureItem, UserState } from '../types';
import { getArticleSummary } from '../utils/summaryHelper';

interface ArticleReaderModalProps {
  item: LiteratureItem;
  allArticles: LiteratureItem[];
  currentIndex: number;
  onNavigate: (newIndex: number) => void;
  onClose: () => void;
  userState: UserState;
  toggleLiteratureItem: (id: number) => void;
  toggleReviewFlag: (id: number) => void;
  updateNote: (id: number, note: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  item,
  allArticles,
  currentIndex,
  onNavigate,
  onClose,
  userState,
  toggleLiteratureItem,
  toggleReviewFlag,
  updateNote,
}) => {
  const isDone = userState.completedItemIds.includes(item.id);
  const isReviewFlagged = userState.reviewItemIds.includes(item.id);
  const userNote = userState.notes[item.id] || '';
  const summary = getArticleSummary(item);

  const hasNext = currentIndex < allArticles.length - 1;
  const hasPrev = currentIndex > 0;

  // Keyboard navigation listener (Left/Right arrows, Space for toggle)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft' && hasNext) {
        onNavigate(currentIndex + 1);
      } else if (e.key === 'ArrowRight' && hasPrev) {
        onNavigate(currentIndex - 1);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, hasNext, hasPrev, onNavigate, onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      
      {/* Reader Modal Window */}
      <div className="glass-card w-full max-w-3xl rounded-3xl border border-indigo-500/30 bg-slate-900 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Top Control Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3 shrink-0">
          
          {/* Article Count Badge */}
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-mono font-bold">
              מאמר {currentIndex + 1} מתוך {allArticles.length}
            </span>
            {item.week && (
              <span className="hidden sm:inline-block px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 font-semibold">
                שבוע {item.week}
              </span>
            )}
          </div>

          {/* Sequential Next / Prev Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => hasPrev && onNavigate(currentIndex - 1)}
              disabled={!hasPrev}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 text-xs font-bold transition flex items-center gap-1"
              title="מאמר קודם (חץ ימינה)"
            >
              <ChevronRight className="w-4 h-4" />
              <span className="hidden sm:inline">הקודם</span>
            </button>

            <button
              onClick={() => hasNext && onNavigate(currentIndex + 1)}
              disabled={!hasNext}
              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white text-xs font-bold transition flex items-center gap-1"
              title="מאמר הבא (חץ שמאלה)"
            >
              <span className="hidden sm:inline">הבא</span>
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition ml-2"
              title="סגור (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Reader Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-slate-100">
          
          {/* Universal Completion Sync Toggle Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border bg-slate-950/80">
            <button
              onClick={() => toggleLiteratureItem(item.id)}
              className={`flex-1 min-h-[44px] px-4 py-2.5 rounded-xl font-extrabold text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                isDone
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/30 border border-emerald-400'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
              }`}
            >
              {isDone ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-white fill-white/20" />
                  <span>✓ נקרא בהצלחה (לחץ לבטול סימון)</span>
                </>
              ) : (
                <>
                  <Circle className="w-5 h-5 text-slate-400" />
                  <span>סימון כנקרא (סתנכרן לכלל העמודים)</span>
                </>
              )}
            </button>

            {/* Review Flag Toggle */}
            <button
              onClick={() => toggleReviewFlag(item.id)}
              className={`min-h-[44px] px-4 py-2.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isReviewFlagged
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="סמן לעיון מחדש מחברת סיכומים"
            >
              <Bookmark className="w-4 h-4 text-amber-400" />
              <span>{isReviewFlagged ? 'מסומן לעיון' : 'סמן לעיון'}</span>
            </button>
          </div>

          {/* Article Header Info */}
          <div className="space-y-3 border-b border-slate-800 pb-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className={`px-2.5 py-0.5 rounded-lg border font-bold ${
                item.type === 'guideline'
                  ? 'bg-amber-950 text-amber-300 border-amber-500/30'
                  : 'bg-cyan-950 text-cyan-300 border-cyan-500/30'
              }`}>
                {item.type === 'guideline' ? 'הנחיה קלינית' : 'מאמר ליבה'}
              </span>
              <span className="px-2.5 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 font-semibold">
                {item.category}
              </span>
            </div>

            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
              {item.citation}
            </h2>

            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-indigo-400 hover:underline font-semibold"
              >
                <span>פתח מאמר מלא ב-PubMed / Journal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Executive Summary Box */}
          <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>תקציר מנהלים ונקודות מפתח לבחינה</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-emerald-300 font-bold">
              📌 בשורה תחתונה: {summary.bottomLine}
            </div>

            <div className="space-y-1.5 pt-1">
              <div className="font-bold text-slate-300">ממצאי מפתח:</div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 leading-relaxed">
                {summary.keyPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>

            <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-indigo-200">
              💡 <strong>דגש קליני לבחינה:</strong> {summary.clinicalTakeaway}
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>הערות אישיות למאמר זה:</span>
            </label>
            <textarea
              value={userNote}
              onChange={(e) => updateNote(item.id, e.target.value)}
              placeholder="רשום דגשים אישיים, נקודות לזיכרון או שאלות..."
              className="w-full h-24 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

        </div>

        {/* Bottom Navigation Buttons */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-3 shrink-0 text-xs">
          <button
            onClick={() => hasPrev && onNavigate(currentIndex - 1)}
            disabled={!hasPrev}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 font-bold transition flex items-center gap-1.5"
          >
            <ChevronRight className="w-4 h-4" />
            <span>מאמר קודם</span>
          </button>

          <span className="text-slate-400 font-mono hidden sm:inline">
            {currentIndex + 1} / {allArticles.length}
          </span>

          <button
            onClick={() => hasNext && onNavigate(currentIndex + 1)}
            disabled={!hasNext}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white font-bold transition flex items-center gap-1.5"
          >
            <span>מאמר הבא</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
