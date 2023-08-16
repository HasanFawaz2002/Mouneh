import React ,{useState,useEffect} from "react";
import axios from "axios";
import MyProduct from "./myproducts";
import Search from "./Searchbar";
import Pagination from "./Pagination";

import "./allProducts.css";



function MyProducts(){
const [products,setProducts]=useState([]);
const [searchQuery, setSearchQuery] = useState('');
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(8);

const token = localStorage.getItem('access_token');
useEffect(()=>{
  axios.get(`http://localhost:3001/products/my-products/${localStorage.getItem('userId')}`, {
    headers: {
      token: `Bearer ${token}`,
    },
  })
  .then(result=>{
    setProducts(result.data);
    console.log('hello hassan');
    console.log(result.data);
  })
  .catch(error=>console.error(error));
},[]);

const filteredProducts = products.filter((product) =>
product.name.toLowerCase().includes(searchQuery.toLowerCase())
);

const lastPostIndex = currentPage * postsPerPage;
const firstPostIndex = lastPostIndex - postsPerPage;
const currentPosts = filteredProducts.slice(firstPostIndex, lastPostIndex);




    return(
        <>
    <div className="products-container">
        <div className="products-header">
            <h1>My Products</h1>
           <Search setSearchQuery={setSearchQuery}/>
        </div>   
           
        <div className="products">
        {currentPosts.map((item) => (
            <MyProduct key={item._id} imageSrc={`http://localhost:3001/products/${item._id}/photo`} {...item}/>
          ))}
          
        </div>
        <Pagination
        totalPosts={filteredProducts.length}
        postsPerPage={postsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        />

    </div>
    
   
   
      </>
    )
}
export default MyProducts;