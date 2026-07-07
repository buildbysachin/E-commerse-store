import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { useNavigate } from 'react-router-dom'
import { X } from 'lucide-react'

const AdminNotification = () => {
    const { currentUser,setIsRead } = useContext(ProductContext)
    const navigate = useNavigate()
    const [notification, setNotification] = useState([])

    useEffect(() => {
        const saved = localStorage.getItem('AdminNotification')
        const parsedNotification = JSON.parse(saved) || []
        
        const updateNotification = parsedNotification.map(elem=>({
            ...elem,
            isRead:true
        }))

        setNotification(updateNotification)
        localStorage.setItem('AdminNotification', JSON.stringify(updateNotification))

        setIsRead(true)
    }, [currentUser, navigate, setIsRead])

    const clearAll = () => {
        localStorage.removeItem('AdminNotification')
        setNotification([])
    }

    return (
        <div className='flex justify-center'>
            <div className=' bg-gray-600 min-h-screen max-h-auto w-[70vh]'>
                <div className='p-2 flex justify-between'>
                    {notification.length > 0 && (
                        <span className=' text-4xl border-2 px-2 rounded-full'>
                            {notification.length}
                        </span>
                    )}
                    <span onClick={clearAll}><X color='red' size={40} /></span>
                </div>

                <div className='flex flex-col gap-2'>
                    {notification.map((elem) => {
                        return (
                            <div className='bg-[#570000] text-white'>
                                <h1 className='text-center text-4xl underline'>{elem.type}</h1>
                                <div className='flex justify-evenly border-b-2 border-white'>
                                    <h2 className='text-3xl'>{elem.date}</h2>
                                    <h2 className='text-2xl'>{elem.time}</h2>
                                </div>
                                <div className='p-3'>
                                    <h2 className='text-2xl'>{elem.id}</h2>
                                    <p className='text-xl'>{elem.message}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default AdminNotification