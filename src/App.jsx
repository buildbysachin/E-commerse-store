import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Shop from './Pages/Shop'
import Wishlist from './Pages/Wishlist'
import Cart from './Pages/Cart'
import Navbar from './component/Navbar'
import Profile from './Pages/Profile'
import Signin from './component/Signin'
import AddProduct from './component/AddProduct'
import DetailUpdate from './component/DetailUpdate'
import Login from './component/Login'
import ProductFulldetail from './component/ProductFulldetail'
import Order from './Pages/Order'
import Chackout from './Pages/Chackout'
import AdminNotification from './Pages/AdminNotification'
import AdminDashboard from './Pages/AdminDashboard'
import AdminProtected from './component/AdminProtected'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Wishlist' element={<Wishlist />} />
        <Route path='/Cart' element={<Cart />} />
        <Route path='/Profile' element={<Profile />} />
        <Route path='/Profile/Signin' element={<Signin />} />
        <Route path='/Profile/Login' element={<Login />} />
        <Route path='/Profile/AddProduct' element={<AddProduct />} />
        <Route path='/Profile/DetailUpdate' element={<DetailUpdate />} />
        <Route path='/Profile/Productfulldetail' element={<ProductFulldetail />} />
        <Route path='/Productfulldetail/Chackout' element={<Chackout />} />
        <Route path='/Order' element={<Order />} />
        <Route path='/AdminNotification'
          element={
            <AdminProtected isAdminRequired={true}>
              <AdminNotification />
            </AdminProtected>
          } />
          <Route path='/AdminDashboard'
          element={
            <AdminProtected isAdminRequired={true}>
              <AdminDashboard />
            </AdminProtected>
          } />
      </Routes>
    </div>
  )
}

export default App