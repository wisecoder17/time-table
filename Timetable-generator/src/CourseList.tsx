import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiSave,
  FiXCircle,
  FiBookOpen,
  FiPlus,
} from "react-icons/fi";

interface CourseRecord {
  id: string;
  code: string;
  en_Count: string | number;
  unit: string | number;
  title: string;
  semester: string | number;
  examtype: string | number;
  offering_DeptID: string | number;
}

interface CourseListProps {
  onCourseList?: (val: string) => void;
}

/**
 * Institutional Curriculum Asset Ledger
 * Features: High-density data grid, unified branding, and refined curriculum orchestration.
 */
export default function CourseList({ onCourseList }: CourseListProps) {
  const [formData, setFormData] = useState({
    code: "",
    enCount: "",
    unit: "",
    title: "",
    semester: "",
    examType: "",
  });

  const deptId = localStorage.getItem("deptId");
  const [courses, setCourses] = useState<CourseRecord[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editCourseData, setEditCourseData] = useState<Partial<CourseRecord>>(
    {},
  );

  const handleInputChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/course/done", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          en_Count: formData.enCount,
          unit: formData.unit,
          examtype: formData.examType,
          departmentId: deptId,
        }),
      });
      if (res.ok) {
        toast.success("✅ Curriculum record committed to registry");
        if (onCourseList) onCourseList("");
        setFormData({
          code: "",
          enCount: "",
          unit: "",
          title: "",
          semester: "",
          examType: "",
        });
        fetchCourses();
      } else {
        toast.error("❌ Curriculum record commit failed");
      }
    } catch (error) {
      toast.error("Critical failure during curriculum sync");
    }
  };

  const fetchCourses = async () => {
    const username = localStorage.getItem("username");
    try {
      const res = await fetch(
        `http://localhost:8080/course/get?username=${username}`,
      );
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize curriculum registry");
        return;
      }
      const data = await res.json();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to curriculum ledger");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleEditClick = (course: CourseRecord) => {
    setEditId(course.id);
    setEditCourseData({ ...course });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/course/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editCourseData),
      });
      if (res.ok) {
        toast.success("Curriculum record modified in ledger");
        setEditId(null);
        fetchCourses();
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
        "Purge curriculum record from academic ledger permanently?",
      )
    )
      return;
    try {
      const res = await fetch(`http://localhost:8080/course/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Curriculum record purged successfully");
        fetchCourses();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during record purge");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Registration Surface */}
      <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brick/5 rounded-full -mr-16 -mt-16" />
        <div className="flex items-center gap-3 mb-8 border-b border-brick/5 pb-4">
          <FiBookOpen className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Curriculum Asset Definition
          </h2>
        </div>

        <form onSubmit={handleCourseSubmit} className="space-y-6">
          <div className="form-grid-institutional">
            {[
              {
                label: "Course Code",
                name: "code",
                placeholder: "e.g. CSC 401",
              },
              { label: "Official Title", name: "title" },
              { label: "Unit Weight", name: "unit" },
              { label: "Enrollment Count", name: "enCount" },
              { label: "Semester Cycle", name: "semester" },
              { label: "Exam Category ID", name: "examType" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
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
              className="px-12 py-3.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brick/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <FiPlus /> Commit Curriculum Entry
            </button>
          </div>
        </form>
      </section>

      {/* Ledger Surface */}
      <div className="institutional-table-container">
        <table className="institutional-table">
          <thead>
            <tr>
              <th>Internal Code</th>
              <th>Course Title</th>
              <th className="text-center">Units</th>
              <th className="text-center">Enrollment</th>
              <th className="text-center">Cycle</th>
              <th>Category</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brick/5">
            {courses.map((course) => (
              <tr
                key={course.id}
                className="hover:bg-brick/5 transition-colors group"
              >
                {editId === course.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        value={editCourseData.code}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            code: e.target.value,
                          }))
                        }
                        className="w-24 bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold font-mono"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editCourseData.title}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        value={editCourseData.unit}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            unit: e.target.value,
                          }))
                        }
                        className="w-12 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        value={editCourseData.en_Count}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            en_Count: e.target.value,
                          }))
                        }
                        className="w-16 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        value={editCourseData.semester}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            semester: e.target.value,
                          }))
                        }
                        className="w-12 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        value={editCourseData.examtype}
                        onChange={(e) =>
                          setEditCourseData((p) => ({
                            ...p,
                            examtype: e.target.value,
                          }))
                        }
                        className="w-20 bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleSave(course.id)}
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
                      {course.code}
                    </td>
                    <td className="text-sm font-bold uppercase tracking-tight max-w-[300px] truncate">
                      {course.title}
                    </td>
                    <td className="text-center font-black opacity-80">
                      {course.unit}{" "}
                      <span className="text-[9px] opacity-40">U</span>
                    </td>
                    <td className="text-center font-mono text-[10px] font-black">
                      {course.en_Count} <span className="opacity-30">ENR</span>
                    </td>
                    <td className="text-center">
                      <span className="status-pill status-pill-info">
                        S{course.semester}
                      </span>
                    </td>
                    <td>
                      <span className="text-[10px] font-black uppercase text-institutional-muted tracking-widest opacity-60">
                        TYP-{course.examtype}
                      </span>
                    </td>
                    <td className="text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(course)}
                        className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(course.id)}
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
