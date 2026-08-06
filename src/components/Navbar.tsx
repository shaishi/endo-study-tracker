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
  Award,
  ShieldCheck
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
  const isLight = theme === 'light';
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
    { id: 'admin', label: 'מנהל 👑', icon: ShieldCheck },
    { id: 'settings', label: 'הגדרות', icon: Settings },
  ];

  const allNavItems = [...coreNavItems, ...activeLearningItems, ...trackingItems];

  return (
    <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-200 border-b ${
      isLight 
        ? 'bg-white/90 border-slate-200 shadow-sm text-slate-900' 
        : 'bg-slate-900/90 border-slate-800 text-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-2.5 flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('today')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className={`font-extrabold text-base leading-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                מעקב אנדודונטיה
              </h1>
              <p className={`text-[10px] hidden lg:block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                הכנה להתמחות • 2026
              </p>
            </div>
          </div>

          {/* Structured Navigation (Desktop) */}
          <nav className={`hidden xl:flex items-center gap-1.5 p-1.5 rounded-2xl border transition-colors ${
            isLight 
              ? 'bg-slate-100/90 border-slate-200/80' 
              : 'bg-slate-950/70 border-slate-800'
          }`}>
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
                        : isLight
                          ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-200/70'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={`w-px h-5 mx-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`}></div>

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
                        : isLight
                          ? 'text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50/80 font-bold'
                          : 'text-cyan-300/90 hover:text-white hover:bg-slate-800/80'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isLight ? 'text-indigo-600' : 'text-cyan-400'}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            <div className={`w-px h-5 mx-0.5 ${isLight ? 'bg-slate-300' : 'bg-slate-800'}`}></div>

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
                        : isLight
                          ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-200/70'
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
          <nav className={`hidden md:flex xl:hidden items-center gap-1 p-1 rounded-xl border overflow-x-auto max-w-[500px] ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-950/70 border-slate-800'
          }`}>
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
                      : isLight
                        ? 'text-slate-700 hover:text-indigo-600 hover:bg-slate-200'
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
                className={`flex items-center justify-center w-8 h-8 rounded-xl border transition ${
                  isLight 
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-indigo-600' 
                    : 'bg-slate-800 hover:bg-slate-700 border-slate-700/80 text-amber-400'
                }`}
                title={isLight ? 'עבור למצב כהה' : 'עבור למצב בהיר'}
              >
                {isLight ? (
                  <Moon className="w-4 h-4 text-indigo-600" />
                ) : (
                  <Sun className="w-4 h-4 text-amber-400" />
                )}
              </button>
            )}

            {/* Search Trigger */}
            <button
              onClick={openSearch}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs transition ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200/80 border-slate-200 text-slate-700'
                  : 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
              title="חיפוש (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">חיפוש...</span>
              <kbd className={`hidden lg:inline px-1 py-0.5 text-[9px] rounded font-mono ${
                isLight ? 'bg-slate-200 text-slate-600' : 'bg-slate-900 text-slate-400'
              }`}>⌘K</kbd>
            </button>

            {/* Cloud Sync Button */}
            <button
              onClick={openAuthModal}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition ${
                currentUser
                  ? isLight
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                    : 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300 hover:bg-emerald-900/60'
                  : isLight
                    ? 'bg-indigo-50 border-indigo-200 text-indigo-800 hover:bg-indigo-100'
                    : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60'
              }`}
              title={currentUser ? `מחובר: ${currentUser.email}` : 'סנכרון ענן בין מכשירים'}
            >
              <Cloud className={`w-3.5 h-3.5 ${cloudSyncStatus === 'syncing' ? 'animate-pulse text-indigo-500' : ''}`} />
              <span className="hidden lg:inline">
                {currentUser ? (cloudSyncStatus === 'synced' ? 'סנכרון פעיל ☁️' : 'מסנכרן...') : 'סנכרון'}
              </span>
            </button>

            {/* Streak Pill */}
            {currentStreak > 0 && (
              <div className={`hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl text-xs font-semibold border ${
                isLight
                  ? 'bg-amber-50 border-amber-200 text-amber-800'
                  : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
              }`}>
                <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{currentStreak}י</span>
              </div>
            )}

            {/* Progress Pill */}
            <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold border ${
              isLight
                ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
            }`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
              <span>{percent}%</span>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Scrollbar */}
        <div className={`md:hidden flex items-center gap-1.5 py-2 border-t overflow-x-auto ${
          isLight ? 'border-slate-200' : 'border-slate-800/80'
        }`}>
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
                    : isLight
                      ? 'text-slate-700 bg-slate-100 border border-slate-200'
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
