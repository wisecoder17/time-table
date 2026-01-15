import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function ProgramList({onProgramList}){

    //POST
    const [progcode,setPcode]=useState('');
    const[pname,setPname]=useState('');
    const [deptid,setPid]=useState('');
    const[newcode,setnewC]=useState('');
    


    
    const Programsubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/program/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                code:progcode,
                name:pname,
                deptID:deptid,
                newCodeID:newcode
            }),
        })
        if(res0.ok){
            toast.success("Program added")
            if(onProgramList) onProgramList('');
        }
        else{
            toast.error("Program not added");
        }
    };

    //GET
    const[programs,setPrograms]=useState([]);
    const[editP,setEditP]=useState(null);
    const[editPlist,setEditPlist]=useState({progcode:""},{pname:""},{deptid:""},{newcode:""})

    const fetchprogram=async()=>{
        const res0 = await fetch('http://localhost:8080/program/get');
        const ra1= await res0.json();
        setPrograms(ra1);
        console.log("Fetched Program Data:",ra1);
        setPrograms(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchprogram();}
    ,[])

    const handleEditClick=(program)=>{
        setEditP(program.id)
        setEditPlist({
            code:program.progcode,
            name:program.pname,
            deptID:program.deptid,
            newCodeID:program.newcode
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/program/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editPlist)
            }
        );
        if(ra2.ok){
            toast.success("Program updated")
            setEditP(null);
            fetchprogram();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditPlist(prev =>({
            ...prev,
            [name]:value
        }));
    };
    const handleCancel =() =>{
        setEditP(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/program/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchprogram();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Programsubmit} className="form-section">
                <h2>Add Program</h2>
                <div className="input-group">
                    <label>Program-Code</label>
                    <input type="text" className="futuristic-input" value={progcode} onChange={(e)=>setPcode(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Program name</label>
                    <input type="text" className="futuristic-input" value={pname} onChange={(e)=>setPname(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Department-ID</label>
                    <input type="number" className="futuristic-input" value={deptid} onChange={(e)=>setPid(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>New code</label>
                    <input type="number" className="futuristic-input" value={newcode} onChange={(e)=>setnewC(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Add Program</button>
            </form>
            


            <div className="student-list">
                <h2>Program List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Program-code</th>
                            <th>Program name</th>
                            <th>Department-ID</th>
                            <th>New program code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {programs.map((program)=>(
                            <tr key={program.id}>
                                {editP === program.id?(
                                    <>
                                    <td>
                                        <input name="code" value={editP.progcode} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="name" value={editP.pname} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="deptID" value={editP.deptid} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="newCodeID" value={editP.newcode} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(program.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{program.code}</td>
                                    <td>{program.name}</td>
                                    <td>{program.deptID}</td>
                                    <td>{program.newCodeID}</td>
                                    <td>
                                        <button onClick={()=>handleEditClick(program)}>Edit</button>
                                        <button onClick={()=>handleDelte(program.id)}>Delete</button>
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