import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Search, 
  ExternalLink, 
  Bookmark, 
  MessageSquare, 
  FileText, 
  Layers,
  Clock,
  Sparkles
} from 'lucide-react';
import type { EndoData, UserState, LiteratureItem } from '../types';
import { isHighYieldArticle } from '../utils/summaryHelper';
import { ArticleReaderModal } from './ArticleReaderModal';

interface LiteratureViewProps {
  data: EndoData;
  userState: UserState;
  toggleLiteratureItem: (id: number) => void;
  toggleReviewFlag: (id: number) => void;
  updateNote: (id: number, note: string) => void;
}

export const LiteratureView: React.FC<LiteratureViewProps> = ({
  data,
  userState,
  toggleLiteratureItem,
  toggleReviewFlag,
  updateNote,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState<'ALL' | 'PHASE_1' | 'PHASE_2'>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'UNREAD' | 'READ' | 'REVIEW'>('ALL');
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'guideline' | 'article'>('ALL');
  const [isHighYieldOnly, setIsHighYieldOnly] = useState(false);

  const [activeNoteModalId, setActiveNoteModalId] = useState<number | null>(null);
  const [tempNoteText, setTempNoteText] = useState<string>('');

  // Reader Modal State
  const [readerArticleIndex, setReaderArticleIndex] = useState<number | null>(null);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    data.literature.forEach(item => {
      if (item.category) set.add(item.category);
    });
    return Array.from(set).sort();
  }, [data.literature]);

  // Filter items
  const filteredItems = useMemo(() => {
    return data.literature.filter(item => {
      // Search text
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const inCitation = item.citation.toLowerCase().includes(q);
        const inCat = item.category?.toLowerCase().includes(q) || false;
        const inNote = (userState.notes[item.id] || '').toLowerCase().includes(q);
        if (!inCitation && !inCat && !inNote) return false;
      }

      // High-Yield Only Filter
      if (isHighYieldOnly && !isHighYieldArticle(item)) {
        return false;
      }

      // Category
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) {
        return false;
      }

      // Phase
      if (phaseFilter === 'PHASE_1' && item.week === null) return false;
      if (phaseFilter === 'PHASE_2' && item.week !== null) return false;

      // Type
      if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;

      // Status
      const isDone = userState.completedItemIds.includes(item.id);
      const isReview = userState.reviewItemIds.includes(item.id);
      if (statusFilter === 'READ' && !isDone) return false;
      if (statusFilter === 'UNREAD' && isDone) return false;
      if (statusFilter === 'REVIEW' && !isReview) return false;

      return true;
    });
  }, [data.literature, searchQuery, categoryFilter, phaseFilter, statusFilter, typeFilter, isHighYieldOnly, userState]);

  const phase1Items = useMemo(() => filteredItems.filter(i => i.week !== null), [filteredItems]);
  const phase2Items = useMemo(() => filteredItems.filter(i => i.week === null), [filteredItems]);

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
    const index = filteredItems.findIndex(a => a.id === articleId);
    if (index !== -1) {
      setReaderArticleIndex(index);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-400" />
              <span>מאגר ספרות חובה (266 מאמרים והנחיות)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              חיפוש חופשי, סינון לפי נושאים, סטטוס קריאה ומאמרי הליבה לבחינת המומחיות
            </p>
          </div>

          <div className="text-left font-mono text-xs text-slate-400">
            <div>נמצאו <strong className="text-white font-bold">{filteredItems.length}</strong> מתוך {data.literature.length}</div>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="mt-5 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חפש לפי מחבר, שנה, כותרת, נושא או הערות אישיות..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pr-10 pl-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Category */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">קטגוריה:</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">כל הקטגוריות ({categories.length})</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Phase */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">שלב לימוד:</label>
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">כל השלבים (1+2)</option>
                <option value="PHASE_1">שלב 1 (12 השבועות)</option>
                <option value="PHASE_2">שלב 2 (התמחות)</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">סטטוס קריאה:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">הכל</option>
                <option value="UNREAD">טרם נקרא</option>
                <option value="READ">נקרא (הושלם)</option>
                <option value="REVIEW">מתוייג לחזרה 🔖</option>
              </select>
            </div>

            {/* Type */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">סוג פריט:</label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">מאמרים + הנחיות</option>
                <option value="article">מאמר קלאסי</option>
                <option value="guideline">הנחיה / מסמך עמדה</option>
              </select>
            </div>
          </div>

          {/* High-Yield Quick Filter Toggle */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <button
              onClick={() => setIsHighYieldOnly(!isHighYieldOnly)}
              className={`px-3.5 py-1.5 rounded-xl border text-xs font-extrabold transition flex items-center gap-1.5 ${
                isHighYieldOnly
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-amber-950/40 text-amber-300 border-amber-500/40 hover:bg-amber-900/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>🔥 מאמרי ליבה חובה לבחינה (High-Yield Top Papers)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Phase 1 Literature Section */}
      {phase1Items.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              <span>ספרות שלב 1 — 12 השבועות ({phase1Items.length})</span>
            </h3>
          </div>

          <div className="space-y-2.5">
            {phase1Items.map((item) => renderLiteratureRow(item, userState, toggleLiteratureItem, toggleReviewFlag, handleOpenNote, handleOpenReader))}
          </div>
        </div>
      )}

      {/* Phase 2 Literature Section */}
      {phase2Items.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-cyan-400" />
              <span>ספרות שלב 2 — במהלך ההתמחות ({phase2Items.length})</span>
            </h3>
          </div>

          <div className="space-y-2.5">
            {phase2Items.map((item) => renderLiteratureRow(item, userState, toggleLiteratureItem, toggleReviewFlag, handleOpenNote, handleOpenReader))}
          </div>
        </div>
      )}

      {/* Note Modal */}
      {activeNoteModalId !== null && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>הערה אישית לפריט #{activeNoteModalId}</span>
            </h3>
            <textarea
              rows={4}
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="רשום דגשים חשובים..."
              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setActiveNoteModalId(null)}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-400 hover:bg-slate-800"
              >
                ביטול
              </button>
              <button
                onClick={handleSaveNote}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white"
              >
                שמור הערה
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sequential Reader Modal */}
      {readerArticleIndex !== null && filteredItems[readerArticleIndex] && (
        <ArticleReaderModal
          item={filteredItems[readerArticleIndex]}
          allArticles={filteredItems}
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

function renderLiteratureRow(
  item: LiteratureItem,
  userState: UserState,
  toggleLiteratureItem: (id: number) => void,
  toggleReviewFlag: (id: number) => void,
  handleOpenNote: (id: number) => void,
  handleOpenReader: (id: number) => void
) {
  const isDone = userState.completedItemIds.includes(item.id);
  const isReviewFlagged = userState.reviewItemIds.includes(item.id);
  const hasNote = Boolean(userState.notes[item.id]);

  return (
    <div
      key={item.id}
      className={`glass-card rounded-2xl p-4 border transition-all ${
        isDone
          ? 'bg-slate-900/30 border-slate-800 opacity-70'
          : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox */}
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

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-mono">
              #{item.id}
            </span>

            {item.week !== null ? (
              <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/80 px-2 py-0.5 rounded border border-indigo-500/30">
                שבוע {item.week}
              </span>
            ) : (
              <span className="text-[11px] font-semibold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                התמחות
              </span>
            )}

            <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
              item.type === 'guideline'
                ? 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                : 'bg-slate-800 text-slate-300 border-slate-700'
            }`}>
              {item.type === 'guideline' ? 'הנחיה' : 'מאמר'}
            </span>

            <span className="text-[11px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80">
              {item.category}
            </span>
          </div>

          <div className="citation-text text-sm font-semibold text-slate-100 leading-snug">
            {item.citation}
          </div>

          {hasNote && (
            <div className="mt-2 text-xs bg-slate-900/90 text-amber-200/90 border border-amber-500/20 p-2.5 rounded-xl flex items-start gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
              <span>{userState.notes[item.id]}</span>
            </div>
          )}

          {/* Action Tools Toolbar */}
          <div className="flex flex-wrap items-center gap-2 pt-2 text-xs">
            
            {/* Open Sequential Reader Button */}
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

            {/* Review Flag */}
            <button
              onClick={() => toggleReviewFlag(item.id)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                isReviewFlagged
                  ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{isReviewFlagged ? 'מסומן לעיון' : 'סמן לעיון'}</span>
            </button>

            {/* Add / Edit Note */}
            <button
              onClick={() => handleOpenNote(item.id)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 font-medium transition flex items-center gap-1"
            >
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>{hasNote ? 'ערוך הערה' : 'הוסף הערה'}</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
