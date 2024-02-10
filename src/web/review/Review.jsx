import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as notsolid } from "@fortawesome/free-regular-svg-icons";
import Input from '../../shared/Input';
import './review.css';

function Review() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);

  const initialValues = {
    comment: '',
  };

  const onSubmit = async (values) => {
    const user = { ...values, rating };
    const token = localStorage.getItem('userToken');
    
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/products/${id}/review`,user,
      {headers:{Authorization:`Tariq__${token}`}});
      if (response.data.message === 'success') {
        toast.success('Review added successfully', {
          position: "top-center",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error adding review:', error);
      toast.error('Failed to add review.', {
        position: "top-center",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  
  });

  const renderInput = (
    <Input
      type="text"
      id="comment"
      name="comment"
      title="Comment"
      value={formik.values.comment}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      touched={formik.touched.comment}
      error={formik.errors.comment}
    />
  );

  return (
    <div className="createReview vh-100">
      <div className="container login-container review-container rounded-3 mx-3">
        <div className="review-input">
          <h2 className="login-h2 text-center">Your Review</h2>
          <form onSubmit={formik.handleSubmit}>
            {renderInput}
            <div className="star-review">
              {Array.from({ length: 5 }).map((_, index) => (
                <React.Fragment key={index}>
                  {index < rating ? (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="blue-star"
                      onClick={() => setRating(index + 1)}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={notsolid}
                      className="blue-star"
                      onClick={() => setRating(index + 1)}
                    />
                  )}
                </React.Fragment>
              ))}
              <br />
            </div>
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Review;