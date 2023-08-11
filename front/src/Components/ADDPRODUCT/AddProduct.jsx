import React, { useState,useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import recipesImage from '../../images/Recipe book.gif';
import chefImage from '../../images/Chef-pana.png';
import './AddProduct.css';
import axios from 'axios';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProduct = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const [product, setProduct] = useState({
        name: '',
        image: '',
        price: '',
        quantity: '',
        description: '',
        category: '',
        recipes: {
            ingredient: '',
            time: '',
            weight: '',
            method: ''
        }
    });
    const ingredientInputRef = useRef(null); 
    const timeInputRef = useRef(null);
    const weightInputRef = useRef(null);
    const methodInputRef = useRef(null);

    const formRef = useRef(null); 
    const notify = () => toast.success('Product Added', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleCategoryChange = (event) => {
        const { value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            category: value
        }));
    
    };
    
    const handleChangeNested = (event, propertyPath) => {
        const {  value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            recipes: {
                ...prevProduct.recipes,
                [propertyPath]: value
            }
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!token) {
            navigate('/login');
            return;
          }
        
          

        try {
            await axios.post('http://localhost:3001/products', product, {
                headers: {
                    token: `Bearer ${token}`,
                }
            });

            setProduct({
                name: '',
                image: '',
                price: '',
                quantity: '',
                description: '',
                category: '',
                recipes: {
                    ingredient: '',
                    time: '',
                    weight: '',
                    method: ''
                }
            });
            notify();
            console.log('Product Added Successfully');
        } catch (error) {
            if (error.response && error.response.status === 403) {
                console.log("Token is not valid!");
                navigate('/login');
              } else {
                console.error("Cart Add failed:", error);
                console.log(product);
              }
        }
    };
    
    
    

    const driverObj1 = driver({
        showProgress: true,
        steps: [
          { element: '.add-product-container-form-left', popover: { title: 'Form', description: "This is the form where you will add the informations you're product." } },
          { element: '.product-name ', popover: { title: 'Product Name', description: 'First, Enter the name of the product you want to add.' } },
          { element: '.product-price', popover: { title: 'Product Price', description: 'Second, Determine how much you want to sell this product.' } },
          { element: '.product-quantity', popover: { title: 'Product Quantity', description: 'Then, Decide how many you want to sell.' } },
          { element: '.product-description', popover: { title: 'Product Description', description: 'Type an appropriate description, it must be more than 10 characters.' } },
          { element: '.product-category', popover: { title: 'Product Category', description: 'We allow you to sell two types of products, Choose one of them.' } },
        ]
      });
      

      const handleHelp = () => {
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    
        setTimeout(() => {
            driverObj1.drive();
        }, 450); 
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
            <h1 className='add-product-container-header'>Add your Own Product</h1>
            <div className="add-product-container">
                <img src={recipesImage} alt="Recipe" />
                <div className="add-product-container-right">
                    <h1>Source of Magic</h1>
                    <p>
                        Here, you can add your own products
                        and provide details about them. Fill out the necessary information
                        and submit to add a new product to our collection.
                    </p>
                    <div>
                    <button onClick={handleHelp}>Need Help</button>
                    </div>
                </div>
            </div>
            <div ref={formRef} className="add-product-container-form">
                <form className='add-product-container-form-left'>
                    <div className="add-product-container-form-section product-name">
                        <label htmlFor="name">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-product-container-form-section product-price">
                        <label htmlFor="price">Price/$</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-product-container-form-section product-quantity">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-product-container-form-section product-description">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="add-product-container-form-section product-category">
                        <label htmlFor="category">Category</label>
                        <div className="category-checkboxes">
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Food"
                                    checked={product.category === 'Food'}
                                    onChange={handleCategoryChange}
                                />
                                Food
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="category"
                                    value="Craft"
                                    checked={product.category === 'Craft'}
                                    onChange={handleCategoryChange}
                                />
                                Craft
                            </label>
                        </div>
                    </div>
                    {product.category === 'Food' && (
                        <>
                            <div className="add-product-container-form-section product-ingredient">
                <label htmlFor="recipes.ingredient">Ingredient</label>
                <input
                    type="text"
                    name="recipes.ingredient"
                    value={product.recipes.ingredient}
                    onChange={(event) => handleChangeNested(event, 'ingredient')}
                    ref={ingredientInputRef} 
                />
            </div>
            <div className="add-product-container-form-section product-time">
                                <label htmlFor="recipes.time">Time/minutes</label>
                                <input
                                    type="number"
                                    name="recipes.time"
                                    value={product.recipes.time}
                                    onChange={(event) => handleChangeNested(event, 'time')}
                                    ref={timeInputRef}
                                />
                            </div>
                            <div className="add-product-container-form-section product-weight">
                                <label htmlFor="recipes.weight">Weight/gram</label>
                                <input
                                    type="number"
                                    name="recipes.weight"
                                    value={product.recipes.weight}
                                    onChange={(event) => handleChangeNested(event, 'weight')}
                                    ref={weightInputRef}
                                />
                            </div>
                            <div className="add-product-container-form-section">
                                <label htmlFor="recipes.method">Method</label>
                                <input
                                    type="text"
                                    name="recipes.method"
                                    value={product.recipes.method}
                                    onChange={(event) => handleChangeNested(event, 'method')}
                                    ref={methodInputRef}
                                />
                            </div>
                        </>
                    )}
                    <div className="add-product-container-form-section">
                        <label htmlFor="image">Upload an Image</label>
                        <input
                            type="text"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                        />
                    </div>
                    <button type='submit' onClick={handleSubmit}>Add Product</button>
                </form>
                <img src={chefImage} alt="Chef" />
            </div>
        </>
    );
}

export default AddProduct;
