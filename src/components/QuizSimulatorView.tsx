import React, { useState, useMemo } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw,
  AlertTriangle,
  BarChart2,
  Filter,
  Target,
  Sparkles
} from 'lucide-react';
import { quizQuestionsData } from '../data/quizData';
import type { UserState } from '../types';

interface QuizSimulatorViewProps {
  userState: UserState;
  recordQuizScore: (score: number, total: number) => void;
  recordQuestionAttempt: (questionId: number, isCorrect: boolean, category: string, selectedIndex: number) => void;
}

export const QuizSimulatorView: React.FC<QuizSimulatorViewProps> = ({
  userState,
  recordQuizScore,
  recordQuestionAttempt,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyMissed, setOnlyMissed] = useState<boolean>(false);
  
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const missedSet = useMemo(() => new Set(userState.missedQuestionIds || []), [userState.missedQuestionIds]);

  const categories = useMemo(() => {
    const set = new Set(quizQuestionsData.map(q => q.category));
    return ['all', ...Array.from(set)];
  }, []);

  const activeQuestions = useMemo(() => {
    let list = quizQuestionsData;
    if (onlyMissed) {
      list = list.filter(q => missedSet.has(q.id));
      if (list.length === 0) list = quizQuestionsData; // fallback if no missed questions
    }
    if (selectedCategory !== 'all') {
      list = list.filter(q => q.category === selectedCategory);
    }
    return list;
  }, [selectedCategory, onlyMissed, missedSet]);

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion || submittedAnswers[currentQuestion.id]) return;
    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;
    const selected = selectedAnswers[currentQuestion.id];
    if (selected === undefined) return;

    const isCorrect = selected === currentQuestion.correctOptionIndex;
    setSubmittedAnswers(prev => ({ ...prev, [currentQuestion.id]: true }));

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    recordQuestionAttempt(currentQuestion.id, isCorrect, currentQuestion.category, selected);
  };

  const handleNextQuestion = () => {
    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
      recordQuizScore(score, activeQuestions.length);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setIsCompleted(false);
    setScore(0);
  };

  // Compute Category Analytics from quizHistory
  const categoryAnalytics = useMemo(() => {
    const history = userState.quizHistory || [];
    const stats: Record<string, { total: number; correct: number }> = {};

    history.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = { total: 0, correct: 0 };
      }
      stats[item.category].total += 1;
      if (item.isCorrect) stats[item.category].correct += 1;
    });

    return Object.entries(stats).map(([cat, data]) => ({
      category: cat,
      total: data.total,
      correct: data.correct,
      percentage: Math.round((data.correct / data.total) * 100)
    }));
  }, [userState.quizHistory]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>סימולטור שאלות בחינה לבחינת שלב א' באנדודונטיה</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">בנק שאלות וניתוח טעויות שוטף</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              תרגול שאלות אמריקאיות קלאסיות ברמת בחינת המומחיות, מלוות בניתוח נקודות תורפה וקישורים ישירים לספרות המקור.
            </p>
          </div>

          {/* Overall Quiz Stats Counter */}
          <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
            <div className="text-right">
              <div className="text-[10px] text-slate-400">שאלות לחיזוק (טעויות)</div>
              <div className="text-sm font-extrabold text-rose-400">{missedSet.size} שאלות</div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center">
              <AlertTriangle className="w-4.5 h-4.5 text-rose-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Mode Selection Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 bg-slate-950/70 rounded-2xl border border-slate-800">
        
        {/* Category Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 flex-shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                handleRestart();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md font-bold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {cat === 'all' ? 'כל השאלות' : cat}
            </button>
          ))}
        </div>

        {/* Missed Questions Queue Switch */}
        <button
          onClick={() => {
            setOnlyMissed(!onlyMissed);
            handleRestart();
          }}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
            onlyMissed
              ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 shadow-md'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Target className="w-3.5 h-3.5 text-rose-400" />
          <span>תרגול טעויות בלבד ({missedSet.size})</span>
        </button>
      </div>

      {/* Category Weak Spot Diagnostics Card (If user has history) */}
      {categoryAnalytics.length > 0 && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 bg-slate-900/60 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
            <h4 className="text-xs font-extrabold text-indigo-300 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              <span>ניתוח אחוזי הצלחה לפי נושאים (Weak Spot Diagnosis)</span>
            </h4>
            <span className="text-[10px] text-slate-400">בוצעו {userState.quizHistory?.length || 0} תשובות</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoryAnalytics.map(stat => (
              <div key={stat.category} className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-200">{stat.category}</span>
                  <span className={`font-mono font-extrabold ${
                    stat.percentage >= 80 ? 'text-emerald-400' :
                    stat.percentage >= 60 ? 'text-amber-400' : 'text-rose-400'
                  }`}>
                    {stat.percentage}%
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${
                      stat.percentage >= 80 ? 'bg-emerald-500' :
                      stat.percentage >= 60 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${stat.percentage}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between">
                  <span>נכון: {stat.correct}/{stat.total}</span>
                  {stat.percentage < 65 && <span className="text-rose-400 font-semibold">⚠️ דרוש חזרה</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Question Simulation Box */}
      {!isCompleted && currentQuestion ? (
        <div className="space-y-5 max-w-3xl mx-auto">
          
          {/* Question Counter Header */}
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-indigo-400 bg-indigo-950/60 px-3 py-1 rounded-full border border-indigo-500/20">
              {currentQuestion.category}
            </span>
            <span>שאלה {currentIndex + 1} מתוך {activeQuestions.length}</span>
          </div>

          {/* Question Card */}
          <div className="glass-card rounded-3xl border border-slate-700/80 p-6 sm:p-8 space-y-6 shadow-2xl bg-slate-900/90">
            <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed">
              {currentQuestion.question}
            </h3>

            {/* Answer Options Grid */}
            <div className="space-y-3">
              {currentQuestion.options.map((optionText, optIdx) => {
                const isSelected = selectedAnswers[currentQuestion.id] === optIdx;
                const isSubmitted = submittedAnswers[currentQuestion.id];
                const isCorrectOption = optIdx === currentQuestion.correctOptionIndex;

                let btnStyle = "border-slate-800 bg-slate-950/60 text-slate-200 hover:border-slate-700";
                if (isSubmitted) {
                  if (isCorrectOption) {
                    btnStyle = "border-emerald-500/60 bg-emerald-950/80 text-emerald-200 font-bold";
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle = "border-rose-500/60 bg-rose-950/80 text-rose-200 font-bold";
                  } else {
                    btnStyle = "border-slate-800 bg-slate-950/40 text-slate-500 opacity-60";
                  }
                } else if (isSelected) {
                  btnStyle = "border-indigo-500 bg-indigo-950/80 text-white font-bold shadow-md shadow-indigo-600/20";
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-right p-4 rounded-2xl border text-sm font-medium transition flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <span className="leading-relaxed">{optionText}</span>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {isSubmitted && isCorrectOption && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      )}
                      {isSubmitted && isSelected && !isCorrectOption && (
                        <XCircle className="w-5 h-5 text-rose-400" />
                      )}
                      {!isSubmitted && (
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono ${
                          isSelected ? 'border-indigo-400 bg-indigo-600 text-white' : 'border-slate-700 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Explanation & Literature Reference (Shown after submit) */}
            {submittedAnswers[currentQuestion.id] && (
              <div className="p-5 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                  <span className="font-bold text-indigo-300 text-xs flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>הסבר לימודי וציטוט הספרות</span>
                  </span>
                  <span className="text-[11px] font-mono text-cyan-300">{currentQuestion.paperReference}</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800">
              {!submittedAnswers[currentQuestion.id] ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm transition shadow-lg shadow-indigo-600/30 disabled:opacity-40"
                >
                  בדיקת תשובה ➔
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2"
                >
                  <span>{currentIndex < activeQuestions.length - 1 ? 'לשאלה הבאה ➔' : 'סיום הסימולציה וקבלת ציון 🏆'}</span>
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        /* Completion Score Screen */
        <div className="glass-card rounded-3xl p-8 border border-slate-700 text-center space-y-6 max-w-xl mx-auto bg-slate-900/90 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 text-amber-400 mx-auto flex items-center justify-center">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-black text-white">כל הכבוד! הסימולציה הושלמה</h3>
            <p className="text-xs text-slate-300">התוצאה תועדה במערכת ותשפיע על ניתוח נקודות התורפה שלך.</p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 inline-block w-full">
            <div className="text-xs text-slate-400">ציון סופי</div>
            <div className="text-4xl font-black text-indigo-400 my-1">
              {score} / {activeQuestions.length} ({Math.round((score / activeQuestions.length) * 100)}%)
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleRestart}
              className="flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>התחל סימולציה חדשה</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
