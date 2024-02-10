import axios from 'axios'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './../categories/categories.css'
import { CartContext } from "../context/Cart";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as notsolid } from "@fortawesome/free-regular-svg-icons";
import { faHandPointLeft, faHandPointRight, faStar } from '@fortawesome/free-solid-svg-icons';
function ProductsPage() {
    const { addToCartContext } = useContext(CartContext);
    const [page0,setPage0]=useState(1);
    const[data,setData]=useState();
    const[total,setTotal]=useState(1);
    const [isLoading,setIsLoading]=useState(true);
    const[searchValue,setSearchValue]=useState('');
    const[minPrice,setMinPrice]=useState(0);
    const[maxPrice,setMaxPrice]=useState(1000);
    const[limt,setLimt]=useState(4);
    const[sortValue,setSortValue]=useState('')
    const queryParameters = new URLSearchParams(window.location.search)
    const page = queryParameters.get("page")
   const navigate=useNavigate();
   useEffect(()=>{
    getProduct(page)
}
   ,[page])

   const searchHandleChange = (event) => {
    setSearchValue(event.target.value);
  };
   const sortHandleChange=(event)=>{
    setSortValue(event.target.value)
   }
   const filterMinHandleChange=(event)=>{
    setMinPrice(event.target.value)
   }
   const filterMaxHandleChange=(event)=>{
    setMaxPrice(event.target.value) 
   }
   const DisplayHandleChange=(event)=>{
    setLimt(event.target.value)
   }
   const AddToCart = async (productId) => {
    const token = localStorage.getItem('userToken')
    console.log(token)
    if(!token){
      navigate('/login')
    }
    const res = await addToCartContext(productId);
    return res;
  };
  const reset=()=>{
    setMinPrice(0);
    setMaxPrice(1000);
  }
  const getProduct=async(page)=>{
    console.log(limt)
    event.preventDefault();
      const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/products?fields=name,price,ratingNumbers,finalPrice,mainImage&page=${page}&search=${searchValue}&sort=${sortValue}&price[gte]=${minPrice}&price[lte]=${maxPrice}&limit=${limt}`)
      console.log(data)
      setIsLoading(false)
      setTotal(data.total)
      setPage0(data.page)
      setData(data.products)
    }
   
  
   if(isLoading){
    return(  <h1>Loading...</h1>)
   }
  
  return (
    <>
      <div className="container">
        <div className="d-flex">
          <form
            className="d-flex w-25 mb-5"
            role="search"
            onSubmit={getProduct}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              onChange={searchHandleChange}
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
          <div className="dropdown-center">
            <button
              className="btn btn-outline-success  dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Product classification
            </button>
            <ul className="dropdown-menu">
              <li>
                <form
                  className="d-flex w-75 mb-2"
                  role="number"
                  onSubmit={getProduct}
                >
                  <input
                    className="form-control me-2 "
                    type="number"
                    placeholder="Display"
                    aria-label="number"
                    onChange={DisplayHandleChange}
                  />
                  <button className="btn btn-outline-success" type="submit">
                    Diplay
                  </button>
                </form>
              </li>
              <li className='d-flex align-items-center mb-3'>
                <label htmlFor="sort" className=" ">
                  sort by:
                </label>
                <select
                  name="sort"
                  id="sort"
                  aria-label="Default select example"
                  className="form-select ms-2"
                  onChange={sortHandleChange}
                >
                  <option value="price">Price (ase)</option>
                  <option value="-price">Price (des)</option>
                  <option value="name">Name (ase)</option>
                  <option value="-name">Name (des)</option>
                </select>
                <button
                  className="btn btn-outline-success go ms-2"
                  type="submit"
                  onClick={getProduct}
                >
                  Go
                </button>
              </li>
              <li>
                <form className="d-flex" role="search" onSubmit={getProduct}>
                  <input
                    className="form-control me-2"
                    type="number"
                    placeholder="min price"
                    aria-label="min price"
                    onChange={filterMinHandleChange}
                  />
                  <span className="mt-2 me-2">and</span>
                  <input
                    className="form-control me-2"
                    type="number"
                    placeholder="max price"
                    aria-label="max price"
                    onChange={filterMaxHandleChange}
                  />
                  <button className="btn btn-outline-success " type="submit">
                    Go
                  </button>
                  <button
                    className="btn btn-outline-primary ms-2"
                    type="Reset"
                    onClick={reset}
                  >
                    Reset
                  </button>
                </form>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          {data.map((product, index) => (
            <div className="col-lg-3 cards mb-5">
              <div className="card" key={index}>
                <img
                  src={product.mainImage.secure_url}
                  className="card-img-top"
                  alt="product"
                />
                <div className="card-body">
                  <h6 className="card-title text-center">{product.name}</h6>
                  <div className="text-center">
                    <span className="text-danger fw-bold">
                      ${product.finalPrice}
                    </span>{" "}
                    <del className="text-muted">${product.price}</del>
                  </div>
        
                  <hr />

                  <Link to={`/product/${product._id}`} className="pe-7 btn btn-outline-success">
                    details
                  </Link>
                  <Link onClick={() => AddToCart(product._id)} className="ps-5">
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <nav aria-label="Page navigation ">
          <ul className="pagination my-5 ">
            <li className="page-item">
              <a className="page-link" href="#">
                {" "}
                <FontAwesomeIcon
                  icon={faHandPointLeft}
                  className="hand"
                  onClick={() => setReview(index)}
                />
              </a>
            </li>
            {Array.from({ length: total / page0 }).map((_, index) => (
              <React.Fragment key={index}>
                <li className="page-item">
                  <Link
                    className="page-link"
                    onClick={() => getProduct(index + 1)}
                    to={{
                      pathname: "/products",
                      search: `?page=${index + 1}`,
                    }}
                  >
                    {index + 1}
                  </Link>
                </li>
              </React.Fragment>
            ))}
            <li className="page-item">
              <a className="page-link" href="#">
                <FontAwesomeIcon
                  icon={faHandPointRight}
                  className="hand"
                  onClick={() => setReview(index)}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );

                  }
export default ProductsPage