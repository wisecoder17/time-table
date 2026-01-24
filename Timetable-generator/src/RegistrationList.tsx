import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Registration {
  id: string;
  regDMC: string | number;
  centreID: string | number;
  matricNO: string;
  courseCode: string;
  semester: string | number;
  session: string;
}

interface RegListProps {
  onRegList?: (val: string) => void;
}

/**
 * Legacy Academic Enrollment Ledger
 * Refactored for Type Safety during institutional migration.
 */
export default function RegistrationList({ onRegList }: RegListProps) {
  // Post State
  const [regDmc, setRegdmc] = useState("");
  const [centreId, setCentreId] = useState("");
  const [matric, setMatric] = useState("");
  const [session, setSession] = useState("");
  const [semester, setSemester] = useState("");
  const [course, setCourse] = useState("");

  const handleRegistrationSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/registration/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          regDMC: regDmc,
          centreID: centreId,
          matricNO: matric,
          courseCode: course,
          semester,
          session,
        }),
      });

      if (res.ok) {
        toast.success("✅ Enrollment record committed to registry");
        if (onRegList) onRegList("");
        // Reset form
        setRegdmc("");
        setCentreId("");
        setMatric("");
        setSession("");
        setSemester("");
        setCourse("");
        fetchRegistrations();
      } else {
        toast.error("❌ Enrollment record commit failed");
      }
    } catch (error) {
      toast.error("Critical failure during enrollment sync");
    }
  };

  // List State
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editRegData, setEditRegData] = useState<Partial<Registration>>({});

  const fetchRegistrations = async () => {
    try {
      const res = await fetch("http://localhost:8080/registration/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize enrollment registry");
        return;
      }
      const data = await res.json();
      setRegistrations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to enrollment ledger");
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleEditClick = (reg: Registration) => {
    setEditId(reg.id);
    setEditRegData({
      regDMC: reg.regDMC,
      centreID: reg.centreID,
      matricNO: reg.matricNO,
      courseCode: reg.courseCode,
      semester: reg.semester,
      session: reg.session,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/registration/update/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editRegData),
        },
      );
      if (res.ok) {
        toast.success("Enrollment record modified in ledger");
        setEditId(null);
        fetchRegistrations();
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
    if (
      !window.confirm(
        "Purge enrollment record from academic ledger permanently?",
      )
    )
      return;
    try {
      const res = await fetch(
        `http://localhost:8080/registration/delete/${id}`,
        {
          method: "DELETE",
        },
      );
      if (res.ok) {
        toast.success("Enrollment record purged successfully");
        fetchRegistrations();
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
        onSubmit={handleRegistrationSubmit}
        className="bg-surface p-8 rounded-institutional shadow-sm border border-brick/10"
      >
        <h2 className="text-lg font-black text-institutional-primary tracking-tight mb-6 border-b border-brick/5 pb-4">
          Enrollment Authorization
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Registration ID (DMC)
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={regDmc}
              onChange={(e) => setRegdmc(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Allocated Centre ID
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={centreId}
              onChange={(e) => setCentreId(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Student Matric No
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={matric}
              onChange={(e) => setMatric(e.target.value)}
              placeholder="e.g. AUL/CMP/23/..."
            />
          </div>
          <div className="input-group">
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
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Course Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="e.g. GST 101"
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-brick/5">
          <button
            type="submit"
            className="px-10 py-3 bg-brick text-white rounded-institutional text-sm font-black uppercase tracking-widest shadow-lg shadow-brick/20 transition-transform active:scale-95"
          >
            Authorize Enrollment
          </button>
        </div>
      </form>

      <div className="student-list overflow-hidden">
        <h2 className="text-xl font-black text-brick uppercase tracking-widest mb-6">
          Academic Enrollment Ledger
        </h2>
        <div className="overflow-x-auto bg-surface border border-brick/10 rounded-institutional shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brick/5 text-[10px] font-black uppercase tracking-widest text-institutional-muted border-b border-brick/10">
                <th className="px-5 py-4">Reg-DMC</th>
                <th className="px-5 py-4">Centre ID</th>
                <th className="px-5 py-4">Matric NO</th>
                <th className="px-5 py-4">Session</th>
                <th className="px-5 py-4 text-center">Cycle</th>
                <th className="px-5 py-4">Course</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brick/5 text-xs font-bold text-institutional-primary">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-brick/5 transition-colors">
                  {editId === reg.id ? (
                    <>
                      <td className="px-5 py-3">
                        <input
                          name="regDMC"
                          value={editRegData.regDMC}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="centreID"
                          value={editRegData.centreID}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="matricNO"
                          value={editRegData.matricNO}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="session"
                          value={editRegData.session}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
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
                      <td className="px-5 py-3">
                        <input
                          name="courseCode"
                          value={editRegData.courseCode}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
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
                      <td className="px-5 py-3 font-mono opacity-60">
                        #{reg.regDMC}
                      </td>
                      <td className="px-5 py-3 font-black text-brick">
                        C-{reg.centreID}
                      </td>
                      <td className="px-5 py-3">{reg.matricNO}</td>
                      <td className="px-5 py-3 font-mono">{reg.session}</td>
                      <td className="px-5 py-3 text-center opacity-70">
                        S{reg.semester}
                      </td>
                      <td className="px-5 py-3 font-bold text-gold-dark">
                        {reg.courseCode}
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
