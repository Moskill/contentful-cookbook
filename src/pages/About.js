import React from 'react'
import Footer from "./Footer";
import { useHistory } from "react-router-dom";
import "../App.css";

function About(props) {
    let history = useHistory();
    return (
        <>  
        <div className="about-container">

         <h2> Who we are?</h2>
            
        </div>

        <Footer/>
        </>  
    )
}

export default About
