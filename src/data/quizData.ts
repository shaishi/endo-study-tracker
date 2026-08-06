export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  paperReference: string;
}

export const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    category: 'Tooth Morphology',
    question: 'לפי מחקרו הקלאסי של Kuttler (1950), מהו המרחק הממוצע בין ה-Apical Constriction לבין ה-Apical Foramen במבוגרים?',
    options: ['0.1 – 0.2 מ"מ', '0.5 – 0.75 מ"מ', '1.5 – 2.0 מ"מ', '3.0 מ"מ'],
    correctOptionIndex: 1,
    explanation: 'Kuttler (1950) הראה כי ה-Constriction מרוחק מה-Foramen בערך 0.52 מ"מ בצעירים ו-0.65 מ"מ במבוגרים. לכן נקודת הניקוי והאיטום האידיאלית היא ה-Constriction.',
    paperReference: 'Kuttler Y (1950) J Amer Dent Assoc 50:544-52'
  },
  {
    id: 2,
    category: 'Microbiology',
    question: 'איזה זן חיידקים מזוהה באופן השכיח ביותר במקרים של כשלון טיפול שורש (Secondary Infection / Failed Root Canal)?',
    options: ['Streptococcus mutans', 'Porphyromonas gingivalis', 'Enterococcus faecalis', 'Actinomyces israelii'],
    correctOptionIndex: 2,
    explanation: 'Sundqvist et al. (1998) בודדו Enterococcus faecalis בלמעלה מ-38%-77% ממקרי טיפול החוזר. החיידק עמיד בסביבה בסיסית ובעל יכולת חדירה לעומק הדינטין.',
    paperReference: 'Sundqvist G et al. (1998) Oral Surg 85:86-93'
  },
  {
    id: 3,
    category: 'Irrigants',
    question: 'מהו התופעה המתרחשת בעת ערבוב ישיר של Sodium Hypochlorite (NaOCl) עם Chlorhexidine (CHX)?',
    options: ['יצירת גז כלור רעיל', 'שחרור חמצן שמנקה את הדינטין', 'יצירת משקע חום מסרטן של Para-chloroaniline (PCA)', 'נטרול מוחלט של החומציות'],
    correctOptionIndex: 2,
    explanation: 'ערבוב NaOCl עם CHX מייצר משקע חום-כתום (PCA) האוטם את ה-Tubules בדינטין ונחשב לחומר בעל פוטנציאל ציטוטוקסי ומסרטן.',
    paperReference: 'Zehnder M (2006) J Endod 32:389-98'
  },
  {
    id: 4,
    category: 'Treatment Outcomes',
    question: 'לפי מחקר האורך של Sjögren et al. (1990), מהם אחוזי ההצלחה בטיפול שורש ראשוני בשן עם נגע אפילקלי (Periapical Lesion)?',
    options: ['96%', '86%', '68%', '50%'],
    correctOptionIndex: 1,
    explanation: 'Sjögren et al. (1990) מצאו כי אחוזי ההצלחה ללא נגע אפילקלי עומדים על 96%, בעוד שנוכחות נגע אפילקלי מורידה את ההצלחה ל-86%.',
    paperReference: 'Sjögren U et al. (1990) J Endod 16:498-504'
  },
  {
    id: 5,
    category: 'Dental Trauma',
    question: 'מהו הזמן החוץ-פה היבש (Extra-oral dry time) המרבי באווילסיה (Avulsion) שמעבר לו נחשבים תאי ה-PDL כנמקיים לחלוטין?',
    options: ['15 דקות', '30 דקות', '60 דקות', '120 דקות'],
    correctOptionIndex: 2,
    explanation: 'לפי הנחיות IADT / AAE 2020, מעבר ל-60 דקות יבש, תאי ה-PDL מתים לחלוטין והשחזרת השן תוביל ל-Ankylosis ו-Replacement Resorption.',
    paperReference: 'Fouad AF et al. (2020) Dent Traumatol 36:331-342'
  }
];
