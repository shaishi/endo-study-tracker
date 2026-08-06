import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  Users, 
  UserX, 
  UserCheck, 
  Search, 
  Trash2, 
  BarChart3, 
  Activity, 
  Clock, 
  Download,
  Award
} from 'lucide-react';
import type { ResidentProfile, UserState } from '../types';

interface AdminViewProps {
  userState: UserState;
}

// Initial default resident directory (for demo & live sync)
const INITIAL_RESIDENTS: ResidentProfile[] = [
  {
    uid: 'admin-shai',
    email: 'shai_shilo@endo-tracker.org.il',
    displayName: 'ד"ר שי שילו (מנהל ראשי)',
    lastActive: 'היום 18:45',
    completedCount: 69,
    progressPercent: 26,
    currentStreak: 5,
    role: 'admin',
    status: 'active'
  },
  {
    uid: 'res-1',
    email: 'dr.cohen@sheba.health.gov.il',
    displayName: 'ד"ר דניאל כהן',
    lastActive: 'היום 14:20',
    completedCount: 142,
    progressPercent: 53,
    currentStreak: 12,
    role: 'resident',
    status: 'active'
  },
  {
    uid: 'res-2',
    email: 'dr.levi@hadassah.org.il',
    displayName: 'ד"ר מיכל לוי',
    lastActive: 'אתמול 21:10',
    completedCount: 98,
    progressPercent: 37,
    currentStreak: 3,
    role: 'resident',
    status: 'active'
  },
  {
    uid: 'res-3',
    email: 'dr.mizrachi@rambam.health.gov.il',
    displayName: 'ד"ר רועי מזרחי',
    lastActive: 'לפני 3 ימים',
    completedCount: 22,
    progressPercent: 8,
    currentStreak: 0,
    role: 'resident',
    status: 'active'
  },
  {
    uid: 'res-4',
    email: 'dr.shapira@tlvmc.gov.il',
    displayName: 'ד"ר יעל שפירא',
    lastActive: 'לפני שבועיים',
    completedCount: 5,
    progressPercent: 2,
    currentStreak: 0,
    role: 'resident',
    status: 'suspended'
  }
];

export const AdminView: React.FC<AdminViewProps> = () => {
  const [residents, setResidents] = useState<ResidentProfile[]>(INITIAL_RESIDENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'suspended'>('all');

  const filteredResidents = useMemo(() => {
    return residents.filter(r => {
      const matchesSearch = r.email.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            (r.displayName && r.displayName.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [residents, searchQuery, statusFilter]);

  const stats = useMemo(() => {
    const total = residents.length;
    const activeCount = residents.filter(r => r.status === 'active').length;
    const avgProgress = Math.round(residents.reduce((acc, r) => acc + r.progressPercent, 0) / (total || 1));
    const topPerformer = [...residents].sort((a, b) => b.completedCount - a.completedCount)[0];

    return { total, activeCount, avgProgress, topPerformer };
  }, [residents]);

  const handleToggleStatus = (uid: string) => {
    setResidents(prev => prev.map(r => {
      if (r.uid === uid) {
        return {
          ...r,
          status: r.status === 'active' ? 'suspended' : 'active'
        };
      }
      return r;
    }));
  };

  const handleDeleteUser = (uid: string, email: string) => {
    if (window.confirm(`האם אתה בטוח שברצונך למחוק לחלוטין את המתמחה ${email}?`)) {
      setResidents(prev => prev.filter(r => r.uid !== uid));
    }
  };

  const handleExportCSV = () => {
    const headers = 'Email,Name,Role,Status,Completed,ProgressPercent,LastActive\n';
    const rows = residents.map(r => `${r.email},"${r.displayName || ''}",${r.role},${r.status},${r.completedCount},${r.progressPercent}%,${r.lastActive}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `endodontic_residency_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Admin Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>פאנל ניהול ומעקב מתמחים (Executive Residency Admin)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">ממשק מנהל האתר</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              ניהול מתמחים, ניטור קצב התקדמות לימוד, השהיית הרשאות גישה, ויצירת דוחות מחלקתיים.
            </p>
          </div>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30"
          >
            <Download className="w-4 h-4" />
            <span>ייצוא דוח מתמחים ל-CSV</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>סה"כ מתמחים רשומים</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black text-white">{stats.total} משתמשים</div>
          <div className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <Activity className="w-3 h-3" />
            <span>{stats.activeCount} פעילים כעת במערכת</span>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>ממוצע התקדמות מחלקתי</span>
            <BarChart3 className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-400">{stats.avgProgress}%</div>
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden mt-1">
            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: `${stats.avgProgress}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>מוביל המחלקה (Top Performer)</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-base font-extrabold text-white truncate">{stats.topPerformer?.displayName || stats.topPerformer?.email}</div>
          <div className="text-[11px] text-amber-300 font-mono">
            {stats.topPerformer?.completedCount} / 266 פריטים ({stats.topPerformer?.progressPercent}%)
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 bg-slate-900/80 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>סטטוס אבטחה והרשאות</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-base font-extrabold text-emerald-300">סנכרון ענן מאובטח</div>
          <div className="text-[11px] text-slate-400">Firebase Firestore Cloud Sync</div>
        </div>

      </div>

      {/* Directory Search & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-950/70 rounded-2xl border border-slate-800">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="חפש לפי שם מתמחה או כתובת אימייל..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pr-10 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>

        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'all' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            כל המתמחים ({residents.length})
          </button>
          <button
            onClick={() => setStatusFilter('active')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'active' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            פעילים בלבד
          </button>
          <button
            onClick={() => setStatusFilter('suspended')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              statusFilter === 'suspended' ? 'bg-rose-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            מושהים בלבד
          </button>
        </div>

      </div>

      {/* Resident Table */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
        <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <span>ספריית מתמחים ומעקב התקדמות בזמן אמת ({filteredResidents.length})</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                <th className="p-3 font-bold">שם ואימייל המתמחה</th>
                <th className="p-3 font-bold">תפקיד</th>
                <th className="p-3 font-bold">סטטוס גישה</th>
                <th className="p-3 font-bold">התקדמות ספרות (266)</th>
                <th className="p-3 font-bold">רצף ימים (Streak)</th>
                <th className="p-3 font-bold">חיבור אחרון</th>
                <th className="p-3 font-bold text-center">פעולות ניהול</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
              {filteredResidents.map(res => (
                <tr key={res.uid} className="hover:bg-slate-800/40 transition">
                  
                  {/* Name & Email */}
                  <td className="p-3">
                    <div className="font-bold text-white text-xs">{res.displayName || 'מתמחה'}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{res.email}</div>
                  </td>

                  {/* Role */}
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${
                      res.role === 'admin' 
                        ? 'bg-purple-950 text-purple-300 border-purple-500/40' 
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {res.role === 'admin' ? '👑 מנהל' : 'מתמחה'}
                    </span>
                  </td>

                  {/* Status Badge */}
                  <td className="p-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                      res.status === 'active' 
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' 
                        : 'bg-rose-950 text-rose-300 border-rose-500/30'
                    }`}>
                      {res.status === 'active' ? (
                        <>
                          <UserCheck className="w-3 h-3 text-emerald-400" />
                          <span>גישה פעילה</span>
                        </>
                      ) : (
                        <>
                          <UserX className="w-3 h-3 text-rose-400" />
                          <span>גישה מושהית</span>
                        </>
                      )}
                    </span>
                  </td>

                  {/* Progress Bar */}
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-indigo-500 h-2 rounded-full" 
                          style={{ width: `${res.progressPercent}%` }}
                        ></div>
                      </div>
                      <span className="font-mono font-bold text-slate-200">{res.completedCount}/266</span>
                      <span className="text-[10px] text-slate-400 font-mono">({res.progressPercent}%)</span>
                    </div>
                  </td>

                  {/* Streak */}
                  <td className="p-3 font-mono font-bold text-amber-400">
                    🔥 {res.currentStreak} ימים
                  </td>

                  {/* Last Active */}
                  <td className="p-3 text-slate-400 text-[11px] font-mono">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-500" />
                      <span>{res.lastActive}</span>
                    </div>
                  </td>

                  {/* Action Buttons */}
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      
                      {/* Toggle Access Status Button */}
                      <button
                        onClick={() => handleToggleStatus(res.uid)}
                        className={`p-1.5 rounded-lg border text-xs font-bold transition ${
                          res.status === 'active'
                            ? 'bg-amber-950/60 border-amber-500/30 text-amber-300 hover:bg-amber-900/80'
                            : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/80'
                        }`}
                        title={res.status === 'active' ? 'השהה גישת מתמחה' : 'אשר גישת מתמחה'}
                      >
                        {res.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                      </button>

                      {/* Delete User Button */}
                      {res.role !== 'admin' && (
                        <button
                          onClick={() => handleDeleteUser(res.uid, res.email)}
                          className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/30 text-rose-400 hover:bg-rose-900/80 transition"
                          title="מחק משתמש מהמערכת"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
