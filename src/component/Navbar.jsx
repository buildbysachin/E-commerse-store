import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductContext } from '../Contex/ProductContex'
import { Bell, Menu, X } from 'lucide-react';

const Navbar = () => {
  const { categoryWise, setCategoryWise, currentUser, isRead, setIsRead } = useContext(ProductContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)
  const [notificationed, setNotificationed] = useState([])

  useEffect(() => {
    const savednotification = JSON.parse(localStorage.getItem('AdminNotification'))
    setNotificationed(savednotification || [])
  }, [isRead])

  useEffect(() => {
    const updateNotification = notificationed.filter(elem =>
      elem.isRead === false
    )
    setUnreadCount(updateNotification.length)
  }, [notificationed])

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)

  }

  return (
    <div className='relative flex px-3 py-2 justify-between bg-[#280000] text-[#FDFFFF]'>
      <div className='flex gap-2 items-center'>
        <Link to='/Profile'><img className='bg-cover w-8 rounded-full' src="src\assets\Aurixa.webp" alt="" /></Link>
        <h1 className='font-bold text-xl'>Aurixa</h1>
      </div>
      <select
        value={categoryWise}
        onChange={(e) => { setCategoryWise(e.target.value) }}
        className='bg-transparent text-white border border-white/30 rounded px-3 py-2 text-lg cursor-pointer outline-none'
      >
        <option value="All" className='text-black'>All Category</option>
        <option value="Shirt" className='text-black'>Shirt</option>
        <option value="T-Shirt" className='text-black'>T-Shirt</option>
        <option value="Jeans" className='text-black'>Jeans</option>
        <option value="Combo" className='text-black'>Combo</option>
      </select>

      <div className='relative flex items-center'>
        {currentUser && currentUser.Role === 'Admin' && (
          <div className='relative'>
            <Link to='/AdminNotification'>
              <Bell color='yellow' fill='yellow' />
            </Link>
            {unreadCount > 0 && (
              <div className='absolute -top-2 -right-2 rounded-full bg-red-500 text-white text-xs px-1.5 py-0.5 min-w-7 text-center font-bold'>
                {unreadCount}
              </div>
            )}
          </div>
        )}
      </div>

      <div className='hidden md:flex gap-7 underline items-center text-xl'>

        <Link to='/'>Home</Link>
        <Link to='/Order'>Order</Link>
        <Link to='/Wishlist'>Wishlist</Link>
        <Link to='/Cart'>Cart</Link>
      </div>
      <div className='md:hidden flex items-center'>
        {isMenuOpen ? <X onClick={handleMenu} /> : <Menu onClick={handleMenu} />}
      </div>
      <div className='md:hidden'>
        {isMenuOpen && (
          <div className='absolute top-full right-0 w-fit bg-[#3d0b0b] border-t border-white/10 flex flex-col gap-4 p-4 text-xl underline items-center z-40 shadow-lg animate-fadeIn'>
            <Link to='/' onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to='/Order' onClick={() => setIsMenuOpen(false)}>Order</Link>
            <Link to='/Wishlist' onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
            <Link to='/Cart' onClick={() => setIsMenuOpen(false)}>Cart</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar