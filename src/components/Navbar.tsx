import React from 'react';
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
  Cloud,
  Sun,
  Moon,
  Brain,
  FileSpreadsheet,
  Award
} from 'lucide-react';
import type { User } from 'firebase/auth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSearch: () => void;
  openAuthModal: () => void;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
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
  theme,
  toggleTheme,
  currentUser,
  cloudSyncStatus,
  completedCount,
  totalCount,
  currentStreak,
}) => {
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const coreNavItems = [
    { id: 'today', label: 'היום', icon: Calendar },
    { id: 'weeks', label: '12 שבועות', icon: BookOpen },
    { id: 'literature', label: 'ספרות (266)', icon: FileText },
    { id: 'books', label: 'ספרים (7)', icon: Book },
  ];

  const activeLearningItems = [
    { id: 'flashcards', label: 'כרטיסיות', icon: Brain },
    { id: 'cheatsheets', label: 'דפי סיכום', icon: FileSpreadsheet },
    { id: 'quiz', label: 'סימולטור', icon: Award },
  ];

  const trackingItems = [
    { id: 'dashboard', label: 'לוח מחוונים', icon: BarChart3 },
    { id: 'settings', label: 'הגדרות', icon: Settings },
  ];

  const allNavItems = [...coreNavItems, ...activeLearningItems, ...trackingItems];

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('today')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-extrabold text-base text-white leading-tight">מעקב אנדודונטיה</h1>
              <p className="text-[10px] text-slate-400 hidden lg:block">הכנה להתמחות • 2026</p>
            </div>
          </div>

          {/* Structured Navigation (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800">
            {/* Group 1: Core Schedule */}
            <div className="flex items-center gap-1 px-1">
              {coreNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-slate-800 mx-0.5"></div>

            {/* Group 2: Active Learning & Recall */}
            <div className="flex items-center gap-1 px-1">
              {activeLearningItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md font-bold'
                        : 'text-cyan-300/90 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="w-px h-5 bg-slate-800 mx-0.5"></div>

            {/* Group 3: Tracking & Settings */}
            <div className="flex items-center gap-1 px-1">
              {trackingItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Medium Desktop Compact Nav (lg screens) */}
          <nav className="hidden md:flex xl:hidden items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 overflow-x-auto max-w-[500px]">
            {allNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                    isActive
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Tools & Sync Info */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Theme Switcher */}
            {toggleTheme && (
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center w-8 h-8 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700/80 transition"
                title={theme === 'light' ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
              >
                {theme === 'light' ? (
                  <Moon className="w-4 h-4 text-indigo-500" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            )}

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1.5 rounded-xl border border-slate-700 text-xs transition"
              title="חיפוש (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">חיפוש...</span>
              <kbd className="hidden lg:inline px-1 py-0.5 text-[9px] bg-slate-900 rounded text-slate-400 font-mono">⌘K</kbd>
            </button>

            {/* Cloud Sync Button */}
            <button
              onClick={openAuthModal}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                currentUser
                  ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60'
              }`}
              title={currentUser ? `מחובר: ${currentUser.email}` : 'סנכרון ענן בין מכשירים'}
            >
              <Cloud className={`w-3.5 h-3.5 ${cloudSyncStatus === 'syncing' ? 'animate-pulse text-indigo-400' : ''}`} />
              <span className="hidden lg:inline">
                {currentUser ? (cloudSyncStatus === 'synced' ? 'סנכרון פעיל ☁️' : 'מסנכרן...') : 'סנכרון'}
              </span>
            </button>

            {/* Streak Pill */}
            {currentStreak > 0 && (
              <div className="hidden sm:flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2 py-1 rounded-xl text-xs font-semibold">
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{currentStreak}י</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className="flex items-center gap-1.5 bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 px-2.5 py-1 rounded-xl text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>{percent}%</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className="md:hidden flex items-center gap-1.5 py-2 border-t border-slate-800/80 overflow-x-auto">
          {allNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition ${
                  isActive
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-slate-300 bg-slate-800/50 border border-slate-700/50'
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
