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
import { getArticleSummary, isHighYieldArticle } from '../utils/summaryHelper';

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
  const [expandedSummaryId, setExpandedSummaryId] = useState<number | null>(null);

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
        const inId = String(item.id) === q;
        if (!inCitation && !inCat && !inNote && !inId) return false;
      }

      // Category
      if (categoryFilter !== 'ALL' && item.category !== categoryFilter) return false;

      // Phase
      if (phaseFilter === 'PHASE_1' && item.week === null) return false;
      if (phaseFilter === 'PHASE_2' && item.week !== null) return false;

      // Status
      const isDone = userState.completedItemIds.includes(item.id);
      const isReview = userState.reviewItemIds.includes(item.id);
      if (statusFilter === 'READ' && !isDone) return false;
      if (statusFilter === 'UNREAD' && isDone) return false;
      if (statusFilter === 'REVIEW' && !isReview) return false;

      // Type
      if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
      if (isHighYieldOnly && !isHighYieldArticle(item)) return false;

      return true;
    });
  }, [data.literature, searchQuery, categoryFilter, phaseFilter, statusFilter, typeFilter, isHighYieldOnly, userState]);

  // Separate Phase 1 vs Phase 2 items
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <FileText className="w-6 h-6 text-indigo-400" />
              <span>ספרות חובה לבחינת המומחיות (266 פריטים)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              רשימת הספרות הרשמית: מאמרים קלאסיים, הנחיות קליניות ומסמכי עמדה
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-indigo-950 text-indigo-300 border border-indigo-500/30 font-semibold px-3 py-1.5 rounded-xl">
              מציג {filteredItems.length} מתוך {data.literature.length}
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-800 space-y-3">
          {/* Row 1: Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="חפש לפי שם מחבר, כותרת, journal, קטגוריה, הערה או מספר ID..."
              className="w-full bg-slate-800/80 border border-slate-700 rounded-xl pr-10 pl-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* Row 2: Select Filters */}
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
                {categories.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Phase */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">שלב התוכנית:</label>
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value as any)}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="ALL">הכל (12 שבועות + להתמחות)</option>
                <option value="PHASE_1">שלב 1: 12 השבועות</option>
                <option value="PHASE_2">שלב 2: במהלך ההתמחות (week=null)</option>
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
                <option value="ALL">כל הסטטוסים</option>
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

            {isHighYieldOnly && (
              <span className="text-xs text-amber-300/80 font-medium">
                מציג רק מאמרים והנחיות קלאסיות בעלות משקל מירבי בבחינת המומחיות
              </span>
            )}
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
            {phase1Items.map((item) => renderLiteratureRow(item, userState, toggleLiteratureItem, toggleReviewFlag, handleOpenNote, expandedSummaryId, setExpandedSummaryId))}
          </div>
        </div>
      )}

      {/* Phase 2 Literature Section (week: null) */}
      {phase2Items.length > 0 && (
        <div className="space-y-3 pt-4">
          <div className="flex items-center justify-between px-1 border-t border-slate-800 pt-6">
            <div>
              <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>ספרות להתמחות עצמה ({phase2Items.length})</span>
              </h3>
              <p className="text-xs text-slate-400">פריטים אלה אינם חלק מספרינט 12 השבועות. ניתן לקרוא בקצב חופשי במהלך ההתמחות.</p>
            </div>
          </div>

          <div className="space-y-2.5">
            {phase2Items.map((item) => renderLiteratureRow(item, userState, toggleLiteratureItem, toggleReviewFlag, handleOpenNote, expandedSummaryId, setExpandedSummaryId))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="glass-card rounded-2xl p-10 text-center text-slate-400 space-y-2">
          <FileText className="w-10 h-10 mx-auto text-slate-600" />
          <h4 className="font-bold text-white">לא נמצאו פריטים תואמים לסינון</h4>
          <p className="text-xs">נסה לשנות את הסינון או את מילת החיפוש</p>
        </div>
      )}

      {/* Note Modal */}
      {activeNoteModalId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl p-6 max-w-lg w-full space-y-4 text-right">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>הערה אישית לפריט #{activeNoteModalId}</span>
            </h3>
            <textarea
              rows={4}
              value={tempNoteText}
              onChange={(e) => setTempNoteText(e.target.value)}
              placeholder="רשום דגשים חשובים, ממצא מרכזי, או נקודות לבחינה..."
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

    </div>
  );
};

function renderLiteratureRow(
  item: LiteratureItem,
  userState: UserState,
  toggleLiteratureItem: (id: number) => void,
  toggleReviewFlag: (id: number) => void,
  handleOpenNote: (id: number) => void,
  expandedSummaryId: number | null,
  setExpandedSummaryId: React.Dispatch<React.SetStateAction<number | null>>
) {
  const isDone = userState.completedItemIds.includes(item.id);
  const isReviewFlagged = userState.reviewItemIds.includes(item.id);
  const hasNote = Boolean(userState.notes[item.id]);
  const isSummaryExpanded = expandedSummaryId === item.id;
  const summary = getArticleSummary(item);

  return (
    <div
      key={item.id}
      className={`glass-card rounded-2xl p-4 border transition-all ${
        isDone
          ? 'bg-slate-900/30 border-slate-800 opacity-60'
          : 'bg-slate-800/50 border-slate-700/60 hover:border-slate-600'
      }`}
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Checkbox */}
        <button
          onClick={() => toggleLiteratureItem(item.id)}
          className="mt-1 shrink-0 text-slate-400 hover:text-indigo-400 transition"
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
                התמחות (ללא שבוע)
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
            
            {/* Executive Summary Button */}
            <button
              onClick={() => setExpandedSummaryId(isSummaryExpanded ? null : item.id)}
              className={`px-2.5 py-1 rounded-lg border font-bold transition flex items-center gap-1 ${
                isSummaryExpanded
                  ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                  : 'bg-indigo-950/60 border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>תקציר מנהלים ⚡</span>
            </button>

            {/* Direct Link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-indigo-300 border border-slate-700 font-medium transition flex items-center gap-1"
              >
                <span>קרא מאמר</span>
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
              <span>{isReviewFlagged ? 'מסומן לחזרה' : 'לחזור על זה'}</span>
            </button>

            {/* Note */}
            <button
              onClick={() => handleOpenNote(item.id)}
              className={`px-2.5 py-1 rounded-lg border font-medium transition flex items-center gap-1 ${
                hasNote
                  ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40 font-bold'
                  : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{hasNote ? 'ערוך הערה' : 'הוסף הערה'}</span>
            </button>

          </div>

          {/* Expanded Executive Summary Drawer */}
          {isSummaryExpanded && (
            <div className="mt-3 p-3.5 rounded-xl bg-slate-950/90 border border-indigo-500/40 space-y-2.5 animate-fadeIn text-xs text-right">
              <div className="font-extrabold text-indigo-300 flex items-center gap-1.5 border-b border-slate-800 pb-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>השורה התחתונה לבחינת המומחיות:</span>
              </div>
              <p className="text-slate-200 font-medium leading-relaxed">
                {summary.bottomLine}
              </p>
              
              <div className="space-y-1">
                <div className="font-bold text-slate-400 text-[11px]">3 נקודות מפתח שחובה לזכור:</div>
                <ul className="list-disc list-inside text-slate-300 space-y-1 pr-1">
                  {summary.keyPoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-1 text-[11px] text-emerald-300 font-semibold flex items-center gap-1">
                <span>💡 דגש קליני:</span>
                <span>{summary.clinicalTakeaway}</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
