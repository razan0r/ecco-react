import React ,{ Component } from 'react'
import Categories from './../categories/Categories.jsx';
import './home.css'


function Home() {
  
  return (
    <>
    <div className='homeContent'>
   <div id="carouselExampleControls" className="carousel slide " data-bs-ride="carousel">
  <div className="carousel-inner">

    <div className="carousel-item active ">
      <img src="item-Home\istockphoto-1435650280-612x612.jpg" className="d-block w-100 vh-100" alt="slide1" />
      <div className='overlay1 text-start'>
      <span className='spanCarousel'> Women Clothes</span>
    <button className="badge rounded-pill">Shope Now</button>
  </div>
    </div>
    <div className="carousel-item ">
      <img src="item-Home\istockphoto-1378993991-1024x1024.jpg" className="d-block w-100 vh-100" alt="slide2" />
      <div className='overlay1 text-start'>
      <span className='spanCarousel'> Men Clothes</span>
    <button className="badge rounded-pill">Shope Now</button>
  </div>
    </div>  

  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true" />
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true" />
    <span className="visually-hidden">Next</span>
  </button>
  
</div>
<Categories/>

</div>


</>

  )
}

export default Home