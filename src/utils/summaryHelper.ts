import type { LiteratureItem } from '../types';

export interface KeySummary {
  bottomLine: string;
  keyPoints: string[];
  clinicalTakeaway: string;
}

export const getArticleSummary = (item: LiteratureItem): KeySummary => {
  const cat = (item.category || '').toLowerCase();
  const citation = (item.citation || '').toLowerCase();

  if (cat.includes('trauma') || citation.includes('iadt') || citation.includes('avulsion')) {
    return {
      bottomLine: 'פרוטוקול טראומה דנטלית (AAE/IADT 2020 Guidelines): תזמון קיבוע וטיפול שורש לפי בגרות האפקס והזמן היבש.',
      keyPoints: [
        'Avulsion בשורש סגור: טיפול שורש תוך 7-14 ימים עם Ca(OH)2 למניעת ספיגה דלקתית.',
        'זמן יבש > 60 דקות: PDL נמקי, השריה ב-2% NaF ל-20 דקות, צפויה Ankylosis.',
        'קיבוע גמיש ל-2 שבועות ב-Avulsion; 4 שבועות ב-Intrusion ובשבר שורש (מרכזי).'
      ],
      clinicalTakeaway: 'בשרשים פתוחים בטראומה יש לשקול טיפול מחדש בלתי פולשני (Regenerative Endodontics / Cvek Pulpotomy).'
    };
  }

  if (cat.includes('microbiology') || cat.includes('irrigant') || citation.includes('zehnder') || citation.includes('haapasalo')) {
    return {
      bottomLine: 'מיקרוביולוגיה ושטיפות (Zehnder 2006): NaOCl הוא השוטף היחיד שממיס רקמה אורגנית, EDTA מסיר Layer Smear.',
      keyPoints: [
        'E. faecalis ו-C. albicans הם החיידקים/פטריות השכיחים ביותר בזיהומים משניים וכישלונות טיפול שורש.',
        'אין לערבב NaOCl ו-Chlorhexidine (CHX) ישירות עקב שקיעת משקע רעיל חום-חום (PCA - Para-chloroaniline).',
        'חבישת סידן הידרוקסידי Ca(OH)2 דורשת לפחות 7 ימים להשמדת חיידקים במעמקי הטוביולי.'
      ],
      clinicalTakeaway: 'פרוטוקול שטיפה אופטימלי: NaOCl הידרודינמי + EDTA 17% בסיום להסרת Smear Layer + שטיפת ביניים בסליין לפני CHX.'
    };
  }

  if (cat.includes('anatomy') || cat.includes('morphology') || citation.includes('vertucci') || citation.includes('cleghorn')) {
    return {
      bottomLine: 'אנטומיה ומורפולוגיה (Vertucci 1984, Cleghorn 2006): מורכבות מערכת התעלות וסיווג I-VIII.',
      keyPoints: [
        'טוחנת ראשונה עליונה (Maxillary 1st Molar): שכיחות MB2 עולה על 93% במחקרי מעבדה ו-60-80% בקליניקה.',
        'טוחנת ראשונה תחתונה (Mandibular 1st Molar): תעלה מרכזית שלישית (Distolingual root / Radix Entomolaris) ב-5-30%.',
        'מכתשית התעלה ונקובים לטרליים (Lateral Canals) שכיחים ביותר ב-1/3 האפיקלי (74%).'
      ],
      clinicalTakeaway: 'יש לבצע אקסס מורחב ושימוש במיקרוסקופ קליני (DOM) להסתכלות במרזב המורפולוגי לאיתור תעלות נוספות.'
    };
  }

  if (cat.includes('diagnostic') || cat.includes('aae') || citation.includes('aae consensus')) {
    return {
      bottomLine: 'אבחנה אנדודונטית (AAE Consensus 2009): הפרדה ברורה בין מצב המוך (Pulp Status) למצב הפריאפיקלי (Periapical Status).',
      keyPoints: [
        'Symptomatic Irreversible Pulpitis: כאב ספונטני או ממושך לקור/חום. המוך חיוני אך אינו מסוגל להתרפא.',
        'Symptomatic Apical Periodontitis: רגישות קשה לנקישה (Percussion) או לגיסה. עדות לדלקת ברקמה הפריאפיקלית.',
        'Acute Apical Abscess: דלקת חריפה עם הנפיחות ושלולית מוגלה, כאב קשה ותגובה שלילית למבחני חיוניות.'
      ],
      clinicalTakeaway: 'כל אבחנה אנדודונטית דורשת 2 רכיבים: תיאור מצב המוך + תיאור מצב הרקמה הפריאפיקלית.'
    };
  }

  // Default General High-Yield Summary
  return {
    bottomLine: `מאמר קלאסי חובה בבחינת המומחיות בנושא ${item.category}.`,
    keyPoints: [
      'סקירת ספרות קלאסית המתארת את הפרוטוקול הביולוגי והקליני המקובל.',
      'ממצאים מבוססי ראיות (Evidence-Based Endodontics) התקפים לבחינת שלב א\'.',
      'חשיבות קלינית גבוהה להבנת מנגנוני הריפוי והצלחת הטיפול לטווח ארוך.'
    ],
    clinicalTakeaway: 'רצוי לסקור את התקציר והמסקנות הקליניות לקראת הבחינה.'
  };
};
