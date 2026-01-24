import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SlashedCourse {
  id: string;
  code: string;
  type: string;
  sem: string | number;
}

interface SlashedListProps {
  onSlashedList?: (val: string) => void;
}

/**
 * Legacy Academic Conflict/Slashed Registry
 * Refactored for Type Safety during institutional migration.
 */
export default function SlashedCourses({ onSlashedList }: SlashedListProps) {
  // Post State
  const [sCode, setSlCode] = useState("");
  const [type, setType] = useState("");
  const [sem, setSem] = useState("");

  const handleSlashedSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/slashed/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: sCode,
          type: type,
          sem: sem,
        }),
      });

      if (res.ok) {
        toast.success("✅ Slashed course affinity recorded");
        if (onSlashedList) onSlashedList("");
        // Reset form
        setSlCode("");
        setType("");
        setSem("");
        fetchSlasheds();
      } else {
        toast.error("❌ Slashed course recording failed");
      }
    } catch (error) {
      toast.error("Critical failure during slashed records sync");
    }
  };

  // List State
  const [slasheds, setSlasheds] = useState<SlashedCourse[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editSlashedData, setEditSlashedData] = useState<
    Partial<SlashedCourse>
  >({});

  const fetchSlasheds = async () => {
    try {
      const res = await fetch("http://localhost:8080/slashed/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize slashed curriculum");
        return;
      }
      const data = await res.json();
      setSlasheds(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to slashed ledger");
    }
  };

  useEffect(() => {
    fetchSlasheds();
  }, []);

  const handleEditClick = (slashed: SlashedCourse) => {
    setEditId(slashed.id);
    setEditSlashedData({
      code: slashed.code,
      type: slashed.type,
      sem: slashed.sem,
    });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/slashed/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editSlashedData),
      });
      if (res.ok) {
        toast.success("Slashed affinity modified in ledger");
        setEditId(null);
        fetchSlasheds();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditSlashedData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Purge slashed affinity record permanently?")) return;
    try {
      const res = await fetch(`http://localhost:8080/slashed/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Affinity record purged successfully");
        fetchSlasheds();
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
        onSubmit={handleSlashedSubmit}
        className="bg-surface p-8 rounded-institutional shadow-sm border border-brick/10"
      >
        <h2 className="text-lg font-black text-institutional-primary tracking-tight mb-6 border-b border-brick/5 pb-4">
          Define Slashed Course Dependency
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Subject Code
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={sCode}
              onChange={(e) => setSlCode(e.target.value)}
              placeholder="e.g. GST 101"
            />
          </div>
          <div className="input-group text-institutional-muted">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Slashed Category ID
            </label>
            <input
              type="text"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
              Semester Cycle
            </label>
            <input
              type="number"
              className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
              value={sem}
              onChange={(e) => setSem(e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-brick/5">
          <button
            type="submit"
            className="px-10 py-3 bg-brick text-white rounded-institutional text-sm font-black uppercase tracking-widest shadow-lg shadow-brick/20 transition-transform active:scale-95"
          >
            Record Affinity
          </button>
        </div>
      </form>

      <div className="student-list overflow-hidden">
        <h2 className="text-xl font-black text-brick uppercase tracking-widest mb-6">
          Slashed Curriculum Ledger
        </h2>
        <div className="overflow-x-auto bg-surface border border-brick/10 rounded-institutional shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-brick/5 text-[10px] font-black uppercase tracking-widest text-institutional-muted border-b border-brick/10">
                <th className="px-5 py-4">Internal Code</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4 text-center">Semester</th>
                <th className="px-5 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brick/5 text-xs font-bold text-institutional-primary">
              {slasheds.map((slashed) => (
                <tr
                  key={slashed.id}
                  className="hover:bg-brick/5 transition-colors"
                >
                  {editId === slashed.id ? (
                    <>
                      <td className="px-5 py-3">
                        <input
                          name="code"
                          value={editSlashedData.code}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3">
                        <input
                          name="type"
                          value={editSlashedData.type}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded"
                        />
                      </td>
                      <td className="px-5 py-3 text-center">
                        <input
                          name="sem"
                          value={editSlashedData.sem}
                          onChange={handleInputChange}
                          className="w-full bg-page border border-brick/10 px-2 py-1 rounded text-center"
                        />
                      </td>
                      <td className="px-5 py-3 text-right space-x-2">
                        <button
                          onClick={() => handleSave(slashed.id)}
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
                      <td className="px-5 py-3 font-mono text-brick">
                        {slashed.code}
                      </td>
                      <td className="px-5 py-3 opacity-60 font-black">
                        {slashed.type}
                      </td>
                      <td className="px-5 py-3 text-center font-black opacity-80">
                        S{slashed.sem}
                      </td>
                      <td className="px-5 py-3 text-right space-x-3">
                        <button
                          onClick={() => handleEditClick(slashed)}
                          className="text-brick hover:underline opacity-80 hover:opacity-100"
                        >
                          Modify
                        </button>
                        <button
                          onClick={() => handleDelete(slashed.id)}
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
