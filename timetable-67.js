// Periods VI and VII (2026-27), 1st and 2nd Year — from the official timetable sheets.
// The numbers in brackets on the sheets are days of the week: 1 = Monday, 2 = Tuesday, 3 = Wednesday,
// 4 = Thursday, 5 = Friday, 6 = Saturday. "(3-4)" = Wednesday and Thursday, "(2-2)" = Tuesday only.
// parts = [group, section] of the students who attend. "days: ''" = no day printed on the sheet.

const ARTS_F_1 = ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "F1", "F2", "F3", "F4", "F5"];
const ARTS_2 = ["A1", "A2", "A3", "B1", "B2", "B3", "D1", "D2", "D3"];
const all_ = (gs) => gs.map((g) => [g, "All"]);

const SIX7 = {
  1: [
    // Science
    { period: "VI", days: "3-4", subject: "Islamic Education", with: "B.Star + M + E", room: "UB1", teacher: "Prof. Abaid Ullah Tariq", parts: [["M", "All"], ["E", "All"], ["STAR", "All"]] },
    { period: "VI", days: "2-2", subject: "Physics Practical", with: "M + E", room: "LAB", teacher: "Prof. Muhammad Imran Bashir + Prof. Sidra Kanwal", parts: [["M", "All"], ["E", "All"]] },
    { period: "VI", days: "2-2", subject: "Physics Practical", with: "B.Star", room: "LAB", teacher: "Prof. Muhammad Asif Ali", parts: [["STAR", "All"]] },
    { period: "VII", days: "3-4", subject: "Tarjuma-tul-Quran", with: "B.Star + M + E", room: "UB1", teacher: "Prof. Abaid Ullah Tariq", parts: [["M", "All"], ["E", "All"], ["STAR", "All"]] },
    { period: "VII", days: "5-5", subject: "Chemistry Practical", with: "M + E", room: "LAB", teacher: "Prof. Madiha Aqsa + Prof. Zarafshan Nawaz", parts: [["M", "All"], ["E", "All"]] },
    { period: "VII", days: "5-5", subject: "Chemistry Practical", with: "B.Star", room: "LAB", teacher: "Prof. Samad Yaseen", parts: [["STAR", "Medical + Engineering"]] },
    { period: "VII", days: "1-1", subject: "Biology Practical", with: "M", room: "LAB", teacher: "Prof. Aeman Sehar", parts: [["M", "All"]] },
    { period: "VII", days: "1-1", subject: "Biology Practical", with: "B.Star", room: "LAB", teacher: "Prof. Nadeem Khan", parts: [["STAR", "Pre-Medical"]] },
    // I.C.S
    { period: "VI", days: "3-4", subject: "Islamic Education", with: "C1", room: "UB5", teacher: "Prof. Hafiz Zafar Mehmood", parts: [["C1", "All"]] },
    { period: "VI", days: "3-4", subject: "Islamic Education", with: "C2 + C3 + H", room: "UB3", teacher: "Prof. Syed M. Tahir Shah", parts: [["C2", "All"], ["C3", "All"], ["H", "All"]] },
    { period: "VI", days: "1-1", subject: "Physics Practical", with: "C1 (Odd)", room: "LAB", teacher: "Prof. Muhammad Asif", parts: [["C1", "Odd"]] },
    { period: "VI", days: "1-1", subject: "Physics Practical", with: "C1 (Even)", room: "LAB", teacher: "Prof. Muhammad Tauseef", parts: [["C1", "Even"]] },
    { period: "VII", days: "3-4", subject: "Tarjuma-tul-Quran", with: "C1", room: "UB5", teacher: "Prof. Hafiz Zafar Mehmood", parts: [["C1", "All"]] },
    { period: "VII", days: "3-4", subject: "Tarjuma-tul-Quran", with: "C2 + C3 + H", room: "UB3", teacher: "Prof. Syed M. Tahir Shah", parts: [["C2", "All"], ["C3", "All"], ["H", "All"]] },
    { period: "VII", days: "2-2", subject: "Statistics Practical", with: "C2 (Odd)", room: "LAB", teacher: "Prof. Maryam Aslam", parts: [["C2", "Odd"]] },
    { period: "VII", days: "2-2", subject: "Statistics Practical", with: "C2 (Even) + G", room: "LAB", teacher: "Prof. Gulzar Ahmad", parts: [["C2", "Even"], ["G", "All"]] },
    { period: "VII", days: "2-2", subject: "Statistics Practical", with: "H", room: "LAB", teacher: "Prof. Asif Raza Rizvi", parts: [["H", "All"]] },
    { period: "VII", days: "5-6", subject: "Computer Practical", with: "C3 + H", room: "LAB", teacher: "CTI", parts: [["C3", "All"], ["H", "All"]] },
    { period: "VII", days: "5-6", subject: "Computer Practical", with: "F + C2", room: "LAB", teacher: "CTI", parts: [["C2", "All"]] },
    { period: "VII", days: "5-6", subject: "Computer Practical", with: "C1", room: "LAB", teacher: "CTI", parts: [["C1", "All"]] },
    // Arts
    { period: "VI", days: "3-4", subject: "Islamic Education", with: "A + F", room: "UB4", teacher: "Prof. Naseer Ahmed Ansir", parts: all_(ARTS_F_1) },
    { period: "VI", days: "1-1", subject: "Health & Physical Education Practical", with: "A", room: "Lab", teacher: "", parts: all_(["A3", "A4", "A5", "A7"]) },
    { period: "VII", days: "3-4", subject: "Tarjuma-tul-Quran", with: "A + F", room: "UB4", teacher: "Prof. Naseer Ahmed Ansir", parts: all_(ARTS_F_1) },
    { period: "VII", days: "5-5", subject: "Geography Practical", with: "A + F", room: "LAB", teacher: "Prof. Abdul Majeed Asif", parts: all_(["A6", "F3"]) },
    { period: "VII", days: "2-2", subject: "Psychology Practical", with: "A + F", room: "LAB", teacher: "Prof. Muhammad Usman", parts: all_(["A3", "F2", "F4"]) },
    { period: "VII", days: "6-6", subject: "Computer Practical", with: "A + F", room: "LAB", teacher: "CTI", parts: all_(["F1", "F2", "F3", "F4", "F5"]) },
    // all groups
    { period: "VI", days: "3-4", subject: "Ethics (Non-Muslim students)", with: "Non-Muslim students", room: "UB2", teacher: "Prof. Ashar Shahzad", parts: [], everyone: true }
  ],
  2: [
    // Science
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "E + M", room: "5", teacher: "Prof. Aamir Hayat", parts: [["M", "All"], ["E", "All"]] },
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "B.Star", room: "5B", teacher: "Prof. Muhammad Nazim", parts: [["STAR", "All"]] },
    { period: "VI", days: "3-3", subject: "Tarjuma-tul-Quran", with: "E + M + B.Star", room: "5", teacher: "Prof. Anwar ul Islam Qureshi", parts: [["M", "All"], ["E", "All"], ["STAR", "Medical + Engineering"]] },
    { period: "VII", days: "5-5", subject: "Physics Practical", with: "M + E", room: "Lab", teacher: "Prof. Muhammad Asghar + Prof. Zarmeen Malik", parts: [["M", "All"], ["E", "All"]] },
    { period: "VII", days: "5-5", subject: "Physics Practical", with: "B.Star", room: "Lab", teacher: "Prof. Bibi Hajra", parts: [["STAR", "All"]] },
    { period: "VII", days: "6-6", subject: "Chemistry Practical", with: "M + E", room: "Lab", teacher: "Prof. Noor ul Aen + Prof. Tehmina Akhtar", parts: [["M", "All"], ["E", "All"]] },
    { period: "VII", days: "6-6", subject: "Chemistry Practical", with: "B.Star", room: "Lab", teacher: "Prof. Nadeem Asghar Khan", parts: [["STAR", "Medical + Engineering"]] },
    { period: "VII", days: "4-4", subject: "Biology Practical", with: "M", room: "Lab", teacher: "Prof. Abdul Ghaffar Anjum", parts: [["M", "All"]] },
    { period: "VII", days: "4-4", subject: "Biology Practical", with: "B.Star", room: "Lab", teacher: "Dr. Bushra Parveen", parts: [["STAR", "Pre-Medical"]] },
    // I.C.S
    { period: "VI", days: "4-4", subject: "Tarjuma-tul-Quran", with: "C1 + B.Star", room: "1", teacher: "Prof. Anwar ul Islam Qureshi", parts: [["C1", "All"], ["STAR", "ICS"]] },
    { period: "VI", days: "4-4", subject: "Tarjuma-tul-Quran", with: "C2 + C3 + H", room: "1", teacher: "Prof. Anwar ul Islam Qureshi", parts: [["C2", "All"], ["C3", "All"], ["H", "All"]] },
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "C1 (Odd)", room: "1", teacher: "Prof. Naseer Ahmed Ansir", parts: [["C1", "Odd"]] },
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "C1 (Even)", room: "2", teacher: "Prof. Muhammad Muttaher Bashir", parts: [["C1", "Even"]] },
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "C2 + C3 + G + H", room: "3", teacher: "Prof. Ahmad Taib Arif", parts: [["C2", "All"], ["C3", "All"], ["G", "All"], ["H", "All"]] },
    { period: "VII", days: "6-6", subject: "Physics Practical", with: "C1 (Odd)", room: "Lab", teacher: "Prof. Muhammad Asif", parts: [["C1", "Odd"]] },
    { period: "VII", days: "6-6", subject: "Physics Practical", with: "C1 (Even)", room: "Lab", teacher: "Prof. Amir-ul-Nisa", parts: [["C1", "Even"]] },
    { period: "VII", days: "1-1", subject: "Statistics Practical", with: "C2-I + C2-II", room: "Lab", teacher: "Prof. Maryam Aslam", parts: [["C2", "All"]] },
    { period: "VII", days: "2-2", subject: "Computer Practical", with: "C2 + C3 + H", room: "Lab", teacher: "Mr. Ahmed", parts: [["C2", "All"], ["C3", "All"], ["H", "All"]] },
    { period: "VII", days: "2-2", subject: "Computer Practical", with: "C1", room: "Lab", teacher: "Prof. Tuseef Ahmad", parts: [["C1", "All"]] },
    // Arts
    { period: "VI", days: "4-4", subject: "Tarjuma-tul-Quran", with: "A + B + D", room: "1", teacher: "Prof. Anwar ul Islam Qureshi", parts: all_(ARTS_2) },
    { period: "VI", days: "1-2", subject: "Pak. Studies", with: "A + B + D", room: "10", teacher: "Prof. Arsalan Iftikhar", parts: all_(ARTS_2) },
    { period: "VII", days: "3-4", subject: "Health & Physical Education Practical", with: "A + D", room: "Lab", teacher: "Prof. Samaviya Akhtar", parts: all_(["A2", "B1", "D2"]) },
    { period: "VII", days: "", subject: "Geography Practical", with: "A + B + D", room: "Lab", teacher: "Prof. Salah-ud-Ahmad Khan Niazi", parts: all_(["D1"]) },
    { period: "VII", days: "", subject: "Computer Practical", with: "D + B + H", room: "Lab", teacher: "Prof. Tuseef Ahmad", parts: all_(["B2", "B3", "D1", "D3"]) },
    { period: "VII", days: "", subject: "Psychology Practical", with: "B + D", room: "12", teacher: "Prof. Muhammad Usman", parts: all_(["B1", "B2", "B3"]) },
    // all groups
    { period: "VI", days: "", subject: "Ethics (Non-Muslim students)", with: "Non-Muslim students", room: "11", teacher: "Prof. Ashar Shahzad", parts: [], everyone: true }
  ]
};

const DAY_SHORT = ["", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
/** [3, 4] for "3-4"; null when no day is printed */
function sixDays(e) {
  const m = /^(\d)-(\d)$/.exec(e.days || "");
  if (!m) return null;
  const out = []; for (let d = +m[1]; d <= +m[2]; d++) out.push(d);
  return out.length ? out : null;
}
/** "Wed – Thu" / "Tue" / "" */
function sixDayLabel(e) {
  const d = sixDays(e);
  if (!d) return "";
  return d.length === 1 ? DAY_SHORT[d[0]] : d.length === 2 ? DAY_SHORT[d[0]] + " & " + DAY_SHORT[d[1]] : DAY_SHORT[d[0]] + " – " + DAY_SHORT[d[d.length - 1]];
}
/** does a student (code = timetable group, roll) belong to part [group, section]? */
function sixPartHas(part, code, roll, y) {
  if (part[0] !== code) return false;
  const sec = part[1];
  if (sec === "All") return true;
  if (sec === "Odd") return roll % 2 === 1;
  if (sec === "Even") return roll % 2 === 0;
  if (code === "STAR" && typeof starSecHas === "function") return starSecHas(sec, starComboOf(roll, y));
  return false;
}
/** a student's Period VI / VII classes, with days */
function sixFor(roll, code, y) {
  y = Number(y) === 2 ? 2 : 1;
  const first = (e) => (sixDays(e) || [9])[0];
  return (SIX7[y] || []).filter((e) => e.everyone || e.parts.some((p) => sixPartHas(p, code, roll, y)))
    .slice().sort((a, b) => (a.period === b.period ? 0 : a.period === "VI" ? -1 : 1) || first(a) - first(b)).map((e) => ({
    subject: e.period + " · " + e.subject, group: e.with, room: e.room, teacher: e.teacher || "—",
    period: e.period, days: sixDayLabel(e)
  }));
}

// Periods VI/VII in every student's timetable now come from SIX7 (with days).
(function () {
  const wrap = (fn, y) => function (r) {
    const res = fn(r);
    if (res && res.code && res.code !== "D") res.rotating = sixFor(r, res.code, y);
    return res;
  };
  if (typeof buildSchedule === "function") buildSchedule = wrap(buildSchedule, 1);
  if (typeof buildSchedule2 === "function") buildSchedule2 = wrap(buildSchedule2, 2);
})();
