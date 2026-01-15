import React, { useState } from "react";
import {FiBell} from "react-icons/fi"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

export default function Studentform({onStudentform}){
    const [matric,setMatricNo] = useState('');
    const [surn, setSurname]=useState('');
    const [level,setLevel] = useState('');
    const [first,setFirstname] =useState('');
    const[gender,setGender] =useState('');
    const[deptid,setDeptid] = useState('');
    const[progid,setProgroid]=useState('');
    const[startsess,setStartSess] =useState('');
    const[prog,setProgr]=useState('');
    const[middlename,setMiddle]=useState('');
    

    const handleSubmit =async(e)=>{
        e.preventDefault();
        if (!matric || !surn || !first || !level || !gender  || !startsess || !prog || !middlename) return toast.warn("Pls fill required fields");

        const res = await fetch('http://localhost:8080/student/post', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                matric_No:matric,
                surname:surn,
                firstname:first,
                middlename:middlename,
                level:level,
                deptID:deptid,
                gender:gender,
                programmeID:progid,
                start_Session:startsess,
                programme:prog
            }),
        });

        if(res.ok){
            toast.success("Student added successfully");
            if (onStudentform) onStudentform('');
            
        }
        else{
            toast.error("Error adding");
        }
    };

    return(
        <>
        <form onSubmit={handleSubmit} className="form-section">
            <h2>
                <FiBell className="section-icon"/>
                Add student</h2>
            <div className="input-group">
                <label>Student Matric No:</label>
                <input type="text" className="futuristic-input" value={matric} onChange={(e) => setMatricNo(e.target.value)} placeholder="e.g AUL/CMP/23/074" required/>
                </div>
            
            <div className="input-group">
                <label>Surname</label>
                <input type="text" className="futuristic-input" value={surn} onChange={(e) => setSurname(e.target.value)} placeholder="e.g Johnson" required/>
            </div>

            <div className="input-group">
                <label>Firstname</label>
                <input type="text" className="futuristic-input" value={first} onChange={(e)=> setFirstname(e.target.value)} placeholder="e.g Michael" required/>
            </div>

            <div className="input-group">
                <label>Middle-Name</label>
                <input type="text" className="futuristic-input" value={middlename} onChange={(e)=>setMiddle(e.target.value)} required/>
            </div>

            <div className="input-group">
                <label>Level</label>
                <select
                className="futuristic-input" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="e.g 100L" required>
                <option value=''>Select level</option>
                <option value={100}>100L</option>
                <option value={200}>200L</option>
                <option value={300}>300L</option>
                <option value={400}>400L</option>
                </select>
            </div>

            <div className="input-group">
                <label>Gender</label>
                <input type="text" className="futuristic-input" value={gender} onChange={(e)=> setGender(e.target.value)} placeholder="e.g MALE" required/>
            </div>

            <div className="input-group">
                <label>deptId</label>
                <input type="number" className="futuristic-input" value={deptid} onChange={(e)=>setDeptid(e.target.value)} />
            </div>

            <div className="input-group">
                <label>ProgrammeId</label>
                <input type="number" className="futuristic-input" value={progid} onChange={(e)=>setProgroid(e.target.value)} />
            </div>

            <div className="input-group">
                <label>Start Session</label>
                <input type="text" className="futuristic-input" value={startsess} onChange={(e)=>setStartSess(e.target.value)} placeholder="e.g 2023/2024" required/>
            </div>

            <div className="input-group">
                <label>Programme</label>
                <input type="text" className="futuristic-input" value={prog} onChange={(e)=>setProgr(e.target.value)} placeholder="e.g Computer Science" required/>
            </div>




            <button type="submit" className="submit-button">Add student</button>

           
        </form>
        <ToastContainer position="top-right" autoClose={3000} />
     </>
    );
     
    
}