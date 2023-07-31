import React , { useState } from "react";
import "./style.css";
import axios from "axios";
import "./style.css"; 

function Register() {
  const api = "http://localhost:3001";
  const [contact, setContact] = useState({
    firstname: "",
    lastname:"",
    phonenumber:"",
    city:"",
    age:"",
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
  function hsn(e){
    e.preventDefault();

    /* Call the validation function before making the API call
    const isValid = RegisterValid(contact);

    // Proceed with the API call only if the validation passes
    if (!isValid) {
      console.log("Validation failed. Please check the input fields.");
      // You can also show an error message to the user indicating that validation failed
      return; // Return early and prevent the Axios request from being sent to the server
    }*/

    axios.post(`${api}/register`, contact)
    .then((response) => {
      console.log("Registration successful!");
 })
 .catch((error) => {
   console.error("Registration failed:", error);
 });
  };
  
  return (
    <section className="register">
      <div className="register-container">
        <div className="register-content">
          <h2 className="center auth-header">Create Your Account</h2>
          <p className="center auth-par">PLEASE ENTER YOUR INFORMATION TO SIGN UP.</p>
          <form onSubmit={hsn}>
            <div className="flexSb">
              <input type="text" name="firstname" placeholder="First Name" id="firstname" value={contact.firstname}
              onChange={handleChange}/>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                className="left"
                value={contact.lastname}
                onChange={handleChange}
              />
            </div>
            <div className="flexSb">
                      <div className="error" id="vfirstname"></div>
                      <div className="error" id="vlastName"></div>
             </div>
            <div className="flexSb">
              <input
                type="number"
                name="phonenumber"
                id="phonenumber"
                placeholder="Phone Number"
                value={contact.phonenumber}
                onChange={handleChange}
              />
                
              <input type="text" name="city" id="city" placeholder="City" className="left" value={contact.city} onChange={handleChange}/>
             
            </div>
            <div className="flexSb">
                      <div className="error" id="vphonenumber"></div>
                      <div className="error" id="vcity"></div>
             </div>
            <input type="date" name="age" id="age" placeholder="Birthday" value={contact.age} onChange={handleChange}/>
            <div className="error" id="vage"></div>
            <input type="text" name="email" id="email" placeholder="Email Address" value={contact.email} onChange={handleChange}/>
            <div className="error" id="vemail"></div>
            <input type="password" name="password" id="password" placeholder="Password" value={contact.password} onChange={handleChange}/>
            <div className="error" id="vpassword"></div>
            <div className="centering">
              <button type="submit" className="submit">Register</button>
            </div>
            <p className="parag ">
              Already a member? <span className="auth-span">Login</span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}


export default Register;
