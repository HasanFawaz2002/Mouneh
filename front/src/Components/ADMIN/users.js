import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';

const Users = () => {
    const [users, setUsers] = useState([]);
  
    // get all users
    const getAllUsers = async () => {
      try {
        const token = localStorage.getItem('access_token');
  
        // Set the token in the request headers
        const headers = {
          token: `Bearer ${token}`,
        };
  
        const { data } = await axios.get("http://localhost:3001/users", { headers });
        setUsers(data);
      } catch (error) {
        console.log(error);
        toast.error("Something Went Wrong getting users");
      }
    };
  
    // lifecycle method
    useEffect(() => {
      getAllUsers();
    }, []);
    const handleDeleteUser = async (userId) => {
        try {
          const token = localStorage.getItem('access_token');
          const headers = {
            token: `Bearer ${token}`,
          };
    
          await axios.delete(`http://localhost:3001/users/${userId}`, { headers });
    
          // If the deletion is successful, remove the deleted user from the state
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    
          toast.success("User deleted successfully!");
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong deleting user");
        }
      };
    
      // Fetch users on component mount
      useEffect(() => {
        getAllUsers();
      }, []);
    return (
      <>
          <Toaster position="top-right" />
        <div className="row dashboard">
          <div className="dash col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="userlist text-center">All Users</h1>
            <div className="cardlist d-flex flex-wrap w-100 h-200">
              {users.map((user) => (
                <div key={user._id} className="user-card card m-4" style={{ width: "400px", height: "300px" }}>
                  
                  <div className="card-body">
                    <h5 className="card-title-user">{user.firstname} {user.lastname}</h5>
                    <h5 className="card-text">Email: {user.email}</h5>
                    <h5 className="card-text">Phone Number: {user.phonenumber}</h5>
                    <h5 className="card-text">city: {user.city}</h5>
                    <button
                  className="btn "
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete User
                </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        </>
    );
  };
  export default Users;