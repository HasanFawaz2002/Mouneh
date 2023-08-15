import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams,useLocation } from 'react-router-dom';
import chefImage from '../../images/Chef-pana.png';
import './updateproduct.css';
import axios from 'axios';
import "driver.js/dist/driver.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdatemyProduct = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');
  const { productID } = useParams();
 

  const [inputDescription, setInputDescription] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [inputQuantity, setInputQuantity] = useState("");
  const [inputWeight, setInputWeight] = useState("");
  const [inputIngredient, setInputIngredient] = useState("");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');

  useEffect(() => {
    axios.get(`http://localhost:3001/products/fetchinfo/${localStorage.getItem('userId')}/${productID}`, {
      headers: {
        token: `Bearer ${token}`,
      },
    })
      .then(result => {
        //console.log(result);
        const productData = result.data[0];
        const recipes = productData.recipes;
        setInputDescription(productData.description);
        setInputPrice(productData.price);
        setInputQuantity(productData.quantity);
        setInputWeight(recipes.weight);
        setInputIngredient(recipes.ingredient);
      })
      .catch(err => console.log(err));
  }, []);

  const formRef = useRef(null);

  const notify = () => toast.success('Product Updated', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const updatehandleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3001/products/updateproducts/${localStorage.getItem('userId')}/${productID}`,
        {
          description: inputDescription,
          price: inputPrice,
          quantity: inputQuantity,
          "recipes.weight": inputWeight,
          "recipes.ingredient": inputIngredient,
        },
        {
          headers: {
            token: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200){
        notify();
        console.log('product updated');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <h1 className='add-product-container-header'>Update your Own Product</h1>

      <div ref={formRef} className="add-product-container-form">
        <form className='add-product-container-form-left'>
          <div className="add-product-container-form-section product-name">
          <label htmlFor="description">Description</label>
            <input
              type="text"
              value={inputDescription}
              placeholder="Write a description"
              className="form-control"
              onChange={(e) => setInputDescription(e.target.value)}
            />
            {/* Description error handling */}
          </div>
          <div className="add-product-container-form-section product-price">
            <label htmlFor="price">Price/$</label>
            <input
              type="number"
              value={inputPrice}
              placeholder="Write a Price"
              className="form-control"
              onChange={(e) => setInputPrice(e.target.value)}
            />
            {/* Price error handling */}
          </div>
          <div className="add-product-container-form-section product-quantity">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              value={inputQuantity}
              placeholder="Write a quantity"
              className="form-control"
              onChange={(e) => setInputQuantity(e.target.value)}
            />
            {/* Quantity error handling */}
          </div>
          {category === "Food" ? (
            <>

          <div className="add-product-container-form-section product-description">
          <label htmlFor="recipes.weight">Weight/gram</label>
            <input
              type="number"
              value={inputWeight}
              placeholder="Weight"
              className="form-control"
              onChange={(e) => setInputWeight(e.target.value)}
            />
            {/* Weight error handling */}
          </div>
          <div className="add-product-container-form-section">
            <label htmlFor="recipes.ingredient">Ingredient</label>
            <input
              type="text"
              value={inputIngredient}
              placeholder="Ingredient"
              className="form-control"
              onChange={(e) => setInputIngredient(e.target.value)}
            />
            {/* Ingredient error handling */}
          </div>
          </>
          ) : null}
          <button type='submit' onClick={updatehandleSubmit}>Update Product</button>
        </form>
        <img src={chefImage} alt="Chef" />
      </div>
    </>
  );
}

export default UpdatemyProduct;
