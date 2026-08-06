import React, { useState } from 'react';
import { 
  Stethoscope, 
  CheckCircle2, 
  FlaskConical, 
  AlertCircle, 
  Sparkles, 
  ShieldCheck, 
  Zap
} from 'lucide-react';

interface Protocol {
  id: string;
  name: string;
  hebrewName: string;
  pulpStatus: string;
  apexStatus: string;
  definition: string;
  indications: string[];
  contraindications: string[];
  materialsNeeded: { item: string; purpose: string; color: string }[];
  steps: { title: string; desc: string; tip?: string }[];
  clinicalTakeaway: string;
}

const PROTOCOLS_DATA: Protocol[] = [
  {
    id: 'pulp_capping',
    name: 'Direct & Indirect Pulp Capping',
    hebrewName: 'כיסוי מוך ישיר ועקיף (Pulp Capping)',
    pulpStatus: 'מוך חיוני בריא (Normal / Reversible Pulpitis)',
    apexStatus: 'שורש פתוח או סגור (Open / Closed Apex)',
    definition: 'פרוצדורה שבה מונח חומר ביו-קומפטיבי ישירות מעל חשיפת מוך זעירה (Direct) או מעל שכבת דנטין דקה קרובה למוך (Indirect) כדי לעודד יצירת גשר דנטינלי (Dentin Bridge) ולשמור על חיוניות המוך.',
    indications: [
      'חשיפת מוך מכנית או טראומטית זעירה (< 1 מ"מ) תוך פחות מ-2 שעות.',
      'עשתה עמוקה קרובה למוך ללא תסמיני דלקת מוך בלתי הפיכה (ללא כאב ספונטני/לילי).',
      'תגובה תקינה/חיובית למבחני חיוניות (קור/חשמל).'
    ],
    contraindications: [
      'כאב ספונטני, כאב לילי ממושך, או רגישות קשה לנקישה (Symptomatic Irreversible Pulpitis / SAP).',
      'חשיפת מוך עקב עשתה ממושכת עם דימום עז שאינו נעצר.',
      'ספיגת שורש פנימית/חיצונית או נגעי פריאפקס ברדיוגרפיה.'
    ],
    materialsNeeded: [
      { item: 'MTA / Biodentine / Calcium Silicate', purpose: 'ביו-סראמי המעודד הפרשת TGF-β1 ויצירת גשר דנטינלי', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' },
      { item: 'שטיפת NaOCl 2.5%', purpose: 'חיטוי אתר החשיפה והשמדת חיידקים ללא גירוי כימי מופרז', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' },
      { item: 'Resin-Modified Glass Ionomer (RMGI)', purpose: 'שכבת הגנה ואטום קורונלי (Coronal Seal) מעל ה-MTA לפני קומפוזיט', color: 'bg-amber-950/80 text-amber-300 border-amber-500/30' }
    ],
    steps: [
      {
        title: 'שלב 1: אלחוש מקומי ובידוד מוחלט בסכר גומי (Rubber Dam)',
        desc: 'חובה לבודד את השן בסכר גומי לפני פתיחת לשכת המוך למניעת זיהום מרוק חיידקי.',
        tip: 'אין לבצע כיסוי מוך ללא סכר גומי סטרילי!'
      },
      {
        title: 'שלב 2: הסרת עשתה היקפית וניקוי גבולות החלל',
        desc: 'סילוק מלא של כל העשתה מקירות החלל ההיקפיים בעזרת מקדח טורבינה/זוויתן בקירור מים מוגבר.',
      },
      {
        title: 'שלב 3: חיטוי אתר החשיפה ועצירת דימום (Hemostasis)',
        desc: 'הנחת כדור צמר גפן סטרילי ספוג ב-NaOCl 2.5% מעל החשיפה ל-2-3 דקות. הדימום חייב להיעצר לחלוטין.',
        tip: 'אם הדימום נמשך מעבר ל-3-5 דקות -> רקמת המוך דלקתית, יש לעבור לפולפוטומי או טיפול שורש.'
      },
      {
        title: 'שלב 4: הנחת אטום הביו-סראמי (MTA / Biodentine)',
        desc: 'הנחת שכבת MTA או Biodentine בעובי 1.5-2 מ"מ ישירות על חשיפת המוך במינימום לחץ.',
      },
      {
        title: 'שלב 5: איטום קורונלי מיידי (Immediate Coronal Seal)',
        desc: 'כיסוי ה-MTA ב-RMGI/קומפוזיט ושחזור כתר מיידי למניעת דליפה מיקרוביאלית (Microleakage).'
      }
    ],
    clinicalTakeaway: 'איטום קורונלי (Coronal Seal) הרמטי חשוב להצלחת כיסוי מוך לא פחות מאיכות חומר הכיסוי עצמו!'
  },
  {
    id: 'cvek_pulpotomy',
    name: 'Partial / Cvek Pulpotomy',
    hebrewName: 'פולפוטומי חלקית (Cvek Pulpotomy)',
    pulpStatus: 'מוך כתר חיוני (Vital Coronal Pulp)',
    apexStatus: 'שורש פתוח (Immature Open Apex) או שורש סגור בטראומה',
    definition: 'הסרה כירורגית של 1.5-2 מ"מ בלבד מרקמת המוך הדלקתית באזור החשיפה, תוך שימור מוך הכותרת והשורש הבריא הנותר.',
    indications: [
      'חשיפת מוך בולטת עקב חבלה דנטלית (שבר כתר מורכב - Complicated Crown Fracture) בשיניים צעירות.',
      'חשיפת מוך מעשתה בשיניים צעירות עם שורש פתוח (Apexogenesis) שבהן המוך חיוני.',
      'זמן חשיפה של עד מספר ימים מהחבלה.'
    ],
    contraindications: [
      'מוך נמקי (Pulp Necrosis) או דלקת מוך בלתי הפיכה שהתפשטה לעומק לשכת המוך.',
      'כאב ספונטני מתמשך, נפיחות או נגע פריאפיקלי.',
      'חוסר אפשרות לשחזר את כתר השן הרמטית.'
    ],
    materialsNeeded: [
      { item: 'מקדח יהלום קוני/עגול חדש מהיר (High-Speed Diamond)', purpose: 'חיתוך רקמת המוך במינימום טראומה מכנית/תרמית', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30' },
      { item: 'MTA / Biodentine', purpose: 'חומר איטום ביו-אקטיבי לעידוד Apexogenesis', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' },
      { item: 'שטיפת NaOCl 2.5%', purpose: 'עצירת דימום וחיטוי גדם המוך', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' }
    ],
    steps: [
      {
        title: 'שלב 1: אלחוש, חיטוי ובידוד בסכר גומי',
        desc: 'שטיפת האזור בכלורהקסידין/NaOCl והנחת סכר גומי סטרילי.',
      },
      {
        title: 'שלב 2: קטימת 1.5-2 מ"מ מרקמת המוך (Partial Excision)',
        desc: 'שימוש במקדח יהלום חדש במהירות גבוהה (High-speed) עם קירור מים מוגבר לקטימת 1.5-2 מ"מ מעומק החשיפה.',
        tip: 'חובה להשתמש במקדח חדש ובקירור מים עז למניעת נזק תרמי לסיבי המוך!'
      },
      {
        title: 'שלב 3: עצירת דימום ושטיפה ב-NaOCl',
        desc: 'שטיפה עדינה ב-NaOCl 2.5% והנחת ספוגית סליין ל-5 דקות. הדימום מגדם המוך חייב להיעצר לחלוטין.',
      },
      {
        title: 'שלב 4: הנחת MTA / Biodentine',
        desc: 'הנחת 2 מ"מ של MTA או Biodentine ישירות מעל גדם המוך הבריא והיבש.',
      },
      {
        title: 'שלב 5: שחזור כתר קומפוזיט הרמטי',
        desc: 'איטום ב-RMGI ושחזור קומפוזיט אסתטי ומיידי.'
      }
    ],
    clinicalTakeaway: 'פולפוטומי חלקית לפי Cvek מציגה שיעור הצלחה של כ-95% בשיניים צעירות עם חבלה, ושומרת על המשך התפתחות השורש (Apexogenesis).'
  },
  {
    id: 'full_pulpotomy',
    name: 'Full / Cervical Pulpotomy',
    hebrewName: 'פולפוטומי שלמה (Full / Cervical Pulpotomy)',
    pulpStatus: 'מוך כותרת דלקתי, מוך שורש חיוני (Vital Radicular Pulp)',
    apexStatus: 'שורש פתוח (Immature Apex) או שיניים חלביות / Vital Pulp Therapy בשיניים קבועות',
    definition: 'הסרה כירורגית מלאה של כל מוך הכותרת (Coronal Pulp Excision) עד לגובה פתחי תעלות השורש (Root Orifices).',
    indications: [
      'שיניים קבועות צעירות עם שורש פתוח ודלקת מוך נרחבת בכותרת (כדי לאפשר Apexogenesis בשורש).',
      'שיניים חלביות (Primary Molars) עם חשיפת עשתה ומוך חיוני.',
      'פרוטוקולי Vital Pulp Therapy (VPT) מודרניים בשיניים קבועות עם Irreversible Pulpitis במידה והדימום בתעלות נעצר.'
    ],
    contraindications: [
      'מוך שורש נמקי או מוגלתי.',
      'דימום מפתחי התעלות שאינו נעצר תוך 5-10 דקות של NaOCl.',
      'ספיגת שורש פתולוגית ענפה או מעורבות פרווה בינשורשית (Furuncal involvement).'
    ],
    materialsNeeded: [
      { item: 'Spoon Excavator / מקדח עגול גדול בקירור', purpose: 'הסרה מהירה ונקייה של כל גג לשכת המוך ומוך הכותרת', color: 'bg-purple-950/80 text-purple-300 border-purple-500/30' },
      { item: 'MTA / Biodentine (בשיניים קבועות)', purpose: 'איטום הביו-סראמי מעל פתחי התעלות', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' },
      { item: 'Formocresol / Ferric Sulfate / ZOE (בשיניים חלביות)', purpose: 'קיבוץ/המואסטזיס בשיניים חלביות', color: 'bg-amber-950/80 text-amber-300 border-amber-500/30' }
    ],
    steps: [
      {
        title: 'שלב 1: אלחוש, בידוד בסכר גומי ופתיחת אקסס מלא',
        desc: 'הסרת כל גג לשכת המוך (Unroofing) עד להורדת כל הפרעות הנגישות.',
      },
      {
        title: 'שלב 2: כריתת מוך הכותרת (Coronal Amputation)',
        desc: 'הסרת כל רקמת המוך בלשכת הכותרת עד לגובה פתחי התעלות בלבד בעזרת Spoon excavator חד או מקדח עגול גדול.',
      },
      {
        title: 'שלב 3: חיטוי NaOCl ועצירת דימום בפתחי התעלות',
        desc: 'שטיפת הלשכה ב-NaOCl 2.5%-5.25% והנחת צמר גפן ספוג NaOCl ל-5 דקות מעל פתחי התעלות.',
        tip: 'אם הדימום מפתח תעלה מסוימת אינו נעצר -> מוך השורש באותה תעלה נמקי/דלקתי קשה -> יש לבצע פולפקטומי/טיפול שורש מלא!'
      },
      {
        title: 'שלב 4: הנחת שכבת הבראה ביו-אקטיבית (MTA / Biodentine)',
        desc: 'הנחת 3 מ"מ של MTA/Biodentine מעל פתחי התעלות בשיניים קבועות (או ZOE/MTA בשיניים חלביות).',
      },
      {
        title: 'שלב 5: שחזור כתר מיידי',
        desc: 'שחזור קומפוזיט / כתרי נירוסטה (SSC) בשיניים חלביות.'
      }
    ],
    clinicalTakeaway: 'בשניים צעירות עם שורש פתוח, פולפוטומי שלמה מאפשרת למוך השורש הבריא להמשיך לבנות את עובי קירות השורש ולהביא לסגירת האפקס (Apexogenesis).'
  },
  {
    id: 'pulpectomy',
    name: 'Pulpectomy',
    hebrewName: 'פולפקטומי (Pulpectomy - עקירת המוך בשלמותו)',
    pulpStatus: 'מוך נמקי או דלקתי בלתי הפיך (Necrosis / Irreversible Pulpitis)',
    apexStatus: 'שיניים חלביות (Primary Teeth) או עזרה ראשונה בשיניים קבועות',
    definition: 'הסרה מלאה ומוחלטת של כל רקמת המוך מלשכת הכותרת ומכל תעלות השורש עד לאפקס, ומילוי בחומר נספג (בשיניים חלביות) או חבישה זמנית (בשיניים קבועות).',
    indications: [
      'שיניים חלביות עם דלקת מוך בלתי הפיכה או נמק מוך (Necrosis).',
      'טיפול עזרה ראשונה דחופים בשיניים קבועות להקלת כאב עז לפני השלמת טיפול שורש מלא (Extirpation).'
    ],
    contraindications: [
      'ספיגת שורש פיזיולוגית/פתולוגית של יותר מ-1/3 מאורך השורש בשן חלבית.',
      'הרס כתר נרחב שלא ניתן לשחזר.'
    ],
    materialsNeeded: [
      { item: 'Hedstrom / K-Files ידוניים', purpose: 'סילוק מכני של רקמת המוך והזיהום מהתעלות', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' },
      { item: 'Vitapex / Endoflas / ZOE Paste', purpose: 'משחת Ca(OH)2 + Iodoform נספגת בשיניים חלביות (כדי לא לעכב בקיעה!)', color: 'bg-amber-950/80 text-amber-300 border-amber-500/30' }
    ],
    steps: [
      {
        title: 'שלב 1: אלחוש, סכר גומי ואקסס',
        desc: 'פתיחת גישה ישרה ללשכת המוך ואיתור פתחי התעלות.',
      },
      {
        title: 'שלב 2: עקירת המוך בשלמותו (Pulpectomy / Extirpation)',
        desc: 'החדרת פוצרים ידניים (K-File / Hedstrom) לתוך התעלות וניקוי רקמת המוך והזיהום.',
      },
      {
        title: 'שלב 3: שטיפה ב-NaOCl 1%-2.5%',
        desc: 'שטיפה עדינה בריכזור נמוך למניעת דליפה לרקמה הפריאפיקלית.',
      },
      {
        title: 'שלב 4: דחיסת משחת מילוי נספגת (בשיניים חלביות בלבד)',
        desc: 'דחיסת Vitapex (Calcium Hydroxide + Iodoform) או ZOE נספג לתעלות בעזרת Lentulo spiral.',
        tip: 'קריטי! בשן חלבית אסור להשתמש בגוטה-פרצ\'ה או סילר בלתי נספג המפריע לבקיעת השן הקבועה!'
      },
      {
        title: 'שלב 5: שחזור הכתר',
        desc: 'איטום במבנה/כתר טרומי (Stainless Steel Crown).'
      }
    ],
    clinicalTakeaway: 'בשיניים חלביות משתמשים אך ורק בחומרי מילוי תעלה נספגים (Resorbable materials) הנספגים יחד עם שורש השן החלבית.'
  },
  {
    id: 'rct',
    name: 'Root Canal Treatment (RCT)',
    hebrewName: 'טיפול שורש מלא (Root Canal Treatment - RCT)',
    pulpStatus: 'Irreversible Pulpitis / Necrosis / Revision (טיפול חוזר)',
    apexStatus: 'שורש סגור (Closed Apex)',
    definition: 'פרוטוקול אנדודונטי מלא הכולל אקסס, עיצוב מכני (Instrumentation), שטיפה חיטוי כימי (Irrigation) ואיטום תלת-מימדי של מערכת התעלות (Obturation).',
    indications: [
      'דלקת מוך בלתי הפיכה, נמק מוך, נגעי פריאפקס (Apical Periodontitis / Abscess).',
      'צורך בשיקום פרוסתטי (Post & Core) הדורש אחיזה בתעלה.'
    ],
    contraindications: [
      'שן שלא ניתן לשחזר פרוסתטית.',
      'שבר שורש אורכי (Vertical Root Fracture).',
      'תמיכה פריודונטלית אפסית.'
    ],
    materialsNeeded: [
      { item: 'פוצרים רוטטוריים NiTi (Protaper / WaveOne)', purpose: 'עיצוב קוני גמיש של התעלה', color: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/30' },
      { item: 'NaOCl 3-5.25% + EDTA 17%', purpose: 'חיטוי אורגני והסרת Smear Layer אנאורגני', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' },
      { item: 'Gutta-Percha + Bioceramic Sealer', purpose: 'איטום הרמטי תלת-מימדי בטכניקת כווץ חם או קרוס הידראולי', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' }
    ],
    steps: [
      {
        title: 'שלב 1: אקסס קורונלי (Access Cavity Preparation)',
        desc: 'פתיחת גישה קו-ישר (Straight-line access) ללשכת המוך, הסרת כל תקרת הדנטין ואיתור כל פתחי התעלות (כולל MB2, DL וכו\').',
      },
      {
        title: 'שלב 2: קביעת אורך עבודה (Working Length Determination)',
        desc: 'מדידה באפקס לוקטור אלקטרוני (EAL) למרחק 0.5-1 מ"מ מהאפקס הרדיוגרפי + אישוש בצילום רנטגן.',
      },
      {
        title: 'שלב 3: עיצוב מכני ושטיפה (Instrumentation & Irrigation)',
        desc: 'עיצוב בפוצרי NiTi בטכניקת Crown-Down, תוך שטיפה מתמדת ב-NaOCl 3-5% חם בין כל פוצר ופוצר.',
        tip: 'שטיפה סופית: 17% EDTA ל-1 דקה להסרת Smear Layer + שטיפת ביניים בסליין + 2% CHX במידת הצורך.'
      },
      {
        title: 'שלב 4: חבישת ביניים (Inter-appointment Dressing) במידת הצורך',
        desc: 'הנחת Ca(OH)2 ל-7-14 ימים במקרים של נמק מוך עם נגע פריאפיקלי או הפרשה מוגלתית מתמשכת.',
      },
      {
        title: 'שלב 5: איטום תעלת השורש (Obturation)',
        desc: 'ייבוש בפוצרי נייר סטריליים, התאמת Master Gutta-Percha Cone, והחדרה עם Bioceramic Sealer / AH Plus בשיטת Single Cone או Warm Vertical Condensation.'
      }
    ],
    clinicalTakeaway: 'החיטוי הכימי (NaOCl + EDTA) הוא הגורם המכריע בריפוי דלקת פריאפיקלית — הפוצרים המכניים רק מאפשרים לשטיפה להגיע לכל עומק מערכת התעלות!'
  },
  {
    id: 'regenerative',
    name: 'Regenerative Endodontics / Revascularization',
    hebrewName: 'אנדודונטיה רגרנטיבית (Regenerative Endodontics)',
    pulpStatus: 'מוך נמקי בשן צעירה (Necrosis in Immature Tooth)',
    apexStatus: 'שורש פתוח מאד (Wide Open Apex - Peewee Apex)',
    definition: 'פרוטוקול מבוסס הנדסת רקמות המשרה קריש דם (Blood Clot) בתעלה לשחרור תאי גזע (Stem Cells of Apical Papilla - SCAP) המביאים להמשך עיבוי קירות השורש וסגירת האפקס.',
    indications: [
      'שן קבועה צעירה עם מוך נמקי ושורש פתוח (Immature Permanent Tooth with Necrosis).',
      'קירות שורש דקים המיועדים לשבר (High fracture risk).'
    ],
    contraindications: [
      'שורש סגור לחלוטין.',
      'חוסר נגישות או הרס שחזורי שאינו מאפשר איטום קורונלי הרמטי.'
    ],
    materialsNeeded: [
      { item: 'NaOCl 1.5% עדין + EDTA 17%', purpose: 'חיטוי ללא פגיעה בתאי הגזע SCAP + שחרור פקטורי גידול מהדנטין', color: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/30' },
      { item: 'Triple / Double Antibiotic Paste (TAP/DAP) או Ca(OH)2', purpose: 'חיטוי תעלה ללא אקטיבציה מכאנית (בדרגת ריכוז נמוכה < 1mg/ml)', color: 'bg-amber-950/80 text-amber-300 border-amber-500/30' },
      { item: 'K-File #20 (לכריית דימום) + Collaplug + MTA/Biodentine', purpose: 'גירוי יצירת קריש דם ואטום ביו-אקטיבי', color: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' }
    ],
    steps: [
      {
        title: 'מפגש 1: חיטוי עדין ללא פוצרים (No Mechanical Instrumentation)',
        desc: 'אקסס, שטיפה עדינה ב-1.5% NaOCl (20 מ"ל) ללא הגעה לאפקס, שטיפה ב-17% EDTA, הנחת משחת חבישה TAP/DAP בריכוז נמוך ל-2-4 שבועות ואיטום זמני הרמטי.',
        tip: 'אסור לבצע עיצוב מכני (Instrumentation) של קירות התעלה הדקים כדי לא להחלישם עוד יותר!'
      },
      {
        title: 'מפגש 2: שטיפת החבישה ושחרור פקטורי גידול',
        desc: 'אלחוש ללא מצר כלי דם (Mepivacaine plain), שטיפה ב-17% EDTA 20 מ"ל לשחרור Growth Factors מרקמת הדנטין.',
      },
      {
        title: 'מפגש 2 (המשך): גירוי קריש דם (Blood Clot Induction)',
        desc: 'העברת פוצר K-File #20 מעבר לאפקס (Over-instrumentation 2 mm) לגירוי דימום מהאפקס ומילוי התעלה בדם עד 3-4 מ"מ מתחת לפתחה.',
      },
      {
        title: 'מפגש 2 (המשך): הנחת מטריצה ואטום ביו-אקטיבי',
        desc: 'הנחת ספוגית קולגן (Collaplug) מעל קריש הדם, והנחת 3 מ"מ MTA / Biodentine מעליה.',
      },
      {
        title: 'שלב 5: שחזור קומפוזיט הרמטי ומעקב רדיוגרפי',
        desc: 'שחזור כתר מיידי ומעקב רדיוגרפי מדי 6 חודשים לצפייה בעיבוי קירות השורש והתארכותו.'
      }
    ],
    clinicalTakeaway: 'אנדודונטיה רגרנטיבית היא הפרוטוקול היחיד שמאפשר התארכות ועיבוי של קירות שורש דקים בשניים צעירות!'
  }
];

export const ClinicalProtocolsView: React.FC = () => {
  const [activeProtocolId, setActiveProtocolId] = useState<string>('pulp_capping');

  const activeProtocol = PROTOCOLS_DATA.find(p => p.id === activeProtocolId) || PROTOCOLS_DATA[0];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-gradient-to-r from-slate-900 via-indigo-950/90 to-slate-900 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
              <Stethoscope className="w-4 h-4 text-indigo-400" />
              <span>מדריך פרוטוקולים קליניים ופרוצדורות אנדודונטיות 🩺</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">הבדלים, חומרים ופרוטוקולי עבודה שלב-אחר-שלב</h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-3xl">
              השוואה קלינית מקיפה בין פרוצדורות שמירת חיוניות המוך (VPT), פולפקטומי, טיפול שורש מלא (RCT) ואנדודונטיה רגרנטיבית.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/80 p-3 rounded-2xl border border-slate-800 text-xs text-slate-300">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
            <span>תואם הנחיות AAE / ESE 2026 לבחינות המומחיות</span>
          </div>
        </div>
      </div>

      {/* Protocol Selector Grid Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {PROTOCOLS_DATA.map((p) => {
          const isActive = p.id === activeProtocolId;
          return (
            <button
              key={p.id}
              onClick={() => setActiveProtocolId(p.id)}
              className={`p-3 rounded-2xl border text-right transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
              }`}
            >
              <div className="text-[11px] font-mono text-indigo-200/80 uppercase truncate">
                {p.name.split(' ')[0]}
              </div>
              <div className="text-xs sm:text-sm font-bold mt-1 line-clamp-2 leading-tight">
                {p.hebrewName.split('(')[0]}
              </div>
              {isActive && (
                <div className="mt-2 text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-extrabold text-white text-center">
                  פעיל כעת ⚡
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Main Selected Protocol Detail View */}
      <div className="space-y-6">
        
        {/* Card 1: Definition & Key Conditions */}
        <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-mono text-indigo-400 uppercase font-bold tracking-wider">{activeProtocol.name}</span>
              <h3 className="text-2xl font-black text-white">{activeProtocol.hebrewName}</h3>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30">
                מצב המוך: {activeProtocol.pulpStatus}
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                מצב האפקס: {activeProtocol.apexStatus}
              </span>
            </div>
          </div>

          <p className="text-slate-200 text-sm leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <span className="font-bold text-indigo-300">הגדרת הפרוצדורה: </span>
            {activeProtocol.definition}
          </p>

          {/* Indications vs Contraindications Grid */}
          <div className="grid md:grid-cols-2 gap-4 pt-2">
            
            {/* Indications */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
              <h4 className="text-sm font-extrabold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>אינדיקציות קליניות (תיאור מקרה)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeProtocol.indications.map((ind, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold shrink-0">•</span>
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contraindications */}
            <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-500/30 space-y-2">
              <h4 className="text-sm font-extrabold text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>קונטרה-אינדיקציות (מתי אסור לבצע)</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-200">
                {activeProtocol.contraindications.map((con, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold shrink-0">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

        {/* Card 2: Required Materials Checklist */}
        <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FlaskConical className="w-5 h-5 text-indigo-400" />
            <span>חומרים וציוד נדרש לפרוטוקול</span>
          </h3>

          <div className="grid sm:grid-cols-3 gap-3">
            {activeProtocol.materialsNeeded.map((mat, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${mat.color} space-y-1.5`}>
                <div className="font-extrabold text-sm flex items-center justify-between">
                  <span>{mat.item}</span>
                  <span className="text-[10px] opacity-75 font-mono">#{idx + 1}</span>
                </div>
                <p className="text-xs leading-normal opacity-90">{mat.purpose}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Step-by-Step Clinical Workflow Protocol */}
        <div className="glass-card rounded-3xl p-6 border border-slate-700/60 bg-slate-900/80 space-y-5">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>פרוטוקול עבודה קליני שלב-אחר-שלב (Clinical Workflow Steps)</span>
          </h3>

          <div className="space-y-4">
            {activeProtocol.steps.map((step, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-start gap-4">
                
                {/* Step Number Badge */}
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-700 text-white font-black text-sm flex items-center justify-center shrink-0 shadow-md">
                  {idx + 1}
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-extrabold text-white">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
                  
                  {step.tip && (
                    <div className="mt-2 text-xs bg-amber-950/50 text-amber-300 border border-amber-500/30 p-2.5 rounded-xl flex items-center gap-2 font-semibold">
                      <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>דגש קליני חטיבתי: {step.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom High-Yield Takeaway */}
          <div className="p-4 rounded-2xl bg-indigo-950/90 border border-indigo-500/40 flex items-center gap-3 text-xs text-indigo-200">
            <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0" />
            <div>
              <span className="font-extrabold text-emerald-300 text-sm">השורה התחתונה לבחינת המומחיות: </span>
              <span>{activeProtocol.clinicalTakeaway}</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
