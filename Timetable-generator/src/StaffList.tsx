import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiTrash2,
  FiSave,
  FiXCircle,
  FiUserPlus,
  FiFilter,
  FiSearch,
} from "react-icons/fi";

interface Staff {
  id: string;
  surname: string;
  firstname: string;
  middlename: string;
  staff_id: string;
  title: string;
  deptid: string | null;
  statusID: string;
  type: string;
  in_use: string;
  duty_count: string;
  specialization: string;
  research_area: string;
  discipline: string;
}

interface StaffListProps {
  onStaffList?: (val: string) => void;
}

/**
 * Institutional Academic Staff Registry
 * Features: High-density personnel data grid, unified branding, and refined administrative actions.
 */
export default function StaffList({ onStaffList }: StaffListProps) {
  // Form State
  const [formData, setFormData] = useState({
    surnamee: "",
    firstname: "",
    middlename: "",
    staff_id: "",
    title: "",
    statusid: "",
    type: "",
    dutyCount: "",
    special: "",
    research: "",
    dis: "",
  });

  const deptid = localStorage.getItem("deptid");
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editStaffData, setEditStaffData] = useState<Partial<Staff>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredStaff = staffs.filter((staff) => {
    const searchStr = searchQuery.toLowerCase();
    return (
      staff.surname?.toLowerCase().includes(searchStr) ||
      staff.firstname?.toLowerCase().includes(searchStr) ||
      staff.staff_id?.toLowerCase().includes(searchStr) ||
      staff.discipline?.toLowerCase().includes(searchStr)
    );
  });

  const totalPages = Math.ceil(filteredStaff.length / itemsPerPage);
  const paginatedStaff = filteredStaff.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const submitStaff = async (e: FormEvent) => {
    e.preventDefault();

    // 1. Mandatory Data Check
    const { surnamee, firstname, staff_id, title, statusid, type, dutyCount } =
      formData;
    if (!surnamee || !firstname || !staff_id || !title || !statusid || !type) {
      toast.warn("Verify all mandatory academic personnel fields");
      return;
    }

    // 2. Load Factor Validation
    if (isNaN(Number(dutyCount)) || Number(dutyCount) < 0) {
      toast.error(
        "Data integrity Error: Duty count must be a positive integer",
      );
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/staff/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          surname: formData.surnamee,
          firstname: formData.firstname,
          middlename: formData.middlename,
          staff_id: formData.staff_id,
          title: formData.title,
          deptid: deptid,
          statusID: formData.statusid,
          type: formData.type,
          duty_count: formData.dutyCount,
          specialization: formData.special,
          research_area: formData.research,
          discipline: formData.dis,
        }),
      });

      if (res.ok) {
        toast.success("✅ Academic personnel record committed to registry");
        if (onStaffList) onStaffList("");
        fetchStaff();
        setFormData({
          surnamee: "",
          firstname: "",
          middlename: "",
          staff_id: "",
          title: "",
          statusid: "",
          type: "",
          dutyCount: "",
          special: "",
          research: "",
          dis: "",
        });
      } else {
        toast.error("❌ Personnel record commit failed");
      }
    } catch (error) {
      toast.error("Critical failure during personnel sync");
    }
  };

  const fetchStaff = async () => {
    const username = localStorage.getItem("username");
    try {
      const res = await fetch(
        `http://localhost:8080/staff/get?username=${username}`,
      );
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize personnel registry");
        return;
      }
      const data = await res.json();
      setStaffs(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to personnel ledger");
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleEditClick = (staff: Staff) => {
    setEditId(staff.id);
    setEditStaffData({ ...staff });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/staff/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editStaffData),
      });
      if (res.ok) {
        toast.success("Personnel record modified in ledger");
        setEditId(null);
        fetchStaff();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Purge personnel record from faculty ledger permanently?")
    )
      return;
    try {
      const res = await fetch(`http://localhost:8080/staff/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Personnel record purged successfully");
        fetchStaff();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during personnel purge");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Registration Surface */}
      <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-brick" />
        <div className="flex items-center gap-3 mb-8 border-b border-brick/5 pb-4">
          <FiUserPlus className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Personnel Enrollment Interface
          </h2>
        </div>

        <form onSubmit={submitStaff} className="space-y-6">
          <div className="form-grid-institutional">
            {[
              { label: "Title", name: "title", placeholder: "e.g. Dr., Prof." },
              { label: "Surname", name: "surnamee" },
              { label: "First Name", name: "firstname" },
              { label: "Middle Name", name: "middlename" },
              { label: "Staff ID", name: "staff_id" },
              { label: "Status Tier", name: "statusid" },
              { label: "Faculty Type", name: "type" },
              { label: "Duty Count", name: "dutyCount" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
                  value={(formData as any)[field.name]}
                  onChange={handleFormChange}
                />
              </div>
            ))}
            <div className="md:col-span-2 lg:col-span-3 space-y-2">
              <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                Primary Academic Discipline
              </label>
              <input
                type="text"
                name="dis"
                className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 focus:border-brick transition-all"
                value={formData.dis}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="pt-4 border-t border-brick/5">
            <button
              type="submit"
              className="px-12 py-3.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brick/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Commit Entry to Faculty Ledger
            </button>
          </div>
        </form>
      </section>

      {/* Registry Surface */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-black text-brick uppercase tracking-widest">
              Faculty Ledger
            </h2>
            <span className="text-[10px] font-black bg-brick/10 text-brick px-2 py-1 rounded-full uppercase italic animate-pulse">
              Sync Active
            </span>
          </div>
          <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-institutional-muted hover:text-brick transition-colors">
            <FiFilter /> Filter Manifest
          </button>
        </div>

        <div className="institutional-table-container">
          <div className="p-4 border-b border-brick/10 bg-page/50 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-1 max-w-2xl gap-2">
              <div className="relative flex-1 group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brick group-focus-within:scale-110 transition-transform">
                  <FiSearch size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Search by Name, ID or Discipline..."
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                className="px-6 py-2.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-md hover:bg-brick-deep transition-all flex items-center gap-2 shrink-0"
                onClick={() =>
                  toast.info(`Faculty filtered by: ${searchQuery || "All"}`)
                }
              >
                <FiSearch size={14} /> Search
              </button>
            </div>
            <div className="text-[10px] font-black uppercase text-institutional-muted tracking-widest bg-brick/5 px-3 py-2 rounded-full border border-brick/10 inline-flex items-center self-start md:self-center">
              Personnel Registry: {filteredStaff.length} records
            </div>
          </div>

          <table className="institutional-table">
            <thead>
              <tr>
                <th>Title / Designation</th>
                <th>Full Name</th>
                <th className="text-center">Staff ID</th>
                <th className="text-center">Load Factor</th>
                <th>Discipline</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brick/5">
              {paginatedStaff.map((staff) => (
                <tr
                  key={staff.id}
                  className="hover:bg-brick/5 transition-colors group"
                >
                  {editId === staff.id ? (
                    <>
                      <td className="px-4 py-2">
                        <input
                          name="title"
                          value={editStaffData.title}
                          onChange={(e) =>
                            setEditStaffData((p) => ({
                              ...p,
                              title: e.target.value,
                            }))
                          }
                          className="w-20 bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold"
                        />
                      </td>
                      <td className="px-4 py-2 flex gap-1">
                        <input
                          value={editStaffData.surname}
                          onChange={(e) =>
                            setEditStaffData((p) => ({
                              ...p,
                              surname: e.target.value,
                            }))
                          }
                          className="w-1/3 bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                        />
                        <input
                          value={editStaffData.firstname}
                          onChange={(e) =>
                            setEditStaffData((p) => ({
                              ...p,
                              firstname: e.target.value,
                            }))
                          }
                          className="w-1/3 bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                        />
                      </td>
                      <td className="px-4 py-2 text-center">
                        <input
                          value={editStaffData.staff_id}
                          onChange={(e) =>
                            setEditStaffData((p) => ({
                              ...p,
                              staff_id: e.target.value,
                            }))
                          }
                          className="w-24 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                        />
                      </td>
                      <td className="px-4 py-2 text-center text-institutional-muted text-[10px] font-mono italic">
                        #{staff.duty_count}
                      </td>
                      <td className="px-4 py-2">
                        <input
                          value={editStaffData.discipline}
                          onChange={(e) =>
                            setEditStaffData((p) => ({
                              ...p,
                              discipline: e.target.value,
                            }))
                          }
                          className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                        />
                      </td>
                      <td className="px-4 py-2 text-right space-x-2">
                        <button
                          onClick={() => handleSave(staff.id)}
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
                      <td>
                        <span className="text-brick font-black italic uppercase tracking-tighter opacity-80">
                          {staff.title || "Lecturer"}
                        </span>
                      </td>
                      <td>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold uppercase tracking-tight">
                            {staff.surname}, {staff.firstname}
                          </span>
                          <span className="text-[10px] text-institutional-muted opacity-40 italic">
                            {staff.middlename || "Principal Personnel"}
                          </span>
                        </div>
                      </td>
                      <td className="text-center font-mono text-[10px] font-black opacity-60 tracking-wider">
                        [{staff.staff_id}]
                      </td>
                      <td className="text-center">
                        <span className="status-pill status-pill-info">
                          Load: {staff.duty_count}
                        </span>
                      </td>
                      <td>
                        <span className="text-[10px] font-black uppercase text-institutional-muted tracking-widest">
                          {staff.discipline}
                        </span>
                      </td>
                      <td className="text-right space-x-1">
                        <button
                          onClick={() => handleEditClick(staff)}
                          className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                        >
                          <FiEdit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(staff.id)}
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-white border border-brick/10 rounded text-[10px] font-black uppercase disabled:opacity-50 hover:bg-brick/5 transition-all"
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {filteredStaff.length === 0 && (
            <div className="py-20 text-center opacity-40 italic">
              {searchQuery
                ? `No personnel records found matching "${searchQuery}"`
                : "No academic personnel records found in current faculty ledger."}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
