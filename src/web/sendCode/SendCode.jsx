import React, { useContext } from 'react'
import Input from '../../shared/Input.jsx'
import { useFormik } from 'formik'
import { sendCodeSchema } from '../validation/validation.js';
import axios from 'axios';
import './sendCode.css'
import {useNavigate} from 'react-router-dom';

function SendCode() {
    const navigata=useNavigate();
    const initialValues={
        email:'',
    }
    
    const onSubmit=async (email)=>{
        const {data} = await axios.patch(`${import.meta.env.VITE_API_URL}/auth/sendcode`,{email});
        navigata('/forgetpasswoed')
        
    }
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema: sendCodeSchema,
    });
    
    const inputs = [
      {
        id: "email",
        type: "email",
        name: "email",
        title: "user email",
        value: formik.values.email,
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

   <div className='container sendCode-container  w-75  rounded-3 mx-3 '>
   <div className='row justify-content-center align-items-center all all0'>
        <div className='col-md-5'>
          <img src='photo-1590959651373-a3db0f38a961.avif' className='w-90'/>
          </div>
          <div className='col-md-4 '>
    <h2 className='login-h2 text-center'>Send Code</h2>
    <form onSubmit={formik.handleSubmit}>
    {renderInput}
    <button type='submit' className='submit' onClick={()=>onSubmit(formik.values.email)} >Send Code</button>
    
    </form>
    </div>
  </div>  
   </div>
   </> 
  )
}

export default SendCode