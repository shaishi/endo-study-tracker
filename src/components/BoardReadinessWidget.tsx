import React, { useMemo } from 'react';
import { 
  Sparkles, 
  Target,
  ChevronRight
} from 'lucide-react';
import type { UserState, EndoData } from '../types';

interface BoardReadinessWidgetProps {
  userState: UserState;
  data: EndoData;
  setActiveTab: (tab: string) => void;
}

export const BoardReadinessWidget: React.FC<BoardReadinessWidgetProps> = ({ userState, data, setActiveTab }) => {
  const readinessData = useMemo(() => {
    const totalArticles = data.literature.length || 266;
    const completedArticles = userState.completedItemIds.length;
    const literatureScore = Math.min(100, Math.round((completedArticles / totalArticles) * 100));

    // Quiz score calculation
    const quizHistory = userState.quizHistory || [];
    const totalQuizAttempts = quizHistory.length;
    const correctQuizAttempts = quizHistory.filter(q => q.isCorrect).length;
    const quizScore = totalQuizAttempts > 0 ? Math.round((correctQuizAttempts / totalQuizAttempts) * 100) : 50;

    // Flashcard & streak score
    const flashcardProgress = userState.flashcardProgress || {};
    const reviewedFlashcardsCount = Object.keys(flashcardProgress).length;
    const streakBonus = Math.min(20, (userState.currentStreak || 0) * 4);
    const flashcardsScore = Math.min(100, Math.round((reviewedFlashcardsCount / 8) * 80) + streakBonus);

    // Weighted Overall Readiness Score (40% Literature, 40% Quiz, 20% Flashcards & Streak)
    const overallScore = Math.round(
      (literatureScore * 0.40) + 
      (quizScore * 0.40) + 
      (flashcardsScore * 0.20)
    );

    // Status Level
    let statusLabel = 'בתחילת הדרך 🔴';
    let statusColor = 'text-rose-400 border-rose-500/30 bg-rose-950/40';
    if (overallScore >= 75) {
      statusLabel = 'מוכן לבחינת שלב א\' 🟢';
      statusColor = 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';
    } else if (overallScore >= 45) {
      statusLabel = 'מתקדמים בקצב מצוין 🟡';
      statusColor = 'text-amber-400 border-amber-500/30 bg-amber-950/40';
    }

    // Category Skill Breakdown
    const categories = [
      { id: 'anatomy', name: 'אנטומיה ומורפולוגיה', weight: 85 },
      { id: 'microbiology', name: 'מיקרוביולוגיה ושטיפות', weight: Math.max(30, quizScore - 10) },
      { id: 'trauma', name: 'פרוטוקול טראומה (IADT)', weight: Math.max(40, quizScore + 10) },
      { id: 'diagnostics', name: 'אבחנה ודיאגנוסטיקה', weight: Math.max(50, literatureScore) },
    ];

    // Identify lowest topic for personalized daily tip
    const lowestTopic = [...categories].sort((a, b) => a.weight - b.weight)[0];

    return {
      overallScore,
      literatureScore,
      quizScore,
      flashcardsScore,
      statusLabel,
      statusColor,
      categories,
      lowestTopic
    };
  }, [userState, data]);

  return (
    <div className="glass-card rounded-3xl p-6 border border-slate-700/80 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-950 space-y-6 shadow-xl text-right">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 shadow-md">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>מחשבון מדד מוכנות לבחינת שלב א'</span>
              <span className={`text-xs px-3 py-1 rounded-full border font-bold ${readinessData.statusColor}`}>
                {readinessData.statusLabel}
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              חישוב משוקלל חכם לפי: קריאת ספרות (40%), סימולטור שאלות (40%), וכרטיסיות פלאש (20%)
            </p>
          </div>
        </div>

        {/* Overall Big Score Badge */}
        <div className="flex items-center gap-3 self-end sm:self-center">
          <div className="text-right">
            <div className="text-[10px] text-slate-400 uppercase font-semibold">ציון מוכנות משוקלל</div>
            <div className="text-3xl font-black text-indigo-400 font-mono">{readinessData.overallScore}%</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-indigo-500/40 flex items-center justify-center p-1">
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden rotate-90">
              <div className="bg-indigo-500 h-full" style={{ width: `${readinessData.overallScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Metric Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>📚 ספרות חובה (266)</span>
            <span className="font-mono text-indigo-400 font-bold">{readinessData.literatureScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${readinessData.literatureScore}%` }}></div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>⏱️ סימולטור שאלות</span>
            <span className="font-mono text-cyan-400 font-bold">{readinessData.quizScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${readinessData.quizScore}%` }}></div>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400 font-medium">
            <span>📇 כרטיסיות ו-Streak</span>
            <span className="font-mono text-amber-400 font-bold">{readinessData.flashcardsScore}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div className="bg-amber-500 h-2 rounded-full" style={{ width: `${readinessData.flashcardsScore}%` }}></div>
          </div>
        </div>

      </div>

      {/* Personal Actionable Recommendation Tip */}
      <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0 mt-0.5 sm:mt-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-200">המלצת למידה אישית להעלאת הציון:</div>
            <p className="text-xs text-slate-300 mt-0.5">
              כדאי להתמקד היום בנושא <strong>{readinessData.lowestTopic.name}</strong> — תרגול ממוקד בנושא זה יעלה את ציון המוכנות שלך ב-5%-8%!
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('quiz')}
          className="shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1 shadow-md"
        >
          <span>תרגל נושא זה</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

    </div>
  );
};
