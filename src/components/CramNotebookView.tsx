import React from 'react';
import { 
  Bookmark, 
  MessageSquare, 
  AlertTriangle, 
  Sparkles, 
  Printer
} from 'lucide-react';
import type { EndoData, UserState } from '../types';
import { quizQuestionsData } from '../data/quizData';
import { getArticleSummary } from '../utils/summaryHelper';

interface CramNotebookViewProps {
  data: EndoData;
  userState: UserState;
  toggleReviewFlag: (id: number) => void;
}

export const CramNotebookView: React.FC<CramNotebookViewProps> = ({
  data,
  userState,
  toggleReviewFlag,
}) => {
  // Flagged items for review
  const flaggedItems = data.literature.filter(item => userState.reviewItemIds.includes(item.id));
  
  // Articles with personal notes
  const noteItemEntries = Object.entries(userState.notes).filter(([_, note]) => note && note.trim().length > 0);
  
  // Missed quiz questions
  const missedSet = new Set(userState.missedQuestionIds || []);
  const missedQuestions = quizQuestionsData.filter(q => missedSet.has(q.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-900 shadow-xl print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>מחברת הסיכומים והדגשים האישית לבחינה 📝</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">מחברת מרתון הלילה שלפני הבחינה</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              מרכז אוטומטית את כל המאמרים שאי פעם סימנת לחזרה, השאלות שטעית בהן בסימולטור, וההערות האישיות שרשמת — דף מרוכז אחד לשינון אחרון.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            <span>הדפס / שמור כ-PDF 📄</span>
          </button>
        </div>
      </div>

      {/* Quick Summary Counter Cards */}
      <div className="grid grid-cols-3 gap-3 print:hidden">
        <div className="glass-card rounded-2xl p-4 border border-amber-500/30 bg-amber-950/20 text-center space-y-1">
          <div className="text-2xl font-black text-amber-300">{flaggedItems.length}</div>
          <div className="text-xs text-amber-200/80 font-medium">מאמרים מסומנים לחזרה 🔖</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-rose-500/30 bg-rose-950/20 text-center space-y-1">
          <div className="text-2xl font-black text-rose-300">{missedQuestions.length}</div>
          <div className="text-xs text-rose-200/80 font-medium">שאלות לחיזוק מטעויות 🎯</div>
        </div>

        <div className="glass-card rounded-2xl p-4 border border-indigo-500/30 bg-indigo-950/20 text-center space-y-1">
          <div className="text-2xl font-black text-indigo-300">{noteItemEntries.length}</div>
          <div className="text-xs text-indigo-200/80 font-medium">הערות אישיות שכתבת ✍️</div>
        </div>
      </div>

      {/* Section 1: Flagged Literature for Review */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-amber-300 flex items-center gap-2 px-1">
          <Bookmark className="w-5 h-5 text-amber-400 fill-amber-400" />
          <span>מאמרים והנחיות קליניות שסימנת לחזרה (Flagged for Review)</span>
        </h3>

        {flaggedItems.length === 0 ? (
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 text-center text-xs text-slate-400">
            טרם סימנת מאמרים לחזרה. לחץ על "לחזור על זה 🔖" בכרטיס מאמר בספרות כדי לרכז אותו כאן.
          </div>
        ) : (
          <div className="space-y-3">
            {flaggedItems.map(item => {
              const summary = getArticleSummary(item);
              return (
                <div key={item.id} className="glass-card rounded-2xl p-4 border border-amber-500/30 bg-slate-900/80 space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-500/30 font-mono">
                          #{item.id}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                          {item.category}
                        </span>
                      </div>
                      <div className="text-sm font-extrabold text-white">{item.citation}</div>
                    </div>

                    <button
                      onClick={() => toggleReviewFlag(item.id)}
                      className="text-xs text-amber-400 hover:text-amber-300 print:hidden shrink-0"
                    >
                      הסר דגל ✕
                    </button>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1.5">
                    <div className="font-bold text-indigo-300">⚡ השורה התחתונה: {summary.bottomLine}</div>
                    <div className="text-emerald-300 font-semibold">💡 דגש קליני: {summary.clinicalTakeaway}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 2: Personal Written Notes */}
      <div className="space-y-3 pt-4">
        <h3 className="text-lg font-bold text-indigo-300 flex items-center gap-2 px-1">
          <MessageSquare className="w-5 h-5 text-indigo-400" />
          <span>ההערות והסיכומים האישיים שלך</span>
        </h3>

        {noteItemEntries.length === 0 ? (
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900/40 text-center text-xs text-slate-400">
            טרם רשמת הערות אישיות. תוכל להוסיף הערה בכל כרטיס מאמר בספרות.
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-3">
            {noteItemEntries.map(([idStr, noteText]) => {
              const itemId = parseInt(idStr, 10);
              const item = data.literature.find(i => i.id === itemId);
              if (!item) return null;

              return (
                <div key={itemId} className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2">
                  <div className="text-xs font-bold text-slate-300 line-clamp-1">
                    #{item.id} — {item.citation}
                  </div>
                  <p className="text-xs text-amber-200 font-medium bg-slate-950 p-2.5 rounded-xl border border-amber-500/20">
                    "{noteText}"
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Section 3: Missed Quiz Questions for Last-Minute Review */}
      <div className="space-y-3 pt-4">
        <h3 className="text-lg font-bold text-rose-300 flex items-center gap-2 px-1">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>שאלות מסימולטור השאלות שטרם שוחזרו (Missed Questions Queue)</span>
        </h3>

        {missedQuestions.length === 0 ? (
          <div className="p-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 text-center text-xs text-emerald-300">
            🎉 מעולה! אין שאלות מסומנות בטעויות בסימולטור. פתרת את כל השאלות בהצלחה!
          </div>
        ) : (
          <div className="space-y-3">
            {missedQuestions.map(q => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-rose-400 bg-rose-950/80 px-2 py-0.5 rounded border border-rose-500/30">
                    שאלה #{q.id} — {q.category}
                  </span>
                </div>
                <div className="font-extrabold text-white text-sm">{q.question}</div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-slate-300">
                  <div className="font-bold text-emerald-400">✓ תשובה נכונה: {q.options[q.correctOptionIndex]}</div>
                  <div className="text-slate-400 text-[11px] leading-relaxed pt-1">{q.explanation}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
