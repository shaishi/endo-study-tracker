import type { EndoData, UserState, AdaptiveUnit, ScheduleCalculation } from '../types';

export function calculateAdaptiveSchedule(
  data: EndoData,
  userState: UserState,
  currentDateStr: string = new Date().toISOString().split('T')[0]
): ScheduleCalculation {
  const targetDateStr = userState.customTargetDate || data.meta.plan_target_date;
  
  // 1. Build total ordered list of Phase 1 units (Week 1..12)
  const allPhase1Units: AdaptiveUnit[] = [];
  const litMap = new Map<number, typeof data.literature[0]>();
  data.literature.forEach(item => litMap.set(item.id, item));

  // Sort weeks numerically 1..12
  const sortedWeeks = [...data.weeks].sort((a, b) => a.week - b.week);

  for (const week of sortedWeeks) {
    // Unit A: Week Chapter Reading
    const chapterId = `chapter-${week.week}`;
    const isChapterDone = userState.completedWeekChapters.includes(week.week);
    allPhase1Units.push({
      id: chapterId,
      type: 'chapter',
      weekNumber: week.week,
      title: `קריאת פרק לימוד: שבוע ${week.week} — ${week.topic}`,
      subtitle: week.book_ref,
      weekRef: week,
      isCompleted: isChapterDone,
    });

    // Unit B..N: Articles/Guidelines in exact article_ids sequence
    for (const artId of week.article_ids) {
      const item = litMap.get(artId);
      if (item) {
        const isLitDone = userState.completedItemIds.includes(item.id);
        allPhase1Units.push({
          id: `lit-${item.id}`,
          type: 'literature',
          weekNumber: week.week,
          title: item.citation,
          subtitle: `${item.category} • ${item.type === 'guideline' ? 'הנחיה' : 'מאמר'}`,
          itemRef: item,
          weekRef: week,
          isCompleted: isLitDone,
        });
      }
    }
  }

  const totalUnits = allPhase1Units.length;
  const completedUnits = allPhase1Units.filter(u => u.isCompleted).length;
  const remainingUnits = totalUnits - completedUnits;

  // 2. Calculate active remaining days between currentDateStr and targetDateStr
  const today = new Date(currentDateStr);
  const target = new Date(targetDateStr);
  
  let rawDays = 0;
  if (target >= today) {
    const diffTime = Math.abs(target.getTime() - today.getTime());
    rawDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive of today
  } else {
    rawDays = 1;
  }

  // Deduct blocked days if they fall in [today..target]
  const blockedSet = new Set(userState.blockedDays || []);
  let blockedCount = 0;
  
  const curr = new Date(today);
  while (curr <= target) {
    const dateFormatted = curr.toISOString().split('T')[0];
    if (blockedSet.has(dateFormatted)) {
      blockedCount++;
    }
    curr.setDate(curr.getDate() + 1);
  }

  const remainingDaysCount = Math.max(1, rawDays - blockedCount);

  // 3. Compute daily pace
  const dailyPace = remainingUnits > 0 ? Math.ceil(remainingUnits / remainingDaysCount) : 0;

  // 4. Pick next dailyPace uncompleted units in sequential order
  const uncompletedUnits = allPhase1Units.filter(u => !u.isCompleted);
  const todaysUnits = uncompletedUnits.slice(0, dailyPace);

  const threshold = userState.maxDailyUnitsThreshold || 6;
  const isHighPace = dailyPace > threshold;

  return {
    totalUnits,
    completedUnits,
    remainingUnits,
    remainingDaysCount,
    dailyPace,
    todaysUnits,
    isHighPace,
    effectiveTargetDate: targetDateStr,
  };
}

export function formatHebrewDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  } catch (e) {
    return dateStr;
  }
}
