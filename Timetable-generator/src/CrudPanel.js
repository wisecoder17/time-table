import React, { useState } from "react";
import { motion } from "framer-motion";
import StudentList from "./StudentList";
import Studentform from "./Studentform";
import StaffList from "./StaffList";
import VenueList from "./Venuelist";
import CourseList from "./CourseList";
import CentreList from "./CentreList";
import DepartList from "./DepartmentList";
import ProgramList from "./ProgramList";
import RegList from "./RegistrationList";
import StudentsemregList from "./StudentsemregList";
import SlashedList from "./SlashedCourses";
export default function CrudPanel({onClose}){
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
    <motion.div
      className="crud-panel"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="panel-header">
        <h3>CRUD Section</h3>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
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
        {activeTab === "venue" && <VenueList />}
        {activeTab === "courses" && <CourseList />}
        {activeTab === "centres" && <CentreList />}
        {activeTab === "departments" && <DepartList />}
        {activeTab === "programs" && <ProgramList />}
        {activeTab === "registration" && <RegList />}
        {activeTab === "semreg" && <StudentsemregList />}
        {activeTab === "slashed" && <SlashedList />}
      </div>
    </motion.div>
  );
}