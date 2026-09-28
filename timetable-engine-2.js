// Timetable engine for GCS Rawalpindi — 2nd Year (2026-27)
// Transcribed from "Time Table for 2nd Year (Science / I.C.S / Arts) (2026-27), w.e.f. 24-08-2026"
// (Incharge Time Table: Amin Iqbal / Ashar Shahzad).
// Roll-number ranges: same as the 1st Year series for the groups with the same codes
// (M, E, C1, C2, C3, H). B.Star, G2 and the Arts groups (A, B, D …) need the 2nd Year
// roll-number series sheet and are not covered yet.

const GROUP_RANGES_2 = [
  ["M",  1, 150],
  ["E",  151, 300],
  ["C1", 301, 500],
  ["C2", 501, 600],
  ["C3", 601, 650],
  ["H",  701, 750]
];
const GROUP_NAMES_2 = {
  M: "F.Sc Pre-Medical", E: "F.Sc Pre-Engineering",
  C1: "I.C.S (Comp. Sci, Maths, Physics)", C2: "I.C.S (Comp. Sci, Maths, Statistics)",
  C3: "I.C.S (Comp. Sci, Maths, Economics)", H: "I.C.S (Comp. Sci, Economics, Statistics)"
};

function codeForRoll2(roll) {
  for (const [code, lo, hi] of GROUP_RANGES_2) if (roll >= lo && roll <= hi) return code;
  return null;
}

function buildSchedule2(roll) {
  roll = Number(roll);
  if (!roll || roll < 1 || roll > 1500) return null;
  const code = codeForRoll2(roll);
  const odd = roll % 2 === 1;
  const R = (n) => (/^\d+$/.test(String(n)) ? "Room " + n : n);
  if (!code) {
    return { code: null, group: "", sheet: "", rows: [], rotating: [],
      note: "The 2nd Year timetable for roll number " + roll + " (B.Star, G2 and Arts groups) isn't in the app yet — please check the college noticeboard." };
  }
  const rows = [], rotating = [];
  const add = (period, subject, room, teacher, note) => rows.push({ period, subject, room: R(room), teacher, note: note || "" });
  const rot = (subject, group, room, teacher) => rotating.push({ subject, group, room: R(room), teacher });

  if (code === "M" || code === "E") {
    add("I", "Physics", odd ? 5 : 6, odd ? "Mr. Asghar" : "Ms. Zarmeen", "M + E (" + (odd ? "Odd" : "Even") + ")");
    add("II", "Chemistry", odd ? 5 : 6, odd ? "Ms. Noor" : "Dr. Tehmina", "M + E (" + (odd ? "Odd" : "Even") + ")");
    add("III", "English", 5, "Mr. Fazal", "M + E together");
    add("IV", "Urdu", 5, "Dr. Zia", "M + E together");
    if (code === "M") add("V", "Biology", 5, "Mr. Ghaffar");
    else add("V", "Mathematics", 6, "Ms. Iram");
    rot("VI · Pak. Studies (3-4)", "E + M", 5, "Mr. Amir");
    rot("VI · Tarjuma-tul-Quran (1-2)", "E + M + B.Star", 5, "Mr. Abaid");
    rot("VII · Physics Practical (5-5)", "M + E", "Lab", "Mr. Asghar + Ms. Zarmeen");
    rot("VII · Chemistry Practical (6-6)", "M + E", "Lab", "Ms. Noor + Dr. Tehmina");
    if (code === "M") rot("VII · Biology Practical (4-4)", "M", "Lab", "Mr. Ghaffar");
    return { code, group: "F.Sc (Science)", sheet: "2nd Year Science", rows, rotating };
  }

  // I.C.S groups — C1, C2, C3, H
  const urdu = () => add("III", "Urdu", odd ? 1 : 2, odd ? "Dr. Faiza" : "Ms. Tahira", "C1, C2, C3, G2, H (" + (odd ? "Odd" : "Even") + ")");
  if (code === "C1") {
    add("I", "Physics", odd ? 1 : 2, odd ? "Mr. Asif Khan" : "Ms. Amir-un-Nisa", "C1 (" + (odd ? "Odd" : "Even") + ")");
    add("II", "Computer Science", "LT2", "Mr. Tuseef", "C1 (Odd + Even)");
    urdu();
    add("IV", "Mathematics", odd ? 2 : 1, odd ? "Ms. Sumaya" : "Mr. Imran", "C1 (" + (odd ? "Odd" : "Even") + ")");
    add("V", "English", odd ? 1 : 2, odd ? "Ms. Ayesha" : "Mr. Azam", "C1 (" + (odd ? "Odd" : "Even") + ")");
    rot("VI · Tarjuma-tul-Quran (1-2)", "C1 + B.Star", 1, "Mr. Zafar");
    rot("VI · Pak. Studies (3-4)", "C1 (" + (odd ? "Odd" : "Even") + ")", odd ? 1 : 2, odd ? "Mr. Naseer" : "Mr. Muttaher");
    rot("VI · Ethics (Non-Muslim students)", "Non-Muslim students", 11, "Mr. Ashar");
    rot("VII · Physics Practical (6-6)", "C1 (" + (odd ? "Odd" : "Even") + ")", "Lab", odd ? "Mr. Asif Khan" : "Ms. Amir-un-Nisa");
    rot("VII · Computer Practical (2-2)", "C1", "Lab", "Mr. Tuseef");
    return { code, group: "I.C.S", sheet: "2nd Year I.C.S", rows, rotating };
  }

  // C2, C3, H share Computer (I), Urdu (III) and English (V)
  add("I", "Computer Science", "LT2", "Mr. Ahmed", "C2 + C3 + H");
  if (code === "C2") add("II", "Statistics", odd ? 4 : 3, odd ? "Mr. Amin" : "Dr. Javaid", odd ? "C2 (Odd)" : "C2 (Even) + G2");
  else add("II", "Economics", odd ? 10 : 2, odd ? "Ms. Hina" : "Mr. Farhan", "C3 + H + D1 + B3 (" + (odd ? "Odd" : "Even") + ")");
  urdu();
  if (code === "H") add("IV", "Statistics", 4, "Ms. Maryam", "H");
  else add("IV", "Mathematics", 3, "Ms. Misbah", "C2 + C3 + G2");
  add("V", "English", odd ? 3 : 4, odd ? "Ms. Zunaira" : "Mr. Asif", "C2 + C3 + G + H (" + (odd ? "Odd" : "Even") + ")");
  rot("VI · Tarjuma-tul-Quran (1-2)", "C2 + C3 + H", 2, "Dr. Tahir");
  rot("VI · Pak. Studies (3-4)", "C2 + C3 + G2 + H", 3, "Mr. Taib");
  rot("VI · Ethics (Non-Muslim students)", "Non-Muslim students", 11, "Mr. Ashar");
  if (code === "C2") rot("VII · Statistics Practical (1-1)", "C2-I + C2-II", "Lab", "Ms. Maryam");
  rot("VII · Computer Practical (2-2)", "C2 + C3 + H", "Lab", "Mr. Ahmed");
  return { code, group: "I.C.S", sheet: "2nd Year I.C.S", rows, rotating };
}
