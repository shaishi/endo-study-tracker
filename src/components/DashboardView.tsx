import React, { useMemo } from 'react';
import { 
  BarChart3, 
  Flame, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  Layers, 
  Calendar
} from 'lucide-react';
import type { EndoData, UserState } from '../types';
import { BoardReadinessWidget } from './BoardReadinessWidget';

interface DashboardViewProps {
  data: EndoData;
  userState: UserState;
  setActiveTab?: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  data,
  userState,
  setActiveTab = () => {},
}) => {
  // Compute overall stats
  const totalLit = data.literature.length;
  const completedLit = userState.completedItemIds.length;
  const overallPercent = Math.round((completedLit / (totalLit || 1)) * 100);

  const phase1Lit = data.literature.filter(i => i.week !== null);
  const completedPhase1Lit = phase1Lit.filter(i => userState.completedItemIds.includes(i.id)).length;
  
  const totalPhase1Chapters = 12;
  const completedPhase1Chapters = userState.completedWeekChapters.length;

  const totalPhase1Units = phase1Lit.length + totalPhase1Chapters;
  const completedPhase1Units = completedPhase1Lit + completedPhase1Chapters;
  const phase1Percent = Math.round((completedPhase1Units / (totalPhase1Units || 1)) * 100);


  // Category breakdown
  const categoryStats = useMemo(() => {
    const map = new Map<string, { total: number; completed: number }>();
    data.literature.forEach(item => {
      const cat = item.category || 'כללי';
      const cur = map.get(cat) || { total: 0, completed: 0 };
      cur.total++;
      if (userState.completedItemIds.includes(item.id)) {
        cur.completed++;
      }
      map.set(cat, cur);
    });

    return Array.from(map.entries()).map(([cat, stat]) => ({
      category: cat,
      total: stat.total,
      completed: stat.completed,
      percent: Math.round((stat.completed / stat.total) * 100),
    })).sort((a, b) => b.total - a.total);
  }, [data.literature, userState.completedItemIds]);

  // Generate 88-day heatmap dates (2026-08-06 to 2026-11-01)
  const heatmapDates = useMemo(() => {
    const dates: string[] = [];
    const start = new Date('2026-08-06');
    const end = new Date('2026-11-01');

    const curr = new Date(start);
    while (curr <= end) {
      dates.push(curr.toISOString().split('T')[0]);
      curr.setDate(curr.getDate() + 1);
    }
    return dates;
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-400" />
          <span>לוח מחוונים וסטטיסטיקת התקדמות</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          תמונת מצב מקיפה על עמידה ביעדי הלמידה, התפלגות קטגוריות ורצף פעילות
        </p>
      </div>

      {/* Board Readiness Predictor Score Widget */}
      <BoardReadinessWidget userState={userState} data={data} setActiveTab={setActiveTab} />

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Overall Completion */}
        <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>התקדמות כללית</span>
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">{overallPercent}%</div>
          <div className="text-xs text-slate-400">{completedLit} מתוך {totalLit} פריטי ספרות</div>
        </div>

        {/* Phase 1 Completion */}
        <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>שלב 1 (12 השבועות)</span>
            <Layers className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">{phase1Percent}%</div>
          <div className="text-xs text-slate-400">{completedPhase1Units} מתוך {totalPhase1Units} יחידות</div>
        </div>

        {/* Current Streak */}
        <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>רצף פעילות נוכחי</span>
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">{userState.currentStreak || 0} ימים</div>
          <div className="text-xs text-slate-400">שיא אישי: {userState.bestStreak || 0} ימים</div>
        </div>

        {/* Review Flagged Items */}
        <div className="glass-card rounded-2xl p-5 border border-slate-700/60 bg-slate-800/60 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>מתוייגים לחזרה לקראת הבחינה</span>
            <Award className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-400">{userState.reviewItemIds.length}</div>
          <div className="text-xs text-slate-400">פריטים מסומנים 🔖</div>
        </div>
      </div>

      {/* 88-Day Activity Heatmap */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/60 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-400" />
            <span>מפת חום של פעילות יומית (88 ימי ספרינט)</span>
          </h3>
          <span className="text-xs text-slate-400">6.8.2026 – 1.11.2026</span>
        </div>

        <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
          <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
            {heatmapDates.map((dateStr) => {
              const count = userState.dailyActivityLog[dateStr] || 0;
              let bgClass = 'bg-slate-800 border-slate-700/60';
              if (count >= 1 && count <= 2) bgClass = 'bg-emerald-950 border-emerald-800 text-emerald-300';
              if (count >= 3 && count <= 5) bgClass = 'bg-emerald-700 border-emerald-600 text-white';
              if (count >= 6) bgClass = 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold';

              return (
                <div
                  key={dateStr}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border flex items-center justify-center text-[10px] transition cursor-pointer hover:scale-110 ${bgClass}`}
                  title={`${dateStr}: ${count} יחידות הושלמו`}
                >
                  {count > 0 ? count : ''}
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 text-[11px] text-slate-400 pt-2 border-t border-slate-800">
            <span>פחות</span>
            <span className="w-3.5 h-3.5 rounded bg-slate-800 border border-slate-700"></span>
            <span className="w-3.5 h-3.5 rounded bg-emerald-950 border border-emerald-800"></span>
            <span className="w-3.5 h-3.5 rounded bg-emerald-700"></span>
            <span className="w-3.5 h-3.5 rounded bg-emerald-500"></span>
            <span>יותר פעילות</span>
          </div>
        </div>
      </div>

      {/* Category Progress Breakdown */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-800/60 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span>התפלגות למידה לפי קטגוריות נושא</span>
        </h3>

        <div className="space-y-3">
          {categoryStats.map((stat) => (
            <div key={stat.category} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold">
                <span className="text-slate-200">{stat.category}</span>
                <span className="text-slate-400">
                  {stat.completed}/{stat.total} פריטים ({stat.percent}%)
                </span>
              </div>
              <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700/40">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                  style={{ width: `${stat.percent}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
