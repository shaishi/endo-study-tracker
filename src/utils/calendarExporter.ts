import type { ScheduleCalculation } from '../types';

export const exportCalendarICS = (schedule: ScheduleCalculation) => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Endodontic Residency Study Tracker//HE',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:תוכנית לימוד אנדודונטיה 2026'
  ].join('\r\n') + '\r\n';

  // Generate a 14-day study plan recurring events in the ICS file
  const startDate = new Date();
  for (let i = 0; i < 14; i++) {
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + i);

    const year = eventDate.getFullYear();
    const month = (eventDate.getMonth() + 1).toString().padStart(2, '0');
    const day = eventDate.getDate().toString().padStart(2, '0');

    const dtStart = `${year}${month}${day}T080000Z`;
    const dtEnd = `${year}${month}${day}T090000Z`;

    const dailyUnitsText = schedule.todaysUnits
      .map((u, idx) => `${idx + 1}. ${u.title}`)
      .join('\\n');

    const summary = `🦷 מעקב אנדודונטיה: ${schedule.dailyPace} יחידות לימוד להיום`;
    const description = `תוכנית לימוד יומית להתמחות באנדודונטיה\\nקצב מומלץ: ${schedule.dailyPace} יחידות\\n\\nמשימות מומלצות:\\n${dailyUnitsText || 'קריאת ספרות חובה'}`;

    icsContent += [
      'BEGIN:VEVENT',
      `UID:endo-study-${year}${month}${day}@tracker`,
      `DTSTAMP:${timestamp}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:${summary}`,
      `DESCRIPTION:${description}`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    ].join('\r\n') + '\r\n';
  }

  icsContent += 'END:VCALENDAR';

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `endodontic_study_schedule_${now.toISOString().split('T')[0]}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
