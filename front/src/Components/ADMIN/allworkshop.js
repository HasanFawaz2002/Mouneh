import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';
import { useNavigate } from "react-router-dom";



const Workshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const navigate = useNavigate();


  const getAllWorkshops = async () => {
    try {
      const token = localStorage.getItem('access_token');

      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get("http://localhost:3001/allworkshop", { headers });
      setWorkshops(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting workshops");
    }
  };

  useEffect(() => {
    getAllWorkshops();
  }, []);

  const handleDeleteWorkshop = async (workshopId) => {
    try {
      const token = localStorage.getItem('access_token');

      const headers = {
        token: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:3001/delete/${workshopId}`, { headers });

      setWorkshops((prevWorkshops) => prevWorkshops.filter((w) => w._id !== workshopId));

      toast.success("Workshop deleted successfully!");

    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong delete workshop");
    }
  };

  // Check if the user is an admin, if not redirect to restricted page
  const isAdmin = localStorage.getItem('isAdmin');
  const token = localStorage.getItem('access_token');
  if (isAdmin === 'false' || !token) {
    navigate('/login'); // Replace '/restricted' with your actual restricted access route
    return null;
  }

 
return (
  <>
      <Toaster position="top-right" />
    <div className="row dashboard">
      <div className="dash col-md-3">
        <AdminMenu />
      </div>
      <div className="col-md-9">
        <h1 className="productlist text-center">All Workshops List</h1>
        <div className="cardlist">
          {workshops.map((w, index) => (
            // Check if the index is even to start a new row
            index % 2 === 0 && (
              <div key={w._id} className="row mb-4">
                <div className="col-md-6">
                  <div className="card cardproduct" style={{ width: "100%" }}>
                    {/* Workshop image */}
                    {/* Replace with the appropriate image URL */}
                    
                    <div className="card-body">
                      <h5 className="card-title-workshop">{w.title}</h5>
                      <h5 className="card-text">Category: {w.category}</h5>
                      <h5 className="card-text">Price: {w.price} $</h5>
                      <h5 className="card-text">Description: {w.description} </h5>
                      <div className="cardbtn d-flex justify-content-between">
                        
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDeleteWorkshop(w._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Check if there's a workshop at the next index */}
                {index + 1 < workshops.length && (
                  <div className="col-md-6">
                    <div className="card cardproduct" style={{ width: "100%" }}>
                    
                      
                      <div className="card-body">
                        <h5 className="card-title-workshop">{workshops[index + 1].title}</h5>
                        <h5 className="card-text">Category: {workshops[index + 1].category}</h5>
                        <h5 className="card-text">Price: {workshops[index + 1].price} $</h5>
                        <h5 className="card-text">Description: {workshops[index + 1].description} </h5>
                        <div className="cardbtn d-flex justify-content-between">
                          
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDeleteWorkshop(workshops[index + 1]._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
    </>
);
  
};

export default Workshops;
