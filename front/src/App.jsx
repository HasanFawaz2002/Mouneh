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
import Forgotpassword from "./Components/AUTHENTICATION/Forgotpassword";
import Resetpassword from "./Components/AUTHENTICATION/Resetpassword";
import Cart from "./Components/CART/Cart";

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
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/reset_password/:id/:token" element={<Resetpassword />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
    </Routes>
    <Footer/>
    </>
    )
}

export default App;