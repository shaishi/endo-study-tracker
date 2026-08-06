import React, { useState, useMemo, useEffect } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Award, 
  RotateCcw,
  AlertTriangle,
  Filter,
  Sparkles,
  Timer,
  Flag,
  ChevronRight,
  ChevronLeft,
  FileCheck,
  Zap
} from 'lucide-react';
import { quizQuestionsData } from '../data/quizData';
import type { UserState } from '../types';
import { VertucciSchemaSVG, DummerApicalConstrictionSVG } from '../data/visualSchemas';

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
  const [examMode, setExamMode] = useState<'practice' | 'mock'>('practice');
  const [mockQuestionCount, setMockQuestionCount] = useState<number>(25);
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [onlyMissed, setOnlyMissed] = useState<boolean>(false);
  const [isRapidFire, setIsRapidFire] = useState<boolean>(false);
  const [isHighYieldOnly, setIsHighYieldOnly] = useState<boolean>(false);

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<number, boolean>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // Mock Exam Timer
  const [timeLeftSeconds, setTimeLeftSeconds] = useState<number>(mockQuestionCount * 90); // 1.5 min per question
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const missedSet = useMemo(() => new Set(userState.missedQuestionIds || []), [userState.missedQuestionIds]);

  const categories = useMemo(() => {
    const set = new Set(quizQuestionsData.map(q => q.category));
    return ['all', ...Array.from(set)];
  }, []);

  const activeQuestions = useMemo(() => {
    let list = quizQuestionsData;
    
    if (examMode === 'mock') {
      return list.slice(0, mockQuestionCount);
    }

    if (onlyMissed) {
      list = list.filter(q => missedSet.has(q.id));
      if (list.length === 0) list = quizQuestionsData;
    }
    if (isHighYieldOnly) {
      list = list.filter(q => q.isHighYield);
    }
    if (selectedCategory !== 'all') {
      list = list.filter(q => q.category === selectedCategory);
    }
    if (isRapidFire) {
      list = list.slice(0, 5);
    }
    return list;
  }, [examMode, mockQuestionCount, selectedCategory, onlyMissed, isRapidFire, isHighYieldOnly, missedSet]);

  const currentQuestion = activeQuestions[currentIndex] || activeQuestions[0];

  // Timer Effect for Mock Exam
  useEffect(() => {
    let interval: any = null;
    if (examMode === 'mock' && isTimerRunning && timeLeftSeconds > 0 && !isCompleted) {
      interval = setInterval(() => {
        setTimeLeftSeconds(prev => {
          if (prev <= 1) {
            handleFinalSubmitMockExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [examMode, isTimerRunning, timeLeftSeconds, isCompleted]);

  const handleStartMockExam = (count: number) => {
    setExamMode('mock');
    setMockQuestionCount(count);
    setTimeLeftSeconds(count * 90);
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setFlaggedQuestions({});
    setIsCompleted(false);
    setIsTimerRunning(true);
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!currentQuestion) return;
    if (examMode === 'practice' && submittedAnswers[currentQuestion.id]) return;

    setSelectedAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
  };

  const handleSubmitPracticeAnswer = () => {
    if (!currentQuestion) return;
    const selected = selectedAnswers[currentQuestion.id];
    if (selected === undefined) return;

    const isCorrect = selected === currentQuestion.correctOptionIndex;
    setSubmittedAnswers(prev => ({ ...prev, [currentQuestion.id]: true }));
    recordQuestionAttempt(currentQuestion.id, isCorrect, currentQuestion.category, selected);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleToggleFlag = (questionId: number) => {
    setFlaggedQuestions(prev => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleFinalSubmitMockExam = () => {
    setIsTimerRunning(false);
    let finalScore = 0;
    activeQuestions.forEach(q => {
      const selected = selectedAnswers[q.id];
      const isCorrect = selected === q.correctOptionIndex;
      if (selected !== undefined) {
        recordQuestionAttempt(q.id, isCorrect, q.category, selected);
      }
      if (isCorrect) {
        finalScore++;
      }
    });

    setScore(finalScore);
    recordQuizScore(finalScore, activeQuestions.length);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setSubmittedAnswers({});
    setFlaggedQuestions({});
    setIsCompleted(false);
    setScore(0);
    if (examMode === 'mock') {
      setTimeLeftSeconds(mockQuestionCount * 90);
      setIsTimerRunning(true);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>סימולטור שאלות ומבחנים דמויים (Board Exam Simulator)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">סימולטור שאלות לבחינת המומחיות</h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              מאגר שאלות קליניות רב-ברירתיות עם הסברים מפורטים וציטוטים למאמרי הליבה.
            </p>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center gap-2 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                setExamMode('practice');
                setIsCompleted(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                examMode === 'practice'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              תרגול חופשי 🎯
            </button>

            <button
              onClick={() => handleStartMockExam(25)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                examMode === 'mock'
                  ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-black shadow-md'
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <Timer className="w-3.5 h-3.5" />
              <span>מבחן מדומה מלא ⏱️</span>
            </button>
          </div>
        </div>

        {/* Filters Toolbar (Practice Mode) */}
        {examMode === 'practice' && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-indigo-400" />
              <span>סינון:</span>
            </span>

            {/* Category Selector */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setCurrentIndex(0);
              }}
              className="bg-slate-800 border border-slate-700 text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-indigo-500 font-semibold"
            >
              <option value="all">כל הנושאים ({quizQuestionsData.length} שאלות)</option>
              {categories.filter(c => c !== 'all').map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Missed Questions Toggle */}
            <button
              onClick={() => {
                setOnlyMissed(!onlyMissed);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                onlyMissed
                  ? 'bg-rose-950 border-rose-500 text-rose-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span>שאלות לחיזוק ({userState.missedQuestionIds?.length || 0})</span>
            </button>

            {/* Rapid Fire 5-Questions Toggle */}
            <button
              onClick={() => {
                setIsRapidFire(!isRapidFire);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 ${
                isRapidFire
                  ? 'bg-cyan-950 border-cyan-500 text-cyan-300'
                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>בחינת 5 שאלות מהירה</span>
            </button>

            {/* High-Yield Only Toggle */}
            <button
              onClick={() => {
                setIsHighYieldOnly(!isHighYieldOnly);
                setCurrentIndex(0);
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
        )}

        {/* Mock Exam Controls Bar */}
        {examMode === 'mock' && !isCompleted && (
          <div className="mt-5 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-300 font-bold">אורך מבחן:</span>
              {[25, 50, 100].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => handleStartMockExam(cnt)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition ${
                    mockQuestionCount === cnt
                      ? 'bg-amber-500 text-slate-950 border-amber-400'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  {cnt} שאלות
                </button>
              ))}
            </div>

            {/* Countdown Clock Display */}
            <div className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-2xl border border-rose-500/30 text-rose-400 font-mono font-bold text-sm">
              <Timer className="w-4 h-4 animate-pulse text-rose-500" />
              <span>זמן נותר: {formatTimer(timeLeftSeconds)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Main Exam Interface / Results */}
      {isCompleted ? (
        /* End-of-Exam Summary Screen */
        <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 bg-slate-900/90 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto">
            <FileCheck className="w-8 h-8 text-emerald-400" />
          </div>

          <h3 className="text-2xl font-black text-white">סיימת את המבחן!</h3>

          <div className="inline-block p-6 rounded-3xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="text-4xl font-black text-emerald-400">
              {Math.round((score / (activeQuestions.length || 1)) * 100)}%
            </div>
            <div className="text-xs text-slate-300 font-bold">
              ענית נכון על {score} מתוך {activeQuestions.length} שאלות
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={handleReset}
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>בצע מבחן נוסף</span>
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        /* Question Card Interface */
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 bg-slate-900/90 space-y-6 relative">
          
          {/* Question Card Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-mono font-bold">
                שאלה {currentIndex + 1} מתוך {activeQuestions.length}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold">
                {currentQuestion.category}
              </span>
              {currentQuestion.isHighYield && (
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold">
                  🔥 High-Yield
                </span>
              )}
            </div>

            {/* Flag for review button */}
            <button
              onClick={() => handleToggleFlag(currentQuestion.id)}
              className={`p-2 rounded-xl border transition ${
                flaggedQuestions[currentQuestion.id]
                  ? 'bg-rose-950 border-rose-500 text-rose-400'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="סמן שאלה לעיון שוב"
            >
              <Flag className="w-4 h-4" />
            </button>
          </div>

          {/* Question Text */}
          <h3 className="text-lg sm:text-xl font-black text-white leading-relaxed">
            {currentQuestion.question}
          </h3>

          {/* Visual Diagrams (Tooth Morphology & Schemas) */}
          {currentQuestion.category === 'Tooth Morphology' && currentQuestion.id !== 1 && (
            <VertucciSchemaSVG />
          )}

          {(currentQuestion.id === 1 || currentQuestion.question.includes('Constriction')) && (
            <DummerApicalConstrictionSVG />
          )}

          {/* Options Grid */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map((optionText, idx) => {
              const isSelected = selectedAnswers[currentQuestion.id] === idx;
              const isSubmitted = submittedAnswers[currentQuestion.id];
              const isCorrectOption = idx === currentQuestion.correctOptionIndex;

              let optionStyle = 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800/80';
              if (examMode === 'practice' && isSubmitted) {
                if (isCorrectOption) {
                  optionStyle = 'bg-emerald-950/90 border-emerald-500/80 text-emerald-200 font-bold';
                } else if (isSelected) {
                  optionStyle = 'bg-rose-950/90 border-rose-500/80 text-rose-200';
                }
              } else if (isSelected) {
                optionStyle = 'bg-indigo-950 border-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-right p-4 rounded-2xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{optionText}</span>
                  </div>

                  {examMode === 'practice' && isSubmitted && (
                    <div>
                      {isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                      {isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-400" />}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Practice Mode Submit & Explanation */}
          {examMode === 'practice' && (
            <div className="pt-4 border-t border-slate-800 space-y-4">
              {!submittedAnswers[currentQuestion.id] ? (
                <button
                  onClick={handleSubmitPracticeAnswer}
                  disabled={selectedAnswers[currentQuestion.id] === undefined}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-extrabold text-xs transition shadow-lg shadow-indigo-600/20"
                >
                  בדוק תשובה
                </button>
              ) : (
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 animate-fadeIn text-xs">
                  <div className="font-bold text-indigo-300">💡 הסבר קליני וציטוט:</div>
                  <p className="text-slate-300 leading-relaxed">{currentQuestion.explanation}</p>
                  <div className="text-[11px] text-amber-300 font-mono pt-1">
                    📚 מקור: {currentQuestion.paperReference}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom Navigation Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-bold transition flex items-center gap-1"
            >
              <ChevronRight className="w-4 h-4" />
              <span>הקודם</span>
            </button>

            {examMode === 'mock' && currentIndex === activeQuestions.length - 1 ? (
              <button
                onClick={handleFinalSubmitMockExam}
                className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold transition shadow-lg shadow-emerald-600/30"
              >
                הגש מבחן מדומה 🚀
              </button>
            ) : (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(activeQuestions.length - 1, prev + 1))}
                disabled={currentIndex === activeQuestions.length - 1}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white font-bold transition flex items-center gap-1"
              >
                <span>הבא</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      ) : null}

    </div>
  );
};
