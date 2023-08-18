import React, { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import './Admin.css';


const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const token = localStorage.getItem('access_token');

      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };

      const { data } = await axios.get(`http://localhost:3001/products/my-products/${localStorage.getItem('userId')}`, { headers });
      setProducts(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong getting product");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);


  const handleDeleteProduct = async (userId, productId) => {
    console.log("userId:", userId);
    console.log("productId:", productId);
    try {
      const token = localStorage.getItem('access_token');
  
      // Set the token in the request headers
      const headers = {
        token: `Bearer ${token}`,
      };
  
      // Send a DELETE request to your backend API to delete the product
      await axios.delete(`http://localhost:3001/products/${userId}/${productId}`, { headers });
  
      // If the deletion is successful, remove the deleted product from the state
      setProducts((prevProducts) => prevProducts.filter((p) => p._id !== productId));
  
      toast.success("Product deleted successfully!");

    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong delete product");
    }
  };
  
  return (
    <>
    <Toaster position="top-right" />
      <div className="row dashboard">
        <div className="dash col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="productlist text-center">All Products List</h1>
          <div className=" cardlist d-flex flex-wrap w-100 h-200">
            {products.map((p) => (
              <div key={p._id} className=" cardproduct card m-4" style={{ width: "250px" ,height:"400px"}}>
                <img
                  src={`http://localhost:3001/products/${p._id}/photo`}
                  className="card-img-top product-image w-250 h-50"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">Name: {p.name}</h5>
                  <h5 className="card-text">Category: {p.category}</h5>
                  <h5 className="card-text">Price :  {p.price} $</h5>
                  
                  <div className="cardbtn d-flex justify-content-between">
                    <Link
                      to={`/dashboard/admin/product/update/${p.userID}/${ p._id}`}
                      className="btn btn-primary"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDeleteProduct(p.userID, p._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </>
  );
};
export default Products;