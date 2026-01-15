import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
export default function CentreList({onCentreList}){

    //POST
    const [code,setcode]=useState('');
    const[encount,setencount]=useState('');
    const [name,setname]=useState('');
    const[type,settype]=useState('');
    


    
    const Centresubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/centre/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                code:code,
                type:type,
                name:name,
                encount:encount
            }),
        })
        if(res0.ok){
            toast.success("Centre added")
            if(onCentreList) onCentreList('');
        }
        else{
            toast.error("Centre not added");
        }
    };

    //GET
    const[centres,setCentres]=useState([]);
    const[editCe,setEditCe]=useState('');
    const[editCelist,setEditCelist]=useState({code:""},{encount:""},{type:""},{name:""})

    const fetchcentre=async()=>{
        const res0 = await fetch('http://localhost:8080/centre/get');
        const ra1= await res0.json();
        setCentres(ra1);
        console.log("Fetched Centre Data:",ra1);
        setCentres(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchcentre();}
    ,[])

    const handleEditClick=(centre)=>{
        setEditCe(centre.id)
        setEditCelist({
            code:centre.code
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/centre/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editCelist)
            }
        );
        if(ra2.ok){
            toast.success("Centre updated")
            setEditCe(null);
            fetchcentre();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditCelist(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditCe(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/centre/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchcentre();

        }
        else{
            toast.error("Deletion failed")
        }
    }


    return(
        <>
        <div>
            <form onSubmit={Centresubmit} className="form-section">
                <h2>Add Centre</h2>
                <div className="input-group">
                    <label>Centre-Code</label>
                    <input type="text" className="futuristic-input" value={code} onChange={(e)=>setcode(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>En-Count</label>
                    <input type="number" className="futuristic-input" value={encount} onChange={(e)=>setencount(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Name</label>
                    <input type="text" className="futuristic-input" value={name} onChange={(e)=>setname(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Type</label>
                    <input type="number" className="futuristic-input" value={type} onChange={(e)=>settype(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Add Centre</button>
            </form>

            <div className="student-list">
                <h2>Center List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Centre-code</th>
                            <th>Centre encount</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {centres.map((centre)=>(
                            <tr key={centre.id}>
                                {editCe === centre.id?(
                                    <>
                                    <td>
                                        <input name="code" value={editCe.code} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="encount" value={editCe.encount} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Name" value={editCe.name} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Type" value={editCe.type} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(centre.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{centre.code}</td>
                                    <td>{centre.encount}</td>
                                    <td>{centre.name}</td>
                                    <td>{centre.type}</td>
                                    
                                    <td>
                                        <button onClick={()=>handleEditClick(centre)}>Edit</button>
                                        <button onClick={()=>handleDelte(centre.id)}>Delete</button>
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