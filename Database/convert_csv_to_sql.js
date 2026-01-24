const fs = require("fs");
const path = require("path");

const csvPath = path.join(__dirname, "../asset/AAv.csv");
const sqlPath = path.join(__dirname, "seeded_data.sql");

const rawData = fs.readFileSync(csvPath, "utf8");
const lines = rawData.split(/\r?\n/);

let sqlOutput = `-- Auto-generated seed file based on AAv.csv\n\n`;
sqlOutput += `-- find and delete '(24, NULL, NULL, 1, 0);' possibly line 82`;
sqlOutput += `SET FOREIGN_KEY_CHECKS = 0;\n\n`;

// Helper to parse "Date" integers (e.g., 01/01/1900 -> 1)
function parseExcelfiedInt(val) {
  if (!val) return "NULL";
  if (val === "NULL") return "NULL";

  // Check if it's a date string like DD/MM/YYYY
  // Heuristic: If year is 1900, return day.
  // This is a simplified guess because the CSV seems to have Excel date formatting artifacts.
  // However, looking at "04/01/1900" for ID 4, it matches the day.
  // "05/01/1900" -> 5.

  // Regex for DD/MM/YYYY
  const dateMatch = val.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (dateMatch) {
    const [_, day, month, year] = dateMatch;
    if (year === "1900" && month === "01") {
      return parseInt(day, 10);
    }
    // If year is not 1900, it might be a larger integer being displayed as a date?
    // e.g. 22/01/1901 for enCount.
    // Excel: 1 = Jan 1 1900. 367 = Jan 1 1901 (approx).
    // This is too complex to guess perfectly without knowing the column intent,
    // but for IDs (1-31), the day-of-month logic for Jan 1900 seems to hold.
    // For larger numbers, we might just default to '0' or NULL to avoid breaking DB constraints,
    // unless we can reliably decode it.
    return `'${val}'`; // Keep as string if unsure, or comment out.
  }

  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? `'${val.replace(/'/g, "\\'")}'` : parsed;
}

function escapeString(val) {
  if (!val || val === "NULL") return "NULL";
  return `'${val.replace(/'/g, "\\'")}'`;
}

// Processing Sections
let currentSection = "";

// Data store
// Data store
const centres = [];
const departments = [];
const courses = [];
const programs = [];
const registrations = [];

// ID Tracking for Validations
const validCentreIds = new Set();
const validDeptIds = new Set();
let firstCentreId = 1;
let firstDeptId = 1;

// Section Headers detection
// Line 19: id,Code,name... -> Colleges (Centre)
// Line 33: code,title,unit... -> Courses
// Line 641: ID,Name,Code,CollegeID... -> Departments
// Line 681: ID,Name,code,Duration... -> Programs/Depts extra?
// Line 740: ID,collegeID,session... -> Registrations

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  const cols = line
    .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
    .map((c) => c.replace(/^"|"$/g, "").trim()); // Split by comma respecting quotes

  // Detect section
  if (
    cols[0].toLowerCase() === "id" &&
    cols[1].toLowerCase() === "code" &&
    cols[2].toLowerCase() === "name"
  ) {
    currentSection = "CENTRE";
    continue;
  }
  if (cols[0].toLowerCase() === "code" && cols[1].toLowerCase() === "title") {
    currentSection = "COURSE";
    continue;
  }
  if (
    cols[0].toLowerCase() === "id" &&
    cols[1].toLowerCase() === "name" &&
    cols[3].toLowerCase() === "collegeid"
  ) {
    currentSection = "DEPARTMENT";
    continue;
  }
  if (
    cols[0].toLowerCase() === "id" &&
    cols[1].toLowerCase() === "name" &&
    cols[2].toLowerCase() === "code" &&
    cols[9].toLowerCase() === "deptid"
  ) {
    currentSection = "PROGRAM";
    continue;
  }
  if (
    cols[0].toLowerCase() === "id" &&
    cols[1].toLowerCase() === "collegeid" &&
    cols[4].toLowerCase() === "matricno"
  ) {
    currentSection = "REGISTRATION";
    continue;
  }

  if (currentSection === "CENTRE") {
    // id,Code,name,state...
    const id = parseExcelfiedInt(cols[0]);
    const code = escapeString(cols[1]);
    const name = escapeString(cols[2]);
    if (typeof id === "number") {
      centres.push(`(${id}, ${code}, 2, ${name}, 0)`);
      validCentreIds.add(id);
      if (validCentreIds.size === 1) firstCentreId = id;
    }
  } else if (currentSection === "COURSE") {
    // code,title,unit,semester...
    const code = escapeString(cols[0]);
    // Clean NULLs
    const title = escapeString(cols[1] === "NULL" ? "" : cols[1]);
    let unit = parseInt(cols[2]);
    if (isNaN(unit)) unit = 0;

    let semester = 1;
    const semRaw = cols[3];
    if (semRaw && semRaw.includes("02/01/1900")) semester = 2;
    else if (semRaw && semRaw.includes("01/01/1900")) semester = 1;

    // enCount logic - skipping for now, hardcode 0
    const en_count = 0;

    // Use default Valid IDs if possible or defaults
    const college_id = firstCentreId;
    const department_id = firstDeptId;

    if (cols[0] && cols[0] !== "NULL") {
      courses.push(
        `(${code}, ${unit}, ${title}, ${semester}, 0, ${en_count}, ${college_id}, ${department_id})`,
      );
    }
  } else if (currentSection === "DEPARTMENT") {
    // ... (unchanged)
    // ID,Name,Code,CollegeID
    const id = parseExcelfiedInt(cols[0]);
    const name = escapeString(cols[1]);
    const code = escapeString(cols[2]);
    let collegeId = parseExcelfiedInt(cols[3]);

    const validId = typeof id === "number" ? id : 0;

    // Validate CollegeID
    if (typeof collegeId !== "number" || !validCentreIds.has(collegeId)) {
      collegeId = firstCentreId;
    }

    if (validId > 0) {
      departments.push(`(${validId}, ${name}, ${code}, ${collegeId})`);
      validDeptIds.add(validId);
      if (validDeptIds.size === 1) firstDeptId = validId;
    }
  } else if (currentSection === "PROGRAM") {
    // ... (unchanged)
    // ID,Name,code... DeptID
    const id = parseExcelfiedInt(cols[0]);
    const name = escapeString(cols[1]);
    const code = escapeString(cols[2]);
    let deptId = parseExcelfiedInt(cols[9]);

    const validId = typeof id === "number" ? id : 0;

    // Validate DeptID
    if (typeof deptId !== "number" || !validDeptIds.has(deptId)) {
      deptId = firstDeptId;
    }

    if (validId > 0) {
      programs.push(`(${validId}, ${name}, ${code}, ${deptId}, 0)`);
    }
  } else if (currentSection === "REGISTRATION") {
    // ... (unchanged)
    // ID,collegeID,session,semester,matricNo,courseCode,level
    let centreId = parseExcelfiedInt(cols[1]);
    const session = escapeString(cols[2]);
    const semRaw = cols[3];
    let semester = 1;
    if (semRaw && semRaw.includes("02/01/1900")) semester = 2;

    const matric = escapeString(cols[4]);
    const courseCode = escapeString(cols[5]);

    // Validate CentreID
    if (typeof centreId !== "number" || !validCentreIds.has(centreId)) {
      centreId = firstCentreId;
    }

    if (matric !== "NULL" && courseCode !== "NULL") {
      registrations.push(
        `(0, ${centreId}, ${matric}, ${session}, ${semester}, ${courseCode})`,
      );
    }
  }
}

// Build SQL
sqlOutput += `DELETE FROM \`registration\`;\n`;
sqlOutput += `DELETE FROM \`course\`;\n`;
sqlOutput += `DELETE FROM \`program\`;\n`;
sqlOutput += `DELETE FROM \`users\`;\n`;
sqlOutput += `DELETE FROM \`staff\`;\n`;
sqlOutput += `DELETE FROM \`student\`;\n`;
sqlOutput += `DELETE FROM \`slashedcourse\`;\n`;
sqlOutput += `DELETE FROM \`venue\`;\n`;
sqlOutput += `DELETE FROM \`department\`;\n`;
sqlOutput += `DELETE FROM \`centre\`;\n\n`;

sqlOutput += `INSERT INTO \`centre\` (\`id\`, \`code\`, \`type\`, \`name\`, \`encount\`) VALUES\n`;
sqlOutput += centres.join(",\n") + ";\n\n";

sqlOutput += `INSERT INTO \`department\` (\`id\`, \`name\`, \`code\`, \`college_id\`) VALUES\n`;
sqlOutput += departments.join(",\n") + ";\n\n";

// Programs
if (programs.length > 0) {
  sqlOutput += `INSERT INTO \`program\` (\`id\`, \`name\`, \`code\`, \`deptID\` , \`new_codeid\`) VALUES\n`;
  for (let i = 0; i < programs.length; i++) {
    sqlOutput += programs[i];
    if (i < programs.length - 1) {
      sqlOutput += ",\n";
    }
  }
  sqlOutput += ";\n\n";
}

// Courses
if (courses.length > 0) {
  const chunkSize = 500;
  for (let i = 0; i < courses.length; i += chunkSize) {
    const chunk = courses.slice(i, i + chunkSize);
    if (i > 0) {
      sqlOutput += `INSERT INTO \`course\` (\`code\`, \`unit\`, \`title\`, \`semester\`, \`examtype\`, \`en_count\`, \`college_id\`, \`department_id\`) VALUES\n`;
    } else {
      sqlOutput += `INSERT INTO \`course\` (\`code\`, \`unit\`, \`title\`, \`semester\`, \`examtype\`, \`en_count\`, \`college_id\`, \`department_id\`) VALUES\n`;
    }
    sqlOutput += chunk.join(",\n");
    sqlOutput += ";\n\n";
  }
}

// Registrations
if (registrations.length > 0) {
  const chunkSize = 500;
  for (let i = 0; i < registrations.length; i += chunkSize) {
    const chunk = registrations.slice(i, i + chunkSize);
    sqlOutput += `INSERT INTO \`registration\` (\`regDMC\`, \`centreID\`, \`matricno\`, \`session\`, \`semester\`, \`course_code\`) VALUES\n`;
    sqlOutput += chunk.join(",\n");
    sqlOutput += ";\n\n";
  }
}

sqlOutput += `SET FOREIGN_KEY_CHECKS = 1;\n`;

fs.writeFileSync(sqlPath, sqlOutput);
console.log("SQL script generated at:", sqlPath);
