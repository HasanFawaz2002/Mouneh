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
import CheckoutSuccess from "./Components/CART/CheckoutSuccess";
import AllWorkshops from './Components/WORKSHOPS/AllWorkshops';
import SingleWorkshop from './Components/WORKSHOPS/SingleWorkshop';
import AddProduct from "./Components/ADDPRODUCT/AddProduct";
import AdminDashboard from './Components/ADMIN/AdminDashboard';
import UpdateProduct from './Components/ADMIN/updateproduct';
import Products from './Components/ADMIN/Allproduct';
import CreateProduct from './Components/ADMIN/createproduct';
import Users from './Components/ADMIN/users';
import AllWorkshop from './Components/ADMIN/allworkshop';
import CreateWorkshop from './Components/ADMIN/createworkshop';
import MyProducts from "./Components/PRODUCTS/showmyproducts";
import UpdatemyProduct from"./Components/PRODUCTS/updateproduct";
function App(){
    return (
    <>

    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/about" element={<AboutUs/>}></Route>
        <Route path="/product/:productID" element={<Product/>}></Route>
        <Route path="/updateproduct/:productID" element={<UpdatemyProduct/>}></Route>
        <Route path="/showProducts" element={<ShowProducts />}></Route>
        <Route path="/myProducts" element={<MyProducts />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/editprofile" element={<Editprofile />}></Route>
        <Route path="/forgot-password" element={<Forgotpassword />}></Route>
        <Route path="/reset_password/:id/:token" element={<Resetpassword />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/checkout-success" element={<CheckoutSuccess />}></Route>
        <Route path="/workshops" element={<AllWorkshops />} />
        <Route path="/workshop/:id" element={<SingleWorkshop />} />
        <Route path="/workshop/register" element={<Register />} />
        <Route path="/addproduct" element={<AddProduct />}></Route>
        <Route path="/dashboard/admin/*" element={<AdminDashboard />} />
        <Route path="/dashboard/admin/createproduct" element={<CreateProduct />} />
        <Route path="/dashboard/admin/products" element={<Products />} />
        <Route path="/dashboard/admin/product/update/:userId/:productId" element={<UpdateProduct />} />
        <Route path="/dashboard/admin/create-workshop" element={<CreateWorkshop />} />
        <Route path="/dashboard/admin/users" element={<Users />} />
        <Route path="/dashboard/admin/allworkshop" element={<AllWorkshop />} />
    </Routes>
    <Footer/>
    </>
    )
}

export default App;