import React from 'react'
import Cart from '../cart/Cart.jsx'
import Input from '../../shared/Input.jsx'
import { useFormik } from 'formik'
import { orderSchema } from '../validation/validation.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
function Order() {
  const initialValues = {
    address: "",
    phone: "",
    couponName: "",
  };
const navigate=useNavigate();
  const onSubmit = async (users) => {
    const token=localStorage.getItem('userToken')
   
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/order`,
      users,
      {headers:{Authorization:`Tariq__${token}`}}
    );
   
    if (data.message == "success") {
      toast.success("The request was completed successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/");
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: orderSchema,
  });

  const inputs = [
    {
      id: "address",
      type: "text",
      name: "address",
      title: "",
      placeholder :'address',
      value: formik.values.address,
    },
    {
      id: "phone",
      type: "number",
      name: "phone",
      title: "",
      placeholder:'phone',
      value: formik.values.phone,
    },
    {
        id: "couponName",
        type: "text",
        name: "couponName",
        title: "",
        placeholder:'Have a coupon ?',
        value: formik.values.couponName,
      },
  ];

  const renderInput = inputs.map((input, index) => (
    <Input
      type={input.type}
      placeholder={input.placeholder}
      id={input.id}
      name={input.name}
      title={input.title}
      touched={formik.touched}
      onBlur={formik.handleBlur}
      key={index}
      onChange={formik.handleChange}
      errors={formik.errors}
    />
  ));
  return (
    <>
    <div className='order'>
      <div className="container ">
      
        <div className="row">
        
      <Cart />
          <div className="container login-container  w-75  rounded-3 mt-0 pt-0">
          <div className='row justify-content-center align-items-center all py-3'>
        <div className='col-md-5'>
          <img src='photo-1590959651373-a3db0f38a961.avif' className='w-90'/>
          </div>
          <div className='col-md-4 '>
            <h2 className="login-h2 text-center">Order</h2>
            <form onSubmit={formik.handleSubmit}>
              {renderInput}
              <button
                type="submit"
                className="submit btn btn-outline-primary"
                onClick={()=>onSubmit(formik.values)}
              >
                Order Now
              </button>
            </form>
          </div>
          </div>
        </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default Order;