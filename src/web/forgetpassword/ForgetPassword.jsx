  import React, { useContext } from 'react'
  import Input from '../../shared/Input.jsx'
  import { useFormik } from 'formik'
  import { forgetSchema } from '../validation/validation.js';
  import axios from 'axios';
  import {  useNavigate } from 'react-router-dom';
  function ForgetPassword() {
    const navigate=useNavigate();
      const initialValues={
          email:'',
          password:'',
          code:'',
      }
      
      const onSubmit=async ({email,password,code})=>{

           const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/forgotPassword`,{email,password,code});            
           navigate('/login')
          }
          
      
      const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema: forgetSchema,
      });
      
      const inputs = [
        {
          id: "email",
          type: "email",
          name: "email",
          title: "user email",
          value: formik.values.email,
        },
        {
          id: "password",
          type: "password",
          name: "password",
          title: "user password",
          value: formik.values.password,
        },
        {
          id: "code",
          type: "text",
          name: "code",
          title: "code",
          value: formik.values.code,
        },
      ];
     
  const renderInput = inputs.map((input, index) => (
    <Input
      type={input.type}
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
    
     <div className='container login-container  w-100  rounded-3 mx-3'>
     <div className='row justify-content-center py-5 align-items-center all all1'>
        <div className='col-md-5'>
          <img src='login1.PNG' className='w-90'/>
          </div>
          <div className='col-md-4 '>
    
      <h2 className='login-h2 text-center'>Forget Password</h2>
      <form onSubmit={formik.handleSubmit}>
      {renderInput}
      <button type='submit' className='submit' onClick={()=>onSubmit(formik.values)}>submit</button>
      </form>
      </div> 
    </div>
    </div>
     
     </> 
    )
  }

export default ForgetPassword