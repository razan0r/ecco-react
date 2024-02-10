import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext(null);
export  function CartContextProvider({children}){
let [cartNum,setCarNum]=useState(0);


const addToCartContext=async(productId)=>{
try{
    const token =localStorage.getItem("userToken")
    const {data}=await axios.post(`${import.meta.env.VITE_API_URL}/cart`,
    {productId},
    {headers:{Authorization:`Tariq__${token}`}})
    if(data.message=='success'){
        toast.success('product added successfuly', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
            setCarNum(++cartNum)
    }
    return data;
    
}
catch(error){
    console.log(error);
}
}
const increaseQtyContext =async(productId)=>{
    
    try{
      const token =localStorage.getItem("userToken")
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,{productId},
      {headers:{Authorization:`Tariq__${token}`}})
    
     return data
      
    }catch(error){
        console.log(error);
    }
}
const decreaseQtyContext =async(productId)=>{
    
    try{
      const token =localStorage.getItem("userToken")
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,{productId},
      {headers:{Authorization:`Tariq__${token}`}})
      return data
      
    }catch(error){
        console.log(error);
    }
}

const getCartContext=async()=>{
    try{
        const token =localStorage.getItem("userToken")
        const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/cart`,
        {headers:{Authorization:`Tariq__${token}`}})
        setCarNum(data.count);
        return data
        
    }
    catch(error){
        console.log(error);
    }
   
}

const clearAllCart=async()=>{
    try{
      const token=localStorage.getItem('userToken');
      const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/clear`,{}
      ,{headers:{Authorization:`Tariq__${token}`}})
      return data;
    }catch(error){
        console.log(error)
    }
}
const removeItemContext = async(productId)=>{
    try{  
    const token =localStorage.getItem('userToken');
    const {data}= await axios.patch(`${import.meta.env.VITE_API_URL}/cart/removeItem`,
    {productId},
    {headers:{Authorization:`Tariq__${token}`}})
    return data
      }
    catch(error){
        console.log(error);
    }
  
}
    return(
    <CartContext.Provider value={{addToCartContext,setCarNum,getCartContext,removeItemContext,cartNum,clearAllCart,increaseQtyContext,decreaseQtyContext}}>
       { children}
    </CartContext.Provider>)
    

}
