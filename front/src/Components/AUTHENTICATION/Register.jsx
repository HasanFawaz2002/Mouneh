import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [contact, setContact] = useState({
    firstname: "",
    lastname: "",
    phonenumber: "",
    city: "",
    age: "",
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

  const [nameError, setNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  
  function validateEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
  }

  function hsn(e) {
    e.preventDefault();

    setNameError("");
    setLastNameError("");
    setMobileError("");
    setAgeError("");
    setCityError("");
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    // Validate each field and set corresponding error messages
    if (!contact.firstname) {
      setNameError("First name is required.");
      isValid = false;
    }

    if (!contact.lastname) {
      setLastNameError("Last name is required.");
      isValid = false;
    }

    if (!contact.phonenumber) {
      setMobileError("Phone number is required.");
      isValid = false;
    }

    if (!contact.age) {
      setAgeError("Age is required.");
      isValid = false;
    }

    if (!contact.city) {
      setCityError("City is required.");
      isValid = false;
    }

    if (!contact.email) {
      setEmailError("Email address is required.");
      isValid = false;
    } else if (!validateEmail(contact.email)) {
      setEmailError("Please enter a valid email address.");
      isValid = false;
    }

    if (!contact.password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!validatePassword(contact.password)) {
      setPasswordError(
        "Password must contain at least 8 characters, including one uppercase letter, one special character, and one number."
      );
      isValid = false;
    }

    if (isValid) {
      axios
        .post(`${api}/register`, contact)
        .then((response) => {
          console.log("Registration successful!");
          localStorage.clear(); // Clear localStorage here
          navigate('/');
        })
        .catch((error) => {
          console.error("Registration failed:", error);
        });
    }
  }



  
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
            {nameError && (
              <span className="error-password-message">{nameError}</span>
            )}
                       {lastNameError && (
              <span className="error-password-message">{lastNameError}</span>
            )}
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
            {mobileError && (
              <span className="error-password-message">{mobileError}</span>
            )}
                       {cityError && (
              <span className="error-password-message">{cityError}</span>
            )}
             </div>
            <input type="date" name="age" id="age" placeholder="Birthday" value={contact.age} onChange={handleChange}/>
            {ageError && (
              <span className="error-password-message">{ageError}</span>
            )}
            <input type="text" name="email" id="email" placeholder="Email Address" value={contact.email} onChange={handleChange}/>
            {emailError && (
              <span className="error-password-message">{emailError}</span>
            )}
            <input type="password" name="password" id="password" placeholder="Password" value={contact.password} onChange={handleChange}/>
            {passwordError && (
              <span className="error-password-message">{passwordError}</span>
            )}
            <div className="centering">
              <button type="submit" className="submit">Register</button>
            </div>
            <p className="parag ">
              Already a member? <Link to="/login" className="auth-span">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}


export default Register;
