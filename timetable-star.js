// Bright Star sections (2026-27) — 1st Year and 2nd Year.
// Students: Bright Star-1 2026-27 merit list (1st Year) and the Bright Star attendance register (2nd Year).
// Timetable: the B.Star rows of the official 1st Year (w.e.f. 03-09-2026) and 2nd Year (w.e.f. 24-08-2026) sheets.
// Bright Star students keep their own roll numbers; their combination decides which lecture they attend in
// Periods I-II and V (e.g. Chemistry for Pre-Medical + Pre-Engineering, Computer for ICS).

const BRIGHT_STAR = {
  1: {
    "Pre-Medical": [1, 4, 6, 7, 9, 13, 21, 28, 29, 30, 31, 36, 37, 43],
    "Pre-Engineering": [164, 166],
    "ICS": [304, 305, 317, 323, 326, 333, 334, 339, 347, 350, 355, 357, 358, 365, 366, 383, 384, 1412]
  },
  2: {
    "Pre-Medical": [],
    "Pre-Engineering": [],
    "ICS": [380, 381, 389, 390, 392, 398, 399, 401, 405, 406, 407, 411, 421]
  }
};

// sec = who attends: All | Pre-Medical | Pre-Engineering | ICS | Medical + Engineering | Engineering + ICS
const STAR_TT = {
  1: [
    { period: "I", subject: "Chemistry", room: "5-A", teacher: "Prof. Samad Yaseen", sec: "Medical + Engineering" },
    { period: "I", subject: "Computer Science", room: "7", teacher: "CTI", sec: "ICS" },
    { period: "II", subject: "Biology", room: "5-A", teacher: "Prof. Nadeem Khan", sec: "Pre-Medical" },
    { period: "II", subject: "Mathematics", room: "7", teacher: "Prof. Nadia Zahir Babur", sec: "Engineering + ICS" },
    { period: "III", subject: "Physics", room: "5-A", teacher: "Prof. Muhammad Asif Ali", sec: "All" },
    { period: "IV", subject: "English", room: "5-A", teacher: "Prof. Safia Nadeem", sec: "All" },
    { period: "V", subject: "Urdu", room: "5-A", teacher: "Prof. Amjad Zia", sec: "All" }
  ],
  2: [
    { period: "I", subject: "Physics", room: "5B", teacher: "Prof. Bibi Hajra", sec: "All" },
    { period: "II", subject: "Chemistry", room: "5B", teacher: "Prof. Nadeem Asghar Khan", sec: "Medical + Engineering" },
    { period: "II", subject: "Computer Science", room: "LT2", teacher: "Prof. Tuseef Ahmad", sec: "ICS", note: "with C1" },
    { period: "III", subject: "English", room: "5B", teacher: "Dr. Muhammad Ismaeel", sec: "All" },
    { period: "IV", subject: "Urdu", room: "5B", teacher: "Prof. Faiza Iftekhar", sec: "All" },
    { period: "V", subject: "Biology", room: "5B", teacher: "Dr. Bushra Parveen", sec: "Pre-Medical" },
    { period: "V", subject: "Mathematics", room: "7", teacher: "Prof. Abdul Jabbar", sec: "Engineering + ICS" }
  ]
};

// Periods VI-VII rotate weekly (check the noticeboard)
const STAR_ROT = {
  1: [
    { subject: "VI · Islamic Education (3-4)", group: "B.Star + M + E", room: "UB1", teacher: "Prof. Abaid Ullah Tariq", sec: "All" },
    { subject: "VI · Ethics (Non-Muslim students)", group: "Non-Muslim students", room: "UB2", teacher: "Prof. Ashar Shahzad", sec: "All" },
    { subject: "VI · Physics Practical (2-2)", group: "B.Star", room: "LAB", teacher: "Prof. Muhammad Asif Ali", sec: "All" },
    { subject: "VII · Tarjuma-tul-Quran (3-4)", group: "B.Star + M + E", room: "UB1", teacher: "Prof. Abaid Ullah Tariq", sec: "All" },
    { subject: "VII · Chemistry Practical (5-5)", group: "B.Star", room: "LAB", teacher: "Prof. Samad Yaseen", sec: "Medical + Engineering" },
    { subject: "VII · Biology Practical (1-1)", group: "B.Star", room: "LAB", teacher: "Prof. Nadeem Khan", sec: "Pre-Medical" }
  ],
  2: [
    { subject: "VI · Pak. Studies (1-2)", group: "B.Star", room: "5B", teacher: "Prof. Muhammad Nazim", sec: "All" },
    { subject: "VI · Tarjuma-tul-Quran (3-3)", group: "E + M + B.Star", room: "5", teacher: "Prof. Anwar ul Islam Qureshi", sec: "Medical + Engineering" },
    { subject: "VI · Tarjuma-tul-Quran (4-4)", group: "C1 + B.Star", room: "1", teacher: "Prof. Anwar ul Islam Qureshi", sec: "ICS" },
    { subject: "VII · Physics Practical (5-5)", group: "B.Star", room: "Lab", teacher: "Prof. Bibi Hajra", sec: "All" },
    { subject: "VII · Chemistry Practical (6-6)", group: "B.Star", room: "Lab", teacher: "Prof. Nadeem Asghar Khan", sec: "Medical + Engineering" },
    { subject: "VII · Biology Practical (4-4)", group: "B.Star", room: "Lab", teacher: "Dr. Bushra Parveen", sec: "Pre-Medical" }
  ]
};

const STAR_SECTIONS = ["All", "Pre-Medical", "Pre-Engineering", "ICS", "Medical + Engineering", "Engineering + ICS"];

/** which combination a Bright Star roll belongs to ('' if not Bright Star) */
function starComboOf(roll, y) {
  const L = BRIGHT_STAR[Number(y) === 2 ? 2 : 1] || {};
  roll = Number(roll);
  for (const k of Object.keys(L)) if (L[k].indexOf(roll) >= 0) return k;
  return "";
}
const isStarRoll = (roll, y) => !!starComboOf(roll, y);
/** does a student of this combination attend a lecture meant for `sec`? */
function starSecHas(sec, combo) {
  if (!combo) return false;
  if (sec === "All") return true;
  if (sec === combo) return true;
  if (sec === "Medical + Engineering") return combo === "Pre-Medical" || combo === "Pre-Engineering";
  if (sec === "Engineering + ICS") return combo === "Pre-Engineering" || combo === "ICS";
  return false;
}
/** a Bright Star student's own timetable (same shape as buildSchedule), or null */
function starSchedule(roll, y) {
  y = Number(y) === 2 ? 2 : 1;
  const combo = starComboOf(roll, y);
  if (!combo) return null;
  const rows = STAR_TT[y].filter((e) => starSecHas(e.sec, combo)).map((e) => ({ period: e.period, subject: e.subject, room: e.room, teacher: e.teacher, note: e.note || "" }));
  const rotating = STAR_ROT[y].filter((e) => starSecHas(e.sec, combo)).map((e) => ({ subject: e.subject, group: e.group, room: e.room, teacher: e.teacher }));
  return { code: "STAR", group: "Bright Star · " + combo, combo, sheet: "Bright Star", rows, rotating };
}

// Bright Star students follow the Bright Star timetable instead of their roll-series group.
(function () {
  if (typeof buildSchedule === "function") { const b1 = buildSchedule; buildSchedule = function (r) { return starSchedule(r, 1) || b1(r); }; }
  if (typeof buildSchedule2 === "function") { const b2 = buildSchedule2; buildSchedule2 = function (r) { return starSchedule(r, 2) || b2(r); }; }
  if (typeof GROUP_NAMES !== "undefined") GROUP_NAMES.STAR = "Bright Star";
  if (typeof GROUP_NAMES_2 !== "undefined") GROUP_NAMES_2.STAR = "Bright Star";
})();
