import { 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  FileText, 
  Book, 
  BarChart3, 
  Settings, 
  Search,
  Flame,
  Cloud
} from 'lucide-react';
import type { User } from 'firebase/auth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSearch: () => void;
  openAuthModal: () => void;
  currentUser: User | null;
  cloudSyncStatus: 'synced' | 'syncing' | 'offline' | 'error';
  completedCount: number;
  totalCount: number;
  currentStreak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  openAuthModal,
  currentUser,
  cloudSyncStatus,
  completedCount,
  totalCount,
  currentStreak,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const navItems = [
    { id: 'today', label: 'היום', icon: Calendar },
    { id: 'weeks', label: 'תוכנית 12 השבועות', icon: BookOpen },
    { id: 'literature', label: 'ספרות חובה (266)', icon: FileText },
    { id: 'books', label: 'ספרים (7)', icon: Book },
    { id: 'dashboard', label: 'לוח מחוונים', icon: BarChart3 },
    { id: 'settings', label: 'הגדרות', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-700/60 bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white leading-tight">מעקב אנדודונטיה</h1>
              <p className="text-xs text-slate-400 hidden sm:block">הכנה להתמחות • 2026</p>
            </div>
          </div>

          {/* Center Navigation Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/50">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools & Account Sync */}
          <div className="flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-xl border border-slate-700 text-xs transition"
              title="חיפוש (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">חיפוש...</span>
              <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] bg-slate-900 rounded text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Cloud Sync / Auth Button */}
            <button
              onClick={openAuthModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                currentUser
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60'
              }`}
              title={currentUser ? `מחובר (${cloudSyncStatus}): ${currentUser.email}` : 'התחבר לסנכרון ענן בין מכשירים'}
            >
              <Cloud className={`w-3.5 h-3.5 ${cloudSyncStatus === 'syncing' ? 'animate-pulse text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">
                {currentUser ? (cloudSyncStatus === 'synced' ? 'סנכרון פעיל ☁️' : 'מסנכרן...') : 'סנכרון ענן'}
              </span>
            </button>

            {/* Streak Badge */}
            {currentStreak > 0 && (
              <div className="hidden sm:flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-1 rounded-xl text-xs font-semibold">
                <Flame className="w-4 h-4 fill-amber-500 text-amber-500 animate-pulse" />
                <span>{currentStreak} ימים</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className="flex items-center gap-2 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 px-3 py-1 rounded-xl text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{percent}%</span>
              <span className="text-slate-400 font-normal hidden sm:inline">({completedCount}/{totalCount})</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-between py-2 border-t border-slate-800/80 overflow-x-auto gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-white bg-slate-800/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
};
