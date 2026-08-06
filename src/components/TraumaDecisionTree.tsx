import React, { useState } from 'react';
import { 
  Stethoscope, 
  Bandage, 
  AlertTriangle, 
  CheckCircle2, 
  Clock
} from 'lucide-react';

export const TraumaDecisionTree: React.FC = () => {
  const [injuryType, setInjuryType] = useState<'avulsion' | 'intrusion' | 'luxation' | 'rootFracture' | 'crownFracture'>('avulsion');
  const [apexStatus, setApexStatus] = useState<'closed' | 'open'>('closed');
  const [dryTime, setDryTime] = useState<'under60' | 'over60'>('under60');
  const [storageMedia, setStorageMedia] = useState<'hbss' | 'milk' | 'dry'>('hbss');

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-rose-950/60 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold mb-2">
              <Bandage className="w-4 h-4 text-rose-400" />
              <span>מחשבון עץ החלטה קליני לטראומה (AAE / IADT Guidelines 2020)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">מחשבון פרוטוקול טראומה דנטלית</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              הזן את נתוני המקרה הקליני (סוג הפגיעה, בגרות האפקס, והזמן החוץ-פה) וקבל מיידית את הנחיות הטיפול, זמני הקיבוע, ופרוטוקול טיפול השורש.
            </p>
          </div>
        </div>
      </div>

      {/* Input Selection Controls Grid */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/80 bg-slate-900/90 space-y-6 shadow-xl">
        
        {/* Step 1: Injury Category */}
        <div className="space-y-3">
          <label className="block text-xs font-extrabold text-indigo-300">1. בחר את סוג הפגיעה הטראומטית (Injury Category):</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {[
              { id: 'avulsion', label: 'Avulsion (עקירה מלאה)' },
              { id: 'intrusion', label: 'Intrusion (שיקוע)' },
              { id: 'luxation', label: 'Lateral / Extrusive' },
              { id: 'rootFracture', label: 'Root Fracture (שבר שורש)' },
              { id: 'crownFracture', label: 'Crown Fracture (שבר כותרת)' },
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setInjuryType(type.id as any)}
                className={`p-3 rounded-2xl text-xs font-bold transition border text-right ${
                  injuryType === type.id
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-md font-bold'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-800'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Apex Maturity */}
        <div className="space-y-3 border-t border-slate-800 pt-4">
          <label className="block text-xs font-extrabold text-indigo-300">2. בגרות אפיקלית (Apex Maturity):</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setApexStatus('closed')}
              className={`p-3 rounded-2xl text-xs font-bold transition border text-center ${
                apexStatus === 'closed'
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-md'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              🔒 שורש סגור (Closed Apex - בוגר)
            </button>

            <button
              onClick={() => setApexStatus('open')}
              className={`p-3 rounded-2xl text-xs font-bold transition border text-center ${
                apexStatus === 'open'
                  ? 'bg-amber-600 text-white border-amber-500 shadow-md'
                  : 'bg-slate-950/70 border-slate-800 text-slate-400 hover:bg-slate-800'
              }`}
            >
              🌱 שורש פתוח (Open Apex - לא בוגר)
            </button>
          </div>
        </div>

        {/* Conditional Step 3: Avulsion Specific Inputs */}
        {injuryType === 'avulsion' && (
          <div className="space-y-4 border-t border-slate-800 pt-4 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-extrabold text-amber-300 mb-2">זמן חוץ-פה יבש (Extra-oral Dry Time):</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDryTime('under60')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      dryTime === 'under60' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    &lt; 60 דק (PDL חי)
                  </button>
                  <button
                    onClick={() => setDryTime('over60')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      dryTime === 'over60' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    &gt; 60 דק (PDL נמקי)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-amber-300 mb-2">מדיה לשמירת השן (Storage Medium):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setStorageMedia('hbss')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      storageMedia === 'hbss' ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    HBSS / Viaspan
                  </button>
                  <button
                    onClick={() => setStorageMedia('milk')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      storageMedia === 'milk' ? 'bg-indigo-950 border-indigo-500 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    חלב קר / Saline
                  </button>
                  <button
                    onClick={() => setStorageMedia('dry')}
                    className={`p-2.5 rounded-xl text-xs font-bold border transition ${
                      storageMedia === 'dry' ? 'bg-rose-950 border-rose-500 text-rose-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    יבש באוויר
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Generated Clinical Protocol Output Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/40 bg-slate-900/95 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">פרוטוקול טיפול קליני מומלץ</h3>
              <p className="text-xs text-slate-400">מבוסס על הנחיות AAE / IADT 2020 Guidelines</p>
            </div>
          </div>

          <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1.5 rounded-xl border border-cyan-500/30">
            {injuryType.toUpperCase()} • {apexStatus === 'closed' ? 'CLOSED APEX' : 'OPEN APEX'}
          </span>
        </div>

        {/* Avulsion Dynamic Protocol */}
        {injuryType === 'avulsion' && (
          <div className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-2">
              <div className="font-extrabold text-indigo-300 text-sm flex items-center gap-1.5">
                <Stethoscope className="w-4 h-4 text-indigo-400" />
                <span>1. פעולה דחופה והשתלת השן (Replantation & Splinting)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {dryTime === 'under60' ? (
                  'שטיפת השן בעדינות ב-Saline. החזרה מיידית למכתשית. ביצוע קיבוע גמיש (Flexible Splint) למשך 2 שבועות בלבד.'
                ) : (
                  'תאי ה-PDL נמקיים לחלוטין. ביצוע Remineralization ב-2% Sodium Fluoride למשך 20 דקות לפני ההחזרה. קיבוע ל-4 שבועות. צפויה Ankylosis.'
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-extrabold text-amber-300 text-sm flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>2. תזמון ופרוטוקול טיפול שורש (Endodontic Management)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed font-medium">
                {apexStatus === 'closed' ? (
                  'בשורש סגור, נמק המוך בלתי נמנע (100%). יש להתחיל טיפול שורש תוך 7-14 ימים מהפגיעה (לפני הסרת הקיבוע). חבישת Ca(OH)2 למשך 2 שבועות למניעת ספיגה דלקתית (Inflammatory Resorption).'
                ) : (
                  'בשורש פתוח, יש סיכוי ל-Revascularization (אנגיוגנזה). מעקב קליני ורדיוגרפי הדוק כל 2 שבועות. אם מופיע סימן נמק — ביצוע Apexification ב-MTA / Biodentine או Regenerative Endodontics.'
                )}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-2">
              <div className="font-extrabold text-rose-300 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>3. פרוגנוזה וסכנת סיבוכים (Prognosis & Complications)</span>
              </div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {dryTime === 'under60' ? (
                  'פרוגנוזה טובה לשמירת השן אם הטיפול החל בזמן. סיכון נמוך לספיגה חלופית (Replacement Resorption).'
                ) : (
                  'פרוגנוזה לטווח ארוך שמורה: ספיגה חלופית (Replacement Resorption / Ankylosis) תתרחש בהכרח. במטופלים צעירים יש לשקול Decoronation בעת Infraposition.'
                )}
              </p>
            </div>

          </div>
        )}

        {/* Intrusion Dynamic Protocol */}
        {injuryType === 'intrusion' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-2">
              <div className="font-bold text-indigo-300 text-sm">פרוטוקול יציאה משיקוע (Intrusion Management)</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                {apexStatus === 'open' ? (
                  'בשורש פתוח — מעקב ליציאה ספונטנית (Spontaneous Eruption) במשך 4 שבועות. אם אין תנועה — התחלת יישור אורתודונטי.'
                ) : (
                  'בשורש סגור — בשיקוע &lt; 3 מ"מ: מעקב ליציאה ספונטנית. בשיקוע 3-7 מ"מ: יישור אורתודונטי או כירורגי. בשיקוע &gt; 7 מ"מ: יישור כירורגי בלבד.'
                )}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 text-sm">טיפול שורש בשיקוע</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                בשחזרת שורש סגור, נמק המוך מתרחש ב-100% מהמקרים. יש להתחיל טיפול שורש תוך 2 שבועות למניעת Inflammatory Root Resorption קשה.
              </p>
            </div>
          </div>
        )}

        {/* Root Fracture Dynamic Protocol */}
        {injuryType === 'rootFracture' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-950/60 border border-indigo-500/30 space-y-2">
              <div className="font-bold text-indigo-300 text-sm">פרוטוקול שבר שורש (Root Fracture Protocol)</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                החזרת המקטע הכותרתי למקומו. בשבר שליש אפילקלי או מרכזי: קיבוע גמיש ל-4 שבועות. בשבר שליש צוארי (Cervical 1/3): קיבוע קשיח ל עד 4 חודשים.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="font-bold text-amber-300 text-sm">טיפול שורש בשבר שורש</div>
              <p className="text-xs text-slate-200 leading-relaxed">
                מבצעים טיפול שורש <strong>רק אם מופיעים סימני נמק</strong>, ורק בתוך המקטע הכותרתי (Coronal Fragment) עד קו השבר. המקטע האפילקלי בדרך כלל נשאר חיוני!
              </p>
            </div>
          </div>
        )}

        {/* General Guidelines Note */}
        {injuryType !== 'avulsion' && injuryType !== 'intrusion' && injuryType !== 'rootFracture' && (
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="font-bold text-slate-300 text-sm">הנחיות טראומה כלליות (AAE/IADT 2020)</div>
            <p className="text-xs text-slate-300 leading-relaxed">
              ביצוע בדיקות חיוניות (Cold & EPT) וצילומים רדיוגרפיים בזוויות שונות (Periapical + Occlusal). במקרה של חשיפת מוך בשן צעירה — ביצוע Cvek Pulpotomy ב-Biodentine / MTA.
            </p>
          </div>
        )}

      </div>

    </div>
  );
};
