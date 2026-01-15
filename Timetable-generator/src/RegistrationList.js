import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  

export default function RegList({onRegList}){

    //POST
    const [regdmc,setregdmc]=useState('');
    const[centreid,setentreid]=useState('');
    const[matric,setmatric]=useState('');
    const [session,setsession]=useState('');
    const[semester,setsemester]=useState('');
    const[course,setcourse]=useState('');
    



    
    const Registrationsubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/registration/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                regDMC:regdmc,
                centreID:centreid,
                matricNO:matric,
                courseCode:course,
                semester:semester,
                session:session
               
            }),
        })
        if(res0.ok){
            toast.success("Resgistration added")
            if(onRegList) onRegList('');
        }
        else{
            toast.error("Registration not added");
        }
    };

    //GET
    const[regs,setRegs]=useState([]);
    const[editR,setEditR]=useState('');
    const[editRlist,setEditRlist]=useState({regdmc:""},{centreid:""},{matric:""},{course:""},{semester:""},{session:""})

    const fetchreg=async()=>{
        const res0 = await fetch('http://localhost:8080/registration/get');
        const ra1= await res0.json();
        setRegs(ra1);
        console.log("Fetched registration Data:",ra1);
        setRegs(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchreg();}
    ,[])

    const handleEditClick=(registration)=>{
        setEditR(registration.id)
        setEditRlist({
            regDMC:registration.regdmc,
            centreID:registration.centreid,
            matricNO:registration.matric,
            courseCode:registration.course,
            semester:registration.semester,
            session:registration.session
            
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/registration/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editRlist)
            }
        );
        if(ra2.ok){
            toast.success("Reg updated")
            setEditR(null);
            fetchreg();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditRlist(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditR(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/registration/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchreg();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Registrationsubmit} className="form-section">
                <h2>Registration</h2>
                <div className="input-group">
                    <label>Reg-DMC</label>
                    <input type="number" className="futuristic-input" value={regdmc} onChange={(e)=>setregdmc(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Centre-ID</label>
                    <input type="number" className="futuristic-input" value={centreid} onChange={(e)=>setentreid(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Matric No</label>
                    <input type="text" className="futuristic-input" value={matric} onChange={(e)=>setmatric(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Session</label>
                    <input type="text" className="futuristic-input" value={session} onChange={(e)=>setsession(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Semester</label>
                    <input type="number" className="futuristic-input" value={semester} onChange={(e)=>setsemester(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Course-Code</label>
                    <input type="text" className="futuristic-input" value={course} onChange={(e)=>setcourse(e.target.value)}/>
                </div>
                
                <button type="submit" className="submit-button">Register</button>
            </form>

            <div className="student-list">
                <h2>Registration List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>REg-DMC</th>
                            <th>Centre-ID</th>
                            <th>Matric-NO</th>
                            <th>Session</th>
                            <th>Semester</th>
                            <th>Course-code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {regs.map((reg)=>(
                            <tr key={reg.id}>
                                {editR === reg.id?(
                                    <>
                                    <td>
                                        <input name="regDMC" value={editR.regDMC} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="centreID" value={editR.centreId} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="matricNO" value={editR.matricNO} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="session" value={editR.session} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="semester" value={editR.semester} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="courseCode" value={editR.courseCode} onChange={handleInputchange}/>
                                    </td>
                                    
                                    <td>
                                        <button onClick={()=>handleSave(reg.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{reg.regDMC}</td>
                                     <td>{reg.centreID}</td>
                                    <td>{reg.matricNO}</td>
                                    <td>{reg.session}</td>
                                    <td>{reg.semester}</td>
                                    <td>{reg.courseCode}</td>
                                    
                                    
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