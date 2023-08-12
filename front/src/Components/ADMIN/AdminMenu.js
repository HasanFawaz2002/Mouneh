import React from "react";
import { NavLink } from "react-router-dom";
import './Admin.css';

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Dashboard</h4>
          
          <NavLink
            to="/dashboard/admin/createproduct"
            className="list-group-item "
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-workshop"
            className="list-group-item "
          >
            Create Workshop
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item "
          >
             All Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/allworkshop"
            className="list-group-item "
          >
           All Workshop
          </NavLink>
          
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item "
          >
           All Users
          </NavLink> 
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
