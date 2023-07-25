import React from "react";
import {Routes,Route} from 'react-router-dom'
import Navbar from "./Components/NAVBAR/Navbar";
import Home from './Components/HOME/Home'
import Contact from "./Components/CONTACT/Contact";
import About from "./Components/ABOUT/About";

function App(){
    return (
    <>
    <Navbar />
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/contact" element={<Contact/>}></Route>
        <Route path="/about" element={<About/>}></Route>
    </Routes>
    </>
    )
}

export default App;