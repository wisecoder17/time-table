import React, { useState } from "react";
import StudentList from "./StudentList";
import Studentform from "./Studentform";
import StaffList from "./StaffList";
import CourseList from "./CourseList";
import ProgramList from "./ProgramList";
import RegList from "./RegistrationList";
import StudentsemregList from "./StudentsemregList";

export default function NonadminCRUD({}){
    const[activeTab,setActiveTab]=useState("students");

    const tabs=[
        {key:"students",label:"Students"},
        {key:"staff",label:"Staff"},
        {key:"venue",label:"Venue"},
        {key:"courses",label:"Course"},
        {key:"centres",label:"Centres"},
        {key:"departments",label:"Department"},
        {key:"programs",label:"Program"},
        {key:"registration",label:"Registration"},
        {key:"semreg",label:"Semreg"},
        {key:"slashed",label:"Slashed"}
    ];

    return (
    
      
    < div className="dept-crud">
      <div className="panel-header">
        <h3>CRUD Section</h3>
    
      </div>

      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="panel-content">
        {activeTab === "students" && (
          <>
            <Studentform />
            <StudentList />
          </>
        )}
        {activeTab === "staff" && <StaffList />}
        {activeTab === "courses" && <CourseList />}
        {activeTab === "programs" && <ProgramList />}
        {activeTab === "registration" && <RegList />}
        {activeTab === "semreg" && <StudentsemregList />}
        
      </div>
      </div>
   
  );
}