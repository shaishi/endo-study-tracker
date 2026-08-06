export interface Flashcard {
  id: number;
  category: string;
  question: string;
  answer: string;
  keyTakeaway: string;
  paperCitation?: string;
  pubMedUrl?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export const flashcardsData: Flashcard[] = [
  {
    id: 1,
    category: 'Tooth Morphology & Anatomy',
    question: 'מה המרחק הממוצע בין ה-Apical Foramen ל-Apical Constriction לפי המאמר הקלאסי של Kuttler (1950)?',
    answer: 'בצעירים המרחק הוא כ-0.52 מ"מ, ובמבוגרים הוא כ-0.65 מ"מ (בממוצע 0.5–0.75 מ"מ). נקודת ה-Constriction היא המוצרת ביותר בתעלה.',
    keyTakeaway: 'Kuttler (1950): נקודת הסיום האידיאלית לניקוי ואיטום היא ה-Apical Constriction ולא ה-Radiographic Apex.',
    paperCitation: 'Kuttler Y (1950) Microscopic investigation of root apices. J Amer Dent Assoc 50:544-52.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/15410940/'
  },
  {
    id: 2,
    category: 'Tooth Morphology & Anatomy',
    question: 'מהם 8 הטיפוסים של אנטומיית תעלות שורש לפי הסיווג של Vertucci (1984)?',
    answer: 'Type I (1), Type II (2-1), Type III (1-2-1), Type IV (2), Type V (1-2), Type VI (2-1-2), Type VII (1-2-1-2), Type VIII (3).',
    keyTakeaway: 'Vertucci (1984): הוכח ששכיחות תעלה שנייה בורש המזיו-בוקאלי (MB2) במולרים עליונים ראשונים עולה על 55%-90%.',
    paperCitation: 'Vertucci FJ (1984) Root canal anatomy of the human permanent teeth. Oral Surg Oral Med Oral Pathol 58:589-99.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/6595621/'
  },
  {
    id: 3,
    category: 'Microbiology & Pathology',
    question: 'מהו החיידק הדומיננטי והעמיד ביותר בזיהומים אנדודונטיים שניוניים (Secondary / Persistent Infections) לפי Sundqvist et al. (1998)?',
    answer: 'Enterococcus faecalis (E. faecalis) — חיידק גראם-חיובי, פקולטטיבי, העמיד לסביבה בסיסית של Ca(OH)2 ומסוגל לחדור לעומק Tubules הדינטין.',
    keyTakeaway: 'Sundqvist (1998): E. faecalis מבודד בלמעלה מ-38%-77% ממקרים של טיפולי שורש שנכשלו ונזקקו לטיפול חוזר (Retreatment).',
    paperCitation: 'Sundqvist G et al. (1998) Microbiologic analysis of teeth with failed endodontic treatment. Oral Surg 85:86-93.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/9474620/'
  },
  {
    id: 4,
    category: 'Irrigants & Medicaments',
    question: 'מהו מנגנון הפעולה של EDTA 17% ומדוע משלבים אותו עם NaOCl בטיפול שורש?',
    answer: 'EDTA הוא Chelating Agent שממיס רכיבים אנאורגניים בלבד ומסיר את שכבת ה-Smear Layer. NaOCl ממיס רקמה אורגנית וחיידקים. השילוב מנקה לחלוטין את הדינטין.',
    keyTakeaway: 'זמן מומלץ לשטיפת EDTA 17% הוא 1–2 דקות בלבד. שטיפה ממושכת מדי מביאה ל-Erosion של הדינטין הטורבולרי.',
    paperCitation: 'Zehnder M (2006) Root canal irrigants. J Endod 32:389-98.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/16631835/'
  },
  {
    id: 5,
    category: 'Treatment Outcomes',
    question: 'מהם אחוזי ההצלחה של טיפול שורש ראשוני בשן ללא נגע אפילקלי לעומת שן עם נגע אפילקלי לפי Sjögren et al. (1990)?',
    answer: 'ללא נגע אפילקלי (Vital / Non-infected): 96% הצלחה. עם נגע אפילקלי (Periapical lesion): 86% הצלחה בלבד.',
    keyTakeaway: 'Sjögren (1990): נוכחות זיהום חיידקי ונגע סביב ה-Apex היא הפקטור הפרוגנוסטי המרכזי שמשפיע על אחוזי ההצלחה.',
    paperCitation: 'Sjögren U et al. (1990) Factors affecting the long-term results of endodontic treatment. J Endod 16:498-504.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/2084204/'
  },
  {
    id: 6,
    category: 'Dental Trauma',
    question: 'מהו הזמן הקריטי החוץ-פה (Extra-oral dry time) באווילסיה (Avulsion) של שן קבועה לשמירה על חיוניות ה-Periodontal Ligament (PDL)?',
    answer: 'פחות מ-60 דקות (אידיאלי פחות מ-15–20 דקות). לאחר 60 דקות יבש, תאי ה-PDL עוברים נמק מוחלט ונגרמת Replacement Resorption (Ankylosis).',
    keyTakeaway: 'AAE / IADT Guidelines: שן שעברה Avulsion והייתה יבשה מעל 60 דקות מוחזרת לאחר טיפול ב-Fluoride / Emdogain וקיבוע רך ל-2 שבועות.',
    paperCitation: 'Fouad AF et al. (2020) International Association of Dental Traumatology guidelines for the management of traumatic dental injuries: 2. Avulsion. Dent Traumatol 36:331-342.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/32460393/'
  },
  {
    id: 7,
    category: 'Vital Pulp Therapy & Materials',
    question: 'מהם היתרונות של Mineral Trioxide Aggregate (MTA) על פני Calcium Hydroxide בטיפולי כיסוי מוך ישיר (Direct Pulp Capping)?',
    answer: 'MTA מייצר Dentin Bridge עבה והרמטי יותר ללא Tunnel Defects, בעל איטום מיקרוסקופי מעולה (Bioceramic) ואינו נמס עם הזמן.',
    keyTakeaway: 'Li et al. / AAE Position Statement: MTA וביו-סרמיקים משיגים אחוזי הצלחה של 85%-93% בכיסוי מוך ישיר ופולפוטומיה בשניים קבועות.',
    paperCitation: 'Torabinejad M et al. (1995) Comparative investigation of marginal adaptation of mineral trioxide aggregate and other root-end filling materials. J Endod 21:295-8.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/7472841/'
  },
  {
    id: 8,
    category: 'Regenerative Endodontics',
    question: 'מהם 3 הרכיבים הבסיסיים (Tissue Engineering Triad) הנדרשים להתחדשות מוך השורש (Regenerative Endodontic Procedures - REP)?',
    answer: '1. תאי גזע (Stem cells - SCAP), 2. מולקולות איתור (Scaffold - קריש דם/PRP/PRF), 3. פקטורי גדילה (Growth factors משוחררים מהדינטין על ידי EDTA).',
    keyTakeaway: 'AAE Clinical Considerations for Regenerative Procedures: שטיפה עדינה ב-NaOCl 1.5% בלבד ו-EDTA 17%, ללא Instrumentation של דפנות התעלה.',
    paperCitation: 'Diogenes A et al. (2016) Regenerative Endodontics: A Way Forward. J Endod 42:361-4.',
    pubMedUrl: 'https://pubmed.ncbi.nlm.nih.gov/26786440/'
  }
];
