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
  Zap
} from 'lucide-react';

export const CheatSheetsView: React.FC = () => {
  const [activeSheet, setActiveSheet] = useState<
    'anatomy' | 'vertucci' | 'diagnostics' | 'irrigants' | 'trauma' | 'vpt' | 'surgery' | 'pharmacology'
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
              כל המספרים, הסטטיסטיקות, האנטומיות, ההנחיות הקליניות, והציטוטים הקלאסיים (Kuttler, Vertucci, Sjögren, Zehnder, AAE/IADT) מרוכזים בטבלאות מאסטר מהירות.
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
          <span>🦷 אנטומיה ושכיחויות תעלות</span>
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

      {/* Content Sheet 1: Master Root Canal Anatomy & Frequencies */}
      {activeSheet === 'anatomy' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-indigo-400" />
                  <span>אנטומיית תעלות שורש ושכיחויות קליניות (Master Anatomy Reference)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">כל השורשים, מספר התעלות, שכיחויות הפיצולים, והמחקרים המכוננים (Vertucci, Stropko, Weine, Cleghorn)</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800/90 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">שן</th>
                    <th className="p-3 font-bold">מספר שורשים</th>
                    <th className="p-3 font-bold">מספר תעלות ושכיחות</th>
                    <th className="p-3 font-bold">פיצולים מיוחדים ואנטומיה מורכבת</th>
                    <th className="p-3 font-bold">מחקר מפתח וציטוט לבחינה</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-white">חותכת מרכזית / צדדית עליונה</td>
                    <td className="p-3 font-mono text-indigo-300">1 (100%)</td>
                    <td className="p-3 font-mono text-indigo-300">1 תעלה (99.9%)</td>
                    <td className="p-3">עיקול אפילקלי שכיח ללשוני/דיסטלי בחותכת צדדית (Dense in Dente / Invaginatus).</td>
                    <td className="p-3 citation-text text-slate-400">Vertucci 1984</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">ניב עליון (Maxillary Canine)</td>
                    <td className="p-3 font-mono text-indigo-300">1 (100%)</td>
                    <td className="p-3 font-mono text-indigo-300">1 תעלה (99.5%)</td>
                    <td className="p-3">השן הארוכה ביותר בפה (ממוצע 26.5 מ"מ). בנלור בוקו-לשוני רחב.</td>
                    <td className="p-3 citation-text text-slate-400">Kuttler 1955</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">מלתעה עליונה ראשונה (Maxillary 1st Premolar)</td>
                    <td className="p-3 font-mono">2 שורשים (57%)<br/>1 שורש (40%)<br/>3 שורשים (3%)</td>
                    <td className="p-3 font-mono">2 תעלות (85%-90%)<br/>1 תעלה (9%)<br/>3 תעלות (1%)</td>
                    <td className="p-3">שקע צוארי מזיאלי עמוק (Mesial Developmental Groove) בסכנת פלפול (Perforation).</td>
                    <td className="p-3 citation-text text-slate-400">Vertucci 1984, Carns 1973</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">מלתעה עליונה שנייה (Maxillary 2nd Premolar)</td>
                    <td className="p-3 font-mono">1 שורש (85%)<br/>2 שורשים (15%)</td>
                    <td className="p-3 font-mono">1 תעלה (54%)<br/>2 תעלות (45%)<br/>3 תעלות (1%)</td>
                    <td className="p-3">שכיחות גבוהה לתעלות המתמזגות ונפרדות באפקס (Type II, Type III).</td>
                    <td className="p-3 citation-text text-slate-400">Vertucci 1984</td>
                  </tr>
                  <tr className="bg-indigo-950/30 border-l-4 border-l-indigo-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת עליונה ראשונה (Maxillary 1st Molar)</td>
                    <td className="p-3 font-mono">3 שורשים (99%)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">4 תעלות (55% – 93%)<br/>MB2 נוכחת ב-MB root!</td>
                    <td className="p-3">
                      <strong>תעלת MB2 (Mesiobuccal 2):</strong> ממוקמת לשונית ומזיאלית לקו המחבר בין MB1 ל-Palatal.
                    </td>
                    <td className="p-3 citation-text text-amber-300 font-bold">
                      Stropko 1999 (93.5% עם מיקרוסקופ)<br/>Vertucci 1984 (55%)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">טוחנת עליונה שנייה (Maxillary 2nd Molar)</td>
                    <td className="p-3 font-mono">3 שורשים (90%)</td>
                    <td className="p-3 font-mono">3 תעלות (50%)<br/>4 תעלות / MB2 (40%)</td>
                    <td className="p-3">שורשים קרובים ומיזוג שורשים שכיח יותר מאשר במולרית ראשונה.</td>
                    <td className="p-3 citation-text text-slate-400">Kulid & Peters 1990</td>
                  </tr>
                  <tr className="bg-slate-800/40">
                    <td className="p-3 font-bold text-indigo-300">חותכות מנדיבולריות (Mandibular Incisors)</td>
                    <td className="p-3 font-mono">1 שורש (99%)</td>
                    <td className="p-3 font-mono">1 תעלה (60%)<br/>2 תעלות (40%)</td>
                    <td className="p-3">שתי תעלות (בוקאלית ולשונית) המתמזגות לרוב לנקב אחד באפקס (Type II). התעלה הלשונית מוחמצת שכיחה!</td>
                    <td className="p-3 citation-text text-slate-400">Benjamin & Dowson 1974, Vertucci 1984</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">מלתעה מנדיבולרית ראשונה (Mandibular 1st Premolar)</td>
                    <td className="p-3 font-mono">1 שורש (82%)<br/>2 שורשים (18%)</td>
                    <td className="p-3 font-mono">1 תעלה (74%)<br/>2 תעלות (25%)<br/>3 תעלות (1%)</td>
                    <td className="p-3">פיצול תעלה קשה בדיסטל/לשוני ("Fast Break" בפתאומיות בצילום רדיו). C-shape שכיח באסיאתיים.</td>
                    <td className="p-3 citation-text text-slate-400">Slowey 1974, Vertucci 1978</td>
                  </tr>
                  <tr className="bg-indigo-950/30 border-l-4 border-l-indigo-500">
                    <td className="p-3 font-extrabold text-amber-300">טוחנת מנדיבולרית ראשונה (Mandibular 1st Molar)</td>
                    <td className="p-3 font-mono">2 שורשים (95%)<br/>3 שורשים / Radix (5%)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">3 תעלות (65%)<br/>4 תעלות (30%)<br/>Middle Mesial (1-15%)</td>
                    <td className="p-3">
                      <strong>Radix Entomolaris:</strong> שורש נוסף דיסטו-לשוני (שכיח עד 30% באוכלוסייה אסייתית).<br/>
                      <strong>Middle Mesial (MM):</strong> תעלה שלישית בשורש המזיאלי.
                    </td>
                    <td className="p-3 citation-text text-amber-300 font-bold">
                      De Moor 2004 (Radix)<br/>Pomeranz 1981 (MM canal)
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-white">טוחנת מנדיבולרית שנייה (Mandibular 2nd Molar)</td>
                    <td className="p-3 font-mono">2 שורשים (80%)<br/>1 שורש ממוזג (20%)</td>
                    <td className="p-3 font-mono">3 תעלות (75%)<br/>C-shaped canal (10%-30%)</td>
                    <td className="p-3">
                      <strong>C-Shaped Canal System:</strong> שכיחות גבוהה באסיאתיים (Fan 2004, Melton 1991). חריץ מתמשך מבוקאלי ללשוני.
                    </td>
                    <td className="p-3 citation-text text-slate-400">Melton 1991, Fan 2004</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 2: Vertucci Classification */}
      {activeSheet === 'vertucci' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-indigo-400" />
                <span>סיווג 8 הטיפוסים לפי Vertucci (1984)</span>
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
                    <span className="px-2.5 py-0.5 rounded-md bg-indigo-950 text-indigo-300 text-xs font-mono font-bold border border-indigo-500/30">
                      {v.pattern}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-medium">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 3: AAE Diagnostic Terminology */}
      {activeSheet === 'diagnostics' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-5 shadow-xl">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-amber-400" />
                <span>המונחים המאושרים לדיאגנוסטיקה פולפלית ואפיקלית (AAE Consensus 2009)</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">חובה להשתמש אך ורק במונחים רשמיים אלו בבחינת המומחיות</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pulp Diagnostic Categories */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-indigo-400 text-sm border-b border-slate-800 pb-2">1. דיאגנוזה פולפלית (Pulp Diagnoses)</h4>
                
                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-white text-xs">Normal Pulp (מוך תקין)</div>
                  <div className="text-[11px] text-slate-300">תגובה תקינה וחלופית לקור/חום. ללא סימפטומים או ממצא רדיוגרפי.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-emerald-300 text-xs">Reversible Pulpitis (דלקת מוך הפיכה)</div>
                  <div className="text-[11px] text-slate-300">תגובה חדה לקור שנעלמת מיידית עם הסרת הגירוי. ללא דלקת קבועה.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-rose-400 text-xs">Symptomatic Irreversible Pulpitis (דלקת בלתי-הפיכה תסמינית)</div>
                  <div className="text-[11px] text-slate-300">כאב חד/כהה מתמשך (Lingering pain) לאחר גירוי. כאב ספונטני או כאב מקרין.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-amber-300 text-xs">Asymptomatic Irreversible Pulpitis (דלקת בלתי-הפיכה לא תסמינית)</div>
                  <div className="text-[11px] text-slate-300">ללא כאב קליני, אך חשיפת מוך עמוקה (עששת עמוקה / פוליפ המוך / טראומה) המחייבת טיפול שורש.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-slate-400 text-xs">Pulp Necrosis (נמק המוך)</div>
                  <div className="text-[11px] text-slate-300">חוסר תגובה מוחלט לבדיקות חיוניות (Cold / EPT). המוך אינו חי.</div>
                </div>
              </div>

              {/* Apical Diagnostic Categories */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-cyan-400 text-sm border-b border-slate-800 pb-2">2. דיאגנוזה אפיקלית (Apical Diagnoses)</h4>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-white text-xs">Normal Apical Tissues</div>
                  <div className="text-[11px] text-slate-300">ללא רגישות לנקישה (Percussion) או מישוש (Palpation). PDL רדיוגרפי תקין.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-rose-400 text-xs">Symptomatic Apical Periodontitis (SAP)</div>
                  <div className="text-[11px] text-slate-300">רגישות חדה לנקישה או לכיסה. עשויה להיות או לא להיות מלווה בהתרחבות PDL בצילום.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-amber-300 text-xs">Asymptomatic Apical Periodontitis (AAP)</div>
                  <div className="text-[11px] text-slate-300">נוכחות נגע אפילקלי רדיוגרפי (Radiolucency) ללא תסמינים קליניים או רגישות לנקישה.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-rose-400 text-xs">Acute Apical Abscess (AAA)</div>
                  <div className="text-[11px] text-slate-300">תגובה דלקתית חריפה, נפיחות רקמה רכה קלינית, כאב עז, ולעתים תסמינים סיסטמיים.</div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700 space-y-1">
                  <div className="font-bold text-cyan-300 text-xs">Chronic Apical Abscess (CAA)</div>
                  <div className="text-[11px] text-slate-300">נוכחות פיסטולה (Sinus Tract) מנקזת. ללא כאב עז.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 4: Irrigants & Activation */}
      {activeSheet === 'irrigants' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <TestTube className="w-5 h-5 text-cyan-400" />
              <span>מטריצת חומרי שטיפה, אקטיבציה ואינטראקציות כימיות (Zehnder 2006, Haapasalo 2010)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">תמיסה</th>
                    <th className="p-3 font-bold">ריכוז ו-pH</th>
                    <th className="p-3 font-bold">תפקיד קליני ומנגנון</th>
                    <th className="p-3 font-bold">הסרת Smear Layer</th>
                    <th className="p-3 font-bold">אינטראקציות ואזהרות קליניות</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">NaOCl (Sodium Hypochlorite)</td>
                    <td className="p-3 font-mono">0.5% – 5.25%<br/>pH ~11-12</td>
                    <td className="p-3">פירוק חלבונים, המסת רקמה אורגנית וחיידקים. היחיד שממיס רקמה חיפה ואנאורגנית.</td>
                    <td className="p-3 text-rose-400 font-bold">לא (ממיס רק אורגני)</td>
                    <td className="p-3 text-amber-300">
                      NaOCl + CHX = משקע PCA חום מסרטן.<br/>
                      NaOCl + EDTA = נטרול כלור חופשי מיידי.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">EDTA</td>
                    <td className="p-3 font-mono">17%<br/>pH ~7.3</td>
                    <td className="p-3">Chelating Agent המקשר יוני סידן וממיס את הרכיב האנאורגני של ה-Smear Layer.</td>
                    <td className="p-3 text-emerald-400 font-bold">כן (מצוין, 1-2 דקות)</td>
                    <td className="p-3">שטיפה מעל 10 דקות גורמת ל-Erosion קשה של הדינטין הטורבולרי.</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-teal-300">Chlorhexidine (CHX)</td>
                    <td className="p-3 font-mono">2%<br/>pH ~5.5-7</td>
                    <td className="p-3">אנטיבקטריאלי רחב טווח בעל Substantivity (נקשר להידרוקסיאפטיט לשעות).</td>
                    <td className="p-3 text-rose-400 font-bold">לא</td>
                    <td className="p-3">אין להזריק יחד עם NaOCl ללא שטיפת ביניים ב-Saline / EDTA.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 5: Trauma Protocols */}
      {activeSheet === 'trauma' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Bandage className="w-5 h-5 text-rose-400" />
              <span>פרוטוקול טראומה דנטלית (AAE / IADT Guidelines 2020)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-rose-400 text-sm">Avulsion (עקירה מלאה)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>יבש &lt; 60 דק (PDL חי):</strong> החזרה מיידית, קיבוע גמיש (2 שבועות).</li>
                  <li><strong>יבש &gt; 60 דק (PDL מת):</strong> החזרה לאחר טיפול ב-Fluoride / Emdogain, קיבוע ל-4 שבועות. תתרחש Ankylosis.</li>
                  <li><strong>מדיה מומלצת לשמירה:</strong> HBSS &gt; Viaspan &gt; חלב קר &gt; Saline.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-amber-400 text-sm">Intrusion (שיקוע)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>שורש פתוח:</strong> מעקב ליציאה ספונטנית (Spontaneous eruption).</li>
                  <li><strong>שורש סגור:</strong> בשיקוע &gt; 3 מ"מ — יישור אורתודונטי או כירורגי.</li>
                  <li><strong>טיפול שורש:</strong> בשורש סגור, נמק 100%, התחלת RCT תוך 2 שבועות למניעת ספיגה.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">Root Fracture (שבר שורש)</div>
                <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                  <li><strong>שבר אפילקלי / מרכזי:</strong> קיבוע גמיש ל-4 שבועות.</li>
                  <li><strong>שבר צוארי (Cervical 1/3):</strong> קיבוע קשיח עד 4 חודשים.</li>
                  <li><strong>טיפול שורש:</strong> מבוצע רק בנמק, ורק במקטע הכותרתי (Coronal Fragment) עד קו השבר.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 6: Vital Pulp Therapy & Bioceramics */}
      {activeSheet === 'vpt' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-purple-400" />
              <span>טיפולי חיוניות המוך וחומרים ביו-סרמיים (AAE Position Statement 2021)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-right border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-800 text-slate-200 border-b border-slate-700">
                    <th className="p-3 font-bold">חומר</th>
                    <th className="p-3 font-bold">זמן התקשות (Setting Time)</th>
                    <th className="p-3 font-bold">איכות Dentin Bridge</th>
                    <th className="p-3 font-bold">פוטנציאל שינוי צבע (Discoloration)</th>
                    <th className="p-3 font-bold">אחוזי הצלחה קליניים</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-medium">
                  <tr>
                    <td className="p-3 font-bold text-slate-300">Calcium Hydroxide - Ca(OH)2</td>
                    <td className="p-3 font-mono">מיידי</td>
                    <td className="p-3 text-rose-400">גשר נקבובי עם Tunnel Defects</td>
                    <td className="p-3 text-emerald-400">ללא שינוי צבע</td>
                    <td className="p-3 font-mono">60% – 75%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-indigo-300">ProRoot MTA (Grey / White)</td>
                    <td className="p-3 font-mono text-amber-300 font-bold">2.75 שעות (165 דקות)</td>
                    <td className="p-3 text-emerald-400 font-bold">גשר הומוגני עבה ללא נקבוביות</td>
                    <td className="p-3 text-rose-400 font-bold">גבוה (בגלל Bismuth Oxide)</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">85% – 93%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-cyan-300">Biodentine / BC RRM</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">9 – 12 דקות בלבד</td>
                    <td className="p-3 text-emerald-400 font-bold">גשר הומוגני הרמטי מעולה</td>
                    <td className="p-3 text-emerald-400 font-bold">ללא שינוי צבע (Zirconium Oxide)</td>
                    <td className="p-3 font-mono text-emerald-400 font-bold">90% – 95%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 7: Endodontic Surgery (Apicoectomy) */}
      {activeSheet === 'surgery' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Scissors className="w-5 h-5 text-emerald-400" />
              <span>מספרי מפתח בכירורגיה אנדודונטית (Kim & Kratchman 2006)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-emerald-400 text-sm">1. קטימת קצה השורש (Root Resection)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  קטימה של <strong>3 מ"מ</strong> מקצה השורש בזווית של <strong>0 מעלות</strong> (ניצבת לציר השורש). הסרת 3 מ"מ מנטרלת 98% מהפיצולים האפיקליים (Apical Ramifications) ו-93% מהתעלות האופקיות.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-cyan-400 text-sm">2. הכנה רטרוגרדית (Retro-Prep)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  הכנה בעומק של <strong>3 מ"מ לפחות</strong> לאורך הציר המרכזי של התעלה באמצעות טיפים אולטרסוניים (Ultrasonic Micro-tips) ללא שיפוע (Bevel).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-2">
                <div className="font-extrabold text-indigo-400 text-sm">3. חומרי איטום רטרוגרדיים (Root-End Fill)</div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong>MTA / Bioceramic (BC RRM):</strong> חומר הבחירה (Gold Standard) בעל אחוזי הצלחה של 92%-95% (סופר-EBA ו-IRM 80%-85%, אמלגם 65%-75%).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content Sheet 8: Pharmacology & Pain Management */}
      {activeSheet === 'pharmacology' && (
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/90 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
              <Pill className="w-5 h-5 text-teal-400" />
              <span>שליטה בכאב, אנסטזיה ואנטיביוטיקה (AAE Guidelines 2021)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>שליטה בכאב וסולם משככי כאבים (Analgesic Ladder)</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>שילוב הזהב (Gold Combination):</strong> 600 מ"ג איבופרופן (Ibuprofen) + 1000 מ"ג אקמול (Acetaminophen) משיג אלחוש מעולה מכל אופיאואיד.</li>
                  <li><strong>Hot Tooth (תעלה מודלקת):</strong> אחוזי ההצלחה של זריקת IANB בשן עם Irreversible Pulpitis הם כ-30% בלבד!</li>
                  <li><strong>טכניקות משלימות:</strong> הרחבת אלחוש באמצעות ארטיקאין (Articaine 4%) בשיטת Infiltration, או זריקות Intraosseous / Intrapulpal.</li>
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700 space-y-3">
                <div className="font-extrabold text-emerald-400 text-sm flex items-center gap-1.5">
                  <Pill className="w-4 h-4 text-emerald-400" />
                  <span>פרוטוקול אנטיביוטיקה סיסטמית</span>
                </div>
                <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                  <li><strong>קו ראשון (First Line):</strong> Amoxicillin 500 מ"ג (כל 8 שעות ל-3–7 ימים).</li>
                  <li><strong>במקרים עמידים / קשים:</strong> Augmentin (Amoxicillin + Clavulanate) 875/125 מ"ג.</li>
                  <li><strong>לרגישים לפניצילין:</strong> Clindamycin 300 מ"ג (או Azithromycin 500 מ"ג ביום הראשון ו-250 מ"ג בהמשך).</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
