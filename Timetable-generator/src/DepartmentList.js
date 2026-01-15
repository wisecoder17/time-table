import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  


export default function DepartList({onDepartList}){

    //POST
    const [code,setcode]=useState('');
    const [name,setname]=useState('');
    const[college,setcollege]=useState('');
    


    
    const Departmentsubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/department/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                code:code,
                name:name,
                collegeId:college
            }),
        })
        if(res0.ok){
            toast.success("Department added")
            if(onDepartList) onDepartList('');
        }
        else{
            toast.error("Department not added");
        }
    };

    //GET
    const[departments,setDepartments]=useState([]);
    const[editD,setEditD]=useState(null);
    const[editDlist,setEditDlist]=useState({code:"",college:"",name:""})

    const fetchdepartment=async()=>{
        const res0 = await fetch('http://localhost:8080/department/get');
        const ra1= await res0.json();
        setDepartments(ra1);
        console.log("Fetched Department Data:",ra1);
        setDepartments(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchdepartment();}
    ,[])

    const handleEditClick=(department)=>{
        setEditD(department.id)
        setEditDlist({
            code:department.code
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/department/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editDlist)
            }
        );
        if(ra2.ok){
            toast.success("Department updated")
            setEditD(null);
            fetchdepartment();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditDlist(prev =>({
            ...prev,
            [name]:value
        }));
    };
    const handleCancel =() =>{
        setEditD(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/department/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchdepartment();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Departmentsubmit} className="form-section">
                <h2>Add Department</h2>
                <div className="input-group">
                    <label>Department-Code</label>
                    <input type="text" className="futuristic-input" value={code} onChange={(e)=>setcode(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Name</label>
                    <input type="text" className="futuristic-input" value={name} onChange={(e)=>setname(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>College-ID</label>
                    <input type="number" className="futuristic-input" value={college} onChange={(e)=>setcollege(e.target.value)}/>
                </div>
                
                <button type="submit" className="submit-button">Add Department</button>
            </form>

            <div className="student-list">
                <h2>Depaartment List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Department-code</th>
                            <th>Name</th>
                            <th>College-ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((department)=>(
                            <tr key={department.id}>
                                {editD === department.id?(
                                    <>
                                    <td>
                                        <input name="code" value={editD.code} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Name" value={editD.name} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Collegeid" value={editD.college} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(department.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{department.code}</td>
                                    <td>{department.name}</td>
                                    <td>{department.collegeId}</td>
                                    
                                    <td>
                                        <button onClick={()=>handleEditClick(department)}>Edit</button>
                                        <button onClick={()=>handleDelte(department.id)}>Delete</button>
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