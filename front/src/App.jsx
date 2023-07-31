import React from "react";
import {Routes,Route} from 'react-router-dom'
import Navbar from "./Components/NAVBAR/Navbar";
import Home from './Components/HOME/Home'
import Contact from "./Components/CONTACT/Contact";
import AboutUs from "./Components/ABOUT/About";
import Footer from "./Components/FOOTER/Footer";
import Product from "./Components/PRODUCT/Product";
import ShowProducts from "./Components/PRODUCTS/ShowProduct";
import Register from "./Components/AUTHENTICATION/Register";
import Login from "./Components/AUTHENTICATION/Login";
import Editprofile from "./Components/EDITPROFILE/Editprofile";



function App(){
    return (
    <>

    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/product/:productID" element={<Product/>}></Route>
        <Route path="/showProducts" element={<ShowProducts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/editprofile" element={<Editprofile />}></Route>
    </Routes>
    <Footer/>
    </>
    )
}

export default App;