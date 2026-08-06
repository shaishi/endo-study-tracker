import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ExternalLink, Bookmark, CheckCircle2, Circle, MessageSquare } from 'lucide-react';
import type { EndoData, UserState } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EndoData;
  userState: UserState;
  toggleLiteratureItem: (id: number) => void;
  toggleReviewFlag: (id: number) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  data,
  userState,
  toggleLiteratureItem,
  toggleReviewFlag,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open search
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? data.literature.filter(item => {
        const q = query.toLowerCase();
        return (
          item.citation.toLowerCase().includes(q) ||
          (item.category && item.category.toLowerCase().includes(q)) ||
          String(item.id) === q ||
          (userState.notes[item.id] || '').toLowerCase().includes(q)
        );
      }).slice(0, 20)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-slate-950/80 backdrop-blur-md">
      <div className="glass-card bg-slate-900 border-slate-700 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-0 text-right">
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-indigo-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="חפש בכל 266 המאמרים וההנחיות (לפי מחבר, כותרת, נושא, ID)..."
            className="w-full bg-transparent text-white placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              הקלד למעלה כדי להתחיל לחפש בספרות החובה...
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              לא נמצאו תוצאות עבור "{query}"
            </div>
          ) : (
            results.map((item) => {
              const isDone = userState.completedItemIds.includes(item.id);
              const isReviewFlagged = userState.reviewItemIds.includes(item.id);
              const noteText = userState.notes[item.id];

              return (
                <div
                  key={item.id}
                  className="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <button
                      onClick={() => toggleLiteratureItem(item.id)}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-indigo-400"
                    >
                      {isDone ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-400/20" />
                      ) : (
                        <Circle className="w-5 h-5" />
                      )}
                    </button>

                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-700">
                          #{item.id}
                        </span>
                        <span className="text-[10px] text-indigo-300 bg-indigo-950 px-1.5 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                      <div className="citation-text text-xs font-semibold text-slate-200 leading-snug">
                        {item.citation}
                      </div>
                      {noteText && (
                        <div className="text-[11px] text-amber-300/90 bg-slate-900/80 p-1.5 rounded flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-amber-400 shrink-0" />
                          <span>{noteText}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => toggleReviewFlag(item.id)}
                      className={`p-1.5 rounded-lg transition ${
                        isReviewFlagged ? 'text-amber-400 bg-amber-500/20' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isReviewFlagged ? 'fill-amber-400' : ''}`} />
                    </button>

                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg text-indigo-300 hover:text-indigo-200 hover:bg-slate-700/60"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
