import React, { useEffect, useState } from "react";
import { useStudentStore } from "../services/state/studentStore";
import { useModal } from "../hooks/useModal";
import { useForm } from "../hooks/useForm";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";
import Input from "../components/common/Input";
import Alert from "../components/common/Alert";

/**
 * Students management page
 */
const StudentsPage = () => {
  const {
    students,
    isLoading,
    error,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  } = useStudentStore();
  const modal = useModal();
  const [editingId, setEditingId] = useState(null);
  const [alert, setAlert] = useState(null);

  const { values, handleChange, handleSubmit, reset } = useForm(
    { name: "", email: "", studentId: "" },
    async (formValues) => {
      try {
        if (editingId) {
          await updateStudent(editingId, formValues);
          setAlert({
            type: "success",
            message: "Student updated successfully",
          });
        } else {
          await addStudent(formValues);
          setAlert({ type: "success", message: "Student added successfully" });
        }
        modal.close();
        reset();
        setEditingId(null);
      } catch (err) {
        setAlert({ type: "error", message: err.message });
      }
    },
  );

  useEffect(() => {
    fetchStudents();
  }, [fetchStudents]);

  const handleEdit = (student) => {
    setEditingId(student.id);
    modal.open(student);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteStudent(id);
        setAlert({ type: "success", message: "Student deleted successfully" });
      } catch (err) {
        setAlert({ type: "error", message: err.message });
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Students</h1>
        <Button
          variant="primary"
          onClick={() => {
            setEditingId(null);
            reset();
            modal.open();
          }}
        >
          + Add Student
        </Button>
      </div>

      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          className="mb-4"
        />
      )}

      {error && <Alert type="error" message={error} className="mb-4" />}

      {isLoading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <Card>
          {students.length === 0 ? (
            <p className="text-gray-600">No students found</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Student ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {students.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">{student.name}</td>
                      <td className="px-6 py-4">{student.email}</td>
                      <td className="px-6 py-4">{student.studentId}</td>
                      <td className="px-6 py-4 space-x-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      )}

      <Modal
        isOpen={modal.isOpen}
        onClose={() => {
          modal.close();
          setEditingId(null);
          reset();
        }}
        title={editingId ? "Edit Student" : "Add Student"}
      >
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Student ID"
            name="studentId"
            value={values.studentId}
            onChange={handleChange}
            required
          />
          <div className="flex gap-2 mt-6">
            <Button type="submit" variant="primary" className="flex-1">
              {editingId ? "Update" : "Add"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={() => {
                modal.close();
                setEditingId(null);
                reset();
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default StudentsPage;
