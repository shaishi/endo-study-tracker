export interface MetaData {
  generated_at: string;
  plan_start_date: string;
  plan_target_date: string;
  residency_start_date: string;
  notes: string;
  total_literature_items: number;
  total_weeks: number;
}

export interface WeekPlan {
  week: number;
  dates: string;
  topic: string;
  book_ref: string;
  book_keys: string[];
  article_ids: number[];
}

export interface LiteratureItem {
  id: number;
  category: string;
  citation: string;
  week: number | null;
  type: 'guideline' | 'article' | string;
  link: string;
  link_type?: 'direct_pmid' | 'fallback_search_pubmed' | 'fallback_search_guideline' | string;
  pmid?: string;
}

export interface BookItem {
  key: string;
  name: string;
  priority: string;
  in_plan_weeks: number[];
  drive_link: string;
}

export interface EndoData {
  meta: MetaData;
  weeks: WeekPlan[];
  literature: LiteratureItem[];
  books: BookItem[];
}

export interface UserState {
  completedItemIds: number[];
  completedWeekChapters: number[];
  reviewItemIds: number[];
  notes: Record<number, string>;
  bookDriveLinks: Record<string, string>;
  customTargetDate: string | null;
  blockedDays: string[];
  dailyActivityLog: Record<string, number>; // "YYYY-MM-DD" => count checked on that date
  maxDailyUnitsThreshold: number;
  theme?: 'dark' | 'light';
  flashcardProgress?: Record<number, 'easy' | 'medium' | 'hard'>; // flashcardId -> difficulty
  quizScores?: Array<{ date: string; score: number; total: number }>;
  quizHistory?: Array<{ questionId: number; isCorrect: boolean; category: string; selectedIndex: number; date: string }>;
  missedQuestionIds?: number[];
  lastActiveDate: string | null;
  currentStreak: number;
  bestStreak: number;
}

export interface AdaptiveUnit {
  id: string; // e.g. "chapter-1" or "lit-117"
  type: 'chapter' | 'literature';
  weekNumber: number;
  title: string;
  subtitle?: string;
  itemRef?: LiteratureItem;
  weekRef?: WeekPlan;
  isCompleted: boolean;
}

export interface ScheduleCalculation {
  totalUnits: number;
  completedUnits: number;
  remainingUnits: number;
  remainingDaysCount: number;
  dailyPace: number;
  todaysUnits: AdaptiveUnit[];
  isHighPace: boolean;
  effectiveTargetDate: string;
}

export interface ResidentProfile {
  uid: string;
  email: string;
  displayName?: string;
  lastActive: string;
  completedCount: number;
  progressPercent: number;
  currentStreak: number;
  role: 'admin' | 'resident';
  status: 'active' | 'suspended';
}
