import React, { useEffect, useState, ChangeEvent } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiSave, FiXCircle, FiSearch } from "react-icons/fi";

interface Student {
  id: string;
  matric_No: string;
  surname: string;
  firstname: string;
  middlename: string;
  level: string;
  gender: string;
  programmeID: string;
  start_Session: string;
  programme: string;
  deptID: string;
}

interface StudentListProps {
  onStudentList?: () => void;
}

/**
 * Institutional Student Registry Ledger
 * Features: High-density data grid, deterministic state management, and unified branding.
 */
export default function StudentList({ onStudentList }: StudentListProps) {
  const [students, setStudents] = useState<Student[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Student>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const fetchStudents = async () => {
    const username = localStorage.getItem("username");
    try {
      const res = await fetch(
        `http://localhost:8080/student/get?username=${username}`,
      );
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize academic registry");
        return;
      }
      const data = await res.json();
      setStudents(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to registry");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Institutional standard for ledger view

  const filteredStudents = students.filter((student) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      student.matric_No?.toLowerCase().includes(searchStr) ||
      student.surname?.toLowerCase().includes(searchStr) ||
      student.firstname?.toLowerCase().includes(searchStr) ||
      student.programme?.toLowerCase().includes(searchStr)
    );
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleEditClick = (student: Student) => {
    setEditId(student.id);
    setEditData({ ...student });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/student/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });
      if (res.ok) {
        toast.success("Student record committed to registry");
        setEditId(null);
        fetchStudents();
        if (onStudentList) onStudentList();
      } else {
        toast.error("Registry update failed");
      }
    } catch (error) {
      toast.error("Critical failure during registry save");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Purge student record from academic ledger permanently?")
    )
      return;
    try {
      const res = await fetch(`http://localhost:8080/student/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Student record purged successfully");
        fetchStudents();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during registry purge");
    }
  };

  return (
    <div className="institutional-table-container animate-fade-in">
      <div className="p-4 border-b border-brick/10 bg-page/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-1 max-w-2xl gap-2">
          <div className="relative flex-1 group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brick group-focus-within:scale-110 transition-transform">
              <FiSearch size={16} />
            </div>
            <input
              type="text"
              placeholder="Search by Matric No, Name or Programme..."
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  // Live search already handles this, but Enter provides feedback
                  toast.info(`Filtering for: ${searchQuery}`, {
                    autoClose: 1000,
                  });
                }
              }}
            />
          </div>
          <button
            className="px-6 py-2.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-brick-deep transition-all flex items-center gap-2 shrink-0"
            onClick={() =>
              toast.info(`Registry filtered by: ${searchQuery || "Show All"}`)
            }
          >
            <FiSearch size={14} /> Search
          </button>
        </div>
        <div className="text-[10px] font-black uppercase text-institutional-muted tracking-widest bg-brick/5 px-3 py-2 rounded-full border border-brick/10 inline-flex items-center self-start md:self-center">
          Registry Ledger: {filteredStudents.length} matches
        </div>
      </div>

      <table className="institutional-table">
        <thead>
          <tr>
            <th>Matric No.</th>
            <th>Full Name</th>
            <th className="text-center">Level</th>
            <th className="text-center">Cycle</th>
            <th>Programme</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-brick/5">
          {paginatedStudents.map((student) => (
            <tr
              key={student.id}
              className="hover:bg-brick/5 transition-colors group"
            >
              {editId === student.id ? (
                <>
                  <td className="px-3 py-2">
                    <input
                      name="matric_No"
                      value={editData.matric_No}
                      onChange={handleInputChange}
                      className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 flex gap-1">
                    <input
                      name="surname"
                      value={editData.surname}
                      onChange={handleInputChange}
                      placeholder="Surname"
                      className="w-1/3 bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                    />
                    <input
                      name="firstname"
                      value={editData.firstname}
                      onChange={handleInputChange}
                      placeholder="Firstname"
                      className="w-1/3 bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                    />
                    <input
                      name="middlename"
                      value={editData.middlename}
                      onChange={handleInputChange}
                      placeholder="Middle"
                      className="w-1/3 bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      name="level"
                      value={editData.level}
                      onChange={handleInputChange}
                      className="w-20 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      name="start_Session"
                      value={editData.start_Session}
                      onChange={handleInputChange}
                      className="w-24 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      name="programme"
                      value={editData.programme}
                      onChange={handleInputChange}
                      className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                    />
                  </td>
                  <td className="px-3 py-2 text-right space-x-2">
                    <button
                      onClick={() => handleSave(student.id)}
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
                    {student.matric_No}
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="uppercase tracking-tight">
                        {student.surname}, {student.firstname}
                      </span>
                      <span className="text-[10px] opacity-40 italic">
                        {student.middlename || "No Middle Name"}
                      </span>
                    </div>
                  </td>
                  <td className="text-center">
                    <span className="status-pill status-pill-info">
                      {student.level}L
                    </span>
                  </td>
                  <td className="text-center font-mono text-[10px] opacity-60 italic">
                    {student.start_Session}
                  </td>
                  <td className="text-xs font-bold opacity-80 max-w-[200px] truncate">
                    {student.programme}
                  </td>
                  <td className="text-right space-x-1">
                    <button
                      onClick={() => handleEditClick(student)}
                      className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                    >
                      <FiEdit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(student.id)}
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

      {totalPages > 1 && (
        <div className="flex justify-between items-center px-4 py-4 border-t border-brick/10 bg-page/30">
          <p className="text-[10px] uppercase font-bold text-institutional-muted tracking-widest">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white border border-brick/10 rounded text-[10px] font-black uppercase disabled:opacity-50 hover:bg-brick/5 transition-all"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white border border-brick/10 rounded text-[10px] font-black uppercase disabled:opacity-50 hover:bg-brick/5 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {filteredStudents.length === 0 && (
        <div className="py-20 text-center opacity-40 italic">
          {searchQuery
            ? `No records found matching "${searchQuery}"`
            : "No institutional student records found in current ledger section."}
        </div>
      )}
    </div>
  );
}
