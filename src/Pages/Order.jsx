import React, { useContext, useState } from 'react'
import { ProductContext } from '../Contex/ProductContex'

const Order = () => {
  const { currentUser } = useContext(ProductContext)
  const [OrderedItem, setOrderedItem] = useState(() => {
    if (currentUser && currentUser.Gmail) {
      const savedOrder = localStorage.getItem(`Orders_${currentUser.Gmail}`)
      return savedOrder ? JSON.parse(savedOrder) : []
    }
    return []
  })

  return (
    <div>
      <h1 className='font-bold text-4xl md:text-6xl text-center p-3'>Your Order</h1>
      {OrderedItem.length === 0 ? (
        <p className='text-5xl text-[#000000]'>!No order found yet</p>
      ) : (
        <div className='flex flex-col gap-4'>
          {OrderedItem.map((elem,idx) => {
            return (
              <div key={idx} className='flex border-2 gap-2 p-1 text-white bg-[#570000] w-full max-w-md mx-auto rounded-lg items-center '>
                <img className='border-2 h-24 w-24 md:w-36 md:h-36 border-black object-cover rounded shrink-0' src={elem.Buyingproduct.image} alt="" />
                <div className='flex flex-col justify-evenly w-full overflow-hidden'>
                  <h2 className='text-lg font-bold break-word line-clamp-2 leading-tight'>{elem.Buyingproduct.Title}</h2>
                  <p className="text-gray-400 text-sm md:text-base font-semibold">Price: {elem.Buyingproduct.Price}</p>
                  <p className="text-xs text-green-400 font-mono break-all">Order ID: {elem.orderId}</p>
                  <p className="text-[10px] text-gray-500">Ordered on: {elem.date}</p>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Order