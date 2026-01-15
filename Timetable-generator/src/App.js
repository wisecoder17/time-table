import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./Authenticate";
import Login from "./Login";
import "react-toastify"; 
import Dashboard from "./Dashboard";

// function AppWrapper(){
  
//   return user ? <MainApp/> :<Login/>;
// }

export default function App(){
  const {user} =useAuth();
  return(
    
    // <AuthProvider>
    //   <AppWrapper/>
    // </AuthProvider> 
  <Routes>
    <Route path="/" element={!user ? <Login /> : <Navigate to="Dashboard"/>}/>
    <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/" />}/>
  </Routes>
  )
}