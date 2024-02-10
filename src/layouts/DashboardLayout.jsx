import React from 'react'
import Navbar from '../dashboard/navbar/Navbar'
import Footer from '../dashboard/footer/Footer'
import { Outlet } from 'react-router-dom'

function DashboardLayout() {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default DashboardLayout