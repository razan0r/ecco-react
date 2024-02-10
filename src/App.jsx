import { useContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { CartContext, CartContextProvider } from './web/context/Cart.jsx';
import { UserContext } from './web/context/User.jsx';
import {router} from './web/routes.jsx'
import OrderContextProvider from './web/context/Order.jsx';

function App() {
const {setUserToken}=useContext(UserContext)
let{setCarNum,getCartContext}=useContext(CartContext);
  useEffect(()=>{
    if(localStorage.getItem('userToken')!=null){
setUserToken(localStorage.getItem('userToken'))
   setCarNum(getCartContext().count);
    }
  },[])

  return (
    <>
    <OrderContextProvider>
     <RouterProvider router={router} />  
     </OrderContextProvider>
    </>
  )
}

export default App
