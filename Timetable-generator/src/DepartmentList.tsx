import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiSave,
  FiXCircle,
  FiLayers,
  FiActivity,
  FiChevronDown,
} from "react-icons/fi";
import { collegeService, College } from "./services/api/collegeService";

interface Department {
  id: string;
  code: string;
  name: string;
  collegeId: string | number;
}

interface DepartmentListProps {
  onDepartList?: (val: string) => void;
}

/**
 * Institutional Departmental Administrative Surface
 * Features: High-density data grid, unified branding, and refined administrative assets.
 */
export default function DepartmentList({ onDepartList }: DepartmentListProps) {
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    collegeId: "",
  });

  const [departments, setDepartments] = useState<Department[]>([]);
  const { data: colleges = [] } = useQuery({
    queryKey: ["colleges"],
    queryFn: collegeService.getAll,
    staleTime: 1000 * 60 * 30,
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editDeptData, setEditDeptData] = useState<Partial<Department>>({});

  const handleInputChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDepartmentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/department/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("✅ Academic department committed to registry");
        if (onDepartList) onDepartList("");
        setFormData({ code: "", name: "", collegeId: "" });
        fetchDepartments();
      } else {
        toast.error("❌ Department addition failed");
      }
    } catch (error) {
      toast.error("Critical failure during department sync");
    }
  };

  const fetchDepartments = async () => {
    try {
      const res = await fetch("http://localhost:8080/department/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize department registry");
        return;
      }
      const data = await res.json();
      setDepartments(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to department ledger");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleEditClick = (department: Department) => {
    setEditId(department.id);
    setEditDeptData({ ...department });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/department/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editDeptData),
      });
      if (res.ok) {
        toast.success("Department record modified in ledger");
        setEditId(null);
        fetchDepartments();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm(
        "Purge academic department from faculty ledger permanently?",
      )
    )
      return;
    try {
      const res = await fetch(`http://localhost:8080/department/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Department record purged successfully");
        fetchDepartments();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during department purge");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Configuration Section */}
      <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brick/5 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center gap-3 mb-8 border-b border-brick/5 pb-4">
          <FiLayers className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Define Faculty Department
          </h2>
        </div>

        <form onSubmit={handleDepartmentSubmit} className="space-y-6">
          <div className="form-grid-institutional">
            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                Department Code
              </label>
              <input
                type="text"
                name="code"
                placeholder="e.g. CSC / MTH"
                className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all"
                value={formData.code}
                onChange={handleInputChangeForm}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                Affiliated College
              </label>
              <div className="relative">
                <select
                  name="collegeId"
                  className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all appearance-none"
                  value={formData.collegeId}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      collegeId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select College</option>
                  {colleges.map((college) => (
                    <option key={college.id} value={college.id}>
                      {college.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-institutional-muted">
                  <FiChevronDown />
                </div>
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                Full Academic Name
              </label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all"
                value={formData.name}
                onChange={handleInputChangeForm}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-brick/5">
            <button
              type="submit"
              className="px-12 py-3.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brick/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
            >
              <FiActivity /> Establish Departmental Sector
            </button>
          </div>
        </form>
      </section>

      {/* Ledger Section */}
      <div className="institutional-table-container">
        <table className="institutional-table">
          <thead>
            <tr>
              <th>Dept. Code</th>
              <th>Official Designation</th>
              <th className="text-center">Affinity</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brick/5">
            {departments.map((dept) => (
              <tr
                key={dept.id}
                className="hover:bg-brick/5 transition-colors group"
              >
                {editId === dept.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        value={editDeptData.code}
                        onChange={(e) =>
                          setEditDeptData((p) => ({
                            ...p,
                            code: e.target.value,
                          }))
                        }
                        className="w-24 bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold font-mono"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editDeptData.name}
                        onChange={(e) =>
                          setEditDeptData((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <select
                        value={editDeptData.collegeId}
                        onChange={(e) =>
                          setEditDeptData((p) => ({
                            ...p,
                            collegeId: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold"
                      >
                        {colleges.map((college) => (
                          <option key={college.id} value={college.id}>
                            {college.code || college.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleSave(dept.id)}
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
                      {dept.code}
                    </td>
                    <td className="text-sm font-bold uppercase tracking-tight">
                      {dept.name}
                    </td>
                    <td className="text-center font-black opacity-80">
                      <span
                        className="status-pill status-pill-info"
                        title={
                          colleges.find(
                            (c) => String(c.id) === String(dept.collegeId),
                          )?.name
                        }
                      >
                        {colleges.find(
                          (c) => String(c.id) === String(dept.collegeId),
                        )?.code || `COL-${dept.collegeId}`}
                      </span>
                    </td>
                    <td className="text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(dept)}
                        className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(dept.id)}
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
