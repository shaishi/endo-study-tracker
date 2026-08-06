import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Layers, 
  TestTube, 
  Bandage, 
  Pill, 
  CheckCircle2, 
  AlertTriangle,
  Info
} from 'lucide-react';

export const CheatSheetsView: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<'vertucci' | 'irrigants' | 'trauma' | 'antibiotics'>('vertucci');

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-indigo-950/60 to-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>טבלאות סיכום מרוכזות לבחינה (High-Yield Cheat Sheets)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">דפי נוסחאות וסיכומים מרוכזים</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              מרכז את כל הנתונים המספריים, הסיווגים, וההנחיות הקליניות של AAE / IADT במקום אחד לסקירה מהירה לפני הבחינה.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveSheet('vertucci')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'vertucci'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Layers className="w-4 h-4 text-indigo-300" />
          <span>🦷 סיווג אנטומיה (Vertucci)</span>
        </button>

        <button
          onClick={() => setActiveSheet('irrigants')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'irrigants'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <TestTube className="w-4 h-4 text-cyan-300" />
          <span>🧪 חומרי שטיפה וחבישה (Irrigants)</span>
        </button>

        <button
          onClick={() => setActiveSheet('trauma')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'trauma'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Bandage className="w-4 h-4 text-rose-300" />
          <span>🩹 הנחיות טראומה (AAE / IADT)</span>
        </button>

        <button
          onClick={() => setActiveSheet('antibiotics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'antibiotics'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700'
          }`}
        >
          <Pill className="w-4 h-4 text-emerald-300" />
          <span>💊 אנטיביוטיקה באנדודונטיה</span>
        </button>
      </div>

      {/* Sheet Content 1: Vertucci Classification */}
      {activeSheet === 'vertucci' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>סיווג אנטומיית תעלות שורש לפי Vertucci (1984)</span>
              </h3>
              <span className="text-xs text-slate-400 citation-text">Vertucci FJ (1984) Oral Surg 58:589-99</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {[
                { type: 'Type I', pattern: '1', desc: 'תעלה אחת בודדת מהלשכה ועד ה-Apex.' },
                { type: 'Type II', pattern: '2-1', desc: 'שתי תעלות יוצאות מהלשכה ומתמזגות לתעלה אחת ב-Apex.' },
                { type: 'Type III', pattern: '1-2-1', desc: 'תעלה אחת מתפצלת לשתיים וחוזרת להתמזג לתעלה אחת.' },
                { type: 'Type IV', pattern: '2', desc: 'שתי תעלות נפרדות לחלוטין מהלשכה ועד 2 נקבי Apex נפרדים.' },
                { type: 'Type V', pattern: '1-2', desc: 'תעלה אחת מתחילה מהלשכה ומתפצלת ל-2 נקבובים נפרדים ב-Apex.' },
                { type: 'Type VI', pattern: '2-1-2', desc: 'שתי תעלות מתמזגות במרכז השורש ומתפצלות שוב ב-Apex.' },
                { type: 'Type VII', pattern: '1-2-1-2', desc: 'תעלה אחת מתפצלת, מתמזגת, ומתפצלת שוב ל-2 נקבובים ב-Apex.' },
                { type: 'Type VIII', pattern: '3', desc: 'שלוש תעלות נפרדות לחלוטין באותו שורש מהלשכה ל-Apex.' },
              ].map((v) => (
                <div key={v.type} className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-indigo-400 text-sm">{v.type}</span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
                      {v.pattern}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">{v.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 text-xs text-slate-300 space-y-1.5 mt-4">
              <div className="font-bold text-indigo-300 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-indigo-400" />
                <span>נתוני מפתח שחייבים לזכור לבחינה:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-200">
                <li><strong>שן מולרית עליונה ראשונה (Maxillary 1st Molar):</strong> שכיחות MB2 נעה בין 55% ל-90% בכל המאמרים (Stropko 1999: 93% עם מיקרוסקופ).</li>
                <li><strong>שן פרמולרית מנדיבולרית ראשונה:</strong> כ-25% מהמקרים מכילים תעלה שנייה או פיצול אפילקלי.</li>
                <li><strong>שן חותכת מנדיבולרית (Mandibular Incisor):</strong> כ-40% מכילות שתי תעלות (מזיו-בוקאלית ולשונית) המתמזגות ברוב המקרים ל-Type II.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sheet Content 2: Irrigants */}
      {activeSheet === 'irrigants' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TestTube className="w-5 h-5 text-cyan-400" />
              <span>טבלת השוואת חומרי שטיפה וחבישה אנדודונטיים (Zehnder 2006)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">חומר שטיפה / חבישה</th>
                    <th className="p-3 font-bold">ריכוז מקובל</th>
                    <th className="p-3 font-bold">מנגנון פעולה מרכזי</th>
                    <th className="p-3 font-bold">המסת תמיסה אורגנית</th>
                    <th className="p-3 font-bold">הסרת Smear Layer</th>
                    <th className="p-3 font-bold">דגשים קליניים לבחינה</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">NaOCl (Sodium Hypochlorite)</td>
                    <td className="p-3 font-mono">0.5% – 5.25%</td>
                    <td className="p-3">פירוק חלבונים, כלורינציה, המסת חיידקים ורקמה אנקרוטית</td>
                    <td className="p-3 text-emerald-400 font-bold">כן (מצוין)</td>
                    <td className="p-3 text-rose-400 font-bold">לא (רק אורגני)</td>
                    <td className="p-3">היחיד שממיס רקמה אורגנית. חימום או הפעלה קולית (PUI) מעלים את היעילות.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">EDTA</td>
                    <td className="p-3 font-mono">17% (pH 7.3)</td>
                    <td className="p-3">Chelating Agent המקשר יוני סידן וממיס רכיבים אנאורגניים</td>
                    <td className="p-3 text-rose-400 font-bold">לא</td>
                    <td className="p-3 text-emerald-400 font-bold">כן (מצוין)</td>
                    <td className="p-3">זמן מומלץ 1–2 דקות. שטיפה מעל 10 דקות גורמת ל-Erosion של הדינטין.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-teal-300">Chlorhexidine (CHX)</td>
                    <td className="p-3 font-mono">2%</td>
                    <td className="p-3">חומר אנטימיקרוביאלי בעל Substantivity (נקשר לדינטין ומשתחרר לאט)</td>
                    <td className="p-3 text-rose-400 font-bold">לא</td>
                    <td className="p-3 text-rose-400 font-bold">לא</td>
                    <td className="p-3 text-amber-300">
                      אזהרה: ערבוב NaOCl עם CHX מייצר משקע חום מסרטן (PCA - Para-chloroaniline).
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Calcium Hydroxide - Ca(OH)2</td>
                    <td className="p-3 font-mono">Paste (pH ~12.5)</td>
                    <td className="p-3">סביבה בסיסית חזקה (pH גבוה) המפרקת LPS וחיידקים</td>
                    <td className="p-3 text-emerald-400 font-bold">חלקית</td>
                    <td className="p-3 text-rose-400 font-bold">לא</td>
                    <td className="p-3">חבישת ביניים מומלצת ל-7–14 ימים. E. faecalis עמיד לסביבה הבסיסית שלה.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Sheet Content 3: Trauma Guidelines */}
      {activeSheet === 'trauma' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Bandage className="w-5 h-5 text-rose-400" />
              <span>הנחיות קליניות לטיפול בטראומה דנטלית (AAE / IADT Guidelines 2020)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-rose-400 text-sm">Avulsion (עקירה מלאה)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>זמן חוץ-פה יבש &lt; 60 דק:</strong> החזרה מיידית, קיבוע גמיש (Flexible Splint) ל-2 שבועות.</li>
                  <li><strong>זמן חוץ-פה יבש &gt; 60 דק:</strong> תאי ה-PDL נמקיים. החזרה לאחר טיפול בשרביט וקיבוע ל-4 שבועות.</li>
                  <li><strong>טיפול שורש:</strong> התחלה תוך 7–14 ימים בשן עם שורש שלם.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-amber-400 text-sm">Intrusion (שיקוע)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>שורש פתוח:</strong> מעקב ליציאה ספונטנית (Spontaneous eruption).</li>
                  <li><strong>שורש סגור:</strong> בשיקוע &gt; 3 מ"מ — יישור אורתודונטי או כירורגי.</li>
                  <li><strong>טיפול שורש:</strong> בשורש סגור, נמק כמעט ודאי (100%), יש להתחיל טיפול שורש תוך 2 שבועות.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Root Fracture (שבר שורש)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>שבר אפילקלי / מרכזי:</strong> קיבוע גמיש ל-4 שבועות.</li>
                  <li><strong>שבר צוארי (Cervical 1/3):</strong> קיבוע קשיח יותר עד 4 חודשים.</li>
                  <li><strong>טיפול שורש:</strong> מבוצע רק במקרה של נמק, ורק במקטע הכותרתי (Coronal Fragment) עד קו השבר.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sheet Content 4: Antibiotics */}
      {activeSheet === 'antibiotics' && (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-400" />
              <span>אינדיקציות ומינונים לאנטיביוטיקה סיסטמית (AAE Guidance)</span>
            </h3>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-4 h-4" />
                <span>מתי מומלץ לתת אנטיביוטיקה באנדודונטיה?</span>
              </div>
              <p className="leading-relaxed">
                אבסס אפילקלי חריף (Acute Apical Abscess) בליווי סימפטומים סיסטמיים: חום, חולשה, מעורבות קשריות לימפה, או נפיחות מתפשטת (Cellulitis/Trismus).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-xs text-rose-200 space-y-2">
              <div className="font-bold flex items-center gap-1.5 text-rose-300">
                <AlertTriangle className="w-4 h-4" />
                <span>מתי חל איסור (אין אינדיקציה) לתת אנטיביוטיקה?</span>
              </div>
              <p className="leading-relaxed">
                Symptomatic Irreversible Pulpitis, Symptomatic Apical Periodontitis, או אבסס ממוקם ללא תסמינים סיסטמיים! טיפול ניקוז וניקוי התעלה הוא הטיפול הנדרש.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
