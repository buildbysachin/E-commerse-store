import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SquarePen } from 'lucide-react';
import { ProductContext } from '../Contex/ProductContex';
import logoImg from '../assets/Aurixa.webp';

const Profile = () => {
    const { currentUser, setCurrentUser } = useContext(ProductContext)

    const handlelogout = () => {
        localStorage.removeItem('currentUser')
        setCurrentUser(null)
        alert('log out successfully')
        navigate('/Profile')
    }

    const navigate = useNavigate()
    return (
        <div className='body p-4 '>
            <div className='flex items-center flex-col justify-center mt-4'>
                <img className='border-2 border-amber-50 rounded-full bg-cover w-40' src={logoImg} alt="logo" />
                <h2 className='font-bold text-8xl'>Aurixa</h2>
                {currentUser && <p className='text-2xl'>Welcome , {currentUser.name} ({currentUser.Role})</p>}
            </div>
            <div className='flex p-3 gap-4'>
                {!currentUser && (
                    <button
                        onClick={() => {
                            navigate('/Profile/Signin')
                        }}
                        className='bg-[#80071d] text-amber-50 px-2 py-1 rounded text-2xl'
                    >Sign in</button>
                )}
                {!currentUser && (
                    <button
                        onClick={() => {
                            navigate('/Profile/Login')
                        }}
                        className='bg-[#80071d] text-amber-50 px-2 py-1 rounded text-2xl'
                    >Log in</button>
                )}
                {currentUser && currentUser.Role === 'Admin' && (
                    <button
                        onClick={() => {
                            navigate('/Profile/AddProduct')
                        }}
                        className='bg-[#80071d] text-amber-50 px-2 py-1 rounded text-2xl'
                    >Add Product</button>
                )}
                {currentUser && (
                    <button
                        className='bg-[#80071d] text-amber-50 px-2 py-1 rounded text-2xl'
                        onClick={handlelogout}
                    >
                        Log out
                    </button>
                )}
            </div>
            <div className='flex flex-col gap-2 w-fit'>
                {currentUser && (
                    <div>
                        <h1
                        className='text-black shadow-md w-fit active:scale-98 hover:bg-gray-400 p-3 bg-gray-300 text-6xl' 
                        onClick={()=>{
                            navigate('/Profile/DetailUpdate')
                        }}
                        >Personal information</h1>
                    </div>
                )}
                {currentUser && currentUser.Role === 'Admin' && (
                    <button
                        onClick={() => {
                            navigate('/AdminDashboard')
                        }}
                        className='bg-[#80071d] text-amber-50 px-2 py-1 rounded text-2xl'
                    >Go to Admin Dashboard</button>
                )}
            </div>
        </div>
    )
}

export default Profile