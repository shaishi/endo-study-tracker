import React, { useState } from 'react';
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
  ShieldCheck,
  Bandage,
  Timer,
  Stethoscope,
  ChevronDown,
  Bookmark
} from 'lucide-react';
import type { User } from 'firebase/auth';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openSearch: () => void;
  onOpenFocusTimer?: () => void;
  openAuthModal: () => void;
  currentStreak: number;
  completedCount?: number;
  totalCount?: number;
  cloudSyncStatus: 'synced' | 'syncing' | 'offline';
  currentUser: User | null;
  theme?: 'dark' | 'light';
  toggleTheme?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  openSearch,
  onOpenFocusTimer,
  openAuthModal,
  currentStreak,
  completedCount = 0,
  totalCount = 266,
  cloudSyncStatus,
  currentUser,
  theme = 'dark',
  toggleTheme,
}) => {
  const isLight = theme === 'light';
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const isAdmin = !currentUser || currentUser.email === 'shai.shilo@gmail.com';

  const [activeDropdown, setActiveDropdown] = useState<'curriculum' | 'tools' | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const curriculumItems = [
    { id: 'today', label: 'משימות להיום 📅', icon: Calendar, desc: 'תוכנית לימוד יומית אדפטיבית' },
    { id: 'weeks', label: 'תוכנית 12 השבועות', icon: CheckCircle2, desc: 'ספרינט הכנה מובנה' },
    { id: 'literature', label: 'ספרות חובה (266)', icon: FileText, desc: 'מאמרים קלאסיים והנחיות' },
    { id: 'books', label: 'ספרי לימוד (7)', icon: Book, desc: 'Cohen, Pathways, Gutmann' },
    { id: 'cram', label: 'מחברת סיכומים לבחינה 📝', icon: Bookmark, desc: 'ריכוז מאמרים מסומנים, הערות וטעויות' },
  ];

  const clinicalToolItems = [
    { id: 'protocols', label: 'פרוטוקולים קליניים 🩺', icon: Stethoscope, desc: 'Pulp Capping, Pulpotomy, RCT, Revascularization' },
    { id: 'trauma', label: 'מחשבון טראומה 🩹', icon: Bandage, desc: 'AAE / IADT 2020 Guidelines' },
    { id: 'quiz', label: 'סימולטור שאלות ⚡', icon: Award, desc: 'בנק שאלות וניתוח טעויות' },
    { id: 'flashcards', label: 'כרטיסיות זיכרון', icon: Brain, desc: 'שינון חזרה מרווחת Spaced Repetition' },
    { id: 'cheatsheets', label: 'דפי סיכום וטבלאות', icon: FileSpreadsheet, desc: 'טבלאות השוואה ואנטומיה' },
  ];

  const allNavItems = [...curriculumItems, ...clinicalToolItems, 
    { id: 'dashboard', label: 'לוח מחוונים', icon: BarChart3 },
    ...(isAdmin ? [{ id: 'admin', label: 'מנהל 👑', icon: ShieldCheck }] : []),
    { id: 'settings', label: 'הגדרות', icon: Settings },
  ];

  const isCurriculumActive = ['today', 'weeks', 'literature', 'books', 'cram'].includes(activeTab);
  const isToolsActive = ['protocols', 'trauma', 'quiz', 'flashcards', 'cheatsheets'].includes(activeTab);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-200 border-b ${
        isLight 
          ? 'bg-white/95 border-slate-200 shadow-sm text-slate-900' 
          : 'bg-slate-900/95 border-slate-800 text-slate-100'
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
                <p className={`text-[10px] hidden sm:block ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  הכנה להתמחות • 2026
                </p>
              </div>
            </div>

            {/* Compact Desktop Navigation Bar (LG+ screens) */}
            <nav className={`hidden md:flex items-center gap-1.5 p-1.5 rounded-2xl border transition-colors ${
              isLight 
                ? 'bg-slate-100/90 border-slate-200/80' 
                : 'bg-slate-950/70 border-slate-800'
            }`}>
              
              {/* Main Tab 1: Today */}
              <button
                onClick={() => {
                  setActiveTab('today');
                  setActiveDropdown(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'today'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : isLight
                      ? 'text-slate-700 hover:bg-slate-200/80'
                      : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>היום</span>
              </button>

              {/* Main Dropdown 2: Curriculum & Reading */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'curriculum' ? null : 'curriculum')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isCurriculumActive && activeTab !== 'today'
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : isLight
                        ? 'text-slate-700 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>תוכנית וספרות</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'curriculum' ? 'rotate-180' : ''}`} />
                </button>

                {/* Curriculum Dropdown Menu */}
                {activeDropdown === 'curriculum' && (
                  <div 
                    className={`absolute right-0 mt-2 w-64 rounded-2xl border shadow-2xl p-2 z-50 animate-fadeIn ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {curriculumItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-right transition ${
                            isActive
                              ? 'bg-indigo-600 text-white font-bold'
                              : isLight
                                ? 'hover:bg-slate-100'
                                : 'hover:bg-slate-800/80'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-white' : 'text-indigo-400'}`} />
                          <div>
                            <div className="text-xs font-bold">{item.label}</div>
                            <div className={`text-[10px] ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Main Dropdown 3: Clinical Tools */}
              <div className="relative">
                <button
                  onClick={() => setActiveDropdown(activeDropdown === 'tools' ? null : 'tools')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isToolsActive
                      ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white shadow-md'
                      : isLight
                        ? 'text-slate-700 hover:bg-slate-200/80'
                        : 'text-slate-300 hover:bg-slate-800/80'
                  }`}
                >
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                  <span>כלים קליניים ⚡</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${activeDropdown === 'tools' ? 'rotate-180' : ''}`} />
                </button>

                {/* Clinical Tools Dropdown Menu */}
                {activeDropdown === 'tools' && (
                  <div 
                    className={`absolute right-0 mt-2 w-72 rounded-2xl border shadow-2xl p-2 z-50 animate-fadeIn ${
                      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
                    }`}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {clinicalToolItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeTab === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => {
                            setActiveTab(item.id);
                            setActiveDropdown(null);
                          }}
                          className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-right transition ${
                            isActive
                              ? 'bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-bold'
                              : isLight
                                ? 'hover:bg-slate-100'
                                : 'hover:bg-slate-800/80'
                          }`}
                        >
                          <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                          <div>
                            <div className="text-xs font-bold">{item.label}</div>
                            <div className={`text-[10px] ${isActive ? 'text-indigo-100' : 'text-slate-400'}`}>{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Main Tab 4: Dashboard */}
              <button
                onClick={() => {
                  setActiveTab('dashboard');
                  setActiveDropdown(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : isLight
                      ? 'text-slate-700 hover:bg-slate-200/80'
                      : 'text-slate-300 hover:bg-slate-800/80'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>לוח מחוונים</span>
              </button>

              {/* Main Tab 5: Admin (if shai.shilo@gmail.com) */}
              {isAdmin && (
                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setActiveDropdown(null);
                  }}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'admin'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-emerald-400 hover:bg-emerald-950/50'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>מנהל 👑</span>
                </button>
              )}

              {/* Main Tab 6: Settings */}
              <button
                onClick={() => {
                  setActiveTab('settings');
                  setActiveDropdown(null);
                }}
                className={`p-1.5 rounded-xl transition ${
                  activeTab === 'settings'
                    ? 'bg-indigo-600 text-white'
                    : isLight ? 'text-slate-600 hover:bg-slate-200' : 'text-slate-400 hover:bg-slate-800'
                }`}
                title="הגדרות"
              >
                <Settings className="w-4 h-4" />
              </button>

            </nav>

            {/* Right Tools & User Info */}
            <div className="flex items-center gap-2 flex-shrink-0">
              
              {/* Pomodoro Focus Timer Trigger */}
              {onOpenFocusTimer && (
                <button
                  onClick={onOpenFocusTimer}
                  className="px-2.5 py-1.5 rounded-xl bg-indigo-950/60 hover:bg-indigo-900/60 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition flex items-center gap-1"
                  title="טיימר פומודורו לפוקוס"
                >
                  <Timer className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">פוקוס ⏱️</span>
                </button>
              )}

              {/* Theme Switcher */}
              {toggleTheme && (
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded-xl border transition ${
                    isLight 
                      ? 'bg-slate-100 border-slate-200 text-amber-600 hover:bg-slate-200' 
                      : 'bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700'
                  }`}
                  title={isLight ? 'עבור למצב כהה (Dark)' : 'עבור למצב בהיר (Light)'}
                >
                  {isLight ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
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
                <span className="hidden sm:inline">
                  {currentUser ? (cloudSyncStatus === 'synced' ? 'סנכרון פעיל' : 'מסנכרן...') : 'סנכרון'}
                </span>
              </button>

              {/* Streak Badge */}
              {currentStreak > 0 && (
                <div className={`hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                  isLight
                    ? 'bg-amber-50 border-amber-200 text-amber-800'
                    : 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                }`}>
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{currentStreak}י</span>
                </div>
              )}

              {/* Progress Badge */}
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${
                isLight
                  ? 'bg-indigo-50 border-indigo-200 text-indigo-800'
                  : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-300'
              }`}>
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                <span>{percent}%</span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Sticky Mobile Bottom Navigation Dock (For mobile screens < lg) */}
      <nav className={`lg:hidden fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl transition-all ${
        isLight ? 'bg-white/95 border-slate-200 shadow-lg text-slate-900' : 'bg-slate-950/95 border-slate-800 text-white'
      }`}>
        <div className="grid grid-cols-5 h-16 items-center px-1">
          
          <button
            onClick={() => setActiveTab('today')}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'today' ? 'text-indigo-500 font-bold' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">היום</span>
          </button>

          <button
            onClick={() => setActiveTab('literature')}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'literature' ? 'text-indigo-500 font-bold' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">ספרות</span>
          </button>

          <button
            onClick={() => setActiveTab('quiz')}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'quiz' ? 'text-indigo-500 font-bold' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <Award className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">סימולטור</span>
          </button>

          <button
            onClick={() => setActiveTab('protocols')}
            className={`flex flex-col items-center justify-center py-1 transition ${
              activeTab === 'protocols' ? 'text-indigo-500 font-bold' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <Stethoscope className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">פרוטוקולים</span>
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`flex flex-col items-center justify-center py-1 transition ${
              isMobileMenuOpen ? 'text-indigo-500 font-bold' : isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <Settings className="w-5 h-5" />
            <span className="text-[10px] mt-0.5">עוד ☰</span>
          </button>

        </div>
      </nav>

      {/* Mobile Drawer Overlay Sheet for "More ☰" */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm flex flex-col justify-end animate-fadeIn">
          <div className={`p-6 rounded-t-3xl border-t space-y-4 max-h-[80vh] overflow-y-auto ${
            isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base flex items-center gap-2">
                <span>תפריט כלים וניווט מהיר</span>
              </h3>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xs px-3 py-1 bg-slate-800 rounded-lg text-slate-300"
              >
                סגור ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {allNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`flex items-center gap-2 p-3 rounded-2xl border text-right transition ${
                      isActive
                        ? 'bg-indigo-600 text-white border-indigo-500 font-bold shadow-md'
                        : isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-800'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 text-indigo-400" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
