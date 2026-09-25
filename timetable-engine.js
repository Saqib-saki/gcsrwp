// Timetable engine for GCS Rawalpindi — 1st Year (2026-27)
// Encodes the period-by-period class assignments transcribed from the
// official Science / I.C.S / Arts timetable sheets (w.e.f. 03-09-2026).

const GROUP_RANGES = [
  ["M",  1, 150],
  ["E",  151, 300],
  ["C1", 301, 500],
  ["C2", 501, 600],
  ["C3", 601, 650],
  ["G",  651, 700],
  ["H",  701, 750],
  ["F1", 751, 800],
  ["F2", 801, 850],
  ["F3", 851, 900],
  ["F4", 901, 950],
  ["F5", 951, 1000],
  ["A1", 1001, 1050],
  ["A2", 1051, 1100],
  ["A3", 1101, 1150],
  ["A4", 1151, 1200],
  ["A5", 1201, 1250],
  ["A6", 1251, 1300],
  ["A7", 1301, 1350],
  ["D",  1401, 1500]
];

function codeForRoll(roll) {
  for (const [code, lo, hi] of GROUP_RANGES) {
    if (roll >= lo && roll <= hi) return code;
  }
  return null;
}

function parity(roll) { return roll % 2 === 0 ? "Even" : "Odd"; }
function urduBatch(roll) {
  const m = roll % 3;
  if (m === 1) return 1;
  if (m === 2) return 2;
  return 3;
}

const URDU_BATCH_ROOMS = {
  1: { room: "UB3", teacher: "Dr. Tahira" },
  2: { room: "UB4", teacher: "Dr. Zia" },
  3: { room: "UB5", teacher: "Dr. Faiza" }
};

// Each function takes (roll) and returns an array of
// { period, subject, room, teacher, note } rows (Periods I-V, the fixed
// lecture periods). Period VI/VII (Islamic Education / Ethics / Practicals)
// rotate weekly across groups, so those are supplied separately per sheet.

function scienceCommon(roll) {
  const p = parity(roll);
  const chem = p === "Odd" ? { room: "UB1", teacher: "Prof. Madiha" } : { room: "UB2", teacher: "Prof. Zarafshan" };
  const phy  = p === "Odd" ? { room: "UB1", teacher: "Pro. Imran" }   : { room: "UB2", teacher: "Dr. Sidra" };
  return { chem, phy };
}

function buildSchedule(roll) {
  const code = codeForRoll(roll);
  if (!code) return null;

  if (code === "D") {
    return {
      code, group: "DIT",
      rows: [],
      note: "DIT follows a separate departmental timetable that wasn't included on these sheets — please check with the DIT department directly."
    };
  }

  const rows = [];
  const rotating = []; // Period VI / VII entries (rotating — informational)

  if (code === "M" || code === "E") {
    const { chem, phy } = scienceCommon(roll);
    rows.push({ period: "I", subject: "Chemistry", ...chem });
    if (code === "M") {
      rows.push({ period: "II", subject: "Biology", room: "UB1", teacher: "Prof. Aeman" });
    } else {
      rows.push({ period: "II", subject: "Mathematics", room: "UB2", teacher: "Dr. Raees" });
    }
    rows.push({ period: "III", subject: "Physics", ...phy });
    rows.push({ period: "IV", subject: "English", room: "UB1", teacher: "Prof. Fazal" });
    rows.push({ period: "V", subject: "Urdu", room: "UB1", teacher: "Dr. Tahira" });

    rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "B.Star+M+E", room: "UB1", teacher: "Prof. Abaid" });
    rotating.push({ subject: "Ethics (Non-Muslim students)", group: "Non-Muslim students", room: "UB2", teacher: "Prof. Ashar" });
    if (code === "M") {
      rotating.push({ subject: "Physics Practical", group: "M", room: "LAB", teacher: "Prof. Asif Ali" });
      rotating.push({ subject: "Chemistry Practical", group: "M", room: "LAB", teacher: "Prof. Madiha + Prof. Zarafshan" });
      rotating.push({ subject: "Biology Practical", group: "M", room: "LAB", teacher: "Prof. Aeman" });
    } else {
      rotating.push({ subject: "Physics Practical", group: "E", room: "LAB", teacher: "Prof. Asif Ali" });
      rotating.push({ subject: "Chemistry Practical", group: "E", room: "LAB", teacher: "Prof. Madiha + Prof. Zarafshan" });
    }
    return { code, group: code === "M" ? "F.Sc Pre-Medical" : "F.Sc Pre-Engineering", sheet: "Science", rows, rotating };
  }

  if (["C1","C2","C3","G","H"].includes(code)) {
    const batch = urduBatch(roll);
    rows.push({ period: "I", subject: "Urdu", ...URDU_BATCH_ROOMS[batch], note: "Batch " + batch + " (roll " + roll + " ÷ 3)" });

    const p = parity(roll);

    if (code === "C1") {
      rows.push({ period: "II", subject: "Physics", ...(p === "Odd" ? { room: "UB3", teacher: "Prof. Asif Khan" } : { room: "UB4", teacher: "Prof. Tuseef" }) });
      rows.push({ period: "III", subject: "Computer Science", ...(p === "Odd" ? { room: "UB3", teacher: "CTI" } : { room: "UB4", teacher: "CTI" }) });
      rows.push({ period: "IV", subject: "English", ...(p === "Odd" ? { room: "UB3", teacher: "Prof. Irum" } : { room: "UB4", teacher: "Prof. Azam" }) });
      rows.push({ period: "V", subject: "Mathematics", ...(p === "Odd" ? { room: "UB4", teacher: "Prof. Iram" } : { room: "UB3", teacher: "Prof. Sajid" }) });
      rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "C1", room: "UB5", teacher: "Dr. Zafar" });
      rotating.push({ subject: "Physics Practical", group: p === "Odd" ? "C1 (Odd)" : "C1 (Even)", room: "LAB", teacher: p === "Odd" ? "Prof. Asif Khan" : "Prof. Tuseef" });
    }

    if (code === "C2") {
      rows.push({ period: "II", subject: "Statistics", ...(p === "Odd" ? { room: "UB6", teacher: "Prof. Maryam" } : { room: "UB7", teacher: "Prof. Gulzar", note: "with G" }) });
      rows.push({ period: "III", subject: "Computer Science", room: "UB5", teacher: "CTI" });
      rows.push({ period: "IV", subject: "English", ...(p === "Odd" ? { room: "UB5", teacher: "Prof. Zunaira" } : { room: "UB6", teacher: "Prof. Zubair" }), note: "with C3, G, H" });
      rows.push({ period: "V", subject: "Mathematics", room: "UB5", teacher: "Dr. Ayesha", note: "with C3, G" });
      rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "C2 + C3 + H", room: "UB3", teacher: "Dr. Tahir" });
      rotating.push({ subject: "Statistics Practical", group: p === "Odd" ? "C2 (Odd)" : "C2 (Even) + G", room: "LAB", teacher: p === "Odd" ? "Prof. Maryam" : "Prof. Gulzar" });
    }

    if (code === "C3") {
      rows.push({ period: "II", subject: "Computer Science", room: "UB5", teacher: "CTI" });
      rows.push({ period: "III", subject: "Economics", ...(p === "Odd" ? { room: "UB6", teacher: "Prof. Farhan", note: "with F2, H, G" } : { room: "UB7", teacher: "Prof. Imran", note: "with H, G" }) });
      rows.push({ period: "IV", subject: "English", ...(p === "Odd" ? { room: "UB5", teacher: "Prof. Zunaira" } : { room: "UB6", teacher: "Prof. Zubair" }), note: "with C2, G, H" });
      rows.push({ period: "V", subject: "Mathematics", room: "UB5", teacher: "Dr. Ayesha", note: "with C2, G" });
      rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "C2 + C3 + H", room: "UB3", teacher: "Dr. Tahir" });
      rotating.push({ subject: "Computer Practical", group: "C3 + H", room: "LAB", teacher: "CTI" });
    }

    if (code === "G") {
      rows.push({ period: "II", subject: "Statistics", room: "UB7", teacher: "Prof. Gulzar", note: "with C2 (Even)" });
      rows.push({ period: "III", subject: "Economics", room: "UB7", teacher: "Prof. Imran", note: "with C3 (Even), H (Even)" });
      rows.push({ period: "IV", subject: "English", ...(p === "Odd" ? { room: "UB5", teacher: "Prof. Zunaira" } : { room: "UB6", teacher: "Prof. Zubair" }), note: "with C2, C3, H" });
      rows.push({ period: "V", subject: "Mathematics", room: "UB5", teacher: "Dr. Ayesha", note: "with C2, C3" });
      rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "C2 + C3 + H", room: "UB3", teacher: "Dr. Tahir" });
    }

    if (code === "H") {
      rows.push({ period: "II", subject: "Computer Science", room: "UB5", teacher: "CTI" });
      rows.push({ period: "III", subject: "Economics", ...(p === "Odd" ? { room: "UB6", teacher: "Prof. Farhan", note: "with F2, C3" } : { room: "UB7", teacher: "Prof. Imran", note: "with C3" }) });
      rows.push({ period: "IV", subject: "English", ...(p === "Odd" ? { room: "UB5", teacher: "Prof. Zunaira" } : { room: "UB6", teacher: "Prof. Zubair" }), note: "with C2, C3, G" });
      rows.push({ period: "V", subject: "Statistics", room: "UB6", teacher: "Prof. Asif Rizvi" });
      rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "C2 + C3 + H", room: "UB3", teacher: "Dr. Tahir" });
      rotating.push({ subject: "Statistics Practical", group: "H", room: "LAB", teacher: "Prof. Asif Rizvi" });
      rotating.push({ subject: "Computer Practical", group: "C3 + H", room: "LAB", teacher: "CTI" });
    }

    return { code, group: "I.C.S / General Science", sheet: "I.C.S", rows, rotating };
  }

  if (["F1","F2","F3","F4","F5"].includes(code)) {
    const p = parity(roll);
    rows.push({ period: "I", subject: "English", ...(p === "Odd" ? { room: "UB6", teacher: "Dr. Ismail" } : { room: "UB7", teacher: "Prof. Nazia" }), note: "with Arts (A)" });
    rows.push({ period: "V", subject: "Urdu", room: "UB7", teacher: "Dr. Zia", note: "with Arts (A)" });

    if (code === "F1") {
      rows.push({ period: "II", subject: "History", room: "UB10", teacher: "Prof. Arsalan", note: "with A5, A7" });
      rows.push({ period: "III", subject: "Islamic Studies (Islamiat)", room: "UB8", teacher: "CTI", note: "with Arts (A)" });
      rows.push({ period: "IV", subject: "Computer Science", room: "UB10", teacher: "CTI", note: "with F2, F3, F4" });
    }
    if (code === "F2") {
      rows.push({ period: "II", subject: "Psychology", room: "19", teacher: "Prof. Usman", note: "with Arts (A)" });
      rows.push({ period: "III", subject: "Economics", room: "UB6", teacher: "Prof. Farhan" });
      rows.push({ period: "IV", subject: "Computer Science", room: "UB10", teacher: "CTI", note: "with F1, F3, F4" });
    }
    if (code === "F3") {
      rows.push({ period: "II", subject: "Economics", room: "UB9", teacher: "Prof. Saddat", note: "with A4" });
      rows.push({ period: "III", subject: "Geography", room: "UB9", teacher: "Prof. Majeed", note: "with Arts (A)" });
      rows.push({ period: "IV", subject: "Computer Science", room: "UB10", teacher: "CTI", note: "with F1, F2, F4" });
    }
    if (code === "F4") {
      rows.push({ period: "II", subject: "Psychology", room: "19", teacher: "Prof. Usman", note: "with Arts (A)" });
      rows.push({ period: "III", subject: "Sociology", room: "UB10", teacher: "Dr. Farah", note: "with Arts (A)" });
      rows.push({ period: "IV", subject: "Computer Science", room: "UB10", teacher: "CTI", note: "with F1, F2, F3" });
    }
    if (code === "F5") {
      rows.push({ period: "II", subject: "Computer Science", room: "UB5", teacher: "CTI" });
      rows.push({ period: "III", subject: "Islamic Studies (Islamiat)", room: "UB8", teacher: "CTI", note: "with Arts (A)" });
      rows.push({ period: "IV", subject: "Arabic", room: "UB2", teacher: "Prof. Saeed", note: "with Arts (A)" });
    }

    rows.sort((a, b) => "I,II,III,IV,V".split(",").indexOf(a.period) - "I,II,III,IV,V".split(",").indexOf(b.period));

    rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "Arts + F groups", room: "UB4", teacher: "Prof. Naseer" });
    rotating.push({ subject: "Ethics (Non-Muslim students)", group: "Non-Muslim students", room: "UB2", teacher: "Prof. Ashar" });
    if (code === "F3") rotating.push({ subject: "Geography Practical", group: "Arts + F", room: "LAB", teacher: "Prof. Majeed" });
    if (code === "F2" || code === "F4") rotating.push({ subject: "Psychology Practical", group: "Arts + F", room: "LAB", teacher: "Prof. Usman" });
    rotating.push({ subject: "Computer Practical", group: "Arts + F", room: "LAB", teacher: "CTI" });

    return { code, group: "F.A (I.T)", sheet: "I.C.S / Arts", rows, rotating };
  }

  if (["A1","A2","A3","A4","A5","A6","A7"].includes(code)) {
    const p = parity(roll);
    rows.push({ period: "I", subject: "English", ...(p === "Odd" ? { room: "UB6", teacher: "Dr. Ismail" } : { room: "UB7", teacher: "Prof. Nazia" }), note: "with F groups" });
    rows.push({ period: "V", subject: "Urdu", room: "UB7", teacher: "Dr. Zia", note: "with F groups" });

    if (["A1","A2","A3","A4","A5"].includes(code)) {
      rows.push({ period: "III", subject: "Islamic Studies (Islamiat)", room: "UB8", teacher: "CTI", note: "with F groups" });
    }
    if (["A1","A2","A6"].includes(code)) {
      rows.push({ period: "II", subject: "Civics", room: "UB8", teacher: "Prof. Mahmood" });
    }
    if (code === "A1") {
      rows.push({ period: "IV", subject: "Arabic", room: "UB2", teacher: "Prof. Saeed", note: "with F5, Arts" });
    }
    if (code === "A2") {
      rows.push({ period: "IV", subject: "History", room: "UB9", teacher: "Prof. Muttahir", note: "with A6" });
    }
    if (code === "A3") {
      rows.push({ period: "II", subject: "Psychology", room: "19", teacher: "Prof. Usman", note: "with F groups" });
      rows.push({ period: "IV", subject: "Health & Physical Education", room: "UB7", teacher: "Prof. Sumaviya" });
    }
    if (code === "A4") {
      rows.push({ period: "II", subject: "Economics", room: "UB9", teacher: "Prof. Saddat", note: "with F3" });
      rows.push({ period: "IV", subject: "Health & Physical Education", room: "UB7", teacher: "Prof. Sumaviya" });
    }
    if (code === "A5") {
      rows.push({ period: "II", subject: "History", room: "UB10", teacher: "Prof. Arsalan", note: "with F1, A7" });
      rows.push({ period: "IV", subject: "Health & Physical Education", room: "UB7", teacher: "Prof. Sumaviya" });
    }
    if (code === "A6") {
      rows.push({ period: "III", subject: "Geography", room: "UB9", teacher: "Prof. Majeed", note: "with F groups" });
      rows.push({ period: "IV", subject: "History", room: "UB9", teacher: "Prof. Muttahir", note: "with A2" });
    }
    if (code === "A7") {
      rows.push({ period: "II", subject: "History", room: "UB10", teacher: "Prof. Arsalan", note: "with F1, A5" });
      rows.push({ period: "III", subject: "Sociology", room: "UB10", teacher: "Dr. Farah", note: "with F groups" });
      rows.push({ period: "IV", subject: "Health & Physical Education", room: "UB7", teacher: "Prof. Sumaviya" });
    }

    rows.sort((a, b) => "I,II,III,IV,V".split(",").indexOf(a.period) - "I,II,III,IV,V".split(",").indexOf(b.period));

    rotating.push({ subject: "Islamic Education / Tarjuma-tul-Quran", group: "Arts + F groups", room: "UB4", teacher: "Prof. Naseer" });
    rotating.push({ subject: "Ethics (Non-Muslim students)", group: "Non-Muslim students", room: "UB2", teacher: "Prof. Ashar" });
    if (code === "A3" || code === "A5" || code === "A7") rotating.push({ subject: "Health & Physical Education Practical", group: "A", room: "LAB", teacher: "—" });
    rotating.push({ subject: "Computer Practical", group: "Arts + F", room: "LAB", teacher: "CTI" });

    return { code, group: "F.A (Arts / Humanities)", sheet: "Arts", rows, rotating };
  }

  return null;
}
