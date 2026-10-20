// DIT (Diploma in Information Technology) — Semester 1 class timetable (2026-27), Room 18 (M-B).
// From "DIT Semester 1 - Class Timetable" (docx). Two daily slots: 8:30–10:00 and 10:00–11:30.
// days: 1 = Monday … 6 = Saturday. Teachers were not on the sheet → "CTI" (vacant) until the admin assigns them
// (Manage → Timetable → Vacant classes / Change the teacher).
// DIT students are the 1st Year group "D" (roll 1401–1500). The classes are added to the Period VI/VII list (SIX7)
// because that list already supports classes held on certain days only.
const DIT_SLOTS = { I: '8:30 – 10:00', II: '10:00 – 11:30' };
const DIT_TT = [
  { period: 'I',  days: '1-2', subject: 'ICT' },
  { period: 'II', days: '1-2', subject: 'Intro to Programming' },
  { period: 'I',  days: '3-4', subject: 'Computer Networks' },
  { period: 'II', days: '3-4', subject: 'Operating System' },
  { period: 'I',  days: '5-6', subject: 'Intro to MS-Office' },
  { period: 'II', days: '5-6', subject: 'Library Activities' }
];
if (typeof SIX7 !== 'undefined' && SIX7[1]) DIT_TT.forEach((e) => SIX7[1].push({
  period: e.period, days: e.days, subject: e.subject, with: 'DIT (Semester 1)', room: 'Room 18 (M-B)', teacher: e.teacher || 'CTI',
  parts: [['D', 'All']], dit: true, time: DIT_SLOTS[e.period]
}));
