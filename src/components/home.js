import React, { useEffect, useState } from "react";
import Dictaphone from "./Speech";
import "./home.css"
import 'animate.css';
import logo from "./Sharda university logo purple.png" 
const Home=()=>{
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false)
        }, 1500)
    },[])

    if(loading){
        return (
            <div className="load">
                 <div className="logo-anim">
                 <img className='logo' src={logo} height="70px" alt='sharda logo'/>
                 </div>
            </div>
        )
    }
    return(
        <div className="home">
        <div style={{width:"330px",paddingTop:"5%"}}>
             <h1 className="animate__animated animate__slideInDown" style={{color:"white", fontWeight:"500"}}>Hello!</h1>
             <h1 className="animate__animated animate__slideInDown" style={{color:"#A377D6",  fontWeight:"500"}}>How can I help?</h1>
        </div> 
        <Dictaphone/>
        </div>
    )
}
export default Home;