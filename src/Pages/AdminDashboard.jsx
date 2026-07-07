import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { X } from 'lucide-react'

const AdminDashboard = () => {
  const { selectimage } = useContext(ProductContext)
  const [adminClickedProduct, setAdminClickedProduct] = useState(null)

  const [buyerList, setBuyerList] = useState([])

  useEffect(() => {

    if (!adminClickedProduct) return
    let tempBuyers = []
    const alluser = JSON.parse(localStorage.getItem('Data')) || []

    alluser.forEach(user => {
      const userOrders = JSON.parse(localStorage.getItem(`Orders_${user.Gmail}`)) || []

      const hasPurchased = userOrders.some(
        (orderItem) => orderItem.Buyingproduct && orderItem.Buyingproduct.Title === adminClickedProduct.Title
      )

      if (hasPurchased) {
        tempBuyers.push({
          name: user.name,
          Gmail: user.Gmail,
          Address: user.Address,
          phone: user.Mobile
        })
      }
    });
    setBuyerList(tempBuyers)
  }, [adminClickedProduct])

  return (
    <div className='relative'>
      <h1 className='text-center text-3xl font-bold p-3 md:text-5xl'>Admin Product</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 border-2'>
        {selectimage.map((elem, idx) => {
          return (
            <div key={idx}>
              <img
                className='object-cover w-full h-50 md:h-90'
                src={elem.image}
                alt=""
                onClick={() => {
                  setAdminClickedProduct(elem)
                }}
              />
            </div>
          )
        })}
      </div>
      {adminClickedProduct && (
        <div className='fixed inset-0 bg-white p-6 rounded-lg shadow-lg border border-gray-100 animate-fadeIn'>
          <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-gray-100'>
            <button
            onClick={()=>{setAdminClickedProduct(null)}}
            >
              <X size={32}/>
            </button>
            <div>
              <h2 className='text-lg font-bold text-gray-800'>
                Selected: <span className='text-amber-700'>{adminClickedProduct.Title}</span>
              </h2>
            </div>
            {/* Live Count badge */}
            <div className='mt-2 md:mt-0 bg-amber-100 text-amber-800 font-bold px-4 py-2 rounded-full text-sm shadow-inner'>
              Total Orders: {buyerList.length}
            </div>
          </div>

          {/* Buyers ki details dikhane ke liye clean table view */}
          {buyerList.length > 0 ? (
            <div className='overflow-x-auto rounded-lg border border-gray-200'>
              <table className='w-full text-left border-collapse'>
                <thead>
                  <tr className='bg-amber-900/5 text-amber-900 text-sm font-semibold'>
                    <th className='p-3 border-b '>Customer Name</th>
                    <th className='p-3 border-b'>Gmail ID</th>
                    <th className='p-3 border-b'>Phone No.</th>
                    <th className='p-3 border-b'>Address</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-gray-700 divide-y divide-gray-100'>
                  {buyerList.map((buyer, idx) => (
                    <tr key={idx} className='hover:bg-gray-50/80 transition-colors'>
                      <td className='p-3 font-medium text-gray-900'>{buyer.name}</td>
                      <td className='p-3 text-gray-600'>{buyer.Gmail}</td>
                      <td className='p-3 text-gray-600'>{buyer.phone}</td>
                      <td className='p-3 text-gray-500 truncate max-w-xs' title={buyer.Address}>{buyer.Address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='text-center text-gray-500 py-6 italic bg-gray-50 rounded-lg border border-dashed'>
              Abhi tak kisi bhi user ne yeh product nahi mangaya hai.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard