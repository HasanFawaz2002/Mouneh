import React from "react";
import axios from "axios";



const CheckoutSuccess = () =>{

  const token=localStorage.getItem('access_token');

  axios.delete(`http://localhost:3001/cart/${localStorage.getItem('userId')}`,{
    headers: {
        token: `Bearer ${token}`,
    }
})
.then(result => {console.log(result)
})
.catch(error => console.log(error));

 return(
    <>
      <h2>Checkout Succcess</h2>
    </>
 )

}

export default CheckoutSuccess;