import React, { useState, useEffect } from "react";
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import axios from 'axios';
import { Link } from 'react-router-dom';

import './Swiper.css';

const Swiper = () => {
  const [newProduct, setNewProduct] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/newProduct')
      .then(result => setNewProduct(result.data))
      .catch(error => console.error(error));
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 700,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="swiper">
      {newProduct.length === 0 ? (
          <h1 className="swiper-header">No Products</h1>
          ) : (
        <>
          <h1 className="swiper-header">New Products</h1>
          <Slider {...settings}>
            {newProduct.map(item => (
              <div className="card" key={item._id}>
                <div className="card-info">
                  <div className="card-avatar">
                    <img src={`http://localhost:3001/products/${item._id}/photo`} alt={item.image} />
                  </div>
                  <div className="card-title">{item.name}</div>
                  <div className="card-subtitle">{item.description}</div>
                </div>
                <ul className="card-social">
                  <li className="card-social__item">
                    Price : <br />
                    {item.price}$
                  </li>
                  <li className="card-social__item">
                    Quantity :<br />
                    {item.quantity}
                  </li>
                  {item.category === "Food" && (  
                    <li className="card-social__item">
                      Weight :<br />
                      {item.recipes.weight}g
                    </li>
                  )}
                </ul>
                {item.quantity === 0 ? (
                  <p className="card-btn-out">Out of Stock</p>
                ) : (
                  <button className="card-btn">
                    <Link to={`/product/${item._id}`}>View Product</Link>
                  </button>
                )}
              </div>
            ))}
          </Slider>
        </>
      )}
    </div>
  );
}

export default Swiper;
