import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw
} from 'lucide-react';
import { quizQuestionsData } from '../data/quizData';
import type { UserState } from '../types';

interface QuizSimulatorViewProps {
  userState: UserState;
  recordQuizScore: (score: number, total: number) => void;
}

export const QuizSimulatorView: React.FC<QuizSimulatorViewProps> = ({
  recordQuizScore,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const currentQuestion = quizQuestionsData[currentIndex];

  const handleSelect = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    quizQuestionsData.forEach(q => {
      if (selectedAnswers[q.id] === q.correctOptionIndex) {
        correct++;
      }
    });
    return correct;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    recordQuizScore(score, quizQuestionsData.length);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
  };

  const score = calculateScore();
  const percentage = Math.round((score / quizQuestionsData.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-indigo-950/70 to-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>סימולטור בחינת שלב א' באנדודונטיה</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">תרגול שאלות בחינה והערכה עצמית</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              שאלות במתכונת בחינת המומחיות. ענה על השאלות וקבל ניתוח תשובות מיידי עם ציטוט המאמרים הרלוונטיים.
            </p>
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
              <div className="text-xs text-slate-400">ציון סופי</div>
              <div className="text-2xl font-extrabold text-indigo-400">{score} / {quizQuestionsData.length} ({percentage}%)</div>
            </div>
          )}
        </div>
      </div>

      {/* Main Quiz Card */}
      {!isSubmitted ? (
        <div className="max-w-3xl mx-auto space-y-6">
          
          {/* Progress & Question Counter */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-indigo-400">שאלה {currentIndex + 1} מתוך {quizQuestionsData.length}</span>
            <span className="font-semibold">{currentQuestion.category}</span>
          </div>

          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-700/80 bg-slate-900/80 space-y-6 shadow-xl">
            <h3 className="text-lg sm:text-xl font-bold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelect(idx)}
                    className={`w-full text-right p-4 rounded-2xl border text-sm font-semibold transition flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-800/50 border-slate-700/70 text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentIndex === 0}
                onClick={() => setCurrentIndex(prev => prev - 1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-300 disabled:opacity-40"
              >
                ← שאלה קודמת
              </button>

              {currentIndex === quizQuestionsData.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30"
                >
                  הגש מבחן וצפה בתוצאות ✨
                </button>
              ) : (
                <button
                  onClick={() => setCurrentIndex(prev => prev + 1)}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
                >
                  שאלה הבאה ←
                </button>
              )}
            </div>
          </div>

        </div>
      ) : (
        /* Results & Review Screen */
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="glass-card rounded-3xl p-8 border border-slate-700 text-center space-y-4 bg-slate-900/90">
            <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
              <Award className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">סיכום תוצאות המבחן</h3>
            <p className="text-slate-300 text-sm">
              ענית נכון על <strong className="text-indigo-400">{score}</strong> מתוך <strong className="text-slate-200">{quizQuestionsData.length}</strong> שאלות ({percentage}%).
            </p>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>התחל מבחן חדש</span>
            </button>
          </div>

          {/* Breakdown of each question */}
          <div className="space-y-4">
            <h4 className="text-lg font-extrabold text-white">פירוט תשובות והסברים:</h4>

            {quizQuestionsData.map((q, i) => {
              const userAnswer = selectedAnswers[q.id];
              const isCorrect = userAnswer === q.correctOptionIndex;

              return (
                <div key={q.id} className={`p-6 rounded-2xl border space-y-3 ${
                  isCorrect ? 'bg-emerald-950/20 border-emerald-500/30' : 'bg-rose-950/20 border-rose-500/30'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">שאלה {i + 1}: {q.category}</span>
                    <span className={`flex items-center gap-1 text-xs font-bold ${
                      isCorrect ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {isCorrect ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                      <span>{isCorrect ? 'נכון' : 'שגיאה'}</span>
                    </span>
                  </div>

                  <p className="font-bold text-white text-sm">{q.question}</p>

                  <div className="text-xs text-slate-300 space-y-1">
                    <div>תשובתך: <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{q.options[userAnswer] || 'לא נענה'}</span></div>
                    {!isCorrect && (
                      <div>תשובה נכונה: <span className="text-emerald-400 font-bold">{q.options[q.correctOptionIndex]}</span></div>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <div className="font-bold text-indigo-300">הסבר וציטוט:</div>
                    <p>{q.explanation}</p>
                    <div className="text-[11px] text-slate-400 citation-text pt-1">📖 {q.paperReference}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
