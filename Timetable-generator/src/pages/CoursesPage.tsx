import React from "react";
import CourseList from "../CourseList";

/**
 * Institutional Curriculum Page
 * Orchestrates the management of academic courses and curriculum records.
 */
const CoursesPage: React.FC = () => {
  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Institutional Header Section */}
      <div className="border-b border-brick/10 pb-8 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-extrabold text-institutional-primary tracking-tight mb-2">
            Academic Curriculum
          </h1>
          <p className="text-institutional-secondary font-medium italic opacity-80">
            Course Inventory • Registry Services
          </p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brick">
            Bells University
          </p>
          <p className="text-xs font-bold text-institutional-muted">
            Technology & Innovation
          </p>
        </div>
      </div>

      <div className="space-y-12">
        <section>
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[1px] bg-brick/20" />
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brick">
              Curriculum Repository
            </h2>
          </div>
          <CourseList />
        </section>
      </div>
    </div>
  );
};

export default CoursesPage;
