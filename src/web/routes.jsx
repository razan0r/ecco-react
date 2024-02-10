import { useEffect, useState } from 'react'
import Home from './home/Home.jsx';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Categories from './categories/Categories';
import DashboardHome from './../dashboard/home/Home.jsx'
import DashboardCategories from './../dashboard/categories/Categories.jsx'
import Register from './register/Register.jsx';
import Login from './login/Login.jsx';
import { jwtDecode } from 'jwt-decode';
import CategoriesDetails from './categories/CategoriesDetails.jsx';
import Products from './products/Products.jsx';
import Cart from './cart/Cart.jsx';
import WebLayout from './../layouts/WebLayout.jsx';
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx';
import User from './user/User.jsx';
import ForgetPassword from './forgetpassword/ForgetPassword.jsx';
import SendCode from './sendCode/SendCode.jsx';
import DashboardLayout from './../layouts/DashboardLayout.jsx';
import Order from './order/Order.jsx';
import UserInfo from './user/UserInfo.jsx';
import UserContact from './user/UserContact.jsx';
import UserOrders from './user/UserOrders';
import ProductsPage from './products/ProductsPage.jsx';
import Review from './review/Review.jsx';




export const router = createBrowserRouter([
    {
      path: "/",
      element: <WebLayout/>,
      children:[
        {
          path:"register",
          element:<Register/>
        },
        {
          path:"login",
          element:
          <Login/>
        },
        {
            path:"profile",
            element:
            <ProtectedRoute>
            <User/>
            </ProtectedRoute>,
            children:[
              {
                index:true,
               element: <UserInfo/>
               
              },
              {
                path:'contact',
                element:<UserContact/>
              },
              {
                path:'getorder',
                element:<UserOrders/>
              },
            ]
          },
          {
            path:"forgetpasswoed",
            element:
            <ForgetPassword/>
          },
          {
            path:"order",
            element:
            <Order/>
          },
          {
            path:"sendCode",
            element:
            <SendCode/>
          },
      {
         path:"/",
        index:true,
        element:<Home/>
      },
      {
        path:"categories",
        element:<Categories/>
      },
      {
        path:"product/category/:id",
        element:<CategoriesDetails/>
      },
      {
        path:"product/:id/review",
        element:<Review/>
      },
      {
        path:"product/:productId",
        element:<Products/>
      },
      { path: '/products',
      search: '?page=:page',
        element:<ProductsPage/>
      },
      {
        path:"cart",
        element:
        <ProtectedRoute>
          <Cart/>
        </ProtectedRoute>
      },
    ]
    },
    {
      path: "dashboard",
      element: <DashboardLayout/>,
      children:[{
        path:"home",
        element:<DashboardHome/>
      },
      {
        path:"categories",
        element:<DashboardCategories/>
      },
    ]
    },
  ]);