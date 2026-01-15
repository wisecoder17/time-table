import React, { useEffect, useState } from "react";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";  
export default function VenueList({onVenueList}){

    //POST
    const [venuecode,setVcode]=useState('');
    const[vname,setVname]=useState('');
    const[capacity,setCapacity]=useState('');
    const [vtype,setVtype]=useState('');
    const[pref,setVpref]=useState('');
    const[loc,setVloc]=useState('');



    
    const Venuesubmit=async(e)=>{
        e.preventDefault();

        const res0 = await fetch('http://localhost:8080/venue/post',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                venue_Code:venuecode,
                name:vname,
                capacity:capacity,
                type:vtype,
                preference:pref,
                location:loc
            }),
        })
        if(res0.ok){
            toast.success("Venue added")
            if(onVenueList) onVenueList('');
        }
        else{
            toast.error("Venue not added");
        }
    };

    //GET
    const[venues,setVenues]=useState([]);
    const[editV,setEditV]=useState('');
    const[editVlist,setEditVlist]=useState({venue_Code:""},{name:""},{capacity:""},{type:""},{preference:""},{location:""})

    const fetchvenue=async()=>{
        const res0 = await fetch('http://localhost:8080/venue/get');
        const ra1= await res0.json();
        setVenues(ra1);
        console.log("Fetched Venue Data:",ra1);
        setVenues(Array.isArray(ra1) ? ra1 :[]);
    }

    useEffect(()=>{fetchvenue();}
    ,[])

    const handleEditClick=(venue)=>{
        setEditV(venue.id)
        setEditVlist({
            venue_Code:venue.venuecode,
            name:venue.vname,
            capacity:venue.capacity,
            type:venue.vtype,
            preference:venue.pref,
            location:venue.loc
        });

    };


    const handleSave=async(id)=>{
        const ra2 = await fetch(`http://localhost:8080/venue/update/${id}`,
            {
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(editVlist)
            }
        );
        if(ra2.ok){
            toast.success("Venue updated")
            setEditV(null);
            fetchvenue();

        }
        else{
            toast.error("Update failed")
        }
    }

    const handleInputchange = (e) => {
        const {name, value} = e.target;
        setEditVlist(prev =>({
            ...prev,
            [name]:value
        }));
    };

    const handleCancel =() =>{
        setEditV(null);
    };
    const handleDelte = async (id)=>{
        if (!window.confirm("Are you sure u want to delete this?")) return;
        const res6 = await fetch(`http://localhost:8080/venue/delete/${id}`,{method:"DELETE",});
        if(res6.ok){
            toast.success("Deleted successfully");
            fetchvenue();

        }
        else{
            toast.error("Deletion failed")
        }
    }




    return(
        <>
        <div>
            <form onSubmit={Venuesubmit} className="form-section">
                <h2>Add Venues</h2>
                <div className="input-group">
                    <label>Venue-Code</label>
                    <input type="text" className="futuristic-input" value={venuecode} onChange={(e)=>setVcode(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Venue name</label>
                    <input type="text" className="futuristic-input" value={vname} onChange={(e)=>setVname(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Capacity</label>
                    <input type="number" className="futuristic-input" value={capacity} onChange={(e)=>setCapacity(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Venue type</label>
                    <input type="number" className="futuristic-input" value={vtype} onChange={(e)=>setVtype(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Preference</label>
                    <input type="number" className="futuristic-input" value={pref} onChange={(e)=>setVpref(e.target.value)}/>
                </div>
                <div className="input-group">
                    <label>Location</label>
                    <input type="text" className="futuristic-input" value={loc} onChange={(e)=>setVloc(e.target.value)}/>
                </div>
                <button type="submit" className="submit-button">Add Venue</button>
            </form>

            <div className="student-list">
                <h2>Venue List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Venue-code</th>
                            <th>Venue name</th>
                            <th>Venue capacity</th>
                            <th>Venue type</th>
                            <th>Preference</th>
                            <th>Location</th>
                            <th>Huh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {venues.map((venue)=>(
                            <tr key={venue.id}>
                                {editV === venue.id?(
                                    <>
                                    <td>
                                        <input name="venue_Code" value={editV.venue_Code} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="name" value={editV.vname} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Capacity" value={editV.Capacity} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="type" value={editV.Type} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="Preference" value={editV.Preference} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <input name="loc" value={editV.Location} onChange={handleInputchange}/>
                                    </td>
                                    <td>
                                        <button onClick={()=>handleSave(venue.id)}>Save</button>
                                        <button onClick={handleCancel}>Cancel</button>
                                    </td>
                                    </>
                                ):(
                                    <>
                                    <td>{venue.venue_Code}</td>
                                    <td>{venue.name}</td>
                                    <td>{venue.capacity}</td>
                                    <td>{venue.type}</td>
                                    <td>{venue.preference}</td>
                                    <td>{venue.location}</td>
                                    
                                    <td>
                                        <button onClick={()=>handleEditClick(venue)}>Edit</button>
                                        <button onClick={()=>handleDelte(venue.id)}>Delete</button>
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
    )


}