import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  ExternalLink, 
  Brain, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';
import type { UserState } from '../types';
import { VertucciSchemaSVG } from '../data/visualSchemas';

interface FlashcardsViewProps {
  userState: UserState;
  rateFlashcard: (cardId: number, rating: 'easy' | 'medium' | 'hard') => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  userState,
  rateFlashcard,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isHighYieldOnly, setIsHighYieldOnly] = useState<boolean>(false);

  const categories = useMemo(() => {
    const set = new Set(flashcardsData.map(f => f.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredCards = useMemo(() => {
    let list = flashcardsData;
    if (isHighYieldOnly) {
      list = list.filter(f => f.isHighYield);
    }
    if (selectedCategory !== 'all') {
      list = list.filter(f => f.category === selectedCategory);
    }
    return list;
  }, [selectedCategory, isHighYieldOnly]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % (filteredCards.length || 1));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + (filteredCards.length || 1)) % (filteredCards.length || 1));
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;
    rateFlashcard(currentCard.id, rating);
    handleNext();
  };

  const ratedCount = Object.keys(userState.flashcardProgress || {}).length;
  const progressPercent = Math.round((ratedCount / flashcardsData.length) * 100);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <Brain className="w-4 h-4 text-cyan-400" />
              <span>שינון וחזרה מרווחת 266 כרטיסיות (Spaced Repetition)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">כרטיסיות זהב - 266 מאמרי הליבה</h2>
          </div>

          {/* Category & High Yield Filters */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 focus:outline-none font-semibold"
            >
              <option value="all">כל הנושאים ({flashcardsData.length} כרטיסיות)</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <button
              onClick={() => {
                setIsHighYieldOnly(!isHighYieldOnly);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isHighYieldOnly
                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>🔥 High-Yield בלבד</span>
            </button>
          </div>
        </div>

        {/* Overall Flashcards Progress Bar */}
        <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400">התקדמות שינון בדק:</span>
          <span className="text-cyan-400 font-bold">{ratedCount} מתוך {flashcardsData.length} שוננו ({progressPercent}%)</span>
        </div>
      </div>

      {/* Main Flashcard Interactive Display */}
      {currentCard ? (
        <div className="space-y-4">
          
          {/* Card Component */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className={`cursor-pointer transition-all duration-500 min-h-[320px] rounded-3xl p-8 border flex flex-col justify-between relative shadow-2xl ${
              isFlipped
                ? 'bg-slate-900 border-indigo-500/50 shadow-indigo-500/10'
                : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
            }`}
          >
            {/* Card Header Info */}
            <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono font-bold">
                  #{currentCard.id}
                </span>
                <span className="text-slate-400 font-semibold">{currentCard.category}</span>
                {currentCard.isHighYield && (
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                    🔥 High-Yield
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <RotateCw className="w-3.5 h-3.5 text-cyan-400 animate-spin-slow" />
                <span>לחץ על הכרטיס להיפוך</span>
              </div>
            </div>

            {/* Front or Back Content */}
            {!isFlipped ? (
              /* Front (Question) */
              <div className="py-8 space-y-4">
                <div className="text-xs text-cyan-400 font-bold uppercase tracking-wider">שאלה / מקרה קליני:</div>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-relaxed">
                  {currentCard.question}
                </h3>
              </div>
            ) : (
              /* Back (Answer & Takeaway) */
              <div className="py-6 space-y-4 animate-fadeIn">
                <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider">תשובה וסיכום קליני:</div>
                <p className="text-base text-slate-200 leading-relaxed font-medium">
                  {currentCard.answer}
                </p>

                {/* Visual Schema if applicable */}
                {currentCard.category === 'Tooth Morphology' && (
                  <VertucciSchemaSVG />
                )}

                <div className="p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 text-xs space-y-1">
                  <div className="font-bold text-amber-300">💡 Clinical Takeaway לבחינה:</div>
                  <p className="text-slate-300">{currentCard.keyTakeaway}</p>
                  {currentCard.paperCitation && (
                    <div className="text-[10px] text-indigo-300 font-mono pt-1">
                      📚 {currentCard.paperCitation}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Card Footer */}
            <div className="flex items-center justify-between text-xs border-t border-slate-800 pt-3 text-slate-400">
              <span>כרטיסייה {currentIndex + 1} מתוך {filteredCards.length}</span>
              {currentCard.pubMedUrl && (
                <a 
                  href={currentCard.pubMedUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1 text-cyan-400 hover:underline text-[11px]"
                >
                  <span>PubMed</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>

          {/* Rating & Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>הקודם</span>
            </button>

            {/* Self-Rating Buttons for Spaced Repetition */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRate('hard')}
                className="px-3.5 py-2 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 text-xs font-bold transition"
              >
                קשה 🔴
              </button>
              <button
                onClick={() => handleRate('medium')}
                className="px-3.5 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 text-xs font-bold transition"
              >
                בינוני 🟡
              </button>
              <button
                onClick={() => handleRate('easy')}
                className="px-3.5 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition"
              >
                קל 🟢
              </button>
            </div>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-1"
            >
              <span>הבא</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

        </div>
      ) : null}

    </div>
  );
};
