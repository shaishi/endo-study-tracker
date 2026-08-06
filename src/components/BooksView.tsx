import React, { useState } from 'react';
import { 
  Book, 
  ExternalLink, 
  Link, 
  Save,
  BookOpen
} from 'lucide-react';
import type { EndoData, UserState } from '../types';

interface BooksViewProps {
  data: EndoData;
  userState: UserState;
  updateBookDriveLink: (bookKey: string, link: string) => void;
}

export const BooksView: React.FC<BooksViewProps> = ({
  data,
  userState,
  updateBookDriveLink,
}) => {
  const [driveInputs, setDriveInputs] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    data.books.forEach(b => {
      initial[b.key] = userState.bookDriveLinks[b.key] || b.drive_link || '';
    });
    return initial;
  });

  const handleInputChange = (key: string, val: string) => {
    setDriveInputs(prev => ({ ...prev, [key]: val }));
  };

  const handleSaveLink = (key: string) => {
    const link = driveInputs[key] || '';
    updateBookDriveLink(key, link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/60">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <Book className="w-6 h-6 text-indigo-400" />
              <span>ספרי הליבה (7 ספרים)</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              ספרי היסוד לבחינה. הדבק קישור דרייב אישי לגישה מהירה מכל מכשיר
            </p>
          </div>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.books.map((book) => {
          // Calculate completion percentage based on weeks where this book is referenced
          const weeksReferenced = book.in_plan_weeks || [];
          const totalWeeks = weeksReferenced.length;
          
          let completedWeeks = 0;
          weeksReferenced.forEach(w => {
            if (userState.completedWeekChapters.includes(w)) {
              completedWeeks++;
            }
          });

          const percent = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;
          const currentSavedLink = userState.bookDriveLinks[book.key] || book.drive_link || '';

          return (
            <div
              key={book.key}
              className="glass-card glass-card-hover rounded-2xl p-5 border border-slate-700/60 bg-slate-800/50 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Priority & Status */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                    book.priority === 'עליונה'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/30'
                      : book.priority === 'גבוהה'
                      ? 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}>
                    עדיפות {book.priority}
                  </span>

                  <div className="flex items-center gap-1 text-xs font-semibold text-indigo-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{percent}% הושלמו בספרינט</span>
                  </div>
                </div>

                {/* Book Title */}
                <div>
                  <h3 className="text-lg font-bold text-white leading-tight">
                    {book.name}
                  </h3>
                  <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-1 items-center">
                    <span>מופיע בשבועות:</span>
                    {weeksReferenced.map(w => (
                      <span key={w} className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${
                        userState.completedWeekChapters.includes(w)
                          ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        שבוע {w}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700/40">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${percent}%` }}
                  ></div>
                </div>
              </div>

              {/* Drive Link Input Section */}
              <div className="pt-3 border-t border-slate-800 space-y-2">
                <label className="block text-[11px] font-semibold text-slate-400">
                  קישור אישי לקובץ הספר ב-Google Drive:
                </label>
                
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Link className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="url"
                      value={driveInputs[book.key] || ''}
                      onChange={(e) => handleInputChange(book.key, e.target.value)}
                      placeholder="הדבק קישור https://drive.google.com/..."
                      className="w-full bg-slate-900/90 border border-slate-700 rounded-xl pr-9 pl-3 py-2 text-xs text-white dir-ltr text-left focus:outline-none focus:border-indigo-500 transition"
                    />
                  </div>

                  <button
                    onClick={() => handleSaveLink(book.key)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition shrink-0 flex items-center gap-1"
                    title="שמור קישור"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">שמור</span>
                  </button>

                  {currentSavedLink && (
                    <a
                      href={currentSavedLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 hover:text-cyan-200 transition shrink-0"
                      title="פתח ספר ב-Drive"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
