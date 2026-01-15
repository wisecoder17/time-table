import React, { useEffect, useState } from "react";
import Studentform from "./Studentform";
import { toast } from "react-toastify";
export default function StudentList({onStudentList}){
    const [students, setStudents]=useState([]);
    const [editId,setEditId]=useState(null);
    const [editData,setEditdata]=useState({matric_No:"",surname:"",firstname:"",middlename:"",level:"",gender:"",programmeID:"",start_Session:"",programme:"",deptId:""});

    
    
    const FetchStudents = async () => {
        const username = localStorage.getItem("username");
    
        const res0 = await fetch(
          `http://localhost:8080/student/get?username=${username}`
        );
        if (!res0.ok) {
          toast.error("⚠️ Failed to fetch students");
          return;
        }
        const ra1 = await res0.json();
        console.log("Fetched Students Data:", ra1);
        setStudents(Array.isArray(ra1) ? ra1 : []);
      };
    
    useEffect(()=> {
        FetchStudents();
    },[]);

    const handleEditClick = (student)=>{
        setEditId(student.id);
        setEditdata({
            matric_No:student.matric_No,
            surname:student.surname,
            firstname:student.firstname,
            level:student.level,
            middlename:student.middlename,
            programmeID:student.programmeID,
            start_Session:student.start_Session,
            programme:student.programme,
            gender:student.gender,
            deptID:student.deptID
        });
    };

    const handleSave = async (id) =>{
        const res5 = await fetch(`http://localhost:8080/student/update/${id}`,{
            method:'PUT',
            headers:{"Content-Type" : "application/json"},
            body:JSON.stringify(editData),
        });
        if(res5.ok){
            toast.success("Student updated");
            setEditId(null);
            FetchStudents();
        }
        else{toast.error("Update failed")}
    };

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditdata(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditId(null);
    }

    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/student/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            FetchStudents();

        }
        else{
            toast.error("Deletion failed")
        }
    }

    return (
        <div className="student-list">
            <h2>Student List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Matric-no</th>
                        <th>Surname</th>
                        <th>First name</th>
                        <th>Middle Name</th>
                        <th>Level</th>
                        <th>Gender</th>
                        <th>Dept-ID</th>
                        <th>Start-Session</th>
                        <th>Programme</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student)=>(
                        <tr key={student.id}>
                            {editId === student.id ? (
                                <>
                                <td>
                                    <input name="matric_No" value={editData.matric_No} onChange={handleInputchange}/>
                                </td>
                                <td>
                                    <input name="surname" value={editData.surname} onChange={handleInputchange}/>
                                </td>
                                <td> 
                                    <input name="firstname" value={editData.firstname} onChange={handleInputchange}/>
                                </td>
                                <td>
                                    <input name="middlename" value={editData.middlename} onChange={handleInputchange}/>
                                </td>
                                <td>
                                    <input name="level" value={editData.level} onChange={handleInputchange}/>
                                </td>    
                                <td>
                                    <input name="gender" value={editData.gender} onChange={handleInputchange}/>
                                </td>
                                <td>
                                    <input name="deptID" value={editData.deptId} onChange={handleInputchange} readOnly/>
                                </td>
                                <td>
                                    <input name="start_Session" value={editData.start_Session} onChange={handleInputchange} />
                                </td>
                                <td>
                                    <input name="programme" value={editData.programme} onChange={handleInputchange} />
                                </td>
                                
                                
                                
                                <td>
                                    <button onClick={()=> handleSave(student.id)}>Save</button>
                                    <button onClick={handleCancel}>Cancel</button>
                                </td>
                                </>
                            ) : (
                                <>
                                <td>{student.matric_No}</td>
                                <td>{student.surname}</td>
                                <td>{student.firstname}</td>
                                <td>{student.middlename}</td>
                                <td>{student.level}</td>
                                <td>{student.gender}</td>
                                <td>{student.deptID}</td>
                                <td>{student.start_Session}</td>
                                <td>{student.programme}</td>
                                <td>
                                    <button onClick={()=> handleEditClick(student)}>Edit</button>
                                    <button onClick={()=> handleDelte(student.id)}>Delete</button>
                                </td>
                                </>
                            
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}