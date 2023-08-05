import React, { useState } from "react";
import axios from "axios";
import "./forgot.css"; 
import {useNavigate} from "react-router-dom";


function Forgotpassword() {
  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [email, setEmail] = useState();

  

  function handleforgot(e) {
    e.preventDefault();
    axios.post(`${api}/forgot-password`, {email})
    .then(res => {
        if(res.data.Status === "Success") {
            navigate('/login')
        }
    }).catch(err => console.log(err))
}
   
  return (
    <section className="forgot-password">
      <div className="forgot-password-container">
        <div className="forgot-password-container-content">
          <h2 className="center forgot-password-container-header2">Forgot Password</h2>
          <p className="center forgot-password-container-par">PLEASE ENTER YOUR EMAIL TO RESET YOUR PASSWORD.</p>
          <form onSubmit={handleforgot}>
            <input type="text" name="email" placeholder="Email Address" id="email" value={email}    onChange={(e) => setEmail(e.target.value)} />
            <div className="centering">
              <button type="submit" className="forgot-password-btn">Send</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Forgotpassword;
