import React, { useState, FormEvent } from "react";
import { FiUserPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={deptid}
              onChange={(e) => setDeptid(e.target.value)}
            />
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
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={prog}
              onChange={(e) => setProgr(e.target.value)}
              placeholder="e.g. Computer Science"
              required
            />
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
