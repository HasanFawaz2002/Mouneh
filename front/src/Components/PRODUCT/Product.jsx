import React, { useState, useEffect } from "react";
import "./Product.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Product = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const id = params.productID;

  useEffect(() => {
    axios
      .get("http://localhost:3001/products/find/" + id)
      .then((result) => {
        console.log(result.data);
        setProduct(result.data);
      })
      .catch((error) => console.error(error));
  }, [id]); // Add id as a dependency to the useEffect hook

  // Check if the product data is available before rendering
  if (!product) {
    return <div>Loading...</div>;
  }

  const isFoodCategory = product.category === "Food";

  return (
    <div className="product-container">
      <div className="product-container-left">
        <img src={product.image} alt={product.name} />
      </div>
      <div
        className="product-container-right">
        <div className="product-container-right-section">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h4>Price: <span>{product.price}$</span></h4>
          <h4>Weight: <span>{product.weight}g</span></h4>
        </div>
        
          <div className="product-container-right-section">
            {isFoodCategory && (<div>
            <h4>Ingredients: <span>{product.recipes.ingredient}</span></h4>
            <h4>Method: <span>{product.recipes.method}</span></h4>
            <h4>Time: <span>{product.recipes.time}m</span></h4>
          </div>
        )}
        </div>

        <div className="product-container-right-section">
          <form action="">
            <label htmlFor="">Quantity</label><br />
            <input type="number" max={product.quantity} />
            <button>Buy</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Product;
