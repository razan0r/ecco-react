import React from 'react'
import Input from '../../shared/Input'
import { useFormik } from 'formik'
import { registerSchema } from '../validation/validation.js';
import { toast } from 'react-toastify';
import axios from 'axios';
function Register() {
    const initialValues={
        userName:'',
        email:'',
        password:'',
        image:'',
    }
    const onSubmit=async users=>{
        const formData=new FormData();
        formData.append('userName',users.userName);
        formData.append('email',users.email);
        formData.append('password',users.password);
        formData.append('image',users.image);
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`,formData);
        if(data.message =='success'){
            formik.resetForm();
            toast.success('account created successfuly,plz verify your email to login', {
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
        
    }
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema: registerSchema,
    });
    
    const handleFileChange=(event)=>{
        formik.setFieldValue('image',event.target.files[0]); 
    }
    const inputs = [
      {
        id: "userName",  
        type: "text",
        name: "userName",
        title: "user name",
        value: formik.values.userName,
        className:'form-control0',
      },
      {
        id: "email",
        type: "email",
        name: "email",
        title: "user email",
        value: formik.values.email,
        className:'form-control0',
      },
      {
        id: "password",
        type: "password",
        name: "password",
        title: "user password",
        value: formik.values.password,
        className:'form-control0',
      },
      {
        id:'image',
        type: "file",
        name:'image',
        title:'image',
         onChange:handleFileChange,
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
    onChange={input.onChange||formik.handleChange}
    errors={formik.errors}
    className={input.className}
  />
));
  return (
   <>
   <div className='container register-container  w-90 py-5  rounded-3 mx-3'>
   <div className='row justify-content-center pb-5 align-items-center all'>
        <div className='col-md-5'>
          <img src='photo-1590959651373-a3db0f38a961.avif' className='w-90'/>
          </div>
          <div className='col-md-4 '>
    <h2 className='login-h2 text-center'>create account</h2>
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
    {renderInput}
    <button type='submit' className='submit' disabled={!formik.isValid}>Submit</button>
    </form>
    </div>
    </div>
  
   </div>
   
   </> 
  )
}

export default Register