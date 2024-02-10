
import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
function CategoriesDetails() {
     const{id}=useParams();
    
    const getCategoryDetails = async()=>{
     const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/products/category/${id}`);
     return data.products ;
    }
 const {data,isLoading}=useQuery('category_details',getCategoryDetails);
if (isLoading){
  return(
    <h1>Loading...</h1>
  )
}
  return (
   <div className='products container my-5'>
    <div className='row'>
    {
      data.length?data.map((product,index)=>
      <div className="col-md-3 cards" key={index}>
              <div className="card" >
                <img
                  src={product.mainImage.secure_url}
                  className="card-img-top"
                  alt="product"
                />
                <div className="card-body">
                  <h6 className="card-title text-center">{product.name}</h6>
                  <div className='text-center'><span className='text-danger fw-bold'>${product.finalPrice}</span> <del className='text-muted'>${product.price}</del></div>
                  <a href="#" className="btn btn-primary">
                <Link to={`/product/${product._id}`} className='text-white'> details</Link>
                  </a>
                </div>
              </div>
            </div>
      ):<h2>page not found</h2>
    }
    </div>
   </div>
  )
}

export default CategoriesDetails