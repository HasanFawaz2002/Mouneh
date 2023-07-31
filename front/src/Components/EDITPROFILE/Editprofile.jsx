import React from "react";
import "./Editprofile.css";


function Editprofile(){
    return (
        <section className="edit-profile">
          <div className="edit-profile-container">
            <div className="edit-profile-container-content">
              <h2 className="center edit-profile-container-header2">EDIT YOUR PROFILE</h2>
              <p className="center edit-profile-container-par">PLEASE ENTER YOUR NEW INFORMATION</p>
              <form>
                <div className="flexSb">
                  <input type="text" name="firstname" placeholder="First Name" id="firstname" 
                 />
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last Name"
                    id="lastname"
                    className="left"
                  />
                </div>
                
                  <input
                    type="number"
                    name="phonenumber"
                    id="phonenumber"
                    placeholder="Phone Number"
                   
                  />
               
        
               
             
                <input type="text" name="email" id="email" placeholder="Email Address" />
                <input type="password" name="password" id="password" placeholder="Password" />

                <div className="centering">
                  <button type="submit" className="editprofile-btn">Edit</button>
                </div>
               
              </form>
            </div>
          </div>
        </section>
      );
    }
    
    
    export default Editprofile;
