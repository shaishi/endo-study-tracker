import React, { useState } from 'react';
import { 
  Stethoscope, 
  HelpCircle, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  BookOpen, 
  FileText,
  AlertCircle
} from 'lucide-react';

export interface ClinicalCase {
  id: number;
  title: string;
  topic: string;
  patientInfo: string;
  chiefComplaint: string;
  clinicalFindings: string;
  radiographicFindings: string;
  tests: {
    coldTest: string;
    ept: string;
    percussion: string;
    palpation: string;
    probingDepth: string;
    mobility: string;
  };
  questions: string[];
  modelAnswer: {
    pulpalDiagnosis: string;
    apicalDiagnosis: string;
    treatmentPlan: string;
    keyBoardPoints: string[];
  };
}

export const clinicalCasesData: ClinicalCase[] = [
  {
    id: 1,
    title: 'מקרה 1: שבר כתר-שורש וחבלה אקוטית בילד עם אפקס פתוח',
    topic: 'Dental Trauma & Vital Pulp Therapy',
    patientInfo: 'ילד בן 9, בריא בדרך כלל, מגיע למרפאה שעתיים לאחר חבלה בבריכה.',
    chiefComplaint: '"נשברה לי השן הקדמית וכואב לי כשאני נושם אוויר."',
    clinicalFindings: 'שבר מורכב (Complicated Crown-Root Fracture) בשן 21 המערב זפוגת שברי חניכיים בצד הפלטינלי וחשיפת מוך בגודל 1.5 מ"מ. הדימום מהמוך הוא אדום בהיר ונפסק לאחר בלחיצה עדינה ב-NaOCl תוך 3 דקות.',
    radiographicFindings: 'צילום פריאפיקלי מראה שורש לא מושלם (Stage 3 לפי Cvek), אפקס פתוח לרווחה (Open Apex), ללא שברים בשורש וללא עיבוי PDL.',
    tests: {
      coldTest: 'תגובה רגישה ומהירה החולפת תוך 2 שניות',
      ept: 'חיובי (תגובה תקינה)',
      percussion: 'רגישות קלה בלבד',
      palpation: 'ללא רגישות למגע במיקוד אפילקלי',
      probingDepth: '2 מ"מ מסביב לשן',
      mobility: 'דרגה 1 (ניידות פיזיולוגית קלה)'
    },
    questions: [
      'מהי האבחנה המלאה של המוך והרקמות הפריאפיקליות?',
      'מהו פרוטוקול הטיפול המומלץ לשמירה על חיוניות המוך (Apexogenesis)?',
      'אילו חומרים מומלצים לכיסוי המוך ומהן תכונותיהם?'
    ],
    modelAnswer: {
      pulpalDiagnosis: 'Reversible Pulpitis (מוך חיוני בריא הניתן לשמרנות)',
      apicalDiagnosis: 'Normal Apical Tissues (ללא דלקת פריאפיקלית)',
      treatmentPlan: 'ביצוע Cvek Partial Pulpotomy: הסרת 1.5-2 מ"מ של מוך דלקתי בעזרת בור יהלום מהיר בקירור מים, חיטוי ב-NaOCl 2.5%, הנחת Biodentine / MTA בעובי 2-3 מ"מ, ושחזור קורונלי אוטם (Composite).',
      keyBoardPoints: [
        'שמירה על המוך מאפשרת Apexogenesis — התארכות השורש והתעבות דפנות הדינטין.',
        'חוסר שליטה בדימום תוך 5-9 דקות מורה על דלקת עמוקה יותר ומחייב Full Cervical Pulpotomy או Apexification.',
        'Biodentine מומלץ באזור אסתטי מניעת Bismuth Oxide המוביל לדיסקולורציה.'
      ]
    }
  },
  {
    id: 2,
    title: 'מקרה 2: כאב פועם עז וכשל בטיפול שורש קודם בטוחנה עליונה',
    topic: 'Retreatment & Microscopic Anatomy',
    patientInfo: 'בת 42, ללא מחלות רקע, מגיעה בשל כאבים פועמים קשים בשן 16 שעברה טיפול שורש לפני 3 שנים.',
    chiefComplaint: '"כואב לי מאוד בלעיסה ולא יכולה לישון בלילה בשן שעברה טיפול שורש."',
    clinicalFindings: 'שן 16 עם שחזור אמלגם נרחב, רגישות עזה לנקישה ולמישוש בבוקאל. ללא נפיחות חפשית.',
    radiographicFindings: 'צילום פריאפיקלי מראה טיפול שורש קודם בתעלות MB1, DB, P. נגטיב סביב השורש ה-MB מראה נגע פריאפיקלי (רדיולוסנטיות) בקוטר 4 מ"מ. תעלת MB2 אינה מטופלת.',
    tests: {
      coldTest: 'אין תגובה',
      ept: 'אין תגובה',
      percussion: 'רגישות עזה (פלוס פלוס)',
      palpation: 'רגישות מעל שורש MB',
      probingDepth: '2-3 מ"מ',
      mobility: 'תקינה'
    },
    questions: [
      'מהי האבחנה המשוערת ומהי הסיבה המרכזית לכישלון הטיפול הקודם?',
      'מהי השכיחות של תעלת MB2 במולרים עליונים ראשונים לפי Stropko (1999)?',
      'מהו החיידק הדומיננטי הצפוי בתעלה שלא טופלה לפי Sundqvist (1998)?'
    ],
    modelAnswer: {
      pulpalDiagnosis: 'Previously Treated / Failed Endodontic Treatment',
      apicalDiagnosis: 'Symptomatic Apical Periodontitis',
      treatmentPlan: 'טיפול חוזר (Retreatment): פתיחת גישה, הסרת גוטה פרצ"ה קודמת, איתור תעלת MB2 שלא טופלה תחת מיקרוסקופ, חיטוי ב-NaOCl 5.25% ו-EDTA 17%, חבישת ביניים ב-Ca(OH)2 לשבועיים, ואיטום מחדש בסילר ביו-סראמי.',
      keyBoardPoints: [
        'Stropko (1999) הראה ששכיחות MB2 במולר ראשון עליון מגיעה ל-93.5%.',
        'תעלה שלא אותר (Missed Canal) היא הסיבה השכיחה ביותר לנגע פריאפיקלי עמיד.',
        'Sundqvist (1998): Enterococcus faecalis הוא הזן הדומיננטי בזיהומים שניוניים ועמידים.'
      ]
    }
  }
];

export const ClinicalCasesView: React.FC = () => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [userNotes, setUserNotes] = useState<Record<number, string>>({});
  const [showAnswer, setShowAnswer] = useState<Record<number, boolean>>({});

  const currentCase = clinicalCasesData[activeCaseIndex];

  const handleToggleAnswer = (caseId: number) => {
    setShowAnswer(prev => ({ ...prev, [caseId]: !prev[caseId] }));
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>תרגול וינייטות קליניות והכנה לבחינה בעל-פה (Case of the Week)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">מקרה קליני לבחינת המומחיות</h2>
          </div>
        </div>
      </div>

      {/* Case Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {clinicalCasesData.map((c, idx) => (
          <button
            key={c.id}
            onClick={() => setActiveCaseIndex(idx)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition border ${
              activeCaseIndex === idx
                ? 'bg-cyan-600 text-white border-cyan-400 shadow-lg shadow-cyan-600/30'
                : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800'
            }`}
          >
            {c.title}
          </button>
        ))}
      </div>

      {/* Active Case Card */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 bg-slate-900/90 space-y-6">
        
        {/* Title & Topic */}
        <div className="border-b border-slate-800 pb-4">
          <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs font-mono font-bold">
            {currentCase.topic}
          </span>
          <h3 className="text-xl font-black text-white mt-2">{currentCase.title}</h3>
        </div>

        {/* Clinical Vignette Grid */}
        <div className="grid md:grid-cols-2 gap-4 text-xs">
          
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-cyan-300 flex items-center gap-1.5 text-sm">
              <FileText className="w-4 h-4" />
              <span>אנמנזה ותלונה עיקרית</span>
            </h4>
            <p className="text-slate-300"><strong className="text-slate-200">פרטי המטופל:</strong> {currentCase.patientInfo}</p>
            <p className="text-slate-300"><strong className="text-slate-200">תלונה עיקרית:</strong> {currentCase.chiefComplaint}</p>
            <p className="text-slate-300"><strong className="text-slate-200">ממצאים קליניים:</strong> {currentCase.clinicalFindings}</p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <h4 className="font-bold text-indigo-300 flex items-center gap-1.5 text-sm">
              <BookOpen className="w-4 h-4" />
              <span>ממצאים רדיוגרפיים ובדיקות חיוניות</span>
            </h4>
            <p className="text-slate-300"><strong className="text-slate-200">רדיוגרפיה:</strong> {currentCase.radiographicFindings}</p>
            <div className="grid grid-cols-2 gap-1.5 pt-2 text-[11px]">
              <div className="p-1.5 rounded bg-slate-900">Cold Test: <span className="font-bold text-cyan-300">{currentCase.tests.coldTest}</span></div>
              <div className="p-1.5 rounded bg-slate-900">EPT: <span className="font-bold text-cyan-300">{currentCase.tests.ept}</span></div>
              <div className="p-1.5 rounded bg-slate-900">Percussion: <span className="font-bold text-rose-300">{currentCase.tests.percussion}</span></div>
              <div className="p-1.5 rounded bg-slate-900">Probing: <span className="font-bold text-emerald-300">{currentCase.tests.probingDepth}</span></div>
            </div>
          </div>

        </div>

        {/* Discussion Questions */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-indigo-500/20 space-y-3">
          <h4 className="font-bold text-amber-300 text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>שאלות דיון לבחינה (נסה לענות בעצמך בכתב בטרם צפייה בפתרון):</span>
          </h4>
          <ol className="list-decimal list-inside space-y-1.5 text-xs text-slate-200 font-semibold">
            {currentCase.questions.map((q, i) => (
              <li key={i}>{q}</li>
            ))}
          </ol>
        </div>

        {/* Interactive Student Response Input */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-slate-300">
            ✍️ רשום כאן את הניסוח שלך (אבחנה ופרוטוקול טיפול):
          </label>
          <textarea
            value={userNotes[currentCase.id] || ''}
            onChange={(e) => setUserNotes({ ...userNotes, [currentCase.id]: e.target.value })}
            placeholder="רשום אבחנת מוך, אבחנה פריאפיקלית ושלבי טיפול..."
            className="w-full h-28 p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
          />
        </div>

        {/* Reveal Model Answer Button */}
        <div>
          <button
            onClick={() => handleToggleAnswer(currentCase.id)}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-white font-extrabold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/20"
          >
            <span>{showAnswer[currentCase.id] ? 'הסתר תשובת מודל' : 'הצג תשובת מודל וקריטריונים של הבוחן'}</span>
            {showAnswer[currentCase.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Model Answer Drawer */}
        {showAnswer[currentCase.id] && (
          <div className="p-5 rounded-2xl bg-slate-950 border border-emerald-500/30 space-y-4 animate-fadeIn text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" />
              <span>תשובת מודל ודגשים של בוחן המומחיות</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-slate-400">אבחנת מוך (Pulpal):</div>
                <div className="text-sm font-extrabold text-emerald-300 mt-1">{currentCase.modelAnswer.pulpalDiagnosis}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-slate-400">אבחנה פריאפיקלית (Apical):</div>
                <div className="text-sm font-extrabold text-emerald-300 mt-1">{currentCase.modelAnswer.apicalDiagnosis}</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <div className="font-bold text-cyan-300">פרוטוקול טיפול מומלץ:</div>
              <p className="text-slate-300 leading-relaxed">{currentCase.modelAnswer.treatmentPlan}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1.5">
              <div className="font-bold text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4" />
                <span>דגשים קריטיים של הבוחן לבחינה בעל-פה:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-200">
                {currentCase.modelAnswer.keyBoardPoints.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
