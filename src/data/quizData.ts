export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  paperReference: string;
  articleId?: number; // Optional link to specific literature item ID
}

export const quizQuestionsData: QuizQuestion[] = [
  // Category 1: Tooth Morphology & Anatomy
  {
    id: 1,
    category: 'Tooth Morphology',
    question: 'לפי מחקרו הקלאסי של Kuttler (1950), מהו המרחק הממוצע בין ה-Apical Constriction לבין ה-Apical Foramen במבוגרים?',
    options: ['0.1 – 0.2 מ"מ', '0.5 – 0.75 מ"מ', '1.5 – 2.0 מ"מ', '3.0 מ"מ'],
    correctOptionIndex: 1,
    explanation: 'Kuttler (1950) הראה כי ה-Constriction מרוחק מה-Foramen בערך 0.52 מ"מ בצעירים ו-0.65 מ"מ במבוגרים. לכן נקודת הניקוי והאיטום האידיאלית היא ה-Constriction.',
    paperReference: 'Kuttler Y (1950) J Amer Dent Assoc 50:544-52',
    articleId: 1
  },
  {
    id: 2,
    category: 'Tooth Morphology',
    question: 'לפי מחקרו של Stropko (1999) בשימוש במיקרוסקופ קליני, מהי שכיחות הימצאות תעלת MB2 בטוחנות עליונות ראשונות (Maxillary 1st Molars)?',
    options: ['51.5%', '70.2%', '93.5%', '100%'],
    correctOptionIndex: 2,
    explanation: 'Stropko (1999) הראה שעם ניסיונות איתור ממוקדים ומיקרוסקופ קליני, תעלת MB2 נמצאה ב-93.5% מהמולרים העליונים הראשונים (וב-70.7% במולרים שניים).',
    paperReference: 'Stropko JJ (1999) J Endod 25:446-50',
    articleId: 2
  },
  {
    id: 3,
    category: 'Tooth Morphology',
    question: 'איזה טיפוס לפי סיווג Vertucci (1984) מתאר שתי תעלות היוצאות מלשכת המוך ומתמזגות לתעלה אחת בודדת באפקס (2-1)?',
    options: ['Type I', 'Type II', 'Type IV', 'Type V'],
    correctOptionIndex: 1,
    explanation: 'Vertucci Type II מתאר 2 תעלות נפרדות בלשכה המתמזגות ליציאה אפילקלית אחת בודדת (2-1). שכיח מאוד בחותכות מנדיבולריות ומלתעות.',
    paperReference: 'Vertucci FJ (1984) Oral Surg 58:589-99',
    articleId: 3
  },
  {
    id: 4,
    category: 'Tooth Morphology',
    question: 'מהו האחוז הממוצע של חותכות מנדיבולריות (Mandibular Incisors) המכילות 2 תעלות?',
    options: ['10%', '40%', '75%', '90%'],
    correctOptionIndex: 1,
    explanation: 'מחקרי Vertucci (1984) ו-Benjamin & Dowson (1974) הראו שמתחת ל-40% מהחותכות המנדיבולריות יש 2 תעלות (בוקאלית ולשונית). התעלה הלשונית היא השכיחה ביותר להחמצה.',
    paperReference: 'Vertucci FJ (1984) Oral Surg 58:589-99',
    articleId: 4
  },
  {
    id: 5,
    category: 'Tooth Morphology',
    question: 'מהי הגדרת המושג Radix Entomolaris ואיפה הוא מופיע בשכיחות הגבוהה ביותר?',
    options: [
      'שורש בוקאלי נוסף במלתעה עליונה ראשונה',
      'שורש דיסטו-לשוני (DL) נוסף בטוחנת מנדיבולרית (שכיח באסיאתיים עד 30%)',
      'שורש מזיאלופלטלי נוסף בטוחנת עליונה',
      'מיזוג שורשים מלא בחותכת מרכזית'
    ],
    correctOptionIndex: 1,
    explanation: 'Radix Entomolaris הוא שורש נוסף הממוקם דיסטו-לשונית במולרים מנדיבולריים. שכיחותו באוכלוסייה אירופאית היא 1-5%, ובאוכלוסיות אסייתיות מגיעה עד 30%.',
    paperReference: 'De Moor RJ et al. (2004) Int Endod J 37:789-99',
    articleId: 5
  },

  // Category 2: Microbiology & Pathology
  {
    id: 6,
    category: 'Microbiology',
    question: 'איזה זן חיידקים מזוהה באופן השכיח ביותר במקרים של כשלון טיפול שורש (Secondary Infection / Failed Root Canal)?',
    options: ['Streptococcus mutans', 'Porphyromonas gingivalis', 'Enterococcus faecalis', 'Actinomyces israelii'],
    correctOptionIndex: 2,
    explanation: 'Sundqvist et al. (1998) בודדו Enterococcus faecalis בלמעלה מ-38%-77% ממקרי טיפול החוזר. החיידק עמיד בסביבה בסיסית ובעל יכולת חדירה לעומק הדינטין.',
    paperReference: 'Sundqvist G et al. (1998) Oral Surg 85:86-93',
    articleId: 10
  },
  {
    id: 7,
    category: 'Microbiology',
    question: 'מה הוכח במחקר המכונן של Kakehashi, Stanley & Fitzgerald (1965) לגבי חולדות נטולות חיידקים (Germ-Free Rats)?',
    options: [
      'חשיפת מוך גרמה לנמק מוך ונגע אפילקלי בכל המקרים',
      'חשיפת מוך בחולדות נטולות חיידקים הובילה לרפואה וגשר דינטין ללא נגע אפילקלי',
      'חיידקים אינם נחוצים ליצירת מחלה פרי-אפיקלית',
      'אנטיביוטיקה סיסטמית ריפאה את המוך לחלוטין'
    ],
    correctOptionIndex: 1,
    explanation: 'Kakehashi et al. (1965) הראו שבהעדר חיידקים (germ-free), המוך החשוף החלים ויצר Dentin Bridge ללא נגע אפילקלי. זהו המחקר המכונן המוכיח שחיידקים הם הסיבה האטיולוגית היחידה למחלה פריאפיקלית.',
    paperReference: 'Kakehashi S, Stanley HR, Fitzgerald RJ (1965) Oral Surg 20:340-9',
    articleId: 11
  },
  {
    id: 8,
    category: 'Microbiology',
    question: 'איזה אורגניזם מזוהה בשכיחות גבוהה בנגעים פרי-אפיקליים שלא החלימו למרות טיפול שורש מעולה, וגורם ל-Extradradicular Infection?',
    options: ['Enterococcus faecalis', 'Actinomyces israelii / Propionibacterium propionicum', 'Fusobacterium nucleatum', 'Candida albicans'],
    correctOptionIndex: 1,
    explanation: 'Nair (2004) ו-Sjögren et al. (1988) הראו כי Actinomyces israelii ו-Propionibacterium propionicum מסוגלים לשרוד ברקמה הפרי-אפיקלית מחוץ לתעלה ולגרום לנגע קבוע שלא מגיב לטיפול שורש רגיל.',
    paperReference: 'Nair PN (2004) Periodontol 2000 34:153-78',
    articleId: 12
  },

  // Category 3: Irrigants & Medicaments
  {
    id: 9,
    category: 'Irrigants',
    question: 'מה מתרחש בעת ערבוב ישיר של Sodium Hypochlorite (NaOCl) עם Chlorhexidine (CHX)?',
    options: ['יצירת גז כלור רעיל', 'שחרור חמצן שמנקה את הדינטין', 'יצירת משקע חום מסרטן של Para-chloroaniline (PCA)', 'נטרול מוחלט של החומציות'],
    correctOptionIndex: 2,
    explanation: 'ערבוב NaOCl עם CHX מייצר משקע חום-כתום (PCA) האוטם את ה-Tubules בדינטין ונחשב לחומר בעל פוטנציאל ציטוטוקסי ומסרטן.',
    paperReference: 'Zehnder M (2006) J Endod 32:389-98',
    articleId: 20
  },
  {
    id: 10,
    category: 'Irrigants',
    question: 'מהו זמן השטיפה המומלץ ב-EDTA 17% להסרת ה-Smear Layer מבלי לגרום לשחיקת הדינטין (Dentin Erosion)?',
    options: ['10 שניות', '1 – 2 דקות', '10 – 15 דקות', '30 דקות'],
    correctOptionIndex: 1,
    explanation: 'Haapasalo et al. (2010) ו-Calt & Serper (2002) הראו ששטיפה ב-EDTA 17% במשך 1-2 דקות ממיסה לחלוטין את ה-Smear Layer. שטיפה מעל 10 דקות גורמת ל-Erosion חמור של הדינטין הטורבולרי.',
    paperReference: 'Haapasalo M et al. (2010) Endod Topics 16:32-40',
    articleId: 21
  },
  {
    id: 11,
    category: 'Irrigants',
    question: 'מהו זמן השהייה המינימלי הנדרש לחבישת Calcium Hydroxide - Ca(OH)2 בתוך התעלה לקבלת אפקט אנטיבקטריאלי מירבי?',
    options: ['5 דקות', '24 שעות', '7 ימים (שבוע אחד)', '3 חודשים'],
    correctOptionIndex: 2,
    explanation: 'Byström, Claesson & Sundqvist (1985) הראו כי חבישת Ca(OH)2 למשך 7 ימים משיגה ניקוי אנטיבקטריאלי כמעט מוחלט של תעלת השורש, הודות ל-pH הבסיסי הגבוה (12.5).',
    paperReference: 'Byström A, Claesson R, Sundqvist G (1985) Endod Dent Traumatol 1:170-5',
    articleId: 22
  },

  // Category 4: Treatment Outcomes & Prognosis
  {
    id: 12,
    category: 'Treatment Outcomes',
    question: 'לפי מחקר האורך של Sjögren et al. (1990), מהם אחוזי ההצלחה בטיפול שורש ראשוני בשן עם נגע אפילקלי (Periapical Lesion)?',
    options: ['96%', '86%', '68%', '50%'],
    correctOptionIndex: 1,
    explanation: 'Sjögren et al. (1990) מצאו כי אחוזי ההצלחה ללא נגע אפילקלי עומדים על 96%, בעוד שנוכחות נגע אפילקלי מורידה את ההצלחה ל-86%.',
    paperReference: 'Sjögren U et al. (1990) J Endod 16:498-504',
    articleId: 30
  },
  {
    id: 13,
    category: 'Treatment Outcomes',
    question: 'לפי ה-Toronto Study (Ng et al. 2008 / 2011), מהו הפקטור הפרוגנוסטי הקליני המשפיע ביותר על שרידות השן לאורך זמן?',
    options: ['סוג הפוצר הסיבובי', 'נוכחות מבנה ושיקום כותרתי תקין (Coronal Restoration / Seal)', 'שימוש ב-MTA בלבד', 'אורך השורש בלבד'],
    correctOptionIndex: 1,
    explanation: 'ה-Toronto Study והמטא-אנליזות של Ng et al. (2011) ו-Ray & Trope (1995) הראו כי האיכות של ה-Coronal Seal והשיקום הכותרתי קריטית לא פחות (ואף יותר) מאיכות סתימת השורש עצמה לשרידות השן.',
    paperReference: 'Ng YL, Mann V, Gulabivala K (2011) Int Endod J 44:583-609',
    articleId: 31
  },

  // Category 5: Dental Trauma
  {
    id: 14,
    category: 'Dental Trauma',
    question: 'מהו הזמן החוץ-פה היבש (Extra-oral dry time) המרבי באווילסיה (Avulsion) שמעבר לו נחשבים תאי ה-PDL כנמקיים לחלוטין?',
    options: ['15 דקות', '30 דקות', '60 דקות', '120 דקות'],
    correctOptionIndex: 2,
    explanation: 'לפי הנחיות IADT / AAE 2020, מעבר ל-60 דקות יבש, תאי ה-PDL מתים לחלוטין והשחזרת השן תוביל ל-Ankylosis ו-Replacement Resorption.',
    paperReference: 'Fouad AF et al. (2020) Dent Traumatol 36:331-342',
    articleId: 40
  },
  {
    id: 15,
    category: 'Dental Trauma',
    question: 'במקרה של שבר שורש (Root Fracture) שליש מרכזי/אפילקלי ללא תזוזה, מהו משך הקיבוע הגמיש (Flexible Splinting) המומלץ?',
    options: ['1 שבוע', '4 שבועות', '4 חודשים', 'ללא קיבוע בכלל'],
    correctOptionIndex: 1,
    explanation: 'לפי הנחיות IADT 2020, בשבר שורש בשליש מרכזי או אפילקלי מומלץ קיבוע גמיש ל-4 שבועות. (בשבר שליש צוארי קרוב לכותרת מומלץ קיבוע קשיח ל עד 4 חודשים).',
    paperReference: 'Bourguignon C et al. (2020) Dent Traumatol 36:314-330',
    articleId: 41
  },

  // Category 6: Vital Pulp Therapy & Bioceramics
  {
    id: 16,
    category: 'Vital Pulp Therapy',
    question: 'מהי הגדרת הטכניקה של Cvek Pulpotomy (Partial Pulpotomy)?',
    options: [
      'הסרת כל מוך הכותרת עד פתחי התעלות',
      'הסרת 1-2 מ"מ בלבד ממוך הכותרת המודלק והנחת חומר ביו-סרמי',
      'חבישת מוך ללא הסרת רקמה כלל',
      'כריתה מלאה של מוך השורש'
    ],
    correctOptionIndex: 1,
    explanation: 'Cvek (1978) הגדיר כריתה חלקית של המוך (1-2 מ"מ מתחת לאזור החשיפה הטראומטית) שבה הרקמה המודלקת מוסרת והרקמה הבריאה שמתחתיה נשמרת (עם מעל 95% הצלחה).',
    paperReference: 'Cvek M (1978) J Endod 4:232-237',
    articleId: 50
  },
  {
    id: 17,
    category: 'Vital Pulp Therapy',
    question: 'מהו הרכיב ב-ProRoot MTA הגורם לשינוי צבע (Discoloration) של השן לאורך זמן?',
    options: ['Calcium Silicate', 'Bismuth Oxide', 'Zirconium Oxide', 'Gypsum'],
    correctOptionIndex: 1,
    explanation: 'Bismuth Oxide המשמש כ-Radiopacifier ב-ProRoot MTA מגיב עם תמיסות שטיפה וחלבונים בדינטין וגורם להכתמה חום-אפורה. בחומרים חדישים (Biodentine / BC RRM) הוחלף ב-Zirconium Oxide.',
    paperReference: 'Parirokh M, Torabinejad M (2010) J Endod 36:400-413',
    articleId: 51
  },

  // Category 7: Endodontic Surgery & Apicoectomy
  {
    id: 18,
    category: 'Endodontic Surgery',
    question: 'מהו עומק הקטימה (Root Resection) המומלץ באפיקואקטומיה כדי לנטרל את מרבית הפיצולים האפיקליים (Apical Ramifications)?',
    options: ['1 מ"מ (מנטרל 50%)', '3 מ"מ (מנטרל 98% מהפיצולים ו-93% מהתעלות האופקיות)', '6 מ"מ', '10 מ"מ'],
    correctOptionIndex: 1,
    explanation: 'Kim & Kratchman (2006) הראו שקטימת 3 מ"מ מקצה השורש בזווית 0 מעלות מסירה 98% מהפיצולים האפיקליים ו-93% מהתעלות הצידיות באזור האפיקלי.',
    paperReference: 'Kim S, Kratchman S (2006) J Endod 32:601-623',
    articleId: 60
  },
  {
    id: 19,
    category: 'Endodontic Surgery',
    question: 'מהו עומק ההכנה הרטרוגרדית (Retro-prep depth) המינימלי הנדרש באיטום קצה השורש בכירורגיה אנדודונטית?',
    options: ['1 מ"מ', '3 מ"מ', '5 מ"מ', '8 מ"מ'],
    correctOptionIndex: 1,
    explanation: 'לפי Kim & Kratchman (2006), הכנה אולטרסונית רטרוגרדית בעומק של 3 מ"מ לפחות נחוצה כדי להבטיח איטום הרמטי של התעלה ומניעת דליפה מילואית.',
    paperReference: 'Kim S, Kratchman S (2006) J Endod 32:601-623',
    articleId: 61
  },

  // Category 8: Pharmacology & Pain Management
  {
    id: 20,
    category: 'Pharmacology',
    question: 'מהי התרופה קו ראשון (First-Line Antibiotic) המומלצת ע"י ה-AAE לזיהום אנדודונטי אקוטי עם מעורבות סיסטמית?',
    options: ['Amoxicillin 500 mg', 'Clindamycin 300 mg', 'Metronidazole 500 mg', 'Ciprofloxacin 500 mg'],
    correctOptionIndex: 0,
    explanation: 'לפי הנחיות AAE 2021, Amoxicillin 500 mg (כל 8 שעות) הוא קו ראשון במטופל ללא אלרגיה לפניצילין. באין תגובה מוסף Metronidazole או משודרג ל-Augmentin.',
    paperReference: 'AAE Guidance on Antibiotic Use (2021)',
    articleId: 70
  }
];
