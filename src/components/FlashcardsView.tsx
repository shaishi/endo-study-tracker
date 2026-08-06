import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle, 
  ExternalLink, 
  Brain, 
  ChevronRight, 
  ChevronLeft,
  Flame
} from 'lucide-react';
import { flashcardsData } from '../data/flashcardsData';
import type { UserState } from '../types';

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

  const categories = useMemo(() => {
    const set = new Set(flashcardsData.map(f => f.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredCards = useMemo(() => {
    if (selectedCategory === 'all') return flashcardsData;
    return flashcardsData.filter(f => f.category === selectedCategory);
  }, [selectedCategory]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleRate = (rating: 'easy' | 'medium' | 'hard') => {
    if (!currentCard) return;
    rateFlashcard(currentCard.id, rating);
    handleNext();
  };

  const currentRating = userState.flashcardProgress?.[currentCard?.id];
  const ratedCount = Object.keys(userState.flashcardProgress || {}).length;
  const progressPercent = Math.round((ratedCount / flashcardsData.length) * 100);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-indigo-900/60 via-slate-900/80 to-slate-900/90 relative overflow-hidden shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Brain className="w-4 h-4 text-indigo-400" />
              <span>חזרה פעילה (Active Recall & Spaced Repetition)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">כרטיסיות זהב לבחינה</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
              שאלות מפתח קלאסיות וממצאים מספריים שחוזרים בכל בחינת מומחיות. לחץ על הכרטיסייה לצפייה בתשובה!
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-3 rounded-2xl border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">התקדמות סקירה</div>
              <div className="text-sm font-extrabold text-indigo-400">{ratedCount} / {flashcardsData.length} ({progressPercent}%)</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center">
              <Flame className="w-4.5 h-4.5 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-950/60 rounded-2xl border border-slate-800/80">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {cat === 'all' ? 'כל הנושאים' : cat}
          </button>
        ))}
      </div>

      {/* Main Flashcard Container */}
      {currentCard && (
        <div className="max-w-2xl mx-auto space-y-5">
          
          {/* Card Counter & Category Badge */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              {currentCard.category}
            </span>
            <span>כרטיסייה {currentIndex + 1} מתוך {filteredCards.length}</span>
          </div>

          {/* Flashcard Box */}
          <div 
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[320px] w-full glass-card rounded-3xl border border-slate-700/80 p-6 sm:p-8 flex flex-col justify-between shadow-2xl transition-all duration-300 hover:border-indigo-500/40 relative overflow-hidden bg-slate-900/90"
          >
            {!isFlipped ? (
              /* Front Side: Question */
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-indigo-400" />
                    <span>שאלה לבחינה</span>
                  </span>
                  {currentRating && (
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-bold border ${
                      currentRating === 'easy' ? 'bg-emerald-950 text-emerald-300 border-emerald-500/30' :
                      currentRating === 'medium' ? 'bg-amber-950 text-amber-300 border-amber-500/30' :
                      'bg-rose-950 text-rose-300 border-rose-500/30'
                    }`}>
                      סומן כ: {currentRating === 'easy' ? 'קל' : currentRating === 'medium' ? 'בינוני' : 'קשה'}
                    </span>
                  )}
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed pt-2">
                  {currentCard.question}
                </h3>

                <div className="pt-8 text-center text-xs text-indigo-300 font-semibold flex items-center justify-center gap-2 animate-pulse">
                  <RotateCw className="w-4 h-4" />
                  <span>לחץ לצפייה בתשובה והסבר קליני</span>
                </div>
              </div>
            ) : (
              /* Back Side: Answer & Takeaway */
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>תשובה וממצא קליני</span>
                  </span>
                  {currentCard.paperCitation && (
                    <span className="text-[11px] text-slate-400 citation-text font-mono truncate max-w-[200px]">
                      {currentCard.paperCitation}
                    </span>
                  )}
                </div>

                <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed">
                  {currentCard.answer}
                </p>

                <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-1 text-xs">
                  <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>שורה תחתית לבחינה (Clinical Takeaway):</span>
                  </div>
                  <p className="text-slate-200 leading-relaxed font-medium">
                    {currentCard.keyTakeaway}
                  </p>
                </div>

                {currentCard.pubMedUrl && (
                  <a
                    href={currentCard.pubMedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1.5 text-xs text-cyan-400 hover:underline pt-1 citation-text"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>פתח מאמר מקור ב-PubMed</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Rating & Navigation Buttons */}
          <div className="space-y-3 pt-1">
            {isFlipped ? (
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-2.5">
                <div className="text-xs font-semibold text-slate-300">דרג את רמת הקושי לסקירה הבאה:</div>
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => handleRate('easy')}
                    className="py-2.5 px-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/40 text-emerald-300 font-bold text-xs transition"
                  >
                    🟢 קל (הבנתי)
                  </button>
                  <button
                    onClick={() => handleRate('medium')}
                    className="py-2.5 px-3 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/40 text-amber-300 font-bold text-xs transition"
                  >
                    🟡 בינוני (לחזור)
                  </button>
                  <button
                    onClick={() => handleRate('hard')}
                    className="py-2.5 px-3 rounded-xl bg-rose-950/80 hover:bg-rose-900 border border-rose-500/40 text-rose-300 font-bold text-xs transition"
                  >
                    🔴 קשה (מחר)
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-3">
                <button
                  onClick={handlePrev}
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition"
                >
                  <ChevronRight className="w-4 h-4" />
                  <span>הקודמת</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center gap-1.5 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
                >
                  <span>הבאה</span>
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};
