import React, { useState } from "react";
import axios from "axios";
//import {useCookies} from "react-cookie";
import "./style.css"; 
import {useNavigate,Link} from "react-router-dom";


function Login() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [contact, setContact] = useState({
    email: "",
    password: ""
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setContact((prevValue) => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  //const [_,setCookies]=useCookies(["access_token"]);

  function hsn(e) {
    e.preventDefault();
  
 
    axios.post(`${api}/login`, contact)
      .then((response) => {
        console.log("Login successful!");
        console.log(response);
        //setCookies("access_token", response.data.accessToken);
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem("userId", response.data.user._id);
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        // Handle the error response here if needed
      });
  }
   
  return (
    <section className="register">
      <div className="register-container">
        <div className="register-content">
          <h2 className="center auth-header">LOGIN</h2>
          <p className="center auth-par">PLEASE ENTER YOUR INFORMATION TO SIGN IN.</p>
          <form onSubmit={hsn}>
            <input type="text" name="email" placeholder="Email Address" id="email" value={contact.email} onChange={handleChange} />
            <div className="error" id="vemail"></div>
            <input type="password" name="password" placeholder="Password" id="password" value={contact.password} onChange={handleChange} />
            <div className="error" id="vpassword"></div>
            <Link to="/forgot-password">Forgot password?</Link>
            <div className="centering">
              <button className="submit">Login</button>
            </div>
            <p className="parag ">
              Not a member? <span className="auth-span">Register</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;