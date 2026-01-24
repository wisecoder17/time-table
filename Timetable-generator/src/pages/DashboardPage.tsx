import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiUsers,
  FiBookOpen,
  FiMapPin,
  FiActivity,
  FiCalendar,
  FiArrowRight,
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
} from "react-icons/fi";
import { motion } from "framer-motion";

/**
 * Institutional Main Dashboard
 * Orchestrates the high-level overview of the academic registry and scheduling system.
 */
const DashboardPage: React.FC = () => {
  const [session, setSession] = useState("2024/2025");
  const [semester, setSemester] = useState("Alpha");

  const stats = [
    {
      label: "Enrolled Students",
      value: "1,240",
      icon: <FiUsers />,
      color: "brick",
      trend: "+12 this cycle",
    },
    {
      label: "Academic Courses",
      value: "312",
      icon: <FiBookOpen />,
      color: "brick",
      trend: "Curriculum Validated",
    },
    {
      label: "Venue Capacity",
      value: "48",
      icon: <FiMapPin />,
      color: "brick",
      trend: "100% Availability",
    },
    {
      label: "Registry Status",
      value: "Active",
      icon: <FiActivity />,
      color: "status-success",
      trend: "All systems nominal",
    },
  ];

  const recentActivity = [
    {
      type: "success",
      title: "Timetable Grid Refined",
      msg: "Conflict resolution engine completed 2,000 cycles for CMP 400 level.",
      time: "2m ago",
    },
    {
      type: "info",
      title: "New Venue Assets",
      msg: "Auditorium Hall 2 added to the infrastructure infrastructure registry.",
      time: "1h ago",
    },
    {
      type: "warning",
      title: "Constraint Conflict",
      msg: "Overlap detected in MTH 101 proctoring schedule. Manual override required.",
      time: "3h ago",
    },
    {
      type: "success",
      title: "Staff Enrollment",
      msg: "15 new academic personnel records committed from the Faculty Ledger.",
      time: "Yesterday",
    },
  ];

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header & Academic Context */}
      <div className="border-b border-brick/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-black text-institutional-primary tracking-tighter mb-2">
            Academic Control <span className="text-brick">Center</span>
          </h1>
          <p className="text-institutional-secondary font-medium tracking-tight">
            Institutional Registry & Timetable Orchestration
          </p>
        </div>
        <div className="flex gap-4 p-4 bg-brick/5 rounded-institutional border border-brick/10">
          <div className="text-right border-r border-brick/20 pr-4">
            <p className="text-[10px] font-black uppercase text-brick tracking-widest leading-none mb-1">
              Current Session
            </p>
            <p className="text-sm font-bold text-institutional-primary">
              {session}
            </p>
          </div>
          <div className="pl-2">
            <p className="text-[10px] font-black uppercase text-brick tracking-widest leading-none mb-1">
              Semester
            </p>
            <p className="text-sm font-bold text-institutional-primary">
              {semester}
            </p>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface p-6 rounded-institutional border border-brick/5 shadow-sm hover:border-brick/20 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={`text-2xl text-${stat.color} group-hover:scale-110 transition-transform`}
              >
                {stat.icon}
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-institutional-muted bg-page/50 px-2 py-1 rounded">
                Verified
              </span>
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-institutional-muted mb-1">
              {stat.label}
            </p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-black text-institutional-primary">
                {stat.value}
              </h3>
              <span className="text-[9px] font-bold text-brick italic">
                {stat.trend}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: System Status & Activity */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brick/5 rounded-full -mr-16 -mt-16" />
            <div className="relative">
              <h2 className="text-sm font-black uppercase tracking-[0.3em] text-brick mb-8 flex items-center gap-2">
                <FiActivity /> System Activity Ledger
              </h2>
              <div className="space-y-6">
                {recentActivity.map((act, i) => (
                  <div
                    key={i}
                    className="flex gap-5 group items-start animate-fadeIn"
                    style={{ animationDelay: `${(i + 4) * 100}ms` }}
                  >
                    <div
                      className={`mt-1 w-10 h-10 rounded-institutional flex items-center justify-center shrink-0 transition-colors ${
                        act.type === "success"
                          ? "bg-status-success/10 text-status-success"
                          : act.type === "warning"
                            ? "bg-status-error/10 text-status-error"
                            : "bg-status-info/10 text-status-info"
                      }`}
                    >
                      {act.type === "success" ? (
                        <FiCheckCircle />
                      ) : act.type === "warning" ? (
                        <FiAlertCircle />
                      ) : (
                        <FiInfo />
                      )}
                    </div>
                    <div className="flex-1 border-b border-brick/5 pb-6">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-bold text-institutional-primary tracking-tight">
                          {act.title}
                        </h4>
                        <span className="text-[10px] font-bold text-institutional-muted uppercase">
                          {act.time}
                        </span>
                      </div>
                      <p className="text-xs text-institutional-secondary leading-relaxed opacity-80">
                        {act.msg}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* Right: Quick Actions & Navigation */}
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-brick p-8 rounded-institutional shadow-xl text-white relative overflow-hidden">
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-full -mb-24 -mr-24" />
            <div className="relative space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-60">
                Engine Hub
              </h3>
              <p className="text-lg font-bold leading-tight tracking-tight">
                Access the core timetable generation kernel.
              </p>
              <Link
                to="/timetable"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gold text-brick rounded font-black uppercase tracking-widest text-[10px] shadow-lg hover:bg-white transition-all transform hover:-translate-y-1"
              >
                Orchestration Core <FiArrowRight />
              </Link>
            </div>
          </section>

          <section className="space-y-3">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-institutional-muted ml-2">
              Registry Shortcuts
            </p>
            {[
              {
                label: "Academic Students",
                to: "/students",
                icon: <FiUsers />,
              },
              { label: "Personnel Ledger", to: "/staff", icon: <FiActivity /> },
              { label: "Physical Venues", to: "/venues", icon: <FiMapPin /> },
              {
                label: "Curriculum Repository",
                to: "/courses",
                icon: <FiBookOpen />,
              },
              {
                label: "System Calibration",
                to: "/settings",
                icon: <FiCalendar />,
              },
            ].map((link, i) => (
              <Link
                key={i}
                to={link.to}
                className="w-full flex items-center justify-between p-4 bg-surface rounded-institutional border border-brick/5 hover:border-brick/20 hover:bg-brick/5 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <span className="text-brick font-bold opacity-60 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  <span className="text-xs font-bold text-institutional-primary">
                    {link.label}
                  </span>
                </div>
                <FiArrowRight className="text-brick opacity-0 group-hover:opacity-100 transition-opacity -translate-x-4 group-hover:translate-x-0" />
              </Link>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
