import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
export default function SlashedList({onSlashedList}){
    //POST
    const [Scode,setSlcode]=useState('');
    const[type,setType]=useState('');
    const [sem,setSem]=useState('');
        
    const Slashedsubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/slashed/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                code:Scode,
                type:type,
                sem:sem
            }),
        })
        if(res0.ok){
            toast.success("Slashed course added")
            if(onSlashedList) onSlashedList('');
        }
        else{
            toast.error("Slashed not added");
        }
    };

    //GET
    const[slasheds,setSlasheds]=useState([]);
    const[editSl,setEditSl]=useState('');
    const[editSLlist,setEditSLlist]=useState({Scode:""},{type:""},{sem:""})

    const fetchslashed=async()=>{
        const res0 = await fetch('http://localhost:8080/slashed/get');
        const ra1= await res0.json();
        setSlasheds(ra1);
        console.log("Fetched slashed coursees Data:",ra1);
        setSlasheds(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchslashed();}
    ,[])

    const handleEditClick=(slashed)=>{
        setEditSl(slashed.id)
        setEditSLlist({
            code:slashed.code,
            type:slashed.type,
            sem:slashed.sem
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/slashed/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editSLlist)
            }
        );
        if(ra2.ok){
            toast.success("Slashed courses updated")
            setEditSl(null);
            fetchslashed();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditSLlist(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditSl(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/slashed/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchslashed();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Slashedsubmit} className="form-section">
                <h2>Add Slashed Course</h2>
                <div className="input-group">
                    <label>Code</label>
                    <input type="text" className="futuristic-input" value={Scode} onChange={(e)=>setSlcode(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Type</label>
                    <input type="text" className="futuristic-input" value={type} onChange={(e)=>setType(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Semester</label>
                    <input type="number" className="futuristic-input" value={sem} onChange={(e)=>setSem(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Add Slashed course</button>
            </form>

            <div className="student-list">
                <h2>Slashed course List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Type</th>
                            <th>Semester</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slasheds.map((slashed)=>(
                            <tr key={slashed.id}>
                                {editSl === slashed.id?(
                                    <>
                                    <td>
                                        <input name="code" value={editSl.code} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="type" value={editSl.type} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="sem" value={editSl.sem} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(slashed.id)}>Save</button>
                                        <button onClick={(handleCancel)}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{slashed.code}</td>
                                    <td>{slashed.type}</td>
                                    <td>{slashed.sem}</td>
                                    <td>
                                        <button onClick={()=>handleEditClick(slashed)}>Edit</button>
                                        <button onClick={()=>handleDelte(slashed.id)}>Delete</button>
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