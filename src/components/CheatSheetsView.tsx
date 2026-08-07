import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  Layers, 
  TestTube, 
  Bandage, 
  Pill, 
  Info,
  Stethoscope,
  Scissors,
  ShieldAlert,
  Baby,
  Ruler
} from 'lucide-react';

export const CheatSheetsView: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<
    'anatomy' | 'primary' | 'vertucci' | 'diagnostics' | 'irrigants' | 'trauma' | 'vpt' | 'surgery' | 'pharmacology'
  >('anatomy');

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400" />
              <span>טבלאות סיכום מאסטר לבחינת המומחיות (Endodontic Board Master Matrix)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">סיכומי "Bread & Butter" מפורטים לבחינה</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              כל המספרים, אורכי השורשים, עומקי הפיצול, הסטטיסטיקות, האנטומיות (שיניים קבועות וחלביות), והציטוטים הקלאסיים (Kuttler, Vertucci, Krasner & Rankow, Sjögren, Zehnder, AAE/IADT) מרוכזים בטבלאות מאסטר.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 p-1.5 bg-slate-950/70 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveSheet('anatomy')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'anatomy'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-indigo-300" />
          <span>🦷 אנטומיית תעלות ואורכי שורשים</span>
        </button>

        <button
          onClick={() => setActiveSheet('primary')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'primary'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Baby className="w-3.5 h-3.5 text-pink-300" />
          <span>👶 שיניים חלביות (Primary Teeth)</span>
        </button>

        <button
          onClick={() => setActiveSheet('vertucci')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'vertucci'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Info className="w-3.5 h-3.5 text-indigo-300" />
          <span>סיווג Vertucci (I-VIII)</span>
        </button>

        <button
          onClick={() => setActiveSheet('diagnostics')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'diagnostics'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Stethoscope className="w-3.5 h-3.5 text-amber-300" />
          <span>📋 דיאגנוסטיקה (AAE Terms)</span>
        </button>

        <button
          onClick={() => setActiveSheet('irrigants')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'irrigants'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <TestTube className="w-3.5 h-3.5 text-cyan-300" />
          <span>🧪 חומרי שטיפה ואקטיבציה</span>
        </button>

        <button
          onClick={() => setActiveSheet('trauma')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'trauma'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Bandage className="w-3.5 h-3.5 text-rose-300" />
          <span>🩹 טראומה דנטלית (AAE/IADT)</span>
        </button>

        <button
          onClick={() => setActiveSheet('vpt')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'vpt'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5 text-purple-300" />
          <span>🔬 טיפולי חיוניות המוך (VPT & MTA)</span>
        </button>

        <button
          onClick={() => setActiveSheet('surgery')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'surgery'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Scissors className="w-3.5 h-3.5 text-emerald-300" />
          <span>✂️ כירורגיה אנדודונטית (Apico)</span>
        </button>

        <button
          onClick={() => setActiveSheet('pharmacology')}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition ${
            activeSheet === 'pharmacology'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-slate-800'
          }`}
        >
          <Pill className="w-3.5 h-3.5 text-teal-300" />
          <span>💊 אנסטזיה, תרופות ואנטיביוטיקה</span>
        </button>
      </div>

      {/* Content Sheet 1: Master Root Canal Anatomy, Lengths & Frequencies */}
      {activeSheet === 'anatomy' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>אנטומיית תעלות שורש, אורכים ממוצעים ועומקי פיצול מהתקרה</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">שורשים, אורכים ממוצעים במ"מ, עומקי פיצול/רצפה, שכיחויות קליניות ומחקרים מכוננים</p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Ruler className="w-4 h-4 text-cyan-400" />
                <span>Krasner & Rankow (2004) Laws of Anatomy</span>
              </div>
            </div>

            {/* Krasner & Rankow Laws Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 space-y-2 text-xs">
              <div className="font-bold text-cyan-300 flex items-center gap-1.5 text-sm">
                <Ruler className="w-4 h-4" />
                <span>חוקי האנטומיה של לשכת המוך (Krasner & Rankow 2004 Laws):</span>
              </div>
              <div className="grid sm:grid-cols-3 gap-3 text-slate-300 pt-1">
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-0.5">Law of Centrality:</strong>
                  רצפת לשכת המוך ממוקמת תמיד במרכז השן בגובה ה-CEJ.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-0.5">Law of Concentricity:</strong>
                  דפנות לשכת המוך ממוקמות תמיד בקונצנטריות לטרפז החצוני של השן ב-CEJ.
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                  <strong className="text-white block mb-0.5">מרחקים קליניים ממוצעים:</strong>
                  מפסגת התלולית לתקרה: ~6.0 מ"מ | גובה לשכת המוך: ~3.0 מ"מ | מפסגת התלולית לרצפה/פיצול: ~9.0 מ"מ.
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">שן</th>
                    <th className="p-3 font-bold">אורך ממוצע (מ"מ)</th>
                    <th className="p-3 font-bold">מספר שורשים</th>
                    <th className="p-3 font-bold">גובה פיצול מהתקרה / עומק רצפה</th>
                    <th className="p-3 font-bold">מספר תעלות ושכיחות קלינית</th>
                    <th className="p-3 font-bold">פיצולים מיוחדים ומחקר מפתח</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-white">חותכת מרכזית עליונה (Max Central)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">22.5 מ"מ</td>
                    <td className="p-3 font-mono">1 (100%)</td>
                    <td className="p-3 font-mono">תקרה ב-CEJ | ללא פיצול</td>
                    <td className="p-3 font-mono text-indigo-300">1 תעלה (99.9%)</td>
                    <td className="p-3">חתך תעלה עגול/משולש. Vertucci 1984</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">חותכת צדדית עליונה (Max Lateral)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">22.0 מ"מ</td>
                    <td className="p-3 font-mono">1 (100%)</td>
                    <td className="p-3 font-mono">תקרה ב-CEJ | ללא פיצול</td>
                    <td className="p-3 font-mono text-indigo-300">1 תעלה (99.9%)</td>
                    <td className="p-3">עיקול אפילקלי פלטינלי/דיסטלי שכיח (Dens in Dente / Invaginatus). Vertucci 1984</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-300">ניב עליון (Maxillary Canine)</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">26.5 מ"מ (הארוכה ביותר!)</td>
                    <td className="p-3 font-mono">1 (100%)</td>
                    <td className="p-3 font-mono">תקרה ב-CEJ | עומק גישה ~12 מ"מ</td>
                    <td className="p-3 font-mono text-indigo-300">1 תעלה (99.5%)</td>
                    <td className="p-3">המפתח הרדיוגרפי והקליני הארוך ביותר בפה. Kuttler 1955</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">מלתעה עליונה 1 (Max 1st Premolar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">21.5 מ"מ</td>
                    <td className="p-3 font-mono">2 שורשים (57%)<br/>1 (40%) | 3 (3%)</td>
                    <td className="p-3 font-mono text-amber-300">פיצול ב שליש מרכזי (~7.5 מ"מ מ-CEJ)</td>
                    <td className="p-3 font-mono">2 תעלות (85%-90%)<br/>1 תעלה (9%) | 3 תעלות (1%)</td>
                    <td className="p-3">שקע צוארי מזיאלי עמוק (Mesial Developmental Groove) בסכנת פלפול. Carns 1973</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">מלתעה עליונה 2 (Max 2nd Premolar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">21.0 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש (85%)<br/>2 שורשים (15%)</td>
                    <td className="p-3 font-mono">תקרה ב-CEJ | פיצול אפילקלי ב-15%</td>
                    <td className="p-3 font-mono">1 תעלה (54%)<br/>2 תעלות (45%) | 3 תעלות (1%)</td>
                    <td className="p-3">שכיחות גבוהה לתעלות המתמזגות ונפרדות באפקס (Type II, Type III). Vertucci 1984</td>
                  </tr>
                  <tr className="bg-indigo-950/30 border-l-4 border-l-indigo-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת עליונה 1 (Max 1st Molar)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">20.8 מ"מ (P: 22m, MB/DB: 20m)</td>
                    <td className="p-3 font-mono">3 שורשים (99%)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">גובה רצפת הלשכה: ~3.0 מ"מ מתקרה | Furcation trunk: 4.0 מ"מ מ-CEJ</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">4 תעלות (55% – 93.5%)<br/>MB2 מופיעה ב-MB root!</td>
                    <td className="p-3 font-bold text-amber-300">
                      MB2 ממוקמת מזיאלית-לשונית לקו MB1-Palatal. Stropko 1999 (93.5%), Vertucci 1984
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">טוחנת עליונה 2 (Max 2nd Molar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">20.0 מ"מ</td>
                    <td className="p-3 font-mono">3 שורשים (90%)</td>
                    <td className="p-3 font-mono">Furcation trunk: 4.5 מ"מ מ-CEJ</td>
                    <td className="p-3 font-mono">3 תעלות (50%)<br/>4 תעלות / MB2 (40%)</td>
                    <td className="p-3">שורשים קרובים ומיזוג שורשים שכיח יותר מאשר במולר ראשון. Kulid & Peters 1990</td>
                  </tr>
                  <tr className="bg-slate-800/40">
                    <td className="p-3 font-bold text-indigo-300">חותכות מנדיבולריות (Mand Incisors)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">20.7 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש (99%)</td>
                    <td className="p-3 font-mono">פיצול בוקו-לשוני עמוק ב-40%</td>
                    <td className="p-3 font-mono">1 תעלה (60%)<br/>2 תעלות (40%) (Lingual canal)</td>
                    <td className="p-3">התעלה הלשונית מוחמצת שכיחה (Type II)! Benjamin & Dowson 1974</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">ניב מנדיבולרי (Mand Canine)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">25.6 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש (94%)<br/>2 שורשים (6%)</td>
                    <td className="p-3 font-mono">פיצול בוקו-לשוני ב-6%</td>
                    <td className="p-3 font-mono">1 תעלה (85%)<br/>2 תעלות (15%)</td>
                    <td className="p-3">שן ארוכה מאוד, עשויה לכלול 2 שורשים (בוקאלי ולשוני). Vertucci 1984</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">מלתעה מנדיבולרית 1 (Mand 1st Premolar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">21.6 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש (82%)<br/>2 שורשים (18%)</td>
                    <td className="p-3 font-mono text-amber-300">פיצול "Fast Break" פתאומי במעמק השורש</td>
                    <td className="p-3 font-mono">1 תעלה (74%)<br/>2 תעלות (25%) | 3 תעלות (1%)</td>
                    <td className="p-3">אנטומיה מורכבת ביותר ("Endodontist's Nightmare"). Slowey 1974, Vertucci 1978</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">מלתעה מנדיבולרית 2 (Mand 2nd Premolar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">22.3 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש (92%)<br/>2 שורשים (8%)</td>
                    <td className="p-3 font-mono">תקרה ב-CEJ | פיצול ב-8%</td>
                    <td className="p-3 font-mono">1 תעלה (85%)<br/>2 תעלות (14%) | 3 תעלות (1%)</td>
                    <td className="p-3">שכיחות נמוכה יותר של פיצולים מורכבים מאשר במלתעה ראשונה. Vertucci 1978</td>
                  </tr>
                  <tr className="bg-indigo-950/30 border-l-4 border-l-indigo-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת מנדיבולרית 1 (Mand 1st Molar)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">21.0 מ"מ (M: 20.9m, D: 21.5m)</td>
                    <td className="p-3 font-mono">2 שורשים (95%)<br/>3 שורשים / Radix (5%)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">גובה רצפת הלשכה: ~3.0 מ"מ | Furcation trunk: 3.0 מ"מ מ-CEJ</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">3 תעלות (65%)<br/>4 תעלות (30%) | Middle Mesial (1-15%)</td>
                    <td className="p-3 font-bold text-amber-300">
                      Radix Entomolaris (שורש נוסף דיסטו-לשוני ב-5-30%). Middle Mesial canal בנזירה המזיאלית. De Moor 2004
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">טוחנת מנדיבולרית 2 (Mand 2nd Molar)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">19.8 מ"מ</td>
                    <td className="p-3 font-mono">2 שורשים (80%)<br/>1 שורש ממוזג (20%)</td>
                    <td className="p-3 font-mono">Furcation trunk: 3.5 מ"מ מ-CEJ</td>
                    <td className="p-3 font-mono">3 תעלות (75%)<br/>C-shaped canal (10%-30%)</td>
                    <td className="p-3 font-bold text-purple-300">
                      C-Shaped Canal System (מערכת תעלות בצורת C שכיחה באסיאתיים). Melton 1991, Fan 2004
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 2: Primary Teeth Endodontic Matrix (שיניים חלביות) */}
      {activeSheet === 'primary' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-pink-500/30 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Baby className="w-5 h-5 text-pink-400" />
                  <span>אנטומיה ופרוטוקולים לטיפולי מוך בשיניים חלביות (Primary Teeth Endodontic Matrix)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">אורכים, מורפולוגיה ייחודית, חודרנות פורקציה, התכווצות שורשים פיזיולוגית ופרוטוקולי Pulpotomy / Pulpectomy</p>
              </div>

              <div className="px-3 py-1 rounded-xl bg-pink-950 border border-pink-500/30 text-pink-300 text-xs font-mono font-bold">
                AAPD Guidelines 2020
              </div>
            </div>

            {/* Key Anatomic Principles Box */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-pink-500/30 space-y-2 text-xs">
              <div className="font-bold text-pink-300 flex items-center gap-1.5 text-sm">
                <Info className="w-4 h-4" />
                <span>מאפיינים אנטומיים וביולוגיים קריטיים בשיניים חלביות לבחינה:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300 pt-1 leading-relaxed">
                <li><strong>אמייל ודינטין דקים:</strong> עובי אמייל ודינטין כ-1 מ"מ בלבד (מחצית משיניים קבועות), התקדמות עששת מהירה למוך.</li>
                <li><strong>קרני מוך גבוהות:</strong> Mesiobuccal pulp horn בטוחנות חלביות ראשונות נרחבת וקרובה מאוד למשטח האקלוזלי.</li>
                <li><strong>חודרנות פורקציה (Furcation Permeability):</strong> שכיחות עזובה של תעלות לטרליות ונקבוביות ברצפת הלשכה בפורקציה (הרס עצם דלקתי מופיע בפורקציה ולא באפקס!).</li>
                <li><strong>חומרי איטום סופגים (Resorbable Pastes):</strong> ב-Pulpectomy חובה להשתמש בחומר נספג (ZOE / Vitapex: Ca(OH)2 + Iodoform / KRI paste) כדי לא להפריע לשיקוע ולבקיעת השן הקבועה! איסור מוחלט על גוטה-פרצה!</li>
              </ul>
            </div>

            {/* Primary Teeth Master Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">שן חלבית (קוד A-T / FDI)</th>
                    <th className="p-3 font-bold">אורך שן ממוצע (מ"מ)</th>
                    <th className="p-3 font-bold">מספר שורשים ותעלות</th>
                    <th className="p-3 font-bold">מאפיינים אנטומיים וקרני מוך</th>
                    <th className="p-3 font-bold">טיפול מוך מומלץ (VPT vs Pulpectomy)</th>
                    <th className="p-3 font-bold">חומרים מומלצים ודגשים לבחינה</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-white">חותכת מרכזית עליונה חלבית (E, F / 51, 61)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">16.0 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש | 1 תעלה</td>
                    <td className="p-3">שורש ישר, חתך עגול. ספיגת שורש פיזיולוגית מתחילה בגיל 4-5.</td>
                    <td className="p-3 font-bold text-emerald-300">IPT / Pulpotomy / Pulpectomy</td>
                    <td className="p-3">חבלה שכיחה (Avulsion/Intrusion). אין להחזיר שן חלבית שעקרה (Reimplantation contra-indicated)!</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">חותכת צדדית עליונה חלבית (D, G / 52, 62)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">15.8 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש | 1 תעלה</td>
                    <td className="p-3">שורש ארוך יחסית לכתר, חתך עגול.</td>
                    <td className="p-3 font-bold text-emerald-300">IPT / Pulpotomy / Pulpectomy</td>
                    <td className="p-3">ספיגה פיזיולוגית מזיאלית בעת בקיעת החותכת הקבועה.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">ניב עליון חלבי (C, H / 53, 63)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">19.0 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש | 1 תעלה</td>
                    <td className="p-3">שורש ארוך וזוויתי, עיקול דיסטלי באפקס.</td>
                    <td className="p-3 font-bold text-emerald-300">IPT / Pulpotomy / Pulpectomy</td>
                    <td className="p-3">שיעור הצלחה גבוה ב-Pulpectomy עקב תעלה רחבה וישרה.</td>
                  </tr>
                  <tr className="bg-pink-950/20 border-l-4 border-l-pink-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת עליונה ראשונה חלבית (B, I / 54, 64)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">16.0 מ"מ</td>
                    <td className="p-3 font-mono">3 שורשים | 3-4 תעלות</td>
                    <td className="p-3 font-bold text-amber-300">
                      קרן מוך Mesiobuccal בולטת וגבוהה ביותר! עששת קלה מובילה לחשיפת מוך.
                    </td>
                    <td className="p-3 font-bold text-amber-300">Pulpotomy / Pulpectomy</td>
                    <td className="p-3 text-amber-200">
                      MTA / Biodentine / Formocresol ב-Pulpotomy. שחזור חובה ב-Stainless Steel Crown (SSC).
                    </td>
                  </tr>
                  <tr className="bg-pink-950/20">
                    <td className="p-3 font-extrabold text-white">טוחנת עליונה שנייה חלבית (A, J / 55, 65)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">17.5 מ"מ</td>
                    <td className="p-3 font-mono">3 שורשים | 3-4 תעלות</td>
                    <td className="p-3">מורפולוגיה דומה לטוחנת קבועה ראשונה (Maxillary 1st Molar). 3 שורשים מפוסקים.</td>
                    <td className="p-3 font-bold text-emerald-300">Pulpotomy / Pulpectomy</td>
                    <td className="p-3">שטיפה עדינה ב-NaOCl 1%. איטום Pulpectomy ב-Vitapex / ZOE.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">חותכות מנדיבולריות חלביות (O, P, Q, N / 71, 72, 81, 82)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">14.0 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש | 1 תעלה</td>
                    <td className="p-3">שיניים קטנות, שורש שטוח בוקו-לשוני. ספיגה מהירה בגיל 5-6.</td>
                    <td className="p-3 font-bold text-emerald-300">IPT / Pulpectomy</td>
                    <td className="p-3">במקרה זיהום נרחב — עקירה ושומר מקום במידת הצורך.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">ניב מנדיבולרי חלבי (M, R / 73, 83)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">17.0 מ"מ</td>
                    <td className="p-3 font-mono">1 שורש | 1 תעלה</td>
                    <td className="p-3">שורש יחיד ארוך ושטוח מזיאלי-דיסטלי.</td>
                    <td className="p-3 font-bold text-emerald-300">IPT / Pulpotomy / Pulpectomy</td>
                    <td className="p-3">שמירה על ניב חלבי קריטית לשמירת אורך הקשת.</td>
                  </tr>
                  <tr className="bg-pink-950/20 border-l-4 border-l-pink-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת מנדיבולרית ראשונה חלבית (L, S / 74, 84)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">17.0 מ"מ</td>
                    <td className="p-3 font-mono">2 שורשים | 3-4 תעלות</td>
                    <td className="p-3 font-bold text-amber-300">
                      אנטומיה ייחודית! רכס מורפולוגי מזיאלי בולט (Tubercle of Zuckerkandl), קרן מוך MB ענקית.
                    </td>
                    <td className="p-3 font-bold text-amber-300">Pulpotomy / Pulpectomy</td>
                    <td className="p-3 text-amber-200">
                      סכנת פלפול גבוהה בהכנת אקסס. שחזור חובה ב-Stainless Steel Crown (SSC).
                    </td>
                  </tr>
                  <tr className="bg-pink-950/20">
                    <td className="p-3 font-extrabold text-white">טוחנת מנדיבולרית שנייה חלבית (K, T / 75, 85)</td>
                    <td className="p-3 font-mono text-pink-300 font-bold">18.0 מ"מ</td>
                    <td className="p-3 font-mono">2 שורשים (מזיאלי ודיסטלי) | 3-4 תעלות</td>
                    <td className="p-3">מורפולוגיה דומה לטוחנת תחתונה קבועה ראשונה. שורשים מפוסקים רחב לשורש השן הקבועה.</td>
                    <td className="p-3 font-bold text-emerald-300">Pulpotomy / Pulpectomy</td>
                    <td className="p-3">איטום Pulpectomy ב-Vitapex (Ca(OH)2 + Iodoform). SSC לשחזור סופי.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 3: Vertucci Classification */}
      {activeSheet === 'vertucci' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Info className="w-5 h-5 text-indigo-400" />
                  <span>סיווג ורטוצי לתעלות שורש (Vertucci Root Canal Classification I-VIII)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Vertucci FJ (1984) Root canal anatomy of the human permanent teeth. J Endod 10:589-599</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type I (1)</div>
                <div className="font-mono text-white text-base">1 → 1</div>
                <p className="text-slate-400">תעלה יחידה הנמשכת מלשכת המוך ועד לנקב האפיקלי.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type II (2-1)</div>
                <div className="font-mono text-white text-base">2 → 1</div>
                <p className="text-slate-400">שתי תעלות הנפרדות מלשכת המוך ומתמזגות לתעלה אחת לפני האפקס.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type III (1-2-1)</div>
                <div className="font-mono text-white text-base">1 → 2 → 1</div>
                <p className="text-slate-400">תעלה יחידה היוצאת מלשכת המוך, מתפצלת לשתים באמצע השורש, ומתמזגת מחדש באפקס.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type IV (2-2)</div>
                <div className="font-mono text-white text-base">2 → 2</div>
                <p className="text-slate-400">שתי תעלות נפרדות לחלוטין מלשכת המוך ועד לשני נקבים אפיקליים נפרדים.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type V (1-2)</div>
                <div className="font-mono text-white text-base">1 → 2</div>
                <p className="text-slate-400">תעלה יחידה היוצאת מלשכת המוך ומתפצלת קרוב לאפקס לשני נקבים נפרדים.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type VI (2-1-2)</div>
                <div className="font-mono text-white text-base">2 → 1 → 2</div>
                <p className="text-slate-400">שתי תעלות היוצאות מלשכת המוך, מתמזגות במרכז השורש, ומתפצלות שוב לשני נקבים באפקס.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type VII (1-2-1-2)</div>
                <div className="font-mono text-white text-base">1 → 2 → 1 → 2</div>
                <p className="text-slate-400">תעלה יחידה המתפצלת, מתמזגת, ומתפצלת מחדש לשני נקבים אפיקליים נפרדים.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Type VIII (3-3)</div>
                <div className="font-mono text-white text-base">3 → 3</div>
                <p className="text-slate-400">שלוש תעלות נפרדות לחלוטין באותו שורש מלשכת המוך ועד ל-3 נקבים נפרדים באפקס.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 4: Diagnostic Criteria & Terminology */}
      {activeSheet === 'diagnostics' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-amber-400" />
                  <span>אבחנה אנדודונטית ומונחי AAE Consensus (2009 Diagnostic Terms)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">תקן האבחנה הבינלאומי: הפרדה בין אבחנת המוך (Pulp Status) לאבחנה הפריאפיקלית (Apical Status)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-5 text-xs">
              <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/30 space-y-3">
                <h4 className="font-extrabold text-indigo-300 text-sm border-b border-slate-800 pb-2">
                  1. אבחנת מצב המוך (Pulpal Diagnoses)
                </h4>
                <ul className="space-y-2.5 text-slate-300">
                  <li><strong className="text-white">Normal Pulp:</strong> מוך חיוני ללא תסמינים, תגובה תקינה ומתתווגת לקור.</li>
                  <li><strong className="text-white">Reversible Pulpitis:</strong> דלקת חולפת. תגובה חדה לקור החולפת מייד עם הסרת הגירוי.</li>
                  <li><strong className="text-amber-300">Symptomatic Irreversible Pulpitis:</strong> דלקת בלתי הפיכה עם כאב ספונטני או ממושך (למעלה מ-10-15 שניות) לקור/חום.</li>
                  <li><strong className="text-amber-300">Asymptomatic Irreversible Pulpitis:</strong> מוך חיוני ללא תסמינים קליניים אך עם חשיפת עששת עמוקה או resorption.</li>
                  <li><strong className="text-rose-400">Pulp Necrosis:</strong> נמק מוך מלא. תגובה שלילית למבחני קור ו-EPT.</li>
                  <li><strong className="text-slate-400">Previously Treated:</strong> שן שעברה טיפול שורש מלא בעבר.</li>
                  <li><strong className="text-slate-400">Previously Initiated Therapy:</strong> שן שעברה טיפול חירום/פולפוטומיה חלקית בעבר.</li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-3">
                <h4 className="font-extrabold text-emerald-300 text-sm border-b border-slate-800 pb-2">
                  2. אבחנת הרקמה הפריאפיקלית (Apical Diagnoses)
                </h4>
                <ul className="space-y-2.5 text-slate-300">
                  <li><strong className="text-white">Normal Apical Tissues:</strong> ללא רגישות לנקישה (Percussion) או למישוש (Palpation). ה-PDL תקין רדיוגרפית.</li>
                  <li><strong className="text-amber-300">Symptomatic Apical Periodontitis:</strong> דלקת פריאפיקלית תסמינית. רגישות עזה לנקישה או ללעיסה.</li>
                  <li><strong className="text-emerald-300">Asymptomatic Apical Periodontitis:</strong> נגע פריאפיקלי (רדיולוסנטיות) רדיוגרפי ללא תסמינים קליניים או רגישות לנקישה.</li>
                  <li><strong className="text-rose-400">Acute Apical Abscess:</strong> תגובה דלקתית חריפה, כאב עז, נפיחות ברקמה הרכה, ולעיתים תסמינים סיסטמיים (חום).</li>
                  <li><strong className="text-cyan-300">Chronic Apical Abscess:</strong> נגע פריאפיקלי עם סינוס טרקט (Sinus Tract / Fistula) מפריש מוגלה ללא כאב עז.</li>
                  <li><strong className="text-purple-300">Condensing Osteitis:</strong> תגובה אוסטאובלסטית מוגברת (רדיואופקיות) סביב האפקס כתוצאה מגירוי דלקתי כרוני נמוך.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 5: Irrigants & Activation */}
      {activeSheet === 'irrigants' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-cyan-400" />
                  <span>חומרי שטיפה, אקטיבציה וחבישות ביניים (Irrigants & Medicaments)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Zehnder M (2006) Irrigants in endodontic treatment. J Endod 32:389-398</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">חומר שטיפה / חבישה</th>
                    <th className="p-3 font-bold">ריכוז מומלץ</th>
                    <th className="p-3 font-bold">מנגנון פעולה מרכזי</th>
                    <th className="p-3 font-bold">יתרונות ודגשים לבחינה</th>
                    <th className="p-3 font-bold">חסרונות ואזהרות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Sodium Hypochlorite (NaOCl)</td>
                    <td className="p-3 font-mono">0.5% – 5.25%</td>
                    <td className="p-3">התרת קשרים פפטידיים, פירוק חומצות שומן, חמצון אנזימים חיידקיים.</td>
                    <td className="p-3 text-amber-200"><strong>החומר היחיד הממיס רקמה אורגנית</strong> (מוך נמקי ושלם)! אנטימיקרוביאלי עוצמתי.</td>
                    <td className="p-3 text-rose-300">רעיל מאוד לרקמה רכה (NaOCl Accident). אינו ממיס Smear Layer אנאורגני.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">EDTA (Ethylenediaminetetraacetic acid)</td>
                    <td className="p-3 font-mono">17% (pH 7.3)</td>
                    <td className="p-3">Chelating agent — קושר יוני סידן (Ca2+) וממיס מרכיבים אנאורגניים.</td>
                    <td className="p-3 text-cyan-200"><strong>מסיר Smear Layer אנאורגני</strong> תוך 1 דקה. פותח Dentinal Tubules לחדירת סילר.</td>
                    <td className="p-3">מגע ממושך (מעל 1-2 דקות) גורם ל-Erosion מתמשך של הדינטין. אינו ממיס רקמה אורגנית.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-emerald-300">Chlorhexidine Gluconate (CHX)</td>
                    <td className="p-3 font-mono">2%</td>
                    <td className="p-3">פגיעה בממברנת החיידק. Substantivity — נספג לדינטין ומשתחרר לאורך זמן.</td>
                    <td className="p-3 text-emerald-200">פעיל מאוד כנגד <em>E. faecalis</em> ו-<em>C. albicans</em>. רעילות נמוכה לרקמה פריאפיקלית.</td>
                    <td className="p-3 text-rose-300 font-bold">איסור ערבוב ישיר עם NaOCl! יוצר משקע רעיל חום-כתום (PCA - Para-chloroaniline).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-purple-300">Calcium Hydroxide [Ca(OH)2]</td>
                    <td className="p-3 font-mono">משחה (pH ~12.5)</td>
                    <td className="p-3">שחרור יוני הידרוקסיל (OH-) הגורמים להרס ממברנות, דנטורציה של ה-DNA וניטרול LPS.</td>
                    <td className="p-3 text-purple-200">חבישת הביניים המומלצת ביותר. מעודדת הווצרות מחסום קשיח (Hard tissue barrier) ומפרקת LPS.</td>
                    <td className="p-3">דורשת לפחות 7-14 ימים לפעילות מלאה. פחות יעילה כנגד <em>E. faecalis</em> עמיד. Byström 1985</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 6: Trauma Matrix */}
      {activeSheet === 'trauma' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Bandage className="w-5 h-5 text-rose-400" />
                  <span>טראומה דנטלית — הנחיות AAE / IADT 2020 Guidelines</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Bourguignon C et al. (2020) International Association of Dental Traumatology guidelines. Dent Traumatol 36:314-330</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">סוג החבלה (Trauma Type)</th>
                    <th className="p-3 font-bold">מצב אפקס (Open vs Closed)</th>
                    <th className="p-3 font-bold">פרוטוקול טיפול מיידי</th>
                    <th className="p-3 font-bold">קיבוע (Splinting)</th>
                    <th className="p-3 font-bold">טיפול שורש וסיבוכים צפויים</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Avulsion (שן שננקרה לחלוטין)</td>
                    <td className="p-3 font-mono">Closed Apex<br/>זמן יבש &lt; 60 דק'</td>
                    <td className="p-3">החזרה מיידית למכתשית (Replantation), שטיפה עדינה בסליין.</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">קיבוע גמיש ל-2 שבועות</td>
                    <td className="p-3">טיפול שורש תוך 7-14 ימים עם Ca(OH)2. מניעת ספיגה דלקתית (Inflammatory Resorption).</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-amber-300">Avulsion (שן שננקרה לחלוטין)</td>
                    <td className="p-3 font-mono">Closed Apex<br/>זמן יבש &gt; 60 דק'</td>
                    <td className="p-3">השריה ב-2% NaF ל-20 דקות, הסרת PDL נמקי, החזרה למכתשית.</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">קיבוע גמיש ל-2 שבועות</td>
                    <td className="p-3">צפויה Ankylosis / Replacement Resorption. טיפול שורש בתוך או מחוץ לפה לפני השתלה.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">Avulsion (שן שננקרה לחלוטין)</td>
                    <td className="p-3 font-mono text-cyan-300 font-bold">Open Apex<br/>זמן יבש &lt; 60 דק'</td>
                    <td className="p-3">השריה ב-Doxycycline / Minocycline ל-5 דקות לעידוד רווסקולריזציה, החזרה למכתשית.</td>
                    <td className="p-3 font-mono text-emerald-300 font-bold">קיבוע גמיש ל-2 שבועות</td>
                    <td className="p-3">מעקב חיוניות. ניסיון Revascularization / Apexogenesis במקרה נמק.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Intrusion (דחיפה תוך-גרמית)</td>
                    <td className="p-3 font-mono">Closed Apex</td>
                    <td className="p-3">אורתודונטיה או אקסטרוזיה כירורגית מיידית.</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">קיבוע ל-4 שבועות</td>
                    <td className="p-3">טיפול שורש חובה תוך 2 שבועות עקב סיכון גבוה מאוד לנמק וספיגה.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">Root Fracture (שבר שורש רוחבי)</td>
                    <td className="p-3 font-mono">שליש אפילקלי / מרכזי</td>
                    <td className="p-3">החזרת המקטע הכתרני למקום (Repositioning).</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">קיבוע ל-4 שבועות (4 חודשים בשליש קורונלי)</td>
                    <td className="p-3">טיפול שורש רק במקטע הקורונלי אם מתפתח נמק. המקטע האפילקלי נשאר חיוני!</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 7: VPT & Bioceramics */}
      {activeSheet === 'vpt' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-purple-400" />
                  <span>טיפולי חיוניות המוך וחומרים ביו-סראמיים (VPT & Bioceramics)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">AAE Position Statement on Vital Pulp Therapy (2021) | European Society of Endodontology (ESE 2019)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-purple-300 text-sm">Direct Pulp Capping</div>
                <p className="text-slate-300">כיסוי ישיר של המוך במצב של חשיפה מכאנית או עשתית קטנה (&lt; 1 מ"מ) כשהמוך בריא והדימום נשלט תוך 5 דקות בעזרת NaOCl.</p>
                <div className="text-[11px] text-amber-300 font-bold">חומר מומלץ: MTA / Biodentine</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-purple-300 text-sm">Cvek Partial Pulpotomy</div>
                <p className="text-slate-300">הסרת 1.5–2 מ"מ של מוך דלקתי משטח החשיפה בעזרת בור יהלום מהיר בקירור מים. שמירה על מוך חיוני בריא עמוק יותר.</p>
                <div className="text-[11px] text-amber-300 font-bold">שיעור הצלחה &gt; 93% בטראומה! Cvek 1978</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-extrabold text-purple-300 text-sm">Full Cervical Pulpotomy</div>
                <p className="text-slate-300">הסרת כל מוך הלשכה (Coronal Pulp) עד לרמת פתחי התעלות ב-CEJ. מבוצע כשהדימום אינו נפסק ב-Cvek pulpotomy.</p>
                <div className="text-[11px] text-amber-300 font-bold">מאפשר Apexogenesis בשיניים צעירות</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 8: Surgical Endodontics */}
      {activeSheet === 'surgery' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-emerald-400" />
                  <span>כירורגיה אנדודונטית מיקרוסקופית (Modern Endodontic Surgery)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Kim S & Kratchman S (2006) Modern endodontic surgery concepts and practice. J Endod 32:601-623</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 text-sm">1. קטימת האפקס (Root-End Resection)</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>אורך קטימה:</strong> 3 מ"מ בדיוק (מסיר 98% מהנקובים הלטרליים ו-93% מהסתעפויות האפיקליות!).</li>
                  <li><strong>זווית שיפוע (Bevel Angle):</strong> 0 מעלות (מאונך לציר האורך של השן) למניעת חשיפת Dentinal Tubules.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-emerald-300 text-sm">2. הכנה רטרוגרדית ואיטום (Retro-preparation & Filling)</div>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>עומק הכנה:</strong> 3 מ"מ לאורך ציר התעלה בעזרת טיפים אולטרסוניים (Ultrasonic Tips).</li>
                  <li><strong>חומר איטום רטרוגרדי:</strong> MTA / Bioceramic Root Repair Material (ERRM). Kim & Kratchman 2006</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 9: Pharmacology & Anesthesia */}
      {activeSheet === 'pharmacology' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-teal-400" />
                  <span>פרמקולוגיה, הרדמה מקומית ואנטיביוטיקה (Pharmacology & Anesthesia)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">AAE Guidance on Endodontic Antibiotic Use (2017) | Hargreaves KM (Hot Tooth Management)</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-teal-300 text-sm">ניהול שן חמה (Hot Tooth Anesthesia)</div>
                <p className="text-slate-300">ברקמה דלקתית חומצית (pH נמוך), תעלות נתרן פתוחות והרדמה מקומית IANB נכשלת ב-30-80% מהמקרים.</p>
                <div className="p-2 rounded-xl bg-slate-900 text-teal-200">
                  <strong>פרוטוקול הגברת הרדמה:</strong> מתן Ibuprofen 600mg שעה לפני הטיפול + סנאפלימנטציה ב-Articaine 4% בוקאלית (Infiltration) ו/או Intraosseous / Intraligamentary injection.
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="font-bold text-teal-300 text-sm">מתי מותר לתת אנטיביוטיקה באנדודונטיה?</div>
                <p className="text-slate-300"><strong>הנחיית AAE חד משמעית:</strong> אין לתת אנטיביוטיקה ב-Symptomatic Irreversible Pulpitis או ב-Symptomatic Apical Periodontitis או בנגע כרוני ללא תסמינים סיסטמיים!</p>
                <div className="p-2 rounded-xl bg-slate-900 text-rose-300">
                  <strong>התוויה בלעדית:</strong> Acute Apical Abscess עם תסמינים סיסטמיים (חום, חולשה, קשריות לימפה מוגדלות, Trismus או התפשטות מהירה של נפיחות ברקמה רכה).
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
