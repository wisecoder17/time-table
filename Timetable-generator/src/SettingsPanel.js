import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiInfo,  FiDownload, FiDatabase } from "react-icons/fi";
import './App.css';
import e from "cors";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const tabs = [
    { id: 'constraint', label: 'Constraint Settings', icon: '🔒' },
    { id: 'examination', label: 'Examination Settings', icon: '📝' },
    { id: 'output', label: 'Output Settings', icon: '🖨️' },
    { id: 'design', label: 'Output Designing', icon: '🎨' },
    { id: 'optimization', label: 'Optimization Settings', icon: '⚙️' },
];

const constraintLists = [
    { 
        label: 'Period Inclusive Exams', 
        key: 'periodInclusive',
        description: 'Exams that must be scheduled in specific time periods'
    },
    { 
        label: 'Period Exclusive Exams', 
        key: 'periodExclusive',
        description: 'Exams that cannot be scheduled in certain periods'
    },
    {
        label: 'Period Exclusive Venues', 
        key: 'periodExVen',
        description: 'Venues that cannot be used in specific periods'
    },
    {
        label: 'Venue Inclusive Exams', 
        key: 'VenInc',
        description: 'Exams that must use certain venues'
    },
    {
        label: 'Exams After Exams', 
        key: 'ExamAfEx',
        description: 'Specify exam sequences'
    },
    {
        label: 'Exams with Coincidence', 
        key: 'ExamWCo',
        description: 'Exams that must occur simultaneously'
    },
    {
        label: 'Exam Exclusive Exams', 
        key: 'EXexEX',
        description: 'Exams that cannot occur together'
    },
    {
        label: 'Front Loaded Exams', 
        key: 'FroLoadedEx',
        description: 'Important exams scheduled earlier'
    },
];


const optimizationOpt = [
    {
        key: 'tabuSearch', 
        label: 'Tabu Search',
        description: 'Avoids revisiting solutions to escape local optima'
    },
    {
        key: 'geneticAlgorithm', 
        label: 'Genetic Algorithm',
        description: 'Evolutionary approach using selection and mutation'
    },
    {
        key: 'Hybrid', 
        label: 'Hybrid (TS-GA)',
        description: 'Combines Tabu Search and Genetic Algorithm'
    },
];

const allDays =['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];


function SettingsPanel({ onClose, dayPerweek, onGenerate,examcalendar=[],setSelectedSlots,selectedSlots=[] }) {
    const [activeTab, setActiveTab] = useState('constraint');
    const [constraints, setConstraints] = useState({});
    const [Optimize, setOptimize] = useState({
        tabuSearch: { checked: false, parameters: {} },
        geneticAlgorithm: { checked: false, parameters: {population:{checked:false,value:""},
        Operationcount:{checked:false,value:""},
        CrossOverType:{checked:false,value:""}, 
        TournamentType:{checked:false,value:""},
        adaptAll:false} },
        Hybrid: { checked: false, parameters: {} },
    });
    const [activeTooltip, setActiveTooltip] = useState(null);
    // const algorithms =useState(["Tabu","Genetic Algorithm","Hybrid"]);
    // const [algactive,setAlgactive]=useState('');
    // const[alguse,setAlguse]=useState('');
    // const[population,setPopulation]=useState('');

const [examwtime,setExamWt]=useState('');
const[examwcycle,setExamwcycycle]=useState('');
const[examwboth,setExamwboth]=useState('');
// const handlecheckbox = (algorithm)=>{
//     setAlgactive((prev)=>({...prev,[algorithm]: !prev[algorithm],}));
// };
// const handlechange = (algorithm,value)=>{
//     setAlguse(prev => ({...prev, [algorithm]:value}));
// };
const [exampolicy,setExampolicy] =useState('');
const [maxexaml,setMAxexaml]=useState('');
const [minexaml,setMinexaml]=useState('');
const [examlevel,setExamlevel]=useState('');

    const handleCheckbox = (key) => {
        setConstraints(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                checked: !prev[key]?.checked,
                value: prev[key]?.value || ''
            }
        }));
    };

    const handleOptimization = (key) => {
        setOptimize(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                checked: !prev[key].checked
            }
        }));
    };

    const handleParam = (algokey,paramkey) =>{
        setOptimize(prev => {
            const algo = prev[algokey]; 
        

        if (paramkey ==="adaptAll"){
            const newAdaptvalue = !algo.parameters.adaptAll;
            const updatedParams = Object.fromEntries(Object.keys(algo.parameters).map(p=>{
                const param = algo.parameters[p];

                if (typeof param === "object"){
                    return[p,{...param,checked:newAdaptvalue}];
                }

                return[p,newAdaptvalue];
            })
        );

            return{
                ...prev,[algokey]:{...algo,parameters:updatedParams}
            };
        }
        const param =algo.parameters[paramkey];

        return{
            ...prev,[algokey]:{...algo,parameters:{...algo.parameters,[paramkey]: typeof param === "object" ? {...param,checked:!param.checked}:param}}
        };
    })
    }

    const handleParamvalue =(algokey,paramkey,newValue) =>{
        setOptimize(prev =>{ 
            const algo = prev[algokey];

            return{
                ...prev,[algokey]:{...algo,parameters:{...algo.parameters,[paramkey]:{...algo.parameters[paramkey],value:newValue}}}
            }
        })
    }

    const handleInput = (key, value,index) => {
        setConstraints(prev => ({
            ...prev,
            [key]: {
                ...prev[key],
                values: prev[key]?.values?.map((v,i)=> i=== index ? value : v) || [value] 
            }
        }));
    };

    const addmoreConstraints=(key)=>{
        setConstraints(prev => ({
            ...prev,
            [key]:{
                ...prev[key],
                values:[...prev[key]?.values || [],""]
            }
        }));
    };

    const[mixexams, setMixexam]=useState('');
    const[morespace, setMOrespace]=useState('');
    const [largeexam, setlargeexam]=useState('');
    const[halfspace, setHalfspace]=useState('');
    const[skipweek, setSkipweek]=useState('');
    const[sitting, setSitting]=useState('');
    const[studetnstaff, setstudnstaff]=useState('');
    const[staffinv, setstaffinv]=useState('');
    const[staffrandom,setStaffrandom]=useState('');
    const[staffupdate,setStaffupdate]=useState('');
    const[saveTTc,setCSv]=useState('');
    const[saveTTp,setPdf]=useState('');
    const[displayProg,setProg]=useState('');
    const[opttime,setOpttime]=useState('');
    const[optcount,setOptcount]=useState('');
    const[intmode,setInteractivemode]=useState('');
    const[addtime,setAddtime]=useState({checked:false,value:""});

    const flatPeriods=examcalendar.flatMap(w => w.periods);
    const selectedIndices = selectedSlots.map(id =>
    flatPeriods.findIndex(p=>p.id === id),
    

    
);
const savetoDB = async (name, type,details) =>{
        try {
            const res= await fetch("http://localhost:8080/constraint/add", {
                method:"POST",
                headers:{"Content-Type":"application/json",},
                body:JSON.stringify({name, type, details}),
            });

            if (res.ok){
                toast.success("Constraint added successfully");
            }
            else{
                toast.error("Failed to save constraint");
            }
            
        }
        catch(error){
            toast.error("Error saving constraint",error);
        }
    }
    const saveexamtoDB= async (e) =>{
        e.preventDefault();
        
        try{
            const res1= await fetch('http://localhost:8080/examtab/post', {
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({
                    schedule_policy:exampolicy,
                    max_examl:maxexaml,
                    min_examl:minexaml,
                    exam_level_high_limit:examlevel
                }),
            });

            if(res1.ok){
                toast.success("Exam settings added");    
            }
            else{
                toast.error("Failed to send");
            }
        }
        catch(error){
            toast.error("Error saving ",error);
        }
    }
    
    const saveoutput = async(e)=>{
        e.preventDefault();

        try{
            const res2= await fetch('http://localhost:8080/outputtab/post',{
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({
                    mix_exams:mixexams,
                    more_space:morespace,
                    le_fullyinV:largeexam,
                    usehalf_Vspace:halfspace,
                    skip_week:skipweek,
                    sitting_arrangement:sitting,
                    students_per_staff:studetnstaff,
                    staff_specialV:staffinv,
                    select_staff_randomly:staffrandom,
                    update_staff_Dcount:staffupdate,
                    saveTT_csv:saveTTc,
                    saveTT_pdf:saveTTp
                }),
            });

            if(res2.ok){
                toast.success("Output settings are in");
            }
            else{
                toast.error("Failed to save to output settings");
            }
        }
        catch(error){
            toast.error("Error saving: ",error);
        }
    }
    
    const savegeneralOpt = async(e)=>{
        e.preventDefault();
        try{
            const res3 = await fetch('http://localhost:8080/opt/post', {
                method:'POST',
                headers:{'Content-Type' : 'application/json'},
                body:JSON.stringify({
                    display_progress:displayProg,
                    opt_time:opttime,
                    opt_cycle_count:optcount,
                    int_mode:intmode,
                    add_more_time:addtime.checked,
                    exam_w_time:examwtime,
                    exam_w_cycle:examwcycle,
                    exam_w_both:examwboth
                }),
            });
            if(res3.ok){
                toast.success("General opt added")
            }else{
                toast.error("Failed to save general opt")
            }
            
            }catch(error){
                toast.error("Error saving",error);
        }
    }
        
    const saveAlgo = async(e)=>{
        // e.preventDefault();
        // try{
        //     const res4 = await fetch('http://localhost:8080/algorithm/alg',{
        //         method:'POST',
        //         headers:{'Content-Type' : 'application/json'},
        //          body:JSON.stringify(Optimize),
        //     })

        //     if(res4.ok){
        //         alert("Algorithm added")
        //     }
        //     else{
        //         const errText =await res4.text();
        //         alert("Algorithm failed",+errText)
        //     }
        // }
        // catch(error){
        //     console.error("Error saving",error);
        // }
         const allParams = Object.entries(Optimize).flatMap(([algorithmName, algoData]) =>
  Object.entries(algoData.parameters).map(([paramName, param]) => ({
    algorithm_name: algorithmName,   // dynamic, no hardcoding
    param_name: paramName,
    value: param.value,
    checked: param.checked,
  }))
);

// Send everything to backend
fetch("http://localhost:8080/algorithm/alg", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(allParams),
})
  .then((res) => res.json())
  .then((result) => console.log("Saved:", result))
  .catch((err) => console.error("Error:", err));

    }
   


    return (
        <motion.div 
            className="holographic-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
        >
            <div className="panel-header">
                <div className="tabs-container">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            className={`tab ${activeTab === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className="tab-icon">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>
                <button className="close-btn" onClick={onClose}>
                    <FiX size={20} />
                </button>
            </div>

            <div className="panel-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="tab-content"
                    >
                        {activeTab === 'constraint' && (
                            <div className="constraints-section">
                                <h3 className="section-title">Exam Constraints</h3>
                                <p className="section-description">
                                    Define rules that govern how exams should be scheduled
                                </p>
                                
                                <div className="constraints-grid">
                                    {constraintLists.map(item => (
                                        <div key={item.key} className="constraint-item">
                                            <label className="holographic-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={constraints[item.key]?.checked || false}
                                                    onChange={() => handleCheckbox(item.key)}
                                                />
                                                <span className="checkmark"></span>
                                                
                                                <span 
                                                    className="constraint-label"
                                                    onMouseEnter={() => setActiveTooltip(item.key)}
                                                    onMouseLeave={() => setActiveTooltip(null)}
                                                >
                                                    {item.label}
                                                    <FiInfo className="info-icon" />
                                                </span>
                                            </label>
                                            
                                            {activeTooltip === item.key && (
                                                <div className="constraint-tooltip">
                                                    {item.description}
                                                </div>
                                            )}
                                            {constraints[item.key]?.checked &&(
                                            <>
                                            {(constraints[item.key]?.values || [""]).map((val,index)=>
                                            (<motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={{ duration: 0.2 }}
                                                    className="constraint-input"
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Enter constraint details..."
                                                        value={val}
                                                        onChange={(e) => handleInput(item.key, e.target.value,index)}
                                                        className="holographic-input"
                                                    />
                                                    
                                                    <button onClick={()=>addmoreConstraints(item.key)}
                                                    className="save-btn">➕</button>

                                                </motion.div>))}
                                                <button onClick={()=> savetoDB(item.key,item.label,(constraints[item.key]?.values || []).join(","))}
                                                    className="save-btn">Save constraints</button>


                                                
                                            </>           
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'examination' && (
                            <div className="examination-section">
                                <h3 className="section-title">Examination Parameters</h3>
                                <p className="section-description">
                                    Configure examination scheduling policies and level boundaries
                                </p>
                                
                                <div className="parameter-grid">
                                    <div className="parameter-item">
                                        <label>Exam Scheduling Policy</label>
                                        <input 
                                            type="text" 
                                            placeholder="e.g. Level-based, Mixed, etc."
                                            className="holographic-input"
                                            value={exampolicy}
                                            onChange={(e)=>setExampolicy(e.target.value)}
                                            
                                        />
                                    </div>
                                    
                                    <div className="parameter-row">
                                        <div className="parameter-item">
                                            <label>Max Exam Level</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 100" 
                                                className="holographic-input"
                                                value={maxexaml}
                                                onChange={(e)=>setMAxexaml(e.target.value)}
                                            />
                                        </div>
                                        <div className="parameter-item">
                                            <label>Exam Level Low Limit</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 50" 
                                                className="holographic-input"
                                                value={minexaml}
                                                onChange={(e)=>setMinexaml(e.target.value)}
                                            />
                                        </div>
                                        <div className="parameter-item">
                                            <label>Exam Level High Limit</label>
                                            <input 
                                                type="number" 
                                                placeholder="e.g. 150" 
                                                className="holographic-input"
                                                value={examlevel}
                                                onChange={(e)=>setExamlevel(e.target.value)}
                                            />
                                        </div>
                                        <button onClick={saveexamtoDB} className="save-btn">Save exam settings</button>
                                    </div>
                                    
                                </div>
                                
                            </div>
                        )}

                        {activeTab === 'output' && (
                            <div className="output-settings-section">
                                <h3 className="section-title">Output Configuration</h3>
                                <p className="section-description">
                                    Customize how the timetable will be generated and saved
                                </p>
                                
                                <div className="output-settings-grid">
                                    <div className="settings-column">
                                        <h4>Venue Settings</h4>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={mixexams}
                                                onClick={(e)=>setMixexam(e.target.checked)} />
                                                <span className="checkmark"></span>
                                                Mix Exams in Venue
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox"
                                                checked={morespace}
                                                onClick={(e)=>setMOrespace(e.target.checked)} />
                                                <span className="checkmark"></span>
                                                Use More Space for Large Exams
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={largeexam}
                                                onClick={(e)=>setlargeexam(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                Large Exams Fully in Venue
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={halfspace}
                                                onClick={(e)=>setHalfspace(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                Use Half Venue Space
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={skipweek}
                                                onClick={(e)=>setSkipweek(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                Skip Week in Timetable
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={sitting}
                                                onClick={(e)=>setSitting(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                Generate Sitting Arrangements
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="settings-column">
                                        <h4>Staff Settings</h4>
                                        <div className="setting-item">
                                            <label>No. of Students per Invigilator</label>
                                            <input 
                                                type="number" 
                                                className="holographic-input"
                                                value={studetnstaff}
                                                onChange={(e)=>setstudnstaff(e.target.value)}
                                            />
                                        </div>
                                        <div className="setting-item">
                                            <label>No. of Invigilators in Special Venue</label>
                                            <input 
                                                type="number" 
                                                className="holographic-input"
                                                value={staffinv}
                                                onChange={(e)=>setstaffinv(e.target.value)}
                                            />
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox"
                                                checked={staffrandom}
                                                onClick={(e)=>setStaffrandom(e.target.checked)} />
                                                <span className="checkmark"></span>
                                                Select Staff Randomly
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={staffupdate}
                                                onClick={(e)=>setStaffupdate(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                Update Staff Duty Count
                                            </label>
                                        </div>
                                    </div>
                                    
                                    <div className="settings-column">
                                        <h4>Export Options</h4>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox"
                                                checked={saveTTc}
                                                onClick={(e)=>setCSv(e.target.checked)} />
                                                <span className="checkmark"></span>
                                                <FiDownload className="icon" />
                                                Save Timetable to File(CSV)
                                            </label>
                                        </div>
                                        <div className="setting-item">
                                            <label className="holographic-checkbox">
                                                <input type="checkbox" 
                                                checked={saveTTp}
                                                onClick={(e)=>setPdf(e.target.checked)}/>
                                                <span className="checkmark"></span>
                                                <FiDatabase className="icon" />
                                                Save Timetable to Database(PDF)
                                            </label>
                                        </div>
                                        
                                        
                                    </div>
                                    <button className="save-btn" onClick={saveoutput}>Save Output Settings</button>
                                </div>
                            </div>
                        )}

                        {activeTab === 'optimization' && (
                            <div className="optimization-section">
                                <h3 className="section-title">Optimization Algorithms</h3>
                                <p className="section-description">
                                    Select and configure algorithms to optimize your timetable
                                </p>

                                <div className="settings-column">
                                    <h4>General Settings</h4>
                                    <div className="setting-item">
                                    <label className="holographic-checkbox">
                                        <input type="checkbox"
                                        checked={displayProg}
                                        onChange={(e)=>setProg(e.target.checked)}
                                        />
                                        <span className="checkmark"></span>
                                        Display Progress Interval</label>
                                        
                                        
                                    </div>
                                    <div className="setting-item">
                                        <label>Optimization Time:</label>
                                        <input type="text"
                                        className="holographic-input"
                                        value={opttime}
                                        onChange={(e)=>setOpttime(e.target.value)}/>
                                    </div>
                                    <div className="setting-item">
                                        <label>Optimization cycle count:</label>
                                        <input className="holographic-input"
                                        value={optcount}
                                        onChange={(e)=>setOptcount(e.target.value)}/>
                                    </div>
                                    {/* <div className="setting-item">
                                        <label
                                        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>Display Interval:</label>
                                        <input type="text"
                                        className="holographic-input"
                                        value={displayint}
                                        onChange={(e)=>setDisplayint(e.target.value)}/>
                                    </div> */}
                                    <div className="setting-item">
                                        <label className="holographic-checkbox">
                                            <input type="checkbox"
                                            checked={intmode}
                                            onChange={(e)=>setInteractivemode(e.target.checked)}/>
                                            <span className="checkmark"></span>Interactive Mode
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <label className="holographic-checkbox">
                                            <input type="checkbox"
                                            checked={addtime.checked}
                                            onChange={(e)=>setAddtime({...addtime,checked:e.target.checked})}/>
                                            <span className="checkmark"></span>Add More Time
                                        </label>

                                        {addtime.checked && (
                                            <input type="text" placeholder="Enter time.." value={addtime.value} onChange={(e)=>setAddtime({...addtime,value:e.target.value})}/>
                                        )}
                                    </div>
                                    <div className="setting-item">
                                        <label className="holographic-checkbox">
                                            <input type="checkbox"
                                            checked={examwtime}
                                            onChange={(e)=>setExamWt(e.target.checked)}/>
                                            <span className="checkmark"></span>Exam With Time?

                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <label className="holographic-checkbox">
                                            <input type="checkbox"
                                            checked={examwcycle}
                                            onChange={(e)=>setExamwcycycle(e.target.checked)}/>
                                            <span className="checkmark"></span>Exam with Cycle?
                                        </label>
                                    </div>
                                    <div className="setting-item">
                                        <label className="holographic-checkbox">
                                            <input type="checkbox"
                                            checked={examwboth}
                                            onChange={(e)=> {const checked=e.target.checked; setExamWt(checked);setExamwcycycle(checked);setExamwboth(checked)}}/>
                                            <span className="checkmark"></span>Exam with both 
                                        </label>
                                    </div>
                                    <button className="save-btn" onClick={savegeneralOpt}>Save General Settings</button>

                
                                </div>

                                <div className="settings-column">
                                    <h4>Algorithms</h4>
                                    <div className="setting-item"></div>
                                    {optimizationOpt.map(item => (
                                        <div key={item.key} className="algorithm-item">
                                            <label className="holographic-checkbox">
                                                <input
                                                    type="checkbox"
                                                    checked={Optimize[item.key].checked}
                                                    onChange={() => handleOptimization(item.key)}
                                                />
                                                <span className="checkmark"></span>
                                                <span 
                                                    className="algorithm-label"
                                                    onMouseEnter={() => setActiveTooltip(item.key)}
                                                    onMouseLeave={() => setActiveTooltip(null)}
                                                >
                                                    {item.label}
                                                    <FiInfo className="info-icon" />
                                                </span>
                                            </label>
                                            
                                            {activeTooltip === item.key && (
                                                <div className="algorithm-tooltip">
                                                    {item.description}
                                                </div>
                                            )}
                                            
                                            {Optimize[item.key].checked && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: 'auto' }}
                                                    transition={{ duration: 0.2 }}
                                                    className="algorithm-parameters"
                                                >
                                                    {item.key === 'tabuSearch' && (
                                                        <div className="parameter-item">
                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox" />
                                                                <span className="checkmark"></span>
                                                                Adapt Tabu Optimization Parameters
                                                            </label>
                                                        </div>
                                                    )}

                                                    {item.key === 'geneticAlgorithm' &&(
                                                        
                                                        <div className="setting-item">
                                                            <label className="holographic-checkbox">
                                                            <input type="checkbox" checked={Optimize.geneticAlgorithm.parameters.population.checked} onChange={()=>handleParam("geneticAlgorithm", "population","")}/>
                                                            <span className="checkmark"/>
                                                            Population Count
                                                            </label>
                                                            {Optimize.geneticAlgorithm.parameters.population.checked && (
                                                                <input type="number" placeholder="Enter population count.." value={Optimize.geneticAlgorithm.parameters.population.value} onChange={(e)=>handleParamvalue("geneticAlgorithm","population", e.target.value)}/>
                                                            )}

                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox" checked={Optimize.geneticAlgorithm.parameters.Operationcount.checked} onChange={()=>handleParam("geneticAlgorithm","Operationcount","")}/>
                                                                <span className="checkmark"/>
                                                                Operation Count
                                                            </label>
                                                            {Optimize.geneticAlgorithm.parameters.Operationcount.checked && (
                                                                <input type="number" placeholder="Enter Operation count.." value={Optimize.geneticAlgorithm.parameters.Operationcount.value} onChange={(e)=>handleParamvalue("geneticAlgorithm","Operationcount",e.target.value)}/>
                                                            )}

                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox" checked={Optimize.geneticAlgorithm.parameters.CrossOverType.checked} onChange={()=>handleParam("geneticAlgorithm","CrossOverType","")}/>
                                                                <span className="checkmark"/>
                                                                Cross-Over Type
                                                            </label>
                                                            {Optimize.geneticAlgorithm.parameters.CrossOverType.checked && (
                                                                <select value={Optimize.geneticAlgorithm.parameters.CrossOverType.value} onChange={(e)=>handleParamvalue("geneticAlgorithm","CrossOverType",e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="w1">Something 1</option>
                                                                    <option value="w2">Something 2</option>
                                                                    <option value="w3">Something 3</option>
                                                                </select>
                                                                    
                                                            )}
                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox" checked={Optimize.geneticAlgorithm.parameters.TournamentType.checked} onChange={()=>handleParam("geneticAlgorithm","TournamentType","")}/>
                                                                <span className="checkmark"/>Tournament Type
                                                            </label>
                                                            {Optimize.geneticAlgorithm.parameters.TournamentType.checked && (
                                                                <select value={Optimize.geneticAlgorithm.parameters.TournamentType.value} onChange={()=>handleParamvalue("geneticAlgorithm","TournamentType",e.target.value)}>
                                                                    <option value="">Select</option>
                                                                    <option value="s1">Something 1</option>
                                                                    <option value="s2">Something 2</option>
                                                                    <option value="s3">Something 3</option>
                                                                </select>
                                                            )}

                                                            
                                                        <div className="parameter-item">
                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox" checked={Optimize.geneticAlgorithm.parameters.adaptAll} onChange={()=> handleParam("geneticAlgorithm","adaptAll")}/>
                                                                <span className="checkmark"></span>
                                                                Adapt Genetic Optimization Parameters
                                                            </label>
                                                        </div>

                                                        </div>
                                                        

                                                    )}

                                                    {item.key === 'Hybrid' &&(
                                                        <div className="paramter-item">
                                                            <label className="holographic-checkbox">
                                                                <input type="checkbox"/>
                                                                <span className="checkmark"></span>
                                                                Adapt Hybrid Optimization Parameters
                                                            </label>
                                                        </div>
                                                    )

                                                    }
                                                    <button className="save-btn" onClick={saveAlgo}>Save algorithm</button>
                                                </motion.div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="algorithm-options">
                                    
                                </div>
                                {}
                            </div>
                        )}

                        
                        {activeTab === 'design' && (() => {
  const dayOrder = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const flatPeriods = examcalendar
    .flatMap(w => w.periods)
    .sort((a, b) => {
      if (a.week !== b.week) return a.week - b.week;
      if (a.day !== b.day) return dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day);
      const periodA = Number(a.period.split(' ')[1]);
      const periodB = Number(b.period.split(' ')[1]);
      return periodA - periodB;
    });

  const selectedIndices = selectedSlots.map(id =>
    flatPeriods.findIndex(p => p.id === id)
  );

  return (
    <div className="tab-section">
      <button className="generate" onClick={onGenerate}>Generate Calendar</button>
      <table className="output-table">
        <thead>
          <tr>
            <th>Week</th>
            {allDays.slice(0, dayPerweek).map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {examcalendar.map((weekRow, idx) => {
            const periodMap = {};
            weekRow.periods.forEach((p) => {
              if (!periodMap[p.day]) periodMap[p.day] = [];
              periodMap[p.day].push(p);
            });

            return (
              <tr key={idx}>
                <td>Week {weekRow.week}</td>
                {allDays.slice(0, dayPerweek).map((day) => (
                  <td key={`${weekRow.week}-${day}`}>
                    {(periodMap[day] || []).map((period) => (
                      <div key={period.id} style={{ marginBottom: '6px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="checkbox"
                            checked={selectedSlots.includes(period.id)}
                            onChange={() => {
                              const isChecked = selectedSlots.includes(period.id);
                              setSelectedSlots((prev) =>
                                isChecked
                                  ? prev.filter((id) => id !== period.id)
                                  : [...prev, period.id]
                              );
                            }}
                          />
                          {period.period}
                        </label>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="input-g" style={{ marginTop: '1rem' }}>
        <label>PIDs to avoid (indices):</label>
        <textarea
          readOnly
          value={selectedIndices.join(', ')}
          rows={4}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
})()}

                    </motion.div>
                </AnimatePresence>
            </div>
            

        <ToastContainer position="top-right" autoClose={3000} />
        </motion.div>
    );
}

export default SettingsPanel;