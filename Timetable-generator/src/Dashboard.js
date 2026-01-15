import { useAuth } from "./Authenticate";
import MainApp from "./MainApp";
import NonadminCRUD from "./Non-adminCRUD";
export default function Dashboard(){
    const {user} = useAuth();

    if(!user){
        return <p>Log in to access dashboard.</p>;
    }

    return(
        <div className="dashboard">
            <h2>
                Welcome,{user.username} ({user.role})
            </h2>

            {user.role === "ADMIN" && (
                <>
                <MainApp/>
                </>
            )
           

            }
             {user.role === "DEPARTMENT_REP" && (
                <>
                <NonadminCRUD/>
                </>
            )}
            
      
        </div>
    )
}