import React, { useState, FormEvent } from "react";
import { FiUserPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronDown } from "react-icons/fi";
import {
  departmentService,
  Department,
} from "./services/api/departmentService";
import { programService, Program } from "./services/api/programService";

interface StudentFormProps {
  onStudentform?: (val: string) => void;
}

/**
 * Legacy Student Enrollment Form
 * Refactored for Type Safety during institutional migration.
 */
export default function StudentForm({ onStudentform }: StudentFormProps) {
  const [matric, setMatricNo] = useState("");
  const [surn, setSurname] = useState("");
  const [level, setLevel] = useState("");
  const [first, setFirstname] = useState("");
  const [gender, setGender] = useState("");
  const [deptid, setDeptid] = useState("");
  const [progid, setProgrId] = useState("");
  const [startsess, setStartSess] = useState("");
  const [prog, setProgr] = useState("");
  const [middlename, setMiddle] = useState("");

  const [departments, setDepartments] = useState<Department[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [filteredPrograms, setFilteredPrograms] = useState<Program[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const [depts, progs] = await Promise.all([
        departmentService.getAll(),
        programService.getAll(),
      ]);
      setDepartments(depts);
      setPrograms(progs);
      setFilteredPrograms(progs);
    };
    fetchData();
  }, []);

  const handleDeptChange = (id: string) => {
    setDeptid(id);
    if (id) {
      setFilteredPrograms(
        programs.filter((p) => String(p.deptID) === String(id)),
      );
    } else {
      setFilteredPrograms(programs);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !matric ||
      !surn ||
      !first ||
      !level ||
      !gender ||
      !startsess ||
      !prog ||
      !middlename
    ) {
      return toast.warn("Verify all mandatory academic fields");
    }

    // 1. Matriculation Number Format Validation
    const matricRegex = /^[A-Z]{3}\/[A-Z]{3}\/\d{2}\/\d{3}$/i;
    // Example: AUL/CMP/23/074
    if (!matricRegex.test(matric)) {
      toast.error(
        "Format Error: Matric No should follow institutional pattern (e.g. AUL/CMP/23/074)",
      );
      return;
    }

    // 2. Commencement Session Validation
    const sessionRegex = /^\d{4}\/\d{4}$/;
    if (!sessionRegex.test(startsess)) {
      toast.error("Format Error: Session must be YYYY/YYYY (e.g. 2023/2024)");
      return;
    }

    // 3. Dept Identifier Logic
    if (isNaN(Number(deptid)) || Number(deptid) < 1) {
      toast.error("Data Integrity Error: Invalid Departmental Identifier");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/student/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matric_No: matric,
          surname: surn,
          firstname: first,
          middlename: middlename,
          level: level,
          deptID: deptid,
          gender: gender,
          programmeID: progid,
          start_Session: startsess,
          programme: prog,
        }),
      });

      if (res.ok) {
        toast.success("Student enrollment committed to registry");
        if (onStudentform) onStudentform("");
        // Reset local state for fresh entry
        setMatricNo("");
        setSurname("");
        setFirstname("");
        setMiddle("");
        setGender("");
        setDeptid("");
        setProgrId("");
        setStartSess("");
        setProgr("");
        setLevel("");
      } else {
        toast.error("Enrollment attempt failed at registry");
      }
    } catch (error) {
      toast.error("Critical failure during enrollment sync");
    }
  };

  return (
    <div className="bg-surface p-8 rounded-institutional shadow-sm border border-brick/10 mb-8 animate-fadeIn">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex items-center gap-3 mb-6 border-b border-brick/5 pb-4">
          <FiUserPlus className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Academic Enrollment Interface
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Matriculation Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={matric}
              onChange={(e) => setMatricNo(e.target.value)}
              placeholder="e.g. AUL/CMP/23/074"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Surname
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={surn}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="e.g. Johnson"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              First Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={first}
              onChange={(e) => setFirstname(e.target.value)}
              placeholder="e.g. Michael"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Middle Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={middlename}
              onChange={(e) => setMiddle(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Academic Level
            </label>
            <select
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all appearance-none"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              required
            >
              <option value="">Select Tier</option>
              <option value="100">100 Level</option>
              <option value="200">200 Level</option>
              <option value="300">300 Level</option>
              <option value="400">400 Level</option>
              <option value="500">500 Level</option>
            </select>
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Gender Identification
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              placeholder="e.g. MALE / FEMALE"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Departmental Identifier
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all appearance-none"
                value={deptid}
                onChange={(e) => handleDeptChange(e.target.value)}
                required
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-institutional-muted">
                <FiChevronDown />
              </div>
            </div>
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Commencement Session
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={startsess}
              onChange={(e) => setStartSess(e.target.value)}
              placeholder="e.g. 2023/2024"
              required
            />
          </div>

          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Academic Programme
            </label>
            <div className="relative">
              <select
                className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all appearance-none"
                value={progid}
                onChange={(e) => {
                  const pId = e.target.value;
                  setProgrId(pId);
                  const selectedProg = programs.find(
                    (p) => String(p.id) === String(pId),
                  );
                  if (selectedProg) setProgr(selectedProg.name);
                }}
                required
              >
                <option value="">Select Programme</option>
                {filteredPrograms.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-institutional-muted">
                <FiChevronDown />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-brick/5">
          <button
            type="submit"
            className="w-full md:w-auto px-10 py-3 bg-brick text-white rounded-institutional text-sm font-black uppercase tracking-[0.2em] shadow-lg shadow-brick/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Authorize Enrollment
          </button>
        </div>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
