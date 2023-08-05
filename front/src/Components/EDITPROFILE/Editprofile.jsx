import React, { useState } from 'react';
import "./Editprofile.css";
import axios from 'axios';
import {useCookies} from "react-cookie";

/*function getAccessToken() {
  const value = `; ${document.cookie}`;
  const parts = value.split("; access_token=");
  if (parts.length === 2) return parts.pop().split(";").shift();
}*/

const Editprofile = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phonenumber: '',
    email: '',
    password: '',
  });

  const api ="http://localhost:3001"; 

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    console.log(localStorage.getItem('userId'));
    console.log(token);

    try {
      const response = await axios.put(`${api}/users/${localStorage.getItem('userId')}`, formData, {
        headers: {
          token: `Bearer ${token}`,
        },
      });
      console.log("Profile updated successfully!");
      console.log(response);
      } catch (error) {
      console.error("Profile update failed:", error);
     
    }
  };

  return (
    <section className="edit-profile">
      <div className="edit-profile-container">
        <div className="edit-profile-container-content">
          <h2 className="center edit-profile-container-header2">EDIT YOUR PROFILE</h2>
          <p className="center edit-profile-container-par">PLEASE ENTER YOUR NEW INFORMATION</p>
          <form onSubmit={handleFormSubmit}>
            <div className="flexSb">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                id="firstname"
                value={formData.firstname}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                id="lastname"
                className="left"
                value={formData.lastname}
                onChange={handleInputChange}
              />
            </div>
            <input
              type="number"
              name="phonenumber"
              id="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <div className="centering">
              <button type="submit" className="editprofile-btn">Edit</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Editprofile;
