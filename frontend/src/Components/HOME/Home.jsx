import React from "react";
import './Home.css'
//import HomeLandPageImage from "../../images/A_Guide_to_Making_Quick_Pickles_at_Home___Crowded_Kitchen-removebg-preview.png";
import HomeLandPageImage from "../../images/Medium Rectangle 300x250 px.jpeg"

const Home = () => {
    
    return (
        
        <>
        <div className="landpage-section">
            <div className="landpage-section-left">
                <img src={HomeLandPageImage} alt="" />
            </div>
            <div className="landpage-section-right">
                <h1>Artisanal Delights</h1>
                <h4>Savor the Essence of Handcrafted Mouneh</h4>
                <div className="landpage-section-right-btn">
                    <button>Get Started</button>
                    <button>Products</button>
                </div>
            </div>
        </div>

        </>
    )
}

export default Home;