import React, { useState, useEffect, useMemo } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import HomeLandPageImage1 from "../../images/1690453981553.png";
import HomeLandPageImage2 from "../../images/image2.jpeg";
import Swiper from "../SWIPER/Swiper";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Wrap the initialization of 'images' in useMemo to memoize the array
  const images = useMemo(() => [HomeLandPageImage1, HomeLandPageImage2], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <div className="landpage-section">
        <div className="landpage-section-left">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`image-slider ${
                index === currentImageIndex ? "active" : ""
              }`}
            />
          ))}
        </div>
        <div className="landpage-section-right">
          <h1 className="landpage-section-right-header">Artisanal Delights</h1>
          <h4 className="landpage-section-right-header4">Savor the Essence of Handcrafted Mouneh</h4>
          <div className="landpage-section-right-btn">
            <button>Get Started</button>
            <button><Link to="/showProducts">Products</Link></button>
          </div>
        </div>
      </div>

    <Swiper/>
    </>
  );
};

export default Home;
