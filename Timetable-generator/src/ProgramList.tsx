import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiSave,
  FiXCircle,
  FiAward,
  FiBookOpen,
} from "react-icons/fi";

interface Program {
  id: string;
  code: string;
  name: string;
  deptID: string | number;
  newCodeID: string | number;
}

interface ProgramListProps {
  onProgramList?: (val: string) => void;
}

/**
 * Institutional Academic Programme Registry
 * Features: High-density data grid, unified branding, and refined administrative assets.
 */
export default function ProgramList({ onProgramList }: ProgramListProps) {
  const [formData, setFormData] = useState({
    progCode: "",
    pName: "",
    deptId: "",
    newCodeID: "",
  });

  const [programs, setPrograms] = useState<Program[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editProgData, setEditProgData] = useState<Partial<Program>>({});

  const handleInputChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgramSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/program/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.progCode,
          name: formData.pName,
          deptID: formData.deptId,
          newCodeID: formData.newCodeID,
        }),
      });
      if (res.ok) {
        toast.success("✅ Academic programme added to registry");
        if (onProgramList) onProgramList("");
        setFormData({ progCode: "", pName: "", deptId: "", newCodeID: "" });
        fetchPrograms();
      } else {
        toast.error("❌ Programme addition failed");
      }
    } catch (error) {
      toast.error("Critical failure during programme sync");
    }
  };

  const fetchPrograms = async () => {
    try {
      const res = await fetch("http://localhost:8080/program/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize programme registry");
        return;
      }
      const data = await res.json();
      setPrograms(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to programme ledger");
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  const handleEditClick = (program: Program) => {
    setEditId(program.id);
    setEditProgData({ ...program });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/program/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editProgData),
      });
      if (res.ok) {
        toast.success("Programme record modified in ledger");
        setEditId(null);
        fetchPrograms();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge academic programme from registry permanently?"))
      return;
    try {
      const res = await fetch(`http://localhost:8080/program/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Programme record purged successfully");
        fetchPrograms();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during programme purge");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Registration Section */}
      <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brick/5 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center gap-3 mb-8 border-b border-brick/5 pb-4">
          <FiAward className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Define Academic Programme
          </h2>
        </div>

        <form onSubmit={handleProgramSubmit} className="space-y-6">
          <div className="form-grid-institutional lg:grid-cols-4">
            {[
              {
                label: "Programme Code",
                name: "progCode",
                placeholder: "e.g. B.Sc. CSC",
              },
              { label: "Official Designation", name: "pName", isWide: true },
              { label: "Dept Affinity ID", name: "deptId" },
              { label: "Modern Code Alias", name: "newCodeID" },
            ].map((field) => (
              <div
                key={field.name}
                className={`space-y-2 ${field.isWide ? "lg:col-span-2" : ""}`}
              >
                <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all font-sans"
                  value={(formData as any)[field.name]}
                  onChange={handleInputChangeForm}
                />
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-brick/5">
            <button
              type="submit"
              className="px-12 py-3.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brick/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <FiBookOpen /> Enroll Degree Programme
            </button>
          </div>
        </form>
      </section>

      {/* Ledger Section */}
      <div className="institutional-table-container">
        <table className="institutional-table">
          <thead>
            <tr>
              <th>Programme Code</th>
              <th>Official Designation</th>
              <th className="text-center">Dept Affinity</th>
              <th className="text-center">Alias</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brick/5">
            {programs.map((prog) => (
              <tr
                key={prog.id}
                className="hover:bg-brick/5 transition-colors group"
              >
                {editId === prog.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        value={editProgData.code}
                        onChange={(e) =>
                          setEditProgData((p) => ({
                            ...p,
                            code: e.target.value,
                          }))
                        }
                        className="w-24 bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold font-mono"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editProgData.name}
                        onChange={(e) =>
                          setEditProgData((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        value={editProgData.deptID}
                        onChange={(e) =>
                          setEditProgData((p) => ({
                            ...p,
                            deptID: e.target.value,
                          }))
                        }
                        className="w-16 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        value={editProgData.newCodeID}
                        onChange={(e) =>
                          setEditProgData((p) => ({
                            ...p,
                            newCodeID: e.target.value,
                          }))
                        }
                        className="w-16 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleSave(prog.id)}
                        className="p-1.5 text-status-success hover:bg-status-success/10 rounded transition-colors"
                      >
                        <FiSave size={14} />
                      </button>
                      <button
                        onClick={() => setEditId(null)}
                        className="p-1.5 text-institutional-muted hover:bg-page rounded transition-colors"
                      >
                        <FiXCircle size={14} />
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="font-mono text-brick font-black tracking-tighter">
                      {prog.code}
                    </td>
                    <td className="text-sm font-bold uppercase tracking-tight">
                      {prog.name}
                    </td>
                    <td className="text-center font-black opacity-30">
                      {prog.deptID}
                    </td>
                    <td className="text-center">
                      <span className="status-pill status-pill-info">
                        {prog.newCodeID}
                      </span>
                    </td>
                    <td className="text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(prog)}
                        className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(prog.id)}
                        className="p-2 text-status-error opacity-0 group-hover:opacity-100 hover:bg-status-error/10 rounded-full transition-all duration-300"
                      >
                        <FiTrash2 size={14} />
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
  );
}
