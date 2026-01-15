import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
export default function StudentsemregList({onStudentsemregList}){

    //POST
    const [matric,setMAtric]=useState('');
    const[course,setCourse]=useState('');
    const [session,setsession]=useState('');
    const[semester,setsemester]=useState('');
    


    
    const Studentsemsubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/sem/reg',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                matric_No:matric,
                course_Code_List:course,
                session:session,
                semester:semester
            }),
        })
        if(res0.ok){
            toast.success("Studentsemreg added")
            if(onStudentsemregList) onStudentsemregList('');
        }
        else{
            toast.error("Studentsemreg not added");
        }
    };

    //GET
    const[regs,setRegs]=useState([]);
    const[editS,setEditS]=useState(null);
    const[editSlist,setEditSlist]=useState({matric_NO:"",course_Code_List:"",session:"",semester:""})

    const fetchstudentsem=async()=>{
        const res0 = await fetch('http://localhost:8080/sem/get');
        const ra1= await res0.json();
        setRegs(ra1);
        console.log("Fetched Student Semester Reg Data:",ra1);
        setRegs(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchstudentsem();}
    ,[])

    const handleEditClick=(reg)=>{
        setEditS(reg.id)
        setEditSlist({
            matric_No:reg.matric,
            course_Code_List:reg.course,
            session:reg.session,
            semester:reg.semester
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/sem/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editSlist)
            }
        );
        if(ra2.ok){
            toast.success("Student semster reg updated")
            setEditS(null);
            fetchstudentsem();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditSlist(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditS(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/sem/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchstudentsem();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Studentsemsubmit} className="form-section">
                <h2>Add Student semster reg</h2>
                <div className="input-group">
                    <label>Matric-No</label>
                    <input type="text" className="futuristic-input" value={matric} onChange={(e)=>setMAtric(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Course-Code List</label>
                    <input type="text" className="futuristic-input" value={course} onChange={(e)=>setCourse(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Session</label>
                    <input type="text" className="futuristic-input" value={session} onChange={(e)=>setsession(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Semester</label>
                    <input type="number" className="futuristic-input" value={semester} onChange={(e)=>setsemester(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Add Student semester reg</button>
            </form>

            <div className="student-list">
                <h2>Student semester registration List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Matric-No</th>
                            <th>Course-code List</th>
                            <th>Session</th>
                            <th>Semester</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regs.map((reg)=>(
                            <tr key={reg.id}>
                                {editS === reg.id?(
                                    <>
                                    <td>
                                        <input name="matric_NO" value={editS.matric_NO} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="course_Code_List" value={editS.course_Code_List} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="session" value={editS.session} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="semester" value={editS.semester} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(reg.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{reg.matric_NO}</td>
                                    <td>{reg.course_Code_List}</td>
                                    <td>{reg.session}</td>
                                    <td>{reg.semester}</td>
                                    <td>
                                        <button onClick={()=>handleEditClick(reg)}>Edit</button>
                                        <button onClick={()=>handleDelte(reg.id)}>Delete</button>
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
        </>
    )

    


}