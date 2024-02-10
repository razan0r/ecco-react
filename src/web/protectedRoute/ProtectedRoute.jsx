import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { UserContext } from './../context/User';


function ProtectedRoute({children}) {
    let {userToken}=useContext(UserContext)
   if(localStorage.getItem("userToken")==null){
    return <Navigate to='/login'/>
   }
  return children
} 


export default ProtectedRoute