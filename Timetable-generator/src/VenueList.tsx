import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";
import { FiEdit2, FiTrash2, FiSave, FiXCircle, FiMapPin } from "react-icons/fi";

interface Venue {
  id: string;
  venue_Code: string;
  name: string;
  capacity: string;
  type: string;
  preference: string;
  location: string;
}

interface VenueListProps {
  onVenueList?: (val: string) => void;
}

/**
 * Institutional Infrastructure Asset Registry
 * Features: High-density data grid, unified branding, and refined administrative actions.
 */
export default function VenueList({ onVenueList }: VenueListProps) {
  const [formData, setFormData] = useState({
    venuecode: "",
    vname: "",
    capacity: "",
    vtype: "",
    pref: "",
    loc: "",
  });

  const [venues, setVenues] = useState<Venue[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [editVenueData, setEditVenueData] = useState<Partial<Venue>>({});

  const handleInputChangeForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVenueSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/venue/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          venue_Code: formData.venuecode,
          name: formData.vname,
          capacity: formData.capacity,
          type: formData.vtype,
          preference: formData.pref,
          location: formData.loc,
        }),
      });
      if (res.ok) {
        toast.success("✅ Venue asset record committed");
        if (onVenueList) onVenueList("");
        setFormData({
          venuecode: "",
          vname: "",
          capacity: "",
          vtype: "",
          pref: "",
          loc: "",
        });
        fetchVenues();
      } else {
        toast.error("❌ Venue record commit failed");
      }
    } catch (error) {
      toast.error("Critical failure during venue sync");
    }
  };

  const fetchVenues = async () => {
    try {
      const res = await fetch("http://localhost:8080/venue/get");
      if (!res.ok) {
        toast.error("⚠️ Failed to synchronize infrastructure registry");
        return;
      }
      const data = await res.json();
      setVenues(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error("Critical connection failure to venue ledger");
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleEditClick = (venue: Venue) => {
    setEditId(venue.id);
    setEditVenueData({ ...venue });
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`http://localhost:8080/venue/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editVenueData),
      });
      if (res.ok) {
        toast.success("Venue record modified in ledger");
        setEditId(null);
        fetchVenues();
      } else {
        toast.error("Registry modification failed");
      }
    } catch (error) {
      toast.error("Critical failure during record save");
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !window.confirm("Purge venue record from infrastructure asset portfolio?")
    )
      return;
    try {
      const res = await fetch(`http://localhost:8080/venue/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Venue record purged successfully");
        fetchVenues();
      } else {
        toast.error("Purge operation failed");
      }
    } catch (error) {
      toast.error("Critical failure during venue purge");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Registration Section */}
      <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-2 h-full bg-brick" />
        <div className="flex items-center gap-3 mb-8 border-b border-brick/5 pb-4">
          <FiMapPin className="text-brick text-xl" />
          <h2 className="text-lg font-black text-institutional-primary tracking-tight">
            Infrastructure Asset Enrollment
          </h2>
        </div>

        <form onSubmit={handleVenueSubmit} className="space-y-6">
          <div className="form-grid-institutional">
            {[
              {
                label: "Venue Code",
                name: "venuecode",
                placeholder: "e.g. HAL-101",
              },
              { label: "Official Name", name: "vname" },
              { label: "Max Capacity", name: "capacity" },
              { label: "Type ID", name: "vtype" },
              { label: "Allocation Pref.", name: "pref" },
              { label: "Geospatial Location", name: "loc" },
            ].map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted">
                  {field.label}
                </label>
                <input
                  type="text"
                  name={field.name}
                  className="w-full px-4 py-2.5 bg-page border border-brick/10 rounded-institutional text-sm font-bold text-institutional-primary focus:outline-none focus:ring-2 focus:ring-brick/20 transition-all"
                  value={(formData as any)[field.name]}
                  onChange={handleInputChangeForm}
                />
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-brick/5">
            <button
              type="submit"
              className="px-12 py-3.5 bg-brick text-white rounded-institutional text-[10px] font-black uppercase tracking-widest shadow-lg shadow-brick/20 hover:scale-[1.02] transition-all"
            >
              Commit Asset Entry
            </button>
          </div>
        </form>
      </section>

      {/* Ledger Section */}
      <div className="institutional-table-container">
        <table className="institutional-table">
          <thead>
            <tr>
              <th>Venue Code</th>
              <th>Designation</th>
              <th className="text-center">Capacity</th>
              <th className="text-center">Preference</th>
              <th>Location Sector</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brick/5">
            {venues.map((venue) => (
              <tr
                key={venue.id}
                className="hover:bg-brick/5 transition-colors group"
              >
                {editId === venue.id ? (
                  <>
                    <td className="px-4 py-2">
                      <input
                        name="venue_Code"
                        value={editVenueData.venue_Code}
                        onChange={(e) =>
                          setEditVenueData((p) => ({
                            ...p,
                            venue_Code: e.target.value,
                          }))
                        }
                        className="w-24 bg-page border border-brick/20 px-2 py-1 rounded text-xs font-bold"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="name"
                        value={editVenueData.name}
                        onChange={(e) =>
                          setEditVenueData((p) => ({
                            ...p,
                            name: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        name="capacity"
                        value={editVenueData.capacity}
                        onChange={(e) =>
                          setEditVenueData((p) => ({
                            ...p,
                            capacity: e.target.value,
                          }))
                        }
                        className="w-16 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <input
                        name="preference"
                        value={editVenueData.preference}
                        onChange={(e) =>
                          setEditVenueData((p) => ({
                            ...p,
                            preference: e.target.value,
                          }))
                        }
                        className="w-16 mx-auto bg-page border border-brick/20 px-2 py-1 rounded text-xs text-center"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <input
                        name="location"
                        value={editVenueData.location}
                        onChange={(e) =>
                          setEditVenueData((p) => ({
                            ...p,
                            location: e.target.value,
                          }))
                        }
                        className="w-full bg-page border border-brick/20 px-2 py-1 rounded text-xs"
                      />
                    </td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => handleSave(venue.id)}
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
                      {venue.venue_Code}
                    </td>
                    <td className="text-sm font-bold uppercase tracking-tight">
                      {venue.name}
                    </td>
                    <td className="text-center font-black opacity-80">
                      {venue.capacity}{" "}
                      <span className="text-[10px] opacity-40">Pax</span>
                    </td>
                    <td className="text-center">
                      <span className="status-pill status-pill-info">
                        Rank {venue.preference}
                      </span>
                    </td>
                    <td className="text-[10px] uppercase font-black opacity-40 italic">
                      {venue.location}
                    </td>
                    <td className="text-right space-x-1">
                      <button
                        onClick={() => handleEditClick(venue)}
                        className="p-2 text-brick opacity-0 group-hover:opacity-100 hover:bg-brick/10 rounded-full transition-all duration-300"
                      >
                        <FiEdit2 size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(venue.id)}
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
