// Timetable engine for GCS Rawalpindi — 2nd Year (2026-27)
// Source: "Time Table for 2nd Year (Science / I.C.S / Arts) (2026-27), w.e.f. 24-08-2026"
// (sheet dated 1-09-2026; Incharge Time Table: Amin Iqbal / Ashar Shahzad).
// Roll-number series: "Subject Combination with Codes and Roll No Series — 1st Year Admission Data (2025-2026)"
// (this batch is the 2nd Year in 2026-27). B.Star is not in the roll series, so it is not covered.

const GROUP_RANGES_2 = [
  ["M",  1, 150],
  ["E",  151, 300],
  ["C1", 301, 500],
  ["C2", 501, 600],
  ["C3", 601, 650],
  ["G",  651, 700],
  ["H",  701, 800],
  ["A1", 801, 850],
  ["A2", 851, 900],
  ["A3", 901, 950],
  ["B1", 951, 1000],
  ["B2", 1001, 1050],
  ["B3", 1051, 1100],
  ["D1", 1101, 1150],
  ["D2", 1201, 1250],
  ["D3", 1251, 1300]
];
const GROUP_NAMES_2 = {
  M: "F.Sc Pre-Medical (Physics, Chemistry, Biology)",
  E: "F.Sc Pre-Engineering (Physics, Chemistry, Mathematics)",
  C1: "I.C.S (Computer, Mathematics, Physics)",
  C2: "I.C.S (Computer, Mathematics, Statistics)",
  C3: "I.C.S (Computer, Mathematics, Economics)",
  G: "General Science (Mathematics, Statistics, Economics)",
  H: "I.C.S (Computer, Statistics, Economics)",
  A1: "F.A (Civics, Arabic, Islamiat)",
  A2: "F.A (Health & Physical Education, Islamiat, Economics)",
  A3: "F.A (Civics, History, Islamiat)",
  B1: "F.A (Psychology, Islamiat, Health & Physical Education)",
  B2: "F.A (Psychology, Sociology, Computer)",
  B3: "F.A (Computer, Economics, Psychology)",
  D1: "F.A (Computer, Economics, Geography)",
  D2: "F.A (History, Islamiat, Health & Physical Education)",
  D3: "F.A (History, Islamiat, Computer)"
};
// Sections used for attendance: Science & I.C.S split Odd/Even by roll number; Arts groups sit together.
const GROUP_SECTIONS_2 = { M: ["Odd", "Even"], E: ["Odd", "Even"], C1: ["Odd", "Even"], C2: ["Odd", "Even"], C3: ["Odd", "Even"], G: ["Odd", "Even"], H: ["Odd", "Even"] };

function codeForRoll2(roll) {
  for (const [code, lo, hi] of GROUP_RANGES_2) if (roll >= lo && roll <= hi) return code;
  return null;
}

function buildSchedule2(roll) {
  roll = Number(roll);
  if (!roll || roll < 1 || roll > 1500) return null;
  const code = codeForRoll2(roll);
  const odd = roll % 2 === 1;
  const OE = odd ? "Odd" : "Even";
  const R = (n) => (/^\d+[A-Z]?$/.test(String(n)) ? "Room " + n : n);
  if (!code) {
    return { code: null, group: "", sheet: "", rows: [], rotating: [],
      note: "Roll number " + roll + " is not in the 2nd Year roll-number series (1–1150, 1201–1300). Please check with the college office." };
  }
  const rows = [], rotating = [];
  const add = (period, subject, room, teacher, note) => rows.push({ period, subject, room: R(room), teacher, note: note || "" });
  const rot = (subject, group, room, teacher) => rotating.push({ subject, group, room: R(room), teacher });
  const ANWAR = "Prof. Anwar ul Islam Qureshi";

  /* ---------------- Science: M, E ---------------- */
  if (code === "M" || code === "E") {
    add("I", "Physics", odd ? 5 : 6, odd ? "Prof. Muhammad Asghar" : "Prof. Zarmeen Malik", "M + E (" + OE + ")");
    add("II", "Chemistry", odd ? 5 : 6, odd ? "Prof. Noor ul Aen" : "Prof. Tehmina Akhtar", "M + E (" + OE + ")");
    add("III", "English", 5, "Prof. Fazal Mehmood", "M + E together");
    add("IV", "Urdu", 5, "Prof. Amjad Zia", "M + E together");
    if (code === "M") add("V", "Biology", 5, "Prof. Abdul Ghaffar Anjum");
    else add("V", "Mathematics", 6, "Prof. Iram Naz");
    rot("VI · Pak. Studies (1-2)", "E + M", 5, "Prof. Aamir Hayat");
    rot("VI · Tarjuma-tul-Quran (3-3)", "E + M + B.Star", 5, ANWAR);
    rot("VII · Physics Practical (5-5)", "M + E", "Lab", "Prof. Muhammad Asghar + Prof. Zarmeen Malik");
    rot("VII · Chemistry Practical (6-6)", "M + E", "Lab", "Prof. Noor ul Aen + Prof. Tehmina Akhtar");
    if (code === "M") rot("VII · Biology Practical (4-4)", "M", "Lab", "Prof. Abdul Ghaffar Anjum");
    return { code, group: "F.Sc (Science)", sheet: "2nd Year Science", rows, rotating };
  }

  /* ---------------- I.C.S & General Science: C1, C2, C3, G, H ---------------- */
  if (["C1", "C2", "C3", "G", "H"].includes(code)) {
    const urdu = () => add("III", "Urdu", odd ? 1 : 2, odd ? "Prof. Faiza Iftekhar" : "Prof. Tahira Ghafoor", "C1, C2, C3, G, H (" + OE + ")");
    if (code === "C1") {
      add("I", "Physics", odd ? 1 : 2, odd ? "Prof. Muhammad Asif" : "Prof. Amir-ul-Nisa", "C1 (" + OE + ")");
      add("II", "Computer Science", "LT2", "Prof. Tuseef Ahmad", "C1 (Odd + Even)");
      urdu();
      add("IV", "Mathematics", odd ? 2 : 1, odd ? "Prof. Sumayya Mohsin" : "Mr. Imran", "C1 (" + OE + ")");
      add("V", "English", odd ? 1 : 2, odd ? "Prof. Aisha Rehmat" : "Prof. Muhammad Azam Mughal", "C1 (" + OE + ")");
      rot("VI · Tarjuma-tul-Quran (4-4)", "C1 + B.Star", 1, ANWAR);
      rot("VI · Pak. Studies (1-2)", "C1 (" + OE + ")", odd ? 1 : 2, odd ? "Prof. Naseer Ahmed Ansir" : "Prof. Muhammad Muttaher Bashir");
      rot("VI · Ethics (Non-Muslim students)", "Non-Muslim students", 11, "Prof. Ashar Shahzad");
      rot("VII · Physics Practical (6-6)", "C1 (" + OE + ")", "Lab", odd ? "Prof. Muhammad Asif" : "Prof. Amir-ul-Nisa");
      rot("VII · Computer Practical (2-2)", "C1", "Lab", "Prof. Tuseef Ahmad");
      return { code, group: "I.C.S", sheet: "2nd Year I.C.S", rows, rotating };
    }
    // C2, C3, G, H
    if (code === "G") add("I", "Economics", "—", "", "Not shown on the official timetable — please check with the Economics department");
    else add("I", "Computer Science", "LT2", "Mr. Ahmed", "C2 + C3 + H");
    if (code === "C2") add("II", "Statistics", odd ? 4 : 3, odd ? "Prof. Amin Iqbal" : "Prof. Javaid Iqbal", odd ? "C2 (Odd)" : "C2 (Even) + G");
    else if (code === "G") add("II", "Statistics", 3, "Prof. Javaid Iqbal", "C2 (Even) + G");
    else add("II", "Economics", odd ? 10 : 2, odd ? "Prof. Hina Irshad" : "Prof. Farhan Mahmood", "C3 + H + D1 + B3 (" + OE + ")");
    urdu();
    if (code === "H") add("IV", "Statistics", 4, "Prof. Maryam Aslam", "H");
    else add("IV", "Mathematics", 3, "Prof. Misbah Rani", "C2 + C3 + G");
    add("V", "English", odd ? 3 : 4, odd ? "Prof. Zunaira Abbas" : "Prof. Asif Abbas", "C2 + C3 + G + H (" + OE + ")");
    rot("VI · Tarjuma-tul-Quran (4-4)", "C2 + C3 + H", 1, ANWAR);
    rot("VI · Pak. Studies (1-2)", "C2 + C3 + G + H", 3, "Prof. Ahmad Taib Arif");
    rot("VI · Ethics (Non-Muslim students)", "Non-Muslim students", 11, "Prof. Ashar Shahzad");
    if (code === "C2") rot("VII · Statistics Practical (1-1)", "C2-I + C2-II", "Lab", "Prof. Maryam Aslam");
    if (code !== "G") rot("VII · Computer Practical (2-2)", "C2 + C3 + H", "Lab", "Mr. Ahmed");
    return { code, group: code === "G" ? "General Science" : "I.C.S", sheet: "2nd Year I.C.S", rows, rotating };
  }

  /* ---------------- Arts: A1–A3, B1–B3, D1–D3 (one class per subject, no Odd/Even) ---------------- */
  const P1 = {
    A1: ["Civics", 3, "Prof. Mehmood ul Hassan Abbasi", "A1 + A3"],
    A3: ["Civics", 3, "Prof. Mehmood ul Hassan Abbasi", "A1 + A3"],
    A2: ["Economics", 11, "Prof. Muhammad Tariq Siddique", "A2 + D1"],
    D1: ["Economics", 11, "Prof. Muhammad Tariq Siddique", "A2 + D1"],
    B1: ["Psychology", 12, "Prof. Muhammad Usman", "B1 + B2 + B3"],
    B2: ["Psychology", 12, "Prof. Muhammad Usman", "B1 + B2 + B3"],
    B3: ["Psychology", 12, "Prof. Muhammad Usman", "B1 + B2 + B3"],
    D2: ["History", 10, "Prof. Arsalan Iftikhar", "D2"],
    D3: ["Computer Science", "LT2", "Mr. Ahmed", "D3"]
  };
  const P2 = {
    A1: ["Arabic", 13, ANWAR, "A1"],
    A2: ["Health & Physical Education", 11, "Prof. Samaviya Akhtar", "A2 + B1 + D2"],
    B1: ["Health & Physical Education", 11, "Prof. Samaviya Akhtar", "A2 + B1 + D2"],
    D2: ["Health & Physical Education", 11, "Prof. Samaviya Akhtar", "A2 + B1 + D2"],
    A3: ["History", 12, "Prof. Ahmad Taib Arif", "A3 + D3"],
    D3: ["History", 12, "Prof. Ahmad Taib Arif", "A3 + D3"],
    B2: ["Computer Science", "LT2", "Prof. Tuseef Ahmad", "B2 + B3 + D1"],
    B3: ["Computer Science", "LT2", "Prof. Tuseef Ahmad", "B2 + B3 + D1"],
    D1: ["Computer Science", "LT2", "Prof. Tuseef Ahmad", "B2 + B3 + D1"]
  };
  const P4 = {
    A1: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    A2: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    A3: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    B1: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    D2: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    D3: ["Islamiat", 10, "CTI", "A1 + A2 + A3 + B1 + D2 + D3"],
    B2: ["Sociology", 6, "Prof. Farah Mushtaq", "B2"],
    B3: ["Economics", 12, "Prof. Amir Zia", "B3"],
    D1: ["Geography", 11, "Prof. Salah-ud-Ahmad Khan Niazi", "D1"]
  };
  const put = (period, e) => add(period, e[0], e[1], e[2], e[3]);
  put("I", P1[code]);
  put("II", P2[code]);
  add("III", "Urdu", 4, "Prof. Amjad Zia", "All Arts groups");
  put("IV", P4[code]);
  add("V", "English", 10, "Prof. Malik Muhammad Iqbal", "All Arts groups");
  rot("VI · Tarjuma-tul-Quran (4-4)", "A + B + D", 1, ANWAR);
  rot("VI · Pak. Studies (1-2)", "A + B + D", 10, "Prof. Arsalan Iftikhar");
  rot("VI · Ethics (Non-Muslim students)", "Non-Muslim students", 11, "Prof. Ashar Shahzad");
  if (code === "A2" || code === "D2") rot("VII · Health & Phy. Education Practical (3-4)", "A + D", "Lab", "Prof. Samaviya Akhtar");
  if (code === "D1") rot("VII · Geography Practical", "A + B + D", "Lab", "Prof. Salah-ud-Ahmad Khan Niazi");
  if (["B2", "B3", "D1", "D3"].includes(code)) rot("VII · Computer Practical", "D + B + H", "Lab", "Prof. Tuseef Ahmad");
  if (code[0] === "B") rot("VII · Psychology Practical", "B + D", 12, "Prof. Muhammad Usman");
  return { code, group: "F.A (Arts)", sheet: "2nd Year Arts", rows, rotating };
}
