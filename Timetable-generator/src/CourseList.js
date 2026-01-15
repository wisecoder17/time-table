// import React, { useEffect, useState } from "react";
// import { ToastContainer,toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";  
// export default function CourseList({onCourseList}){

//     //POST
//     const [code,setcode]=useState('');
//     const[encount,setencount]=useState('');
//     const[unit,setunit]=useState('');
//     const [title,settitle]=useState('');
//     const[semester,setsemester]=useState('');
//     const[examtype,setexamtype]=useState('');
//     const deptId = localStorage.getItem("deptId"); // grab dept automatically
   


    
//     const Coursesubmit=async(e)=>{
//         e.preventDefault();

//         const res0 = await fetch('http://localhost:8080/course/done',{
//             method:'POST',
//             headers:{'Content-Type':'application/json'},
//             body:JSON.stringify({
//                 code:code,
//                 en_Count:encount,
//                 unit:unit,
//                 title:title,
//                 semester:semester,
//                 examtype:examtype,
//                 departmentId:deptId
//             }),
//         })
//         if(res0.ok){
//             toast.success("Course added")
//             if(onCourseList) onCourseList('');
//         }
//         else{
//             toast.error("Course not added");
//         }
//     };

//     //GET
//     const[courses,setCourses]=useState([]);
//     const[editC,setEditC]=useState(null);
//     const[editClist,setEditClist]=useState({code:"",encount:"",unit:"",title:"",semester:"",examtype:""})

//     // const fetchcourse=async()=>{
//     //     const res0 = await fetch('http://localhost:8080/course/get');
//     //     const ra1= await res0.json();
//     //     setCourses(ra1);
//     //     console.log("Fetched Course Data:",ra1);
//     //     setCourses(Array.isArray(ra1) ? ra1 :[]);
//     // }
//     const fetchcourse = async () => {
//         const username = localStorage.getItem("username");

//   const res0 = await fetch(`http://localhost:8080/course/get?username=${username}`);
//   if (!res0.ok) {
//     toast.error("Failed to fetch courses");
//     return;
//   }
//   const ra1 = await res0.json();
//   console.log("Fetched Course Data:", ra1);
//   setCourses(Array.isArray(ra1) ? ra1 : []);
// };


//     useEffect(()=>{fetchcourse();}
//     ,[])

//     const handleEditClick=(course)=>{
//         setEditC(course.id)
//         setEditClist({
//             code:course.code
//         });

//     };


//     const handleSave=async(id)=>{
//         const ra2 = await fetch(`http://localhost:8080/course/update/${id}`,
//             {
//                 method:'PUT',
//                 headers:{'Content-Type':'application/json'},
//                 body:JSON.stringify(editClist)
//             }
//         );
//         if(ra2.ok){
//             toast.success("Course updated")
//             setEditC(null);
//             fetchcourse();

//         }
//         else{
//             toast.error("Update failed")
//         }
//     }

//     const handleInputchange = (e) => {
//         const {name, value} = e.target;
//         setEditClist(prev =>({
//             ...prev,
//             [name]:value
//         }));
//     };

//     const handleCancel =() =>{
//         setEditC(null);
//     };
//     const handleDelte = async (id)=>{
//         if (!window.confirm("Are you sure u want to delete this?")) return;
//         const res6 = await fetch(`http://localhost:8080/course/delete/${id}`,{method:"DELETE",});
//         if(res6.ok){
//             toast.success("Deleted successfully");
//             fetchcourse();

//         }
//         else{
//             toast.error("Deletion failed")
//         }
//     }


//     return(
//         <>
//         <div>
//             <form onSubmit={Coursesubmit} className="form-section">
//                 <h2>Add Courses</h2>
//                 <div className="input-group">
//                     <label>Course-Code</label>
//                     <input type="text" className="futuristic-input" value={code} onChange={(e)=>setcode(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <label>En-Count</label>
//                     <input type="number" className="futuristic-input" value={encount} onChange={(e)=>setencount(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <label>unit</label>
//                     <input type="number" className="futuristic-input" value={unit} onChange={(e)=>setunit(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <label>Title</label>
//                     <input type="text" className="futuristic-input" value={title} onChange={(e)=>settitle(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <label>Semester</label>
//                     <input type="number" className="futuristic-input" value={semester} onChange={(e)=>setsemester(e.target.value)}/>
//                 </div>
//                 <div className="input-group">
//                     <label>Examtype</label>
//                     <input type="number" className="futuristic-input" value={examtype} onChange={(e)=>setexamtype(e.target.value)}/>
//                 </div>
//                 {/* <div className="input-group">
//                     <label>offering_DeptID</label>
//                     <input type="number" className="futuristic-input" value={offeringdept} onChange={(e)=>setoffering(e.target.value)}/>
//                 </div> */}
                
//                 <button type="submit" className="submit-button">Add Course</button>
//             </form>

//             <div className="student-list">
//                 <h2>Course List</h2>
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>Course-code</th>
//                             <th>Course encount</th>
//                             <th>Unit</th>
//                             <th>Title</th>
//                             <th>Semester</th>
//                             <th>Exam-Type</th>
                            
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {courses.map((course)=>(
//                             <tr key={course.id}>
//                                 {editC === course.id?(
//                                     <>
//                                     <td>
//                                         <input name="code" value={editC.code} onChange={handleInputchange}/>
//                                     </td>
//                                     <td>
//                                         <input name="encount" value={editC.en_Count} onChange={handleInputchange}/>
//                                     </td>
//                                     <td>
//                                         <input name="Unit" value={editC.unit} onChange={handleInputchange}/>
//                                     </td>
//                                     <td>
//                                         <input name="Title" value={editC.title} onChange={handleInputchange}/>
//                                     </td>
//                                     <td>
//                                         <input name="Semester" value={editC.semester} onChange={handleInputchange}/>
//                                     </td>
//                                     <td>
//                                         <input name="Exam-Type" value={editC.examtype} onChange={handleInputchange}/>
//                                     </td>
//                                     {/* <td>
//                                         <input name="Offering DeptID" value={editC.offering_DeptID} onChange={handleInputchange}/>
//                                     </td> */}
//                                     <td>
//                                         <button onClick={()=>handleSave(course.id)}>Save</button>
//                                         <button onClick={handleCancel}>Cancel</button>
//                                     </td>
//                                     </>
//                                 ):(
//                                     <>
//                                     <td>{course.code}</td>
//                                     <td>{course.en_Count}</td>
//                                     <td>{course.unit}</td>
//                                     <td>{course.title}</td>
//                                     <td>{course.semester}</td>
//                                     <td>{course.examtype}</td>
//                                     {/* <td>{course.offering_DeptID}</td> */}
                                    
//                                     <td>
//                                         <button onClick={()=>handleEditClick(course)}>Edit</button>
//                                         <button onClick={()=>handleDelte(course.id)}>Delete</button>
//                                     </td>
//                                     </>
//                                 )}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//          <ToastContainer position="top-right" autoClose={3000} /> 
//          </>
//     )


// }
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CourseList({ onCourseList }) {
  
  const [code, setcode] = useState("");
  const [encount, setencount] = useState("");
  const [unit, setunit] = useState("");
  const [title, settitle] = useState("");
  const [semester, setsemester] = useState("");
  const [examtype, setexamtype] = useState("");

  // Grab department from login
  const deptId = localStorage.getItem("deptId");

  const Coursesubmit = async (e) => {
    e.preventDefault();

    const res0 = await fetch("http://localhost:8080/course/done", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: code,
        en_Count: encount,
        unit: unit,
        title: title,
        semester: semester,
        examtype: examtype,
        departmentId: deptId, 
      }),
    });
    if (res0.ok) {
      toast.success("✅ Course added");
      if (onCourseList) onCourseList("");
    } else {
      toast.error("❌ Course not added");
    }
  };

  // GET
  const [courses, setCourses] = useState([]);
  const [editC, setEditC] = useState(null);
  const [editClist, setEditClist] = useState({
    code: "",
    encount: "",
    unit: "",
    title: "",
    semester: "",
    examtype: "",
    departmentId: "",
  });

  const fetchcourse = async () => {
    const username = localStorage.getItem("username");

    const res0 = await fetch(
      `http://localhost:8080/course/get?username=${username}`
    );
    if (!res0.ok) {
      toast.error("⚠️ Failed to fetch courses");
      return;
    }
    const ra1 = await res0.json();
    console.log("Fetched Course Data:", ra1);
    setCourses(Array.isArray(ra1) ? ra1 : []);
  };

  useEffect(() => {
    fetchcourse();
  }, []);

  const handleEditClick = (course) => {
    setEditC(course.id);
    setEditClist({
      code: course.code,
      en_Count: course.en_Count,
      unit: course.unit,
      title: course.title,
      semester: course.semester,
      examtype: course.examtype,
      departmentId: course.deptId,
    });
  };

  const handleSave = async (id) => {
    const ra2 = await fetch(`http://localhost:8080/course/update/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editClist),
    });
    if (ra2.ok) {
      toast.success("✅ Course updated");
      setEditC(null);
      fetchcourse();
    } else {
      toast.error("❌ Update failed");
    }
  };

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setEditClist((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setEditC(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    const res6 = await fetch(`http://localhost:8080/course/delete/${id}`, {
      method: "DELETE",
    });
    if (res6.ok) {
      toast.success("✅ Deleted successfully");
      fetchcourse();
    } else {
      toast.error("❌ Deletion failed");
    }
  };

  return (
    <>
      <div>
        <form onSubmit={Coursesubmit} className="form-section">
          <h2>Add Courses</h2>
          <div className="input-group">
            <label>Course-Code</label>
            <input
              type="text"
              className="futuristic-input"
              value={code}
              onChange={(e) => setcode(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>En-Count</label>
            <input
              type="number"
              className="futuristic-input"
              value={encount}
              onChange={(e) => setencount(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Unit</label>
            <input
              type="number"
              className="futuristic-input"
              value={unit}
              onChange={(e) => setunit(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Title</label>
            <input
              type="text"
              className="futuristic-input"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Semester</label>
            <input
              type="number"
              className="futuristic-input"
              value={semester}
              onChange={(e) => setsemester(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Examtype</label>
            <input
              type="number"
              className="futuristic-input"
              value={examtype}
              onChange={(e) => setexamtype(e.target.value)}
            />
          </div>
          {/* ✅ Dept is hidden because it's auto-set from login */}
          <button type="submit" className="submit-button">
            Add Course
          </button>
        </form>

        <div className="student-list">
          <h2>Course List</h2>
          <table>
            <thead>
              <tr>
                <th>Course-code</th>
                <th>Course encount</th>
                <th>Unit</th>
                <th>Title</th>
                <th>Semester</th>
                <th>Exam-Type</th>
                <th>Offering DeptID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  {editC === course.id ? (
                    <>
                      <td>
                        <input
                          name="code"
                          value={editClist.code}
                          onChange={handleInputchange}
                        />
                      </td>
                      <td>
                        <input
                          name="en_Count"
                          value={editClist.encount}
                          onChange={handleInputchange}
                        />
                      </td>
                      <td>
                        <input
                          name="unit"
                          value={editClist.unit}
                          onChange={handleInputchange}
                        />
                      </td>
                      <td>
                        <input
                          name="title"
                          value={editClist.title}
                          onChange={handleInputchange}
                        />
                      </td>
                      <td>
                        <input
                          name="semester"
                          value={editClist.semester}
                          onChange={handleInputchange}
                        />
                      </td>
                      <td>
                        <input
                          name="examtype"
                          value={editClist.examtype}
                          onChange={handleInputchange}
                        />
                      </td>
                      {/* <td>
                        <input
                          name="offering_DeptID"
                          value={editClist.offeringdept}
                          onChange={handleInputchange}
                        />
                      </td> */}
                      <td>
                        <button onClick={() => handleSave(course.id)}>
                          Save
                        </button>
                        <button onClick={handleCancel}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{course.code}</td>
                      <td>{course.en_Count}</td>
                      <td>{course.unit}</td>
                      <td>{course.title}</td>
                      <td>{course.semester}</td>
                      <td>{course.examtype}</td>
                      <td>{course.offering_DeptID}</td>
                      <td>
                        <button onClick={() => handleEditClick(course)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(course.id)}>
                          Delete
                        </button>
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
  );
}
