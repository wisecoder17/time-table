import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function StaffList({onStaffList}){

    const [surnamee,setSurnamee]=useState('');
    const[firstname,setFirstname]=useState('');
    const[statusid,setStatusid]=useState('');
    const[middlename,setMiddle]=useState('');
    const[staff_id,setStaffid]=useState('');
    const[title,setTitle]=useState('');
    const[type,setType]=useState('');
    const[inUse,setInuse]=useState('');
    const[dutyCount,setDutyCount]=useState('');
    const[special,setSpecialize]=useState('');
    const[research,setResearch]=useState('');
    const[dis,setDis]=useState('');

    const deptid = localStorage.getItem("deptid")
    


    //POST
    const Submitstaff = async(e)=>{
         e.preventDefault(); 
        
        const res7= await fetch('http://localhost:8080/staff/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                surname:surnamee,
                firstname:firstname,
                middlename:middlename,
                staff_id:staff_id,
                title:title,
                deptid:deptid,
                statusID:statusid,
                type:type,
                in_use:inUse,
                duty_count:dutyCount,
                specialization:special,
                research_area:research,
                discipline:dis
                
            }),
        })
        if(res7.ok){
            toast.success("✅Staff added")
            if(onStaffList) onStaffList('');
        }
        else{
            toast.error("❌Staff addition failed")
        }
    };

    const[staffs,setStaff]=useState([]);
    const[edit,setEdit]=useState(null);
    const[editStaffD,setEditstaffD]=useState({surnamee:"",firstname:"",middlename:"",staff_id:"",title:"",deptid:"",statusID:"",type:"",in_use:"",duty_count:"",specialization:"",research_area:"",discipline:""});

    const Fetchstaff = async()=>{
        const username = localStorage.getItem("username");
        const ra = await fetch(`http://localhost:8080/staff/get?username=${username}`);
        if(!ra.ok){
            toast.error("⚠️Failed to fetch staff")
            return;
        }
        const dat = await ra.json();
        setStaff(dat);
        console.log("Fetched staff data:", dat);
        setStaff(Array.isArray(dat) ? dat : []);
    };

    useEffect(()=>{Fetchstaff();},[]);

    const handleEditClick=(staff)=>{
        setEdit(staff.id)
        setEditstaffD({
            surname:staff.surname,
            firstname:staff.firstname,
            middlename:staff.middlename,
            staff_id:staff.staff_id,
            title:staff.title,
            deptid:staff.deptid,
            statusID:staff.statusID,
            type:staff.type,
            in_use:staff.in_use,
            duty_count:staff.duty_count,
            specialization:staff.specialization,
            research_area:staff.research_area,
            discipline:staff.discipline

        });

    };

    const handleSave= async(id)=>{
        const ra = await fetch(`http://localhost:8080/staff/update/${id}`,
            {
                method:'PUT',
                headers:{"Content-Type" : "application/json"},
                body:JSON.stringify(editStaffD)
            });
            if (ra.ok){
                toast.success("Staff updated")
                setEdit(null);
                Fetchstaff();
            }
            else{
                toast.error("Update failed")
            }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditstaffD(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEdit(null);
    }

     const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/staff/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            Fetchstaff();
        }
        else{
            toast.error("Deletion failed")
        }
    }






    return(
        <>
        <div>
    <form onSubmit={Submitstaff} className="form-section">
        <h2>Add staff</h2>
        <div className="input-group">
            <label>Surname</label>
            <input type="text" className="futuristic-input" value={surnamee} onChange={(e)=>setSurnamee(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Firstname</label>
            <input type="text" className="futuristic-input" value={firstname} onChange={(e)=>setFirstname(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Middlename</label>
            <input type="text" className="futuristic-input" value={middlename} onChange={(e)=>setMiddle(e.target.value)}/>
        </div>
        <div className="input=group">
            <label>Staff ID</label>
            <input type="number" className="futuristic-input" value={staff_id} onChange={(e)=>setStaffid(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Status-ID</label>
            <input type="number" className="futuristic-input" value={statusid} onChange={(e)=>setStatusid(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Title</label>
            <input type="text" className="futuristic-input" value={title} onChange={(e)=>setTitle(e.target.value)}/>
        </div>
        {/* <div className="input-group">
            <label>Department-Id</label>
            <input type="number" className="futuristic-input" value={deptid} onChange={(e)=>setDeptid(e.target.value)}/>
        </div> */}
        <div className="input-group">
            <label>Type</label>
            <input type="number" className="futuristic-input" value={type} onChange={(e)=>setType(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>In-Use</label>
            <input type="number" className="futuristic-input" value={inUse} onChange={(e)=>setInuse(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Duty Count</label>
            <input type="number" className="futuristic-input" value={dutyCount} onChange={(e)=>setDutyCount(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Specialization</label>
            <input type="text" className="futuristic-input" value={special} onChange={(e)=>setSpecialize(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Reseach Area</label>
            <input type="text" className="futuristic-input" value={research} onChange={(e)=>setResearch(e.target.value)}/>
        </div>
        <div className="input-group">
            <label>Discipline</label>
            <input type="text" className="futuristic-input" value={dis} onChange={(e)=>setDis(e.target.value)}/>
        </div>

        <button type="submit" className="submit-button" >Add staff</button>
        
    </form>
    <div className="student-list">
        <h2>Staff List</h2>
        <table>
            <thead>
               
                    <tr>
                        <th>Surname</th>
                        <th>Firstname</th>
                        <th>Middlename</th>
                        <th>Staff ID</th>
                        <th>Title</th>
                        <th>Department-Id</th>
                        <th>Status-Id</th>
                        <th>Type</th>
                        <th>In-Use</th>
                        <th>Duty-Count</th>
                        <th>Specialization</th>
                        <th>Reseach-Area</th>
                        <th>Discipline</th>
                        <th>Actions</th>
                    </tr>
            </thead>
             <tbody>
                {staffs.map((staff)=>(
                    
                            <tr key={staff.id}>
                                {edit === staff.id?(
                                    <>
                                    <td>
                                        <input name="surnamee" value={edit.surname} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="firstname" value={edit.firstname} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="middlename" value={edit.middlename} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="staff_id" value={edit.staff_id} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="title" value={edit.title} onChange={handleInputchange}/>
                                    </td>
                                    {/* <td>
                                        <input name="deptid" value={edit.deptid} onChange={handleInputchange}/>
                                    </td> */}
                                    <td>
                                        <input name="statusid" value={edit.statusid} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="type" value={edit.type} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="inUse" value={edit.in_use} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="dutyCount" value={edit.duty_count} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="special" value={edit.specialization} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="research" value={edit.research_area} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="dis" value={edit.discipline} onChange={handleInputchange}/>
                                    </td>
                                    
                                    <td>
                                        <button onClick={()=>handleSave(staff.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{staff.surname}</td>
                                    <td>{staff.firstname}</td>
                                    <td>{staff.middlename}</td>
                                    <td>{staff.staff_id}</td>
                                    <td>{staff.title}</td>
                                    <td>{staff.deptid}</td>
                                    <td>{staff.statusID}</td>
                                    <td>{staff.type}</td>
                                    <td>{staff.in_use}</td>
                                    <td>{staff.duty_count}</td>
                                    <td>{staff.specialization}</td>
                                    <td>{staff.research_area}</td>
                                    <td>{staff.discipline}</td>
                                    <td>
                                        <button onClick={()=>handleEditClick(staff)}>Edit</button>
                                        <button onClick={()=>handleDelte(staff.id)}>Delete</button>
                                    </td>
                                    </>
                                )

                                }
                            </tr>
                        ))}
                    
                </tbody>
        </table>
        
    </div>

    </div> 
   
 <ToastContainer position="top-right" autoClose={3000} /> 
    </>
   );
}

