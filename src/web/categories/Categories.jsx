import React from 'react'
import { useQuery } from 'react-query'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination,Autoplay } from 'swiper/modules';
import 'swiper/css';
import axios from 'axios'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './categories.css'
import { Link } from 'react-router-dom';


function Categories() {
  const getCategories= async()=>{
    const {data}=await axios.get(`${import.meta.env.VITE_API_URL}/categories/active?limit=7`)
    console.log(data)
    return data;

      }
      const {data,isLoading}=useQuery('web_categories',getCategories);
      if(isLoading){
      return  <h1>Loading...</h1>
      }
  return (
  <div className='container0 pt-5'>
    <div className='container swiper-container  '>
      <h2 className='h2Home'>Categories</h2>
      <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={50}
      slidesPerView={6.5}
     loop={true}
     autoplay={{
      delay:3000,
     
     }}
     navigation
      pagination={{ 
        clickable: true,
        }}
  
    >
      {
          data?.categories.length?data?.categories.map((category)=>
      <SwiperSlide key={category._id}> 
      <Link to={`/product/category/${category._id}`}>
      <img src={category.image.secure_url} className='swiper-image'  />
      </Link>
      </SwiperSlide>
      ):'<h2>no category found</h2>'  
      }
    </Swiper>
    </div>
    </div>
  )
}

export default Categories