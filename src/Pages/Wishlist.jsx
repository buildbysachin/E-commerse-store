import React, { useContext } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { useNavigate } from 'react-router-dom'

const Wishlist = () => {
  const navigate = useNavigate()
  const { wishlistProduct, setWishlistProduct, setClickedProduct,
    categoryWise, setCategoryWise
  } = useContext(ProductContext)

  const filterProduct = wishlistProduct.filter(elem =>{
    if(categoryWise === 'All') return true
    return elem.category === categoryWise
  }

  )
  return (
    <div>
      <h2  className='flex font-bold text-6xl m-3 mb-14 justify-center'>Your wishlist</h2>
      {filterProduct.length === 0 ? (
        <p className=' text-red-600 font-extrabold text-center text-5xl'>! No product found</p>
      )
        : (
          <div className='flex flex-wrap gap-2 p-2'>
            {filterProduct.map((elem, idx) => {
              return (
                <div key={idx} className='md:w-72 w-30 p-2 font-bold text-2xl text-amber-50 bg-red-700 '>
                  <img
                    src={elem.image}
                    alt=""
                    onClick={() => {
                      setClickedProduct(elem, idx)
                      navigate('/Profile/Productfulldetail')

                    }}
                  />
                  <h1 className='line-clamp-1'>{elem.Title}</h1>
                </div>
              )
            })}
          </div>
        )}
    </div>
  )
}

export default Wishlist