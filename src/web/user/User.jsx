import React, { useContext } from 'react'
import { UserContext } from '../context/User';
import './user.css'
import { Link, Outlet } from 'react-router-dom';
function User() {
    let {userData,loader} = useContext(UserContext);
    if(loader){
      return (
        <h2>Loading...</h2>
      )
    }
  return (
    <aside className='profile'>
      
      <div className='profileLinks'>
      <nav>
        <Link to={''}>Information</Link>
        <Link to={'contact'}>Contact</Link>
        <Link to={'getorder'}>Orders</Link>
      </nav>
      </div>
      <div className='userData w-100'>
        <Outlet/>
      </div>
    </aside>
  )
}

export default User