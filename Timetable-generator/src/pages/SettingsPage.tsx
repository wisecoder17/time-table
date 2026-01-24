import React, { useState, FormEvent, ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiInfo,
  FiDownload,
  FiDatabase,
  FiSettings,
  FiLock,
  FiCheckCircle,
  FiChevronRight,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface OptimizationParameter {
  checked: boolean;
  value: string;
}

interface OptimizationAlgo {
  checked: boolean;
  parameters: any;
}

const TABS = [
  { id: "constraint", label: "Constraint Settings", icon: "🔒" },
  { id: "examination", label: "Examination Settings", icon: "📝" },
  { id: "output", label: "Output Settings", icon: "🖨️" },
  { id: "optimization", label: "Optimization Settings", icon: "⚙️" },
] as const;

const CONSTRAINT_LIST = [
  {
    label: "Period Inclusive Exams",
    key: "periodInclusive",
    description: "Exams that must be scheduled in specific time periods",
  },
  {
    label: "Period Exclusive Exams",
    key: "periodExclusive",
    description: "Exams that cannot be scheduled in certain periods",
  },
  {
    label: "Period Exclusive Venues",
    key: "periodExVen",
    description: "Venues that cannot be used in specific periods",
  },
  {
    label: "Venue Inclusive Exams",
    key: "VenInc",
    description: "Exams that must use certain venues",
  },
  {
    label: "Exams After Exams",
    key: "ExamAfEx",
    description: "Specify exam sequences",
  },
  {
    label: "Exams with Coincidence",
    key: "ExamWCo",
    description: "Exams that must occur simultaneously",
  },
  {
    label: "Exam Exclusive Exams",
    key: "EXexEX",
    description: "Exams that cannot occur together",
  },
  {
    label: "Front Loaded Exams",
    key: "FroLoadedEx",
    description: "Important exams scheduled earlier",
  },
];

const OPTIMIZATION_OPTS = [
  {
    key: "tabuSearch",
    label: "Tabu Search",
    description: "Avoids revisiting solutions to escape local optima",
  },
  {
    key: "geneticAlgorithm",
    label: "Genetic Algorithm",
    description: "Evolutionary approach using selection and mutation",
  },
  {
    key: "Hybrid",
    label: "Hybrid (TS-GA)",
    description: "Combines Tabu Search and Genetic Algorithm",
  },
];

/**
 * Institutional Configuration Page
 * Refactored from the SettingsPanel modal to a first-class page.
 * Enforces institutional design and professional calibration surfaces.
 */
const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("constraint");
  const [constraints, setConstraints] = useState<
    Record<string, { checked: boolean; values: string[] }>
  >({});
  const [optimize, setOptimize] = useState<Record<string, OptimizationAlgo>>({
    tabuSearch: { checked: false, parameters: {} },
    geneticAlgorithm: {
      checked: false,
      parameters: {
        population: { checked: false, value: "" },
        Operationcount: { checked: false, value: "" },
        CrossOverType: { checked: false, value: "" },
        TournamentType: { checked: false, value: "" },
        adaptAll: false,
      },
    },
    Hybrid: { checked: false, parameters: {} },
  });

  // Examination State
  const [examPolicy, setExamPolicy] = useState("");
  const [maxExamL, setMaxExamL] = useState("");
  const [minExamL, setMinExamL] = useState("");
  const [examLevel, setExamLevel] = useState("");

  // Output State
  const [mixExams, setMixExams] = useState(false);
  const [moreSpace, setMoreSpace] = useState(false);
  const [largeExam, setLargeExam] = useState(false);
  const [halfSpace, setHalfSpace] = useState(false);
  const [skipWeek, setSkipWeek] = useState(false);
  const [sitting, setSitting] = useState(false);
  const [studentStaff, setStudentStaff] = useState("");
  const [staffInv, setStaffInv] = useState("");
  const [staffRandom, setStaffRandom] = useState(false);
  const [staffUpdate, setStaffUpdate] = useState(false);
  const [saveTTc, setSaveTTc] = useState(false);
  const [saveTTp, setSaveTTp] = useState(false);

  // General Optimization State
  const [displayProg, setDisplayProg] = useState(false);
  const [optTime, setOptTime] = useState("");
  const [optCount, setOptCount] = useState("");

  const handleConstraintCheckbox = (key: string) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        checked: !prev[key]?.checked,
        values: prev[key]?.values || [""],
      },
    }));
  };

  const handleOptimizationToggle = (key: string) => {
    setOptimize((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        checked: !prev[key].checked,
      },
    }));
  };

  const handleParamToggle = (algoKey: string, paramKey: string) => {
    setOptimize((prev) => {
      const algo = prev[algoKey];
      if (paramKey === "adaptAll") {
        const newAdaptValue = !algo.parameters.adaptAll;
        const updatedParams = Object.fromEntries(
          Object.keys(algo.parameters).map((p) => {
            const param = algo.parameters[p];
            if (typeof param === "object")
              return [p, { ...param, checked: newAdaptValue }];
            return [p, newAdaptValue];
          }),
        );
        return { ...prev, [algoKey]: { ...algo, parameters: updatedParams } };
      }
      const param = algo.parameters[paramKey];
      return {
        ...prev,
        [algoKey]: {
          ...algo,
          parameters: {
            ...algo.parameters,
            [paramKey]:
              typeof param === "object"
                ? { ...param, checked: !param.checked }
                : !param,
          },
        },
      };
    });
  };

  const handleParamValueChange = (
    algoKey: string,
    paramKey: string,
    newValue: string,
  ) => {
    setOptimize((prev) => {
      const algo = prev[algoKey];
      return {
        ...prev,
        [algoKey]: {
          ...algo,
          parameters: {
            ...algo.parameters,
            [paramKey]: { ...algo.parameters[paramKey], value: newValue },
          },
        },
      };
    });
  };

  const handleConstraintInputChange = (
    key: string,
    value: string,
    index: number,
  ) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        values: prev[key]?.values?.map((v, i) => (i === index ? value : v)) || [
          value,
        ],
      },
    }));
  };

  const addMoreConstraints = (key: string) => {
    setConstraints((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        values: [...(prev[key]?.values || []), ""],
      },
    }));
  };

  const saveConstraintToDB = async (
    name: string,
    type: string,
    details: string,
  ) => {
    try {
      const res = await fetch("http://localhost:8080/constraint/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, type, details }),
      });
      if (res.ok)
        toast.success(`Constraint "${type}" committed to academic ledger`);
      else toast.error("Institutional constraint sync failed");
    } catch (error) {
      toast.error("Critical failure during constraint save");
    }
  };

  const saveExamSettings = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/examtab/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          schedule_policy: examPolicy,
          max_examl: maxExamL,
          min_examl: minExamL,
          exam_level_high_limit: examLevel,
        }),
      });
      if (res.ok) toast.success("Academic examination boundaries established");
      else toast.error("Boundary synchronization failed");
    } catch (error) {
      toast.error("Critical failure during exam setting save");
    }
  };

  return (
    <div className="space-y-12 animate-fadeIn">
      {/* Header Section */}
      <div className="border-b border-brick/10 pb-8">
        <h1 className="text-3xl font-extrabold text-institutional-primary tracking-tight mb-2">
          System Calibration
        </h1>
        <p className="text-institutional-secondary font-medium italic opacity-80">
          Configuration Core • Institutional Parameter Orchestration
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Column */}
        <div className="lg:col-span-1 space-y-2">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-institutional border transition-all ${
                activeTab === tab.id
                  ? "bg-brick text-white border-brick shadow-lg shadow-brick/20"
                  : "bg-surface text-institutional-primary border-brick/5 hover:border-brick/20"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-sm font-black uppercase tracking-widest">
                  {tab.label}
                </span>
              </div>
              <FiChevronRight
                className={`transition-transform ${activeTab === tab.id ? "rotate-90" : ""}`}
              />
            </button>
          ))}
        </div>

        {/* Dynamic Content Column */}
        <div className="lg:col-span-3 min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="bg-surface p-8 rounded-institutional border border-brick/10 shadow-sm"
            >
              {activeTab === "constraint" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-brick/5 pb-4">
                    <FiLock className="text-brick text-xl" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-brick">
                      Institutional Constraints
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CONSTRAINT_LIST.map((item) => (
                      <div
                        key={item.key}
                        className="p-5 bg-page/50 border border-brick/5 rounded hover:border-brick/20 transition-all flex flex-col"
                      >
                        <label className="flex items-center gap-3 cursor-pointer group mb-4">
                          <input
                            type="checkbox"
                            checked={constraints[item.key]?.checked || false}
                            onChange={() => handleConstraintCheckbox(item.key)}
                            className="w-4 h-4 accent-brick"
                          />
                          <div className="flex flex-col">
                            <span className="text-[11px] font-black uppercase tracking-wider text-institutional-primary">
                              {item.label}
                            </span>
                            <span className="text-[9px] font-medium text-institutional-muted italic">
                              {item.description}
                            </span>
                          </div>
                        </label>
                        {constraints[item.key]?.checked && (
                          <div className="space-y-3 mt-4 animate-fadeIn">
                            {constraints[item.key].values.map((val, idx) => (
                              <input
                                key={idx}
                                type="text"
                                className="w-full bg-surface border border-brick/10 px-3 py-2 rounded text-[11px] font-bold"
                                value={val}
                                onChange={(e) =>
                                  handleConstraintInputChange(
                                    item.key,
                                    e.target.value,
                                    idx,
                                  )
                                }
                                placeholder="Enter parameter..."
                              />
                            ))}
                            <button
                              onClick={() => addMoreConstraints(item.key)}
                              className="w-full py-2 bg-brick text-white text-[10px] font-black uppercase tracking-widest rounded transition-transform active:scale-95 shadow-md shadow-brick/20"
                            >
                              Commit Constraint
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "examination" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-brick/5 pb-4">
                    <FiCheckCircle className="text-brick text-xl" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-brick">
                      Academic Boundaries
                    </h2>
                  </div>
                  <form
                    onSubmit={saveExamSettings}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8"
                  >
                    <div className="input-group">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
                        Schedule Policy Architecture
                      </label>
                      <input
                        type="text"
                        className="w-full bg-page border border-brick/10 px-4 py-3 rounded font-bold text-sm"
                        value={examPolicy}
                        onChange={(e) => setExamPolicy(e.target.value)}
                      />
                    </div>
                    <div className="input-group">
                      <label className="block text-[10px] font-black uppercase tracking-widest text-institutional-muted mb-2">
                        Max Capacity Tier
                      </label>
                      <input
                        type="number"
                        className="w-full bg-page border border-brick/10 px-4 py-3 rounded font-bold text-sm"
                        value={maxExamL}
                        onChange={(e) => setMaxExamL(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-3 col-span-2">
                      <button
                        type="submit"
                        className="px-10 py-3 bg-brick text-white text-[10px] font-black uppercase tracking-widest rounded shadow-lg shadow-brick/20 hover:scale-105 transition-all"
                      >
                        Authorize Parameters
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "output" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-brick/5 pb-4">
                    <FiDownload className="text-brick text-xl" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-brick">
                      Output Projections
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      {
                        label: "Deterministic Venue Mixing",
                        checked: mixExams,
                        setter: setMixExams,
                      },
                      {
                        label: "Global Space Optimization",
                        checked: moreSpace,
                        setter: setMoreSpace,
                      },
                      {
                        label: "Buffer Management (50%)",
                        checked: halfSpace,
                        setter: setHalfSpace,
                      },
                      {
                        label: "Skip Week Protocol",
                        checked: skipWeek,
                        setter: setSkipWeek,
                      },
                    ].map((opt, i) => (
                      <label
                        key={i}
                        className="flex items-center justify-between p-4 bg-page/50 rounded border border-brick/5 cursor-pointer hover:border-brick/10"
                      >
                        <span className="text-xs font-bold text-institutional-primary">
                          {opt.label}
                        </span>
                        <input
                          type="checkbox"
                          checked={opt.checked}
                          onChange={(e) => opt.setter(e.target.checked)}
                          className="w-4 h-4 accent-brick"
                        />
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "optimization" && (
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b border-brick/5 pb-4">
                    <FiSettings className="text-brick text-xl" />
                    <h2 className="text-sm font-black uppercase tracking-widest text-brick">
                      Mathematical Orchestration
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {OPTIMIZATION_OPTS.map((algo) => (
                      <div
                        key={algo.key}
                        className="p-6 bg-page/50 rounded border border-brick/10"
                      >
                        <label className="flex items-center gap-4 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={optimize[algo.key].checked}
                            onChange={() => handleOptimizationToggle(algo.key)}
                            className="w-5 h-5 accent-brick"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-black uppercase tracking-widest text-institutional-primary">
                              {algo.label}
                            </span>
                            <span className="text-[10px] font-medium text-institutional-muted italic">
                              {algo.description}
                            </span>
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
