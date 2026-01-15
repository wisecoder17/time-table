import { useState, useEffect } from 'react';
import './App.css';
import SettingsPanel from './SettingsPanel';
import { FiSettings, FiInfo, FiChevronRight, FiCalendar, FiBook, FiLayers, FiDatabase } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import CrudPanel from './CrudPanel';
import { ToastContainer,toast } from "react-toastify";
import "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";





function MainApp() {
  const[showCrud,setShowCrud]=useState(false);
  const[session,setSession]=useState('');
  const[semester,setSemester]=useState('First');
  const [levelType, setLevelType] = useState("all");
  const [periodPerDay, setPeriodsPerDay] = useState(1);
  const [dayPerWeek, setDaysPerWeek] = useState(1);
  const [extend, setExtend] = useState(false);
  const [extraDays, setExtraDays] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [ setShowOutput] = useState(false);
  const [examStartDate, setExamStartDate] = useState('');
  const [examEndDate, setExamEndDate] = useState('');
  const [excludeDays, setExcludedDays] = useState([]);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const[daysToHoldExam,setDaysToHoldExam]=useState(['Mon','Tue','Wed','Thu','Fri','Sat','Sun']);
  const[examcalendar,setExamCalendar] = useState([]);
  const[selectedSlots,setSelectedSlots]=useState([]);
  const[selectedLevels,setSelectedLevels]=useState([]);
  const generateCsv = async()=>{
    const res = await fetch("http://localhost:8080/course/export");
    const message= await res.text();
    toast(message);
  }
 
// const generateAnalysis = async()=>{
//   const wed = await fetch("http://localhost:8080/timetable/analysis");
//   const message = await wed.text();
//   toast(message);
// }
  

  
  const getWeeksBetween = (startDate, endDate)=>{
    const OneDay =24*60*60*1000;
    const diffDays = Math.round(Math.abs((endDate-startDate) / OneDay));
    return Math.ceil(diffDays/7);
  };

  const groupWeek = (flatList)=>{
    return Object.values(flatList.reduce((acc,item) =>{
      if (!acc[item.week]){
        acc[item.week] ={week:item.week, periods:[]};
      }
      acc[item.week].periods.push(item);
      return acc;
    },{}));
  }

  const generateCalendar=()=>{
    if (!examStartDate || !examEndDate) return;
    const start = new Date(examStartDate);
    const end = new Date(examEndDate);
    const weeks = getWeeksBetween(start,end);
    const newCalendar=[];

    for (let week =0; week <weeks;week++){
      for(let dayIdx=0;dayIdx<7;dayIdx++){
        const dayName = dayNames[dayIdx];
        if(!daysToHoldExam.includes(dayName)) continue;

        for(let period=1; period <= periodPerDay;period++){
          const id=`W${week + 1}-P${period}-${dayName}`;
          newCalendar.push({
            id,
            week: week + 1,
            day:dayName,
            period:`Period ${period}`,
          });
          
        }
      }
    }
    setExamCalendar(groupWeek(newCalendar));
    setSelectedSlots([]);
  }

  const handleGenerateClick =()=>{
    generateCalendar();
    setShowOutput(true);
    handlemaininterface();
  }

  const totalDays = periodPerDay * dayPerWeek;
  

  useEffect(() => {
    // Animation trigger
    const timer = setTimeout(() => setIsInitialized(true), 300);
    return () => clearTimeout(timer);
  }, []);


  const handlemaininterface =async() => {
    if(
      !session.trim() ||
      !semester.trim() ||
      !examStartDate ||
      !examEndDate ||
      !dayPerWeek ||
      !periodPerDay 
    ){
      alert("Kindly fill out the form pls");
      return;
    }
    const pot= await fetch("http://localhost:8080/main/add", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        session:session,
        semester:semester,
        start_date:examStartDate,
        end_date:examEndDate,
        days_per_week:dayPerWeek,
        periods_per_day:periodPerDay,
      })
    });
    if(pot.ok){
      alert("Prompted to the database");
    }
    else{alert("An error has occured");}
  };

  

  return (
    <motion.div 
      className='app'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className='neon-bg'></div>
      
      <header className="app-header">

        <motion.div 
        className='crud-icon'
        onClick={()=>setShowCrud(!showCrud)}
        whileHover={{scale: 1.1}}
        whileTap={{scale: 0.9}}
        >
          <FiDatabase size={24}/>
        </motion.div>
        <motion.h1 
          className="glowing-text"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Globus Timetabling System <span className="version">BELLS TECH</span>
        </motion.h1>
        
        <motion.div 
          className="settings-icon"
          onClick={() => setShowSettings(!showSettings)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiSettings size={24} />
        </motion.div>
      </header>

      <div className='container'>
        <motion.div 
          className="form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="form-section">

            {/* <Studentform/>
            <StudentList/>
            <StaffList/>
            <VenueList/>
            <CourseList/>
            <CentreList/>
            <DepartList/>
            <RegList/>
            <ProgramList/>
            <StudentsemregList/>
            <SlashedList/> */}
            <h2>
              <FiCalendar className="section-icon" />
              Academic Information
            </h2>
            
            <div className='input-group'>
              <label>
                Enter Session:
                <span 
                  className="info-icon"
                  onMouseEnter={() => setActiveTooltip('session')}
                  onMouseLeave={() => setActiveTooltip(null)}
                >
                  <FiInfo />
                </span>
              </label>
              <input 
                type='text' 
                placeholder='eg. 2024/2025'
                className="futuristic-input"
                value={session}
                onChange={(e) => setSession(e.target.value)}
                required
              />
              {activeTooltip === 'session' && (
                <div className="tooltip">Format: YYYY/YYYY (e.g., 2024/2025)</div>
              )}
            </div>

            <div className='input-group'>
              
              <label>Selected Semester:</label>
              <div className="futuristic-select">
                <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                >
                  <option>First</option>
                  <option>Second</option>
                </select>
                <FiChevronRight className="select-arrow" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>
              <FiCalendar className="section-icon" />
              Examination Period
            </h2>
            
            <div className='input-group'>
              <label>Exam Start Date:</label>
              
              <input 
                type='date' 
                value={examStartDate} 
                onChange={(e) => {
                  const selectedDate=new Date(e.target.value);
                  const today=new Date();
                  selectedDate.setHours(0,0,0,0);
                  today.setHours(0,0,0,0);
                  if (selectedDate < today){
                    alert("Date is invalid");
                    return;
                  }
                  setExamStartDate(e.target.value);
                }}
                className="futuristic-input"
              />
            </div>
            
            <div className='input-group'>
              <label>Exam End Date:</label>
              <input 
                type='date' 
                value={examEndDate} 
                onChange={(e) => {
                  const selectedEnd=new Date(e.target.value);
                  const start =new Date(examStartDate);
                  selectedEnd.setHours(0,0,0,0);
                  start.setHours(0,0,0,0);
                if (selectedEnd < start){
                  alert("End date can't be before the start date");
                  return;
                }
                setExamEndDate(e.target.value);
              }}
              className="futuristic-input"
              />
            </div>
            
            <div className='input-group'>
              <label>Select Exam Category:</label>
              <div className="futuristic-select">
                <select>
                  <option>Regular</option>
                  <option>Carry-Over</option>
                </select>
                <FiChevronRight className="select-arrow" />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>
              <FiLayers className="section-icon" />
              Institution Settings
            </h2>
            
            <div className='input-group'>
              <label>Select Campus Type</label>
              <div className="radio-group futuristic">
                <label>
                  <input type='radio' name='campus'/>
                  <span className="radio-custom"></span>
                  Single
                </label>
                <label>
                  <input type='radio' name='campus'/>
                  <span className="radio-custom"></span>
                  Multi
                </label>
              </div>
            </div>
            
            <div className='input-group'>
              <label>Levels to Schedule</label>
              <div className="radio-group futuristic">
                <label>
                  <input 
                    type='radio' 
                    name='level'
                    value='all' 
                    checked={levelType === 'all'} 
                    onChange={() => setLevelType('all')}
                  />
                  <span className="radio-custom"></span>
                  All
                </label>
                <label>
                  <input 
                    type='radio' 
                    name='level' 
                    value='selected' 
                    checked={levelType === 'selected'} 
                    onChange={() => setLevelType('selected')}
                  />
                  <span className="radio-custom"></span>
                  Selected
                </label>
              </div>
            </div>

            {levelType === 'selected' && (
                      <motion.div
              className="level-selection"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              transition={{ duration: 0.3 }}
        >
              <h3>Select Specific Levels:</h3>
              <div className="checkbox-grid">
              {["100", "200", "300", "400", "500"].map((level) => (
               <label key={level}>
              <input
              type="checkbox"
              value={level}
              checked={selectedLevels.includes(level)}
              onChange={(e) => {
              if (e.target.checked) {
                setSelectedLevels([...selectedLevels, level]); 
              } else {
                setSelectedLevels(selectedLevels.filter((l) => l !== level)); 
              }
            }}
          />
          {level} Level
        </label>
      ))}
    </div>
  </motion.div>
)}

          </div>

          <div className="form-section">
            <h2>
              <FiBook className="section-icon" />
              Timetable Structure
            </h2>
            
            <div className='input-group'>
              <label>No. Of Days/Week (1-7)</label>
              <input 
                type='number' 
                min={1} 
                max={7} 
                value={dayPerWeek} 
                onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                className="futuristic-input"
              />
            </div>
            
            <div className='input-group'>
              <label>No. Of Periods/Day (1-5)</label>
              <input 
                type='number' 
                min={1} 
                max={5} 
                value={periodPerDay} 
                onChange={(e) => setPeriodsPerDay(Number(e.target.value))}
                className="futuristic-input"
              />
            </div>
            
            <div className='input-group'>
              <label>Total Examination Days:</label>
              <div className="calculated-value">
                {totalDays} day{totalDays !== 1 ? 's' : ''}
                <div className="calculation-explanation">
                  ({periodPerDay} periods/day x {dayPerWeek} days/week)
                </div>
              </div>
            </div>
            
            <div className='input-group'>
              <label className="futuristic-checkbox">
                <input 
                  type='checkbox' 
                  checked={extend} 
                  onChange={() => setExtend(!extend)}
                />
                <span className=""></span>
                Extend Duration (if needed)
              </label>
            </div>

            {extend && (
              <motion.div 
                className='input-group'
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <label>Additional Days to Add</label>
                <input 
                  type='number' 
                  min={1} 
                  value={extraDays} 
                  onChange={(e) => setExtraDays(Number(e.target.value))}
                  className="futuristic-input"
                />
              </motion.div>
            )}
          </div>

          <motion.div 
            className="form-actions"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button 
              className='submit-button'
              // onClick={() => setShowOutput(true)}
              onClick={handleGenerateClick}
              
              
            >
              Save updates
            </button>

            {/* <button className='submit-button' onClick={()=>setShowCrud(true)}>Open CrudPanel</button> */}

            
            
          </motion.div>
          <button onClick={generateCsv}>Generate CSV</button>
          {/* <button onClick={generateAnalysis}>Generate Another csv</button> */}
        </motion.div>

        <AnimatePresence>
          {/* <button className='submit-btn' onClick={handleGenerateClick}>Generate Calendar</button> */}
          {showSettings && (
            <SettingsPanel 
              onClose={() => setShowSettings(false)} 
              setSession={setSession}
              semester={semester}
              session={session}
              setSemester={setSemester}
              dayPerWeek={dayPerWeek}  
              setExcludedDays={setExcludedDays} 
              excludeDays={excludeDays} 
              periodPerDay={periodPerDay}
              selectedSlots={selectedSlots}
              setSelectedSlots={setSelectedSlots}
              setDaysToHoldExam={setDaysToHoldExam}
              examcalendar={examcalendar}
              daysToHoldExam={daysToHoldExam}
              onGenerate={generateCalendar}
              handlemaininterface={handlemaininterface}
            />
          )}
         
        </AnimatePresence>
        <AnimatePresence>
              {showCrud && (
                <CrudPanel onClose={()=>setShowCrud(false)}/>
              )}
            </AnimatePresence>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
    </motion.div>
  );
}

export default MainApp;
