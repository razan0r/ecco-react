import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./product.css";
import { CartContext } from "../context/Cart";
import { changeImage } from "./product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as notsolid } from "@fortawesome/free-regular-svg-icons";
function Products() {
  const { productId } = useParams();
  const [subImg, setSubImg] = useState();
  const [review, setReview] = useState();
  const { addToCartContext } = useContext(CartContext);
  const [productid,setProductid]=useState();
  const navigate=useNavigate();
  const AddToCart = async (productId) => {
    const token = localStorage.getItem('userToken')
    if(!token){
      navigate('/login')
    }
    const res = await addToCartContext(productId);
    return res;
  };

  let [isLoading, setLoading] = useState(true);
  const getProduct = async () => {
    setProductid(productId);
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${productId}`
    );
    setLoading(false);
    setSubImg(data.product.subImages);
    setReview(data.product.reviews);
    console.log(data.product)
    return data.product;
  };
  const { data } = useQuery("category_details", getProduct);

  const getSubImg = (ImgUrl) => {
    changeImage(ImgUrl);
  };
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <>
      <div className="product container my-5 ">
        <div className="row">
          <div className="col-md-1">
            {subImg.map((subimg, index) => (
              <img
                src={subimg.secure_url}
                alt="sub product"
                className="subImage"
                onClick={() => getSubImg(subimg.secure_url)}
              />
            ))}
          </div>
          <div className="col-md-4">
            <img
              src={data.mainImage.secure_url}
              alt="main product"
              className="mainImg"
            />
          </div>
          <div className="col-md-5">
            <h3>{data.name}</h3>
            {console.log(data)}
            <span className="pe-4">
              {Array.from({ length: data.ratingNumbers }).map((_, index) => (
                <FontAwesomeIcon icon={faStar} className="star" />
              ))}
              {Array.from({ length: 5 - data.ratingNumbers }).map(
                (_, index) => (
                  <FontAwesomeIcon icon={notsolid} className="star" />
                )
              )}
            </span>
            <span>
              {data.number_sellers} sell | {data.stock} in stock
            </span>
            <span>{data.avgRating}</span>
            <hr />
            <span className="pe-3">
              <strong>Price:</strong> ${data.finalPrice}
            </span>
            <p className="mt-3 Description">
              <strong>Description:</strong> {data.description}
            </p>
            <button
              className="btn btn-outline-success mt-3"
              onClick={() => AddToCart(data._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
        <div className="review">
          <h3 className="mt-5">Customer Reviews</h3>
          <hr />
          <div className="customerReview">
            {review
              ? review.map((Review) => (
                  <>
                    <div className="d-flex">
                        <div>
                          <img
                            src={Review.createdBy.image.secure_url}
                            alt="customer profile"
                            className="userImage"
                          />
                        </div>

                        <div>
                          <h5>{Review.createdBy.userName}</h5>
                          <p className="fs-7">{Review.createdAt}</p>
                          </div>
                           </div>  
                    
                    <div className="ms-4">
                      {Array.from({ length: Review.rating }).map((_, index) => (
                        <FontAwesomeIcon icon={faStar} className="star" />
                      ))}
                      {Array.from({ length: 5 - Review.rating }).map(
                        (_, index) => (
                          <FontAwesomeIcon icon={notsolid} className="star" />
                        )
                      )}
                      <br />
                      <p>{Review.comment}</p>
                    </div>

                    <hr className="w-50" />
                  </>
                ))
              : null}
          </div>
                
          <Link to={`/product/${productid}/review`}>Add your rating</Link>
        </div>
      </div>
    </>
  );
}

export default Products;
