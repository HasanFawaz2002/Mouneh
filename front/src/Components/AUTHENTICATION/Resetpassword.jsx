import React, { useState } from "react";
import axios from "axios";
import "./reset.css"; 
import {useNavigate,useParams} from "react-router-dom";


function Resetpassword() {

  const navigate = useNavigate();
  const api = "http://localhost:3001";
  const [password, setPassword] = useState();
  const {id, token} = useParams();

  

  function handlereset(e) {
    e.preventDefault();
    axios.post(`${api}/reset-password/${id}/${token}`, {password})
    .then(res => {
        if(res.data.Status === "Success") {
         
            navigate('/login');
        }
    }).catch(err => console.log(err.response))
}

   
  return (
    <section className="reset-password">
    <div className="reset-password-container">
      <div className="reset-password-container-content">
          <h2 className="center reset-password-container-header2">RESET PASSWORD</h2>
          <p className="center reset-password-container-par">ENTER A NEW PASSWORD.</p>
          <form onSubmit={handlereset}>
            <input type="password" name="password" placeholder="Enter password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
            <div className="centering">
              <button type="submit" className="reset-password-btn">Update</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Resetpassword;
