import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  X, 
  Sparkles, 
  Coffee,
  Brain
} from 'lucide-react';

interface FocusTimerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FocusTimerModal: React.FC<FocusTimerModalProps> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<'focus' | 'shortBreak' | 'longBreak'>('focus');
  const [timeLeft, setTimeLeft] = useState<number>(25 * 60); // 25 minutes
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [sessionsCompleted, setSessionsCompleted] = useState<number>(0);

  // Timer mode durations in seconds
  const modeDurations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60
  };

  useEffect(() => {
    let timer: any = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'focus') {
        setSessionsCompleted(prev => prev + 1);
        alert('🎉 זמן הפוקוס הסתיים! קח 5 דקות הפסקה לרענון.');
        setMode('shortBreak');
        setTimeLeft(modeDurations.shortBreak);
      } else {
        alert('🔔 ההפסקה הסתיימה! מוכן לסשן הפוקוס הבא?');
        setMode('focus');
        setTimeLeft(modeDurations.focus);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft, mode]);

  if (!isOpen) return null;

  const handleSwitchMode = (newMode: 'focus' | 'shortBreak' | 'longBreak') => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(modeDurations[newMode]);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(modeDurations[mode]);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  const progressPercent = Math.round(((modeDurations[mode] - timeLeft) / modeDurations[mode]) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="glass-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-700/80 bg-slate-900/95 space-y-6 shadow-2xl relative text-right">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute left-5 top-5 text-slate-400 hover:text-white p-1 rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Timer className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-white">טיימר פוקוס פומודורו (Pomodoro)</h3>
            <p className="text-xs text-slate-400">25 דקות קריאה ממוקדת ללא הסחות דעת</p>
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 bg-slate-950/80 rounded-2xl border border-slate-800">
          <button
            onClick={() => handleSwitchMode('focus')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'focus' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>פוקוס (25ד)</span>
          </button>

          <button
            onClick={() => handleSwitchMode('shortBreak')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>הפסקה קצרה (5ד)</span>
          </button>

          <button
            onClick={() => handleSwitchMode('longBreak')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
              mode === 'longBreak' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>הפסקה ארוכה (15ד)</span>
          </button>
        </div>

        {/* Clock Countdown Display */}
        <div className="text-center py-6 space-y-4">
          <div className="text-6xl font-black text-white font-mono tracking-wider drop-shadow-lg">
            {formattedTime}
          </div>

          {/* Circular/Linear Progress Bar */}
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden max-w-xs mx-auto">
            <div 
              className={`h-2 rounded-full transition-all duration-1000 ${
                mode === 'focus' ? 'bg-indigo-500' : mode === 'shortBreak' ? 'bg-emerald-500' : 'bg-cyan-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3.5 rounded-2xl font-extrabold text-sm transition shadow-lg flex items-center justify-center gap-2 ${
              isRunning
                ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>השהה טיימר</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>התחל פוקוס</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition border border-slate-700"
            title="איפוס טיימר"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Session Stats */}
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>סשנים שהושלמו היום:</span>
          </span>
          <span className="font-mono font-bold text-indigo-400">{sessionsCompleted} סשנים</span>
        </div>

      </div>
    </div>
  );
};
