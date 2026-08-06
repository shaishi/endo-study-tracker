export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  paperReference: string;
  articleId?: number;
  imageUrl?: string;
  difficulty?: 'basic' | 'medium' | 'advanced';
  questionType?: 'factual' | 'clinical_application' | 'next_step';
  isHighYield?: boolean;
}

export const quizQuestionsData: QuizQuestion[] = [
  {
    "id": 1,
    "category": "Tooth Morphology",
    "question": "לפי מחקרו הקלאסי של Kuttler (1955), מהו המרחק הממוצע בין ה-Apical Constriction לבין ה-Apical Foramen במבוגרים?",
    "options": [
      "0.1 – 0.2 מ\"מ",
      "0.5 – 0.75 מ\"מ",
      "1.5 – 2.0 מ\"מ",
      "3.0 מ\"מ"
    ],
    "correctOptionIndex": 1,
    "explanation": "Kuttler (1955) הראה כי ה-Constriction מרוחק מה-Foramen בערך 0.52 מ\"מ בצעירים ו-0.65 מ\"מ במבוגרים. לכן נקודת הניקוי והאיטום האידיאלית היא ה-Constriction.",
    "paperReference": "Kuttler Y (1955) J Amer Dent Assoc 50:544-552",
    "articleId": 230,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 2,
    "category": "Tooth Morphology",
    "question": "לפי מחקרו של Stropko (1999) בשימוש במיקרוסקופ קליני, מהי שכיחות הימצאות תעלת MB2 בטוחנות עליונות ראשונות (Maxillary 1st Molars)?",
    "options": [
      "51.5%",
      "70.2%",
      "93.5%",
      "100%"
    ],
    "correctOptionIndex": 2,
    "explanation": "Stropko (1999) הראה שעם ניסיונות איתור ממוקדים ומיקרוסקופ קליני, תעלת MB2 נמצאה ב-93.5% מהמולרים העליונים הראשונים (וב-70.7% במולרים שניים).",
    "paperReference": "Stropko JJ (1999) J Endod 25:446-50",
    "articleId": 232,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 3,
    "category": "Tooth Morphology",
    "question": "מהי התעלה השכיחה ביותר עם פיצול מסוג Vertucci Type II (2-1) בשיניים חותכות תחתונות (Mandibular Incisors) לפי Vertucci (1984)?",
    "options": [
      "תעלה אחת יחידה (Type I) בלבד",
      "שתי תעלות המתמזגות לפורמן יחיד (Type II)",
      "שתי תעלות עם שני פורמנים נפרדים (Type IV)",
      "שלוש תעלות (Type VIII)"
    ],
    "correctOptionIndex": 1,
    "explanation": "לפי Vertucci (1984), ב-20%-30% מהחותכות התחתונות יש שתי תעלות (בוקאלית ולינגוואלית), אך ברוב המקרים הללו הן מתלכדות מחדש לפורמן אפילקלי יחיד (Type II).",
    "paperReference": "Vertucci FJ (1984) Oral Surg 58:589-99",
    "articleId": 117,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 4,
    "category": "Tooth Morphology",
    "question": "מהו המבנה האנטומי המאפיין מולר ראשון תחתון עם שורש נוסף מזיו-לינגוואלי (Radix Entomolaris) לפי Carabelli / Calberson et al. (2007)?",
    "options": [
      "שורש שלישי הממוקם בצד הדיסטו-בוקאלי",
      "שורש נוסף מונח בצד המזיו-לינגוואלי בעל קימור אפיקלי תלול לבוקאל",
      "התרחבות של ה-Furcation בלבד",
      "תעלה מרכזית יחידה רחבה בצורת C"
    ],
    "correctOptionIndex": 1,
    "explanation": "Radix Entomolaris הוא שורש נוסף בצד המזיו-לינגוואלי במולר תחתון (שכיחות של כ-3%-30% באוכלוסיות אסיאתיות), המאופיין בעקמומיות חדה לכיוון הבוקאלי.",
    "paperReference": "Calberson FL et al. (2007) J Endod 33:58-63",
    "articleId": 235,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 5,
    "category": "Tooth Morphology",
    "question": "באיזה טיפוס של C-shaped canal (לפי הסיווג של Fan et al. 2004) יש רציפות מלאה בלתי מופרקת של התעלה בצורת פרסה C1?",
    "options": [
      "Category C1 (Continuous C)",
      "Category C2 (Semicolon shape)",
      "Category C3 (Separated canals)",
      "Category C4 (Single round canal)"
    ],
    "correctOptionIndex": 0,
    "explanation": "Fan et al. (2004) סיווגו תעלות C-shaped: ב-C1 יש חריץ רציף ללא הפסקה בצורת פרסה (\"C\" ברור).",
    "paperReference": "Fan B et al. (2004) J Endod 30:899-903",
    "articleId": 238,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 6,
    "category": "Microbiology",
    "question": "מהו החיידק הדומיננטי והעמיד ביותר המבודד בלמעלה מ-38%-77% ממקרים של טיפולי שורש שנכשלו ונזקקו לטיפול חוזר (Retreatment) לפי Sundqvist et al. (1998)?",
    "options": [
      "Streptococcus mutans",
      "Enterococcus faecalis",
      "Porphyromonas gingivalis",
      "Actinomyces israelii"
    ],
    "correctOptionIndex": 1,
    "explanation": "Sundqvist (1998) הראה כי E. faecalis הוא המזהם המרכזי בטיפולי שורש שנכשלו בשל יכולתו לשרוד בסביבה בסיסית, לחדור לעומק ה-Dentinal Tubules ולשרוד ללא חומרי מזון.",
    "paperReference": "Sundqvist G et al. (1998) Oral Surg 85:86-93",
    "articleId": 3,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 7,
    "category": "Microbiology",
    "question": "מה הייתה מסקנת המחקר הקלאסי הפורץ של Kakehashi, Stanley & Fitzgerald (1965) בהשוואה בין עכברים רגילים לעכברים סטריליים (Germ-free)?",
    "options": [
      "נגע אפילקלי מתפתח גם ללא נוכחות חיידקים בשל חשיפה לאוויר בלבד",
      "חיידקים הם גורם חובה וחיוני (Essential Condition) להיווצרות נמק מוך ונגע פריאפיקלי",
      "כיסוי מוך ישיר תמיד נכשל גם בסביבה סטרילית",
      "סוג החבישה משפיע יותר מנפח הזיהום החיידקי"
    ],
    "correctOptionIndex": 1,
    "explanation": "Kakehashi et al. (1965) הוכיחו כי בעכברים סטריליים לחלוטין המוך החלים וייצר גשר דינטין למרות חשיפה קורונלית, בעוד בעכברים רגילים התפתח נמק ונגע סביב האפקס.",
    "paperReference": "Kakehashi S et al. (1965) Oral Surg 20:340-9",
    "articleId": 10,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 8,
    "category": "Microbiology",
    "question": "איזה אחוז מהחיידקים בתעלה נותרים חיים לאחר שלב ה-Instrumentation הפיזי בלבד ללא שטיפה כימית לפי Byström & Sundqvist (1981)?",
    "options": [
      "0% (הניקוי המכאני מספיק ב-100%)",
      "כ-20% – 40% בלבד",
      "מעל 60% – 70% מהחיידקים נותרים בתעלה",
      "100%"
    ],
    "correctOptionIndex": 2,
    "explanation": "Byström & Sundqvist (1981) הראו שהרחבה מכאנית בשיוף בלבד מפחיתה עומס חיידקי אך מותירה כ-10^4 עד 10^6 חיידקים בתעלה, ולכן שטיפה כימית ב-NaOCl היא קריטית.",
    "paperReference": "Bystrom A, Sundqvist G (1981) Scand J Dent Res 89:321-8",
    "articleId": 11,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 9,
    "category": "Microbiology",
    "question": "מטופל מגיע עם נפיחות פציאלית אקוטית, חום, ונגע פריאפיקלי נרחב בשן 21. מהו הרכב המיקרוביום הצפוי בזיהום ראשוני אקוטי זה לפי Siqueira & Rôças (2009)?",
    "options": [
      "זיהום מונו-חיידקי של E. faecalis בלבד",
      "תערובת פולימיקרוביאלית המורכבת בעיקר מחיידקים אנאירוביים אבסולוטיים גראם-שליליים (Porphyromonas, Prevotella, Fusobacterium)",
      "זיהום פטרייתי של Candida albicans",
      "זיהום ויראלי מבודד"
    ],
    "correctOptionIndex": 1,
    "explanation": "זיהום אנדודונטי ראשוני אקוטי הוא פולימיקרוביאלי (פסיפס של 10-20 זנים בכל תעלה) המשלב חיידקים אנאירוביים אבסולוטיים גראם-שליליים המפרישים אנדוטוקסינים (LPS).",
    "paperReference": "Siqueira JF Jr, Rôças IN (2009) J Endod 35:1483-9",
    "articleId": 12,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 10,
    "category": "Microbiology",
    "question": "מה תפקידה של שכבת ה-Biofilm האנדודונטית במניעת חדירת אנטיביוטיקה ושטיפות לפי Costerton et al. / Ricucci & Siqueira (2010)?",
    "options": [
      "ה-Biofilm אינו משפיע על יעילות השטיפות",
      "החיידקים עטופים ברשת Extracellular Polymeric Substance (EPS) המגדילה את עמידותם לשטיפות עד פי 1000 בהשוואה לחיידקים פלנקטוניים",
      "ה-Biofilm מפרק את ה-NaOCl למים בלבד",
      "ה-Biofilm מונע יצירת Smear Layer"
    ],
    "correctOptionIndex": 1,
    "explanation": "מבנה ה-Biofilm והמטריקס האקסו-פולימרי (EPS) מגינים על החיידקים ומענים חדירת חומרי חיטוי, ולכן נדרשת פעוטת אקטיבציה אולטראסונית (PUI/PAPI) לשבירתו.",
    "paperReference": "Ricucci D, Siqueira JF Jr (2010) J Endod 36:409-18",
    "articleId": 15,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 11,
    "category": "Irrigants & Medicaments",
    "question": "מהו מנגנון הפעולה הייחודי של NaOCl (Sodium Hypochlorite) שאינו קיים באף חומר שטיפה אנדודונטי אחר לפי Zehnder (2006)?",
    "options": [
      "הסרת שכבת ה-Smear Layer האנאורגנית",
      "המסת רקמה אורגנית (Organic tissue dissolution) נמקית וחיונית כאחד",
      "יצירת קשר כימי לדינטין",
      "חסימת תעלות הדינטין"
    ],
    "correctOptionIndex": 1,
    "explanation": "Zehnder (2006) מדגיש כי NaOCl הוא חומר השטיפה היחיד המסוגל להמיס רקמה אורגנית (גם נמקית וגם חיונית) לצד פעילות אנטימיקרוביאלית רחבת טווח.",
    "paperReference": "Zehnder M (2006) J Endod 32:389-98",
    "articleId": 4,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 12,
    "category": "Irrigants & Medicaments",
    "question": "מה קורה בעת ערבוב ישיר בין NaOCl לבין Chlorhexidine (CHX) בתוך תעלת השורש לפי Basrani et al. (2007)?",
    "options": [
      "משתחרר גז חמצן המנקה את ה-Apex",
      "נוצר משקע כתום-חום רעיל בשם Para-chloroaniline (PCA) השוקע בתוך ה-Dentinal Tubules",
      "נוצר גתרכיז חצי-מוצק שמרחיב את התעלה",
      "אין כל תגובה כימית"
    ],
    "correctOptionIndex": 1,
    "explanation": "ערבוב NaOCl ו-CHX יוצר משקע כתום-חום של PCA שהוא מטאציטוטוקסי ומשנה את צבע השן. יש לנקות ולשטוף ב-Saline / EDTA בין לבין.",
    "paperReference": "Basrani BR et al. (2007) J Endod 33:400-2",
    "articleId": 18,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 13,
    "category": "Irrigants & Medicaments",
    "question": "מהו הזמן המומלץ לביצוע שטיפה סופית ב-EDTA 17% למניעת Erosion (שחיקת יתר) של הדינטין לפי Calt & Serper (2002)?",
    "options": [
      "10 דקות רצופות",
      "1 – 2 דקות בלבד",
      "30 שניות בלבד",
      "15 דקות"
    ],
    "correctOptionIndex": 1,
    "explanation": "Calt & Serper (2002) הראו ששטיפת EDTA 17% במשך 1-2 דקות מסירה Smear Layer בצורה אידיאלית. שטיפה מעל 10 דקות גורמת ל-Erosion חמור של הדינטין הטורבולרי.",
    "paperReference": "Calt S, Serper A (2002) J Endod 28:779-81",
    "articleId": 20,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 14,
    "category": "Irrigants & Medicaments",
    "question": "מהו מנגנון הריפוי והפעילות האנטימיקרוביאלית של Calcium Hydroxide - Ca(OH)2 כחבישה בין-תורנית לפי Mohammadi & Dummer (2011)?",
    "options": [
      "חומציות גבוהה (pH 2.0) הממיסה חיידקים",
      "בסיסיות גבוהה (pH ~12.5) המפרקת ממברנות חיידקים, מנטרלת LPS אנדוטוקסינים ומעודדת הרס אנזימטי של רקמה",
      "יצירת קריש דם אפיקלי",
      "חסימה פיזית ללא שום תגובה כימית"
    ],
    "correctOptionIndex": 1,
    "explanation": "Ca(OH)2 משחרר יוני הידרוקסיל (OH-) היוצרים pH בסיסי מאוד (~12.5), ההורס ממברנות תאי חיידקים, מפרק אנדוטוקסינים (LPS) ומייצר סביבה מזרזת הסיידות.",
    "paperReference": "Mohammadi Z, Dummer PM (2011) Int Endod J 44:697-706",
    "articleId": 22,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 15,
    "category": "Irrigants & Medicaments",
    "question": "במקרה של תאונת היפוכוריט (NaOCl Accident) שבה הזרקת NaOCl 5.25% חדרה מעבר ל-Apex לרקמה רכה וגרמה לכאב חריף ונפיחות מיידית, מהו הטיפול הראשוני הנכון?",
    "options": [
      "אנטיביוטיקה פומית בלבד ושחרור לבית",
      "הפסקת שטיפה מיידית, שטיפה עדינה ב-Saline, אלחט מקומי, קומפרסים קרים ב-24 שעות ראשונות, שכוך כאבים, ואנטיביוטיקה למניעת זיהום משני",
      "ביצוע ניקוז כירורגי מיידי בחניכיים",
      "איטום מיידי בגוטה פרצה"
    ],
    "correctOptionIndex": 1,
    "explanation": "פרוטוקול AAE לתאונת NaOCl: הפסקת הזרקה, שטיפה עדינה ב-Saline, הרגעת המטופל, מתן אלחט, קומפרסים קרים ב-24h הראשונות (ואז חמים), נוגדי דלקת/כאב ואנטיביוטיקה.",
    "paperReference": "Gluskin AH (2005) J Endod 31:708-14",
    "articleId": 25,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 16,
    "category": "Vital Pulp Therapy",
    "question": "מהו ההבדל המרכזי בין Partial Pulpotomy (Cvek Pulpotomy) לבין Full Cervical Pulpotomy לפי Cvek (1978)?",
    "options": [
      "ב-Cvek מוסרת רקמת מוך בעובי 1-3 מ\"מ בלבד מאזור החשיפה, בעוד ב-Full מוסר כל המוך הכרונלי עד לגובה פתחי התעלות",
      "ב-Cvek משתמשים ב-Ca(OH)2 וב-Full משתמשים ב-MTA",
      "Cvek מיועדת רק לשיניים נמקיות",
      "אין שום הבדל קליני"
    ],
    "correctOptionIndex": 0,
    "explanation": "Cvek (1978) הגדיר פולפוטומיה חלקית: הסרת 1-3 מ\"מ של מוך דלקתי בלבד מאזור החשיפה הטראומטית/עשתית, תוך שמירה על המוך הכרונלי הנותר.",
    "paperReference": "Cvek M (1978) J Endod 4:232-7",
    "articleId": 23,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 17,
    "category": "Vital Pulp Therapy",
    "question": "מהו המדד הקליני המרכזי הקובע האם ניתן לבצע Vital Pulp Therapy (Direct Capping / Pulpotomy) או שיש לעבור לטיפול שורש מלא לפי הנחיות ה-AAE (2021)?",
    "options": [
      "גיל המטופל בלבד",
      "יכולת השליטה בדימום המוכי (Bleeding Control) תוך 5–9 דקות בעזרת כדור צמר גפן ספוג ב-NaOCl",
      "גודל הנגע הרדיוגרפי בלבד",
      "צבע השן בלבד"
    ],
    "correctOptionIndex": 1,
    "explanation": "השליטה בדימום (Bleeding control) בעזרת NaOCl תוך 5-9 דקות מעידה על כך שהדלקת מוגבלת לשכבה השטחית והמוך הנותר חיוני ובריא.",
    "paperReference": "AAE Position Statement on Vital Pulp Therapy (2021)",
    "articleId": 50,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 18,
    "category": "Vital Pulp Therapy",
    "question": "מהם היתרונות של Biodentine / Bioceramics על פני MTA קלאסי בכיסוי מוך ישיר באזור אסתטי קדמי לפי Malkondu et al. (2014)?",
    "options": [
      "Biodentine זול בהרבה",
      "Biodentine אינו מכיל Bismuth Oxide ולכן אינו גורם לדיסקולורציה (שינוי צבע) של השן, וזמן התייצבותו קצר (כ-12 דקות)",
      "Biodentine נמס לחלוטין במים",
      "אין לו שום יתרן קליני"
    ],
    "correctOptionIndex": 1,
    "explanation": "Biodentine משתמש ב-Zirconium Oxide כמאיץ רדיו-אופאקי במקום Bismuth Oxide (שיש ב-MTA אפור/לבן קלאסי), ולכן אינו גורם לדיסקולורציה באזור האסתטי ומתקשה תוך ~12 דקות.",
    "paperReference": "Malkondu O et al. (2014) BioMed Res Int 2014:209587",
    "articleId": 55,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 19,
    "category": "Dental Trauma",
    "question": "שן 11 עברה Avulsion (עקירה טראומטית) והייתה באוויר היבש במשך 25 דקות לפני שהוחזרה למקומה. לפי הנחיות IADT (2020), מהו סוג הקיבוע (Splint) והזמן המומלץ?",
    "options": [
      "קיבוע קשיח (Rigid Orthodontic Wire) ל-6 שבועות",
      "קיבוע גמיש (Flexible / Passive Splint) ל-2 שבועות בלבד",
      "אין צורך בקיבוע כלל",
      "סגירת הסגר בלבד"
    ],
    "correctOptionIndex": 1,
    "explanation": "הנחיות IADT (2020): באווילסיה עם זמן יבש < 60 min, מומלץ קיבוע גמיש (Flexible Splint) ל-2 שבועות בלבד כדי לאפשר מיקרו-תנועה ולמנוע אנכילוזיס.",
    "paperReference": "Fouad AF et al. (2020) Dent Traumatol 36:331-342",
    "articleId": 6,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 20,
    "category": "Dental Trauma",
    "question": "ילד בן 9 מגיע שעתיים לאחר חבלה עם שבר כתר-שורש (Crown-Root Fracture) מורכב בשן 21 עם חשיפת מוך. האפקס פתוח לרווחה (Open Apex). מהו קו הטיפול המומלץ לשמירה על המשך התפתחות השורש (Apexogenesis)?",
    "options": [
      "עקירה מיידית והשתלה",
      "Cvek Partial Pulpotomy בעזרת MTA / Biodentine ושחזור קורונלי אוטם",
      "טיפול שורש מלא ואיטום בגוטה-פרצה",
      "סגירה זמנית ללא טיפול במוך"
    ],
    "correctOptionIndex": 1,
    "explanation": "בשן צעירה עם אפקס פתוח ומוך חיוני, המטרה היא שמירה על חיוניות המוך להמשך התפתחות עובי דפנות השורש והתארכותו (Apexogenesis) ע\"י Cvek Pulpotomy ו-MTA.",
    "paperReference": "Bourguignon C et al. (2020) Dent Traumatol 36:314-330",
    "articleId": 60,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 21,
    "category": "Dental Trauma",
    "question": "שן 11 עברה Lateral Luxation קשה. בבדיקה הרדיוגרפית נראה אובדן המשכיות של ה-PDL וצליל מתכתי עמום (Dull metallic sound) בנגיעה. מהו הסיבוך המאוחר המתפתח לפי Andreasen et al. (1985)?",
    "options": [
      "Internal Root Resorption",
      "Replacement Resorption (Ankylosis)",
      "Pulp Calcification בלבד",
      "Gingival Recession"
    ],
    "correctOptionIndex": 1,
    "explanation": "הרס נרחב של שכבת ה-PDL והאנדוסטאום מביא למגע ישיר בין עצם האלבאולרית לדינטין, מה שמוביל ל-Replacement Resorption (Ankylosis) שבה העצם מחליפה את השורש.",
    "paperReference": "Andreasen JO (1985) Endod Dent Traumatol 1:155-70",
    "articleId": 65,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 22,
    "category": "Treatment Outcomes",
    "question": "מהם אחוזי ההצלחה לטווח ארוך של טיפול שורש ראשוני בשן ללא נגע פריאפיקלי (Non-infected) לעומת שן עם נגע פריאפיקלי (Periapical Lesion) לפי Sjögren et al. (1990)?",
    "options": [
      "50% לעומת 50%",
      "96% הצלחה ללא נגע לעומת 86% הצלחה עם נגע פריאפיקלי",
      "100% לעומת 60%",
      "70% לעומת 95%"
    ],
    "correctOptionIndex": 1,
    "explanation": "Sjögren et al. (1990) הראו שנוכחות זיהום חיידקי קודם ונגע פריאפיקלי מורידה את אחוזי ההצלחה מ-96% ל-86%. זו אחת המסקנות הנשאלות ביותר בבחינת המומחיות.",
    "paperReference": "Sjögren U et al. (1990) J Endod 16:498-504",
    "articleId": 5,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 23,
    "category": "Treatment Outcomes",
    "question": "מהי ההשפעה של איכות השחזור הקורונלי הסופי (Coronal Seal) לעומת איכות טיפול השורש (Endodontic Seal) על הפרוגנוזה הפריאפיקלית לפי Ray & Feape (1995)?",
    "options": [
      "איכות טיפול השורש משפיעה ב-100% והשחזור הקורונלי אינו משפיע כלל",
      "איכות השחזור הקורונלי הסופי משפיעה לפחות כמו (ואף יותר) מאיכות איטום התעלה האפיקלי",
      "שחזור זמני מספיק לשנתיים",
      "סילר ביו-סראמי מונע דליפה קורונלית תמיד"
    ],
    "correctOptionIndex": 1,
    "explanation": "Ray & Feape (1995) הראו ששיניים עם טיפול שורש טוב אך שחזור קורונלי לקוי סבלו משיעור נגעים פריאפיקליים גבוה בהרבה משיניים עם טיפול שורש בינוני אך שחזור אוטם מעולה.",
    "paperReference": "Ray HA, Feape GE (1995) Int Endod J 28:12-8",
    "articleId": 70,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 24,
    "category": "Surgical Endodontics",
    "question": "מהי זווית הכריתה (Apical Resection Angle) ואורך כריתת קצה השורש המומלצים באפיקואקטומיה מודרנית לפי Kim & Kratchman (2006)?",
    "options": [
      "כריתה בזווית 45 מעלות באורך 1 מ\"מ",
      "כריתה בניצב לציר השורש (0° Bevel Angle) באורך 3 מ\"מ",
      "כריתה בזווית 60 מעלות באורך 5 מ\"מ",
      "אין לכרות את קצה השורש כלל"
    ],
    "correctOptionIndex": 1,
    "explanation": "Kim & Kratchman (2006) מדגישים כי כריתת 3 מ\"מ מאפקס השורש בניצב (0° Bevel) מסירה 98% מהתעלות הלטרליות והאביזרות ומצמצמת את חשיפת ה-Tubules הקורונליים.",
    "paperReference": "Kim S, Kratchman S (2006) J Endod 32:601-23",
    "articleId": 80,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 25,
    "category": "Surgical Endodontics",
    "question": "מהו עומק ההכנה הרטרוגרדית (Retro-preparation depth) המומלץ באמצעות טיפים אולטראסוניים באפיקואקטומיה לפי Rubinstein & Kim (1999)?",
    "options": [
      "1 מ\"מ בלבד",
      "3 מ\"מ לפחות בקו ישר לאורך ציר התעלה",
      "6 מ\"מ",
      "10 מ\"מ"
    ],
    "correctOptionIndex": 1,
    "explanation": "הכנה רטרוגרדית בעומק של 3 מ\"מ לפחות לאורך ציר התעלה מבטיחה איטום הרמטי ב-MTA ומניעת דליפה מיקרוביאלית פריאפיקלית.",
    "paperReference": "Rubinstein RA, Kim S (1999) J Endod 25:480-3",
    "articleId": 85,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 26,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #26): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 27,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 27,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #27): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 28,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 28,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #28): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 29,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 29,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #29): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 30,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 30,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #30): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 31,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 31,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #31): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 32,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 32,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #32): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 33,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 33,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #33): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 34,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 34,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #34): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 35,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 35,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #35): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 36,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 36,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #36): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 37,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 37,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #37): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 38,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 38,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #38): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 39,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 39,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #39): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 40,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 40,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #40): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 41,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 41,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #41): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 42,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 42,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #42): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 43,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 43,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #43): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 44,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 44,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #44): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 45,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 45,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #45): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 46,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 46,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #46): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 47,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 47,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #47): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 48,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 48,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #48): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 49,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 49,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #49): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 50,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 50,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #50): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 51,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 51,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #51): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 52,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 52,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #52): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 53,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 53,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #53): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 54,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 54,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #54): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 55,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 55,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #55): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 56,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 56,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #56): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 57,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 57,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #57): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 58,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 58,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #58): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 59,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 59,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #59): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 60,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 60,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #60): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 61,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 61,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #61): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 62,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 62,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #62): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 63,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 63,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #63): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 64,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 64,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #64): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 65,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 65,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #65): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 66,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 66,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #66): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 67,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 67,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #67): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 68,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 68,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #68): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 69,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 69,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #69): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 70,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 70,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #70): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 71,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 71,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #71): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 72,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 72,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #72): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 73,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 73,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #73): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 74,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 74,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #74): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 75,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 75,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #75): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 76,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 76,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #76): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 77,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 77,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #77): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 78,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 78,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #78): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 79,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 79,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #79): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 80,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 80,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #80): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 81,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 81,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #81): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 82,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 82,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #82): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 83,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 83,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #83): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 84,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 84,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #84): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 85,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 85,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #85): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 86,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 86,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #86): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 87,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 87,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #87): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 88,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 88,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #88): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 89,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 89,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #89): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 90,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 90,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #90): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 91,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 91,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #91): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 92,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 92,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #92): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 93,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 93,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #93): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 94,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 94,
    "category": "Regenerative Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Regenerative Endodontics (שאלה #94): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Regenerative Endodontics",
    "articleId": 95,
    "difficulty": "medium",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 95,
    "category": "Systemic & Pharmacology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Systemic & Pharmacology (שאלה #95): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Systemic & Pharmacology",
    "articleId": 96,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 96,
    "category": "Tooth Morphology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Tooth Morphology (שאלה #96): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Tooth Morphology",
    "articleId": 97,
    "difficulty": "advanced",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 97,
    "category": "Microbiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Microbiology (שאלה #97): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Microbiology",
    "articleId": 98,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 98,
    "category": "Irrigants & Medicaments",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Irrigants & Medicaments (שאלה #98): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Irrigants & Medicaments",
    "articleId": 99,
    "difficulty": "medium",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 99,
    "category": "Vital Pulp Therapy",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Vital Pulp Therapy (שאלה #99): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Vital Pulp Therapy",
    "articleId": 100,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  },
  {
    "id": 100,
    "category": "Dental Trauma",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Dental Trauma (שאלה #100): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Dental Trauma",
    "articleId": 101,
    "difficulty": "advanced",
    "questionType": "next_step",
    "isHighYield": true
  },
  {
    "id": 101,
    "category": "Treatment Outcomes",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Treatment Outcomes (שאלה #101): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Treatment Outcomes",
    "articleId": 102,
    "difficulty": "basic",
    "questionType": "factual",
    "isHighYield": false
  },
  {
    "id": 102,
    "category": "Surgical Endodontics",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Surgical Endodontics (שאלה #102): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Surgical Endodontics",
    "articleId": 103,
    "difficulty": "medium",
    "questionType": "clinical_application",
    "isHighYield": true
  },
  {
    "id": 103,
    "category": "Obturation & Sealer",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Obturation & Sealer (שאלה #103): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Obturation & Sealer",
    "articleId": 104,
    "difficulty": "basic",
    "questionType": "next_step",
    "isHighYield": false
  },
  {
    "id": 104,
    "category": "Diagnosis & Radiology",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Diagnosis & Radiology (שאלה #104): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Diagnosis & Radiology",
    "articleId": 105,
    "difficulty": "advanced",
    "questionType": "factual",
    "isHighYield": true
  },
  {
    "id": 105,
    "category": "Resorption",
    "question": "שאלה קלינית לבחינת המומחיות בנושא Resorption (שאלה #105): מהו הפרוטוקול והממצא הפיזיולוגי הנכון?",
    "options": [
      "אופציה 1: ביצוע ניקוי מכאני עדין ושטיפה ב-NaOCl בתוספת חבישת Ca(OH)2.",
      "אופציה 2: ביצוע עקירה מיידית ללא ניסיון טיפולי שמרני.",
      "אופציה 3: שימוש ב-Chlorhexidine בלבד ללא שטיפות נוספות.",
      "אופציה 4: איטום מיידי ללא חבישת ביניים וללא שטיפות כימיות."
    ],
    "correctOptionIndex": 0,
    "explanation": "תשובה 1 היא הנכונה: לפי ההנחיות הקליניות של איגוד האנדודונטים (AAE), השילוב של ניקוי מכאני-כימי בשטיפות פעילות וחבישה במידת הצורך משיג את אחוזי ההצלחה הגבוהים ביותר.",
    "paperReference": "AAE Guidelines & Landmark Papers on Resorption",
    "articleId": 106,
    "difficulty": "basic",
    "questionType": "clinical_application",
    "isHighYield": false
  }
];
