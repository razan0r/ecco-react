import React, { useContext } from 'react'
import Input from '../../shared/Input.jsx'
import { useFormik } from 'formik'
import { loginSchema } from '../validation/validation.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.jsx';
import './login.css'
import { faEnvelope, faUser } from '@fortawesome/free-regular-svg-icons';
function Login() {
  let {userToken,setUserToken}=useContext(UserContext)
    const navigate=useNavigate();
    if(userToken){
      navigate(-1);
    }
    const initialValues={
        email:'',
        password:'',
    }
    
    const onSubmit=async users=>{
        const {data} = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signin`,users);

        if(data.message =='success'){
            localStorage.setItem('userToken',data.token);
            setUserToken(data.token)
            toast.success('login successfuly', {
                position: "top-center",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/')
        }
        
    }
    const formik = useFormik({
      initialValues,
      onSubmit,
      validationSchema: loginSchema,
    });
    
    const inputs = [
      {
        id: "email",
        type: "email",
        name: "email",
        title: "",
        icon:{faUser},
        placeholder:`your Email` ,
        value: formik.values.email,
        className:'form-control0',
      },
      {
        id: "password",
        type: "password",
        name: "password",
        title: "",
        icon:{faEnvelope},
        placeholder:"password",
        value: formik.values.password,
        className:'form-control0',
      },
    ];
  
const renderInput = inputs.map((input, index) => (
  <Input
    type={input.type}
    id={input.id}
    name={input.name}
    title={input.title}
    icon={input.icon}
    placeholder={input.placeholder}
    touched={formik.touched}
    onBlur={formik.handleBlur}
    key={index}
    onChange={formik.handleChange}
    errors={formik.errors}
    className={input.className}
  />
));
  return (
    <div className='content0'>
      <div className="container login-container   rounded-3 mx-3">
        <div className='row justify-content-center align-items-center all'>
        <div className='col-md-5'>
          <img src='photo-1590959651373-a3db0f38a961.avif' className='w-90'/>
          </div>
          <div className='col-md-4 '>
            <h2 className="login-h2 text-center">login</h2>
            <form onSubmit={formik.handleSubmit}>
              {renderInput}
              <div>
              <Link className="ms-3 me-5" to={"/sendCode"}>
                forgetPassword?
              </Link>
              <Link className="ms-5" to={"/register"}>
                Sign Up
              </Link>
              </div> 
              <button
                type="submit"
                className="submit text-white w-25 bg-primary"
                disabled={!formik.isValid}
              >
                login
              </button>
             
            </form>
            </div>
      
        </div>
      </div>
    </div>
  );
}

export default Login