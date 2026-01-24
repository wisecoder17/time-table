import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface StudentSemReg {
  id: string;
  matric_NO: string;
  course_Code_List: string;
  session: string;
  semester: string | number;
}

interface StudentsemregListProps {
  onStudentsemregList?: (val: string) => void;
}

/**
 * Legacy Semester Enrollment View
 * Refactored for Type Safety during institutional migration.
 */
export default function StudentsemregList({
  onStudentsemregList,
}: StudentsemregListProps) {
  // Post State
  const [matric, setMatric] = useState("");
  const [course, setCourse] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");

  const handleStudentSemSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/sem/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matric_No: matric,
          course_Code_List: course, // Expecting comma-separated list
          session: session,
          semester: semester,
        }),
      });

      if (res.ok) {
        toast.success("✅ Semester registration committed to registry");
        if (onStudentsemregList) onStudentsemregList("");
        // Reset form
        setMatric("");
        setCourse("");
        setSession("");
        setSemester("");
        fetchStudentSemReg();
      } else {
        toast.error("❌ Semester registration failed");
      }
    } catch (error) {
      toast.error("Critical failure during registration sync");
    }
  };

  // List State
  const [regs, setRegs] = useState<StudentSemReg[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editRegData, setEditRegData] = useState<Partial<StudentSemReg>>({});

  const fetchStudentSemReg = async () => {
    try {
      const res = await fetch("http://localhost:8080/sem/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize semester registry");
        return;
      }
      const data = await res.json();
      setRegs(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to registration ledger");
    }
  };

  useEffect(() => {
    fetchStudentSemReg();
  }, []);

  const handleEditClick = (reg: StudentSemReg) => {
    setEditId(reg.id);
    setEditRegData({
      matric_NO: reg.matric_NO,
      course_Code_List: reg.course_Code_List,
      session: reg.session,
      semester: reg.semester,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/sem/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editRegData),
      });
      if (res.ok) {
        toast.success("Semester registration modified in ledger");
        setEditId(null);
        fetchStudentSemReg();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditRegData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge semester registration record permanently?"))
      return;
    try {
      const res = await fetch(`http://localhost:8080/sem/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Registration record purged successfully");
        fetchStudentSemReg();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during record purge");
    }
  };

  return (
    <div className="space-y-10 animate-fadeInUp">
      <form
        onSubmit={handleStudentSemSubmit}
        className="bg-surface p-8 rounded-institutional shadow-sm border border-brick/10"
      >
        <h2 className="text-lg font-black text-institutional-primary tracking-tight mb-6 border-b border-brick/5 pb-4">
          Semester Course Enrollment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Student Matric No
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
            />
          </div>
          <div className="input-group lg:col-span-2">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Academic Session
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={session}
              onChange={(e) => setSession(e.target.value)}
              placeholder="e.g. 2024/2025"
            />
          </div>
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Semester Cycle
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />
          </div>
          <div className="input-group lg:col-span-4">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Authenticated Course Code List
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. CSC101, MTH101, GST102"
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-brick/5">
          <button
            type="submit"
            className="px-10 py-3 bg-brick text-white rounded-institutional text-sm font-black uppercase tracking-widest shadow-lg shadow-brick/20 transition-transform active:scale-95"
          >
            Enroll Semester Courses
          </button>
        </div>
      </form>

      <div className="student-list overflow-hidden">
        <h2 className="text-xl font-black text-brick uppercase tracking-widest mb-6">
          Semester Enrollment Ledger
        </h2>
        <div className="overflow-x-auto bg-surface border border-brick/10 rounded-institutional shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brick/5 text-[10px] font-black uppercase tracking-widest text-institutional-muted border-b border-brick/10">
                <th className="px-5 py-4">Matric NO</th>
                <th className="px-5 py-4">Course Inventory</th>
                <th className="px-5 py-4">Session</th>
                <th className="px-5 py-4 text-center">Cycle</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brick/5 text-xs font-bold text-institutional-primary">
              {regs.map((reg) => (
                <tr key={reg.id} className="hover:bg-brick/5 transition-colors">
                  {editId === reg.id ? (
                    <>
                      <td className="px-5 py-3">
                        <input
                          name="matric_NO"
                          value={editRegData.matric_NO}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="course_Code_List"
                          value={editRegData.course_Code_List}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="session"
                          value={editRegData.session}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded font-mono"
                        />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input
                          name="semester"
                          value={editRegData.semester}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded text-center"
                        />
                      </td>
                      <td className="px-5 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleSave(reg.id)}
                          className="text-status-success hover:underline"
                        >
                          Commit
                        </button>
                        <button
                          onClick={handleCancel}
                          className="text-institutional-muted hover:underline"
                        >
                          Abort
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3 font-bold text-brick">
                        {reg.matric_NO}
                      </td>
                      <td className="px-5 py-3 opacity-80 max-w-xs overflow-hidden text-ellipsis whitespace-nowrap">
                        {reg.course_Code_List}
                      </td>
                      <td className="px-5 py-3 font-mono">{reg.session}</td>
                      <td className="px-5 py-3 text-center opacity-60">
                        S{reg.semester}
                      </td>
                      <td className="px-5 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEditClick(reg)}
                          className="text-brick hover:underline opacity-80 hover:opacity-100"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => handleDelete(reg.id)}
                          className="text-status-error hover:underline opacity-80 hover:opacity-100"
                        >
                          Purge
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
