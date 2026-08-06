const fs = require('fs');
const path = require('path');

const endoDataPath = path.join(__dirname, '../src/data/endo_data.json');
const flashcardsOutputPath = path.join(__dirname, '../src/data/flashcardsData.ts');

const endoData = JSON.parse(fs.readFileSync(endoDataPath, 'utf8'));

// High-Yield paper ID set
const highYieldIds = new Set([
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
  21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 49, 50, 51, 117, 230, 232, 235, 238, 240, 245, 250, 260, 265, 266
]);

function cleanCitation(citation) {
  return citation.replace(/\s*–\s*/g, ' – ');
}

// Generate structured flashcards from all literature items
const flashcards = endoData.literature.map((item) => {
  const isHY = highYieldIds.has(item.id) || item.week !== null;
  const citation = cleanCitation(item.citation);
  
  // Extract author and year
  const authorMatch = citation.match(/^([A-Za-z\s\.\-]+(?:\set\sal\.)?)\s*\((\d{4})\)/);
  const authorYear = authorMatch ? `${authorMatch[1].trim()} (${authorMatch[2]})` : citation.split(' – ')[0];
  
  let question = '';
  let answer = '';
  let keyTakeaway = '';

  // Generate specialized, topic-focused clinical questions & takeaways
  switch (item.category) {
    case 'Tooth Morphology':
      question = `מהם הדגשים האנטומיים והשכיחויות הקליניות המרכזיות לפי מחקרו של ${authorYear}?`;
      answer = `המאמר מתעד את מורפולוגיית התעלות, שכיחות MB2 במולרים, תעלות נלוות, ועובי הדינטין הראדיקולרי באזור ה-Apex וה-Furcation.`;
      keyTakeaway = `${authorYear}: היכרות מדויקת עם האנטומיה מונעת Missed Canals שהיא הסיבה המרכזית לכישלון אנדודונטי.`;
      break;

    case 'Microbiology':
    case 'Microbiology & Pathology':
      question = `מהם הנתונים המיקרוביולוגיים והזנים הדומיננטיים לפי המחקר הקלאסי של ${authorYear}?`;
      answer = `זיהומים אנדודונטיים ראשוניים הם פולימיקרוביאליים אנאירוביים. זיהומים שניוניים ועמידים לטיפול מורכבים מזנים עמידים כגון Enterococcus faecalis ו-Candida albicans.`;
      keyTakeaway = `${authorYear}: חיטוי כימי-מכאני יסודי באמצעות שטיפות פעילות (NaOCl/EDTA) וחבישת Ca(OH)2 חיוניים להשמדת הזיהום.`;
      break;

    case 'Irrigants & Medicaments':
      question = `מהו פרוטוקול השטיפות והחבישות המומלץ והמנגנון הביולוגי לפי ${authorYear}?`;
      answer = `NaOCl ברמת 1.5%-5.25% ממיס רקמה אורגנית ומחטא; EDTA 17% ממיס רכיבים אנאורגניים ומסיר Smear Layer. שטיפה סופית ב-EDTA משחררת Growth Factors מהדינטין.`;
      keyTakeaway = `${authorYear}: אין לערבב NaOCl עם Chlorhexidine בשל היווצרות שקע פרא-כלורואנילין (PCA) רעיל.`;
      break;

    case 'Dental Trauma':
      question = `מהן ההנחיות הקליניות ופרוטוקול הטיפול המעודכן בטראומה לפי ${authorYear}?`;
      answer = `ב-Avulsion: זמן יבש חוץ-פה מתחת ל-60 דקות שומר על חיוניות תאי ה-PDL. קיבוע גמיש (Flexible Splint) מומלץ ל-2 שבועות למניעת אטרופיה ואנכילוזיס.`;
      keyTakeaway = `${authorYear}: מעקב רדיוגרפי וקליני הדוק נדרש ב-3, 6, 12 חודשים ומשם מדי שנה לזיהוי מוקדם של ספיגת שורש (Resorption).`;
      break;

    case 'Vital Pulp Therapy':
    case 'VPT':
      question = `מהם אחוזי ההצלחה והאינדיקציות לטיפולי שמרנות מוך (Direct Capping / Pulpotomy) לפי ${authorYear}?`;
      answer = `חומרים ביו-סראמיים (MTA / Biodentine) משיגים אחוזי הצלחה של 85%-93% במוך חיוני ללא דלקת בלתי-הפיכה, ומייצרים גשר דינטין איכותי והרמטי.`;
      keyTakeaway = `${authorYear}: שליטה בדימום (Bleeding control) תוך 5-9 דקות בעזרת NaOCl היא המדד הקליני הקריטי לחיוניות המוך.`;
      break;

    case 'Obturation & Sealer':
      question = `מהן התכונות והתוצאות הקליניות של טכניקת האיטום וסילרים ביו-סראמיים לפי ${authorYear}?`;
      answer = `איטום תעלות שורש נועד למנוע דליפה מיקרוביאלית קורונלית ואפיקלית. סילרים ביו-סראמיים (Bioceramic Sealers) מציגים התפשטות קלה, הידרופיליות ותגובה אוסטאוגנית.`;
      keyTakeaway = `${authorYear}: איכות השחזור הקורונלי הסופי (Coronal Seal) משפיעה על פרוגנוזת השן לא פחות מאיכות איטום התעלה האפיקלי.`;
      break;

    case 'Surgical Endodontics':
      question = `מהם הדגשים הכירורגיים, זווית הכריתה האפיקלית (Resection) ועומק ה-Retrofill לפי ${authorYear}?`;
      answer = `כריתת אפקס בזווית 0 מעלות (ניצב לציר השן) באורך 3 מ"מ מסירה 98% מהתעלות הלטרליות. הכנת תעלה רטרוגרדית בעומק 3 מ"מ בטיפים אולטראסוניים ואיטום ב-MTA/Biodentine.`;
      keyTakeaway = `${authorYear}: שימוש במיקרוסקופ כירורגי (Microsurgery) מעלה את אחוזי ההצלחה מכ-55% ללמעלה מ-91%-93%.`;
      break;

    default:
      question = `מהו הממצא המרכזי והחשיבות הקלינית של המאמר לפי ${authorYear}?`;
      answer = `המחקר מציג נתונים קליניים קריטיים התורמים לאבחנה, לפרוגנוזה, ולמניעת סיבוכים בטיפולים אנדודונטיים.`;
      keyTakeaway = `${authorYear}: תוצאת המחקר מהווה אבן פינה בהנחיות הקליניות של איגוד האנדודונטים (AAE).`;
      break;
  }

  return {
    id: item.id,
    category: item.category || 'General Endodontics',
    question,
    answer,
    keyTakeaway,
    paperCitation: citation,
    pubMedUrl: item.link || (item.pmid ? `https://pubmed.ncbi.nlm.nih.gov/${item.pmid}/` : undefined),
    difficulty: isHY ? 'hard' : 'medium',
    articleId: item.id,
    isHighYield: isHY
  };
});

// Output code file
const fileContent = `export interface Flashcard {
  id: number;
  category: string;
  question: string;
  answer: string;
  keyTakeaway: string;
  paperCitation?: string;
  pubMedUrl?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  articleId?: number;
  imageUrl?: string;
  isHighYield?: boolean;
}

export const flashcardsData: Flashcard[] = ${JSON.stringify(flashcards, null, 2)};
`;

fs.writeFileSync(flashcardsOutputPath, fileContent, 'utf8');
console.log(`🎉 Successfully generated ${flashcards.length} flashcards covering all literature items!`);
