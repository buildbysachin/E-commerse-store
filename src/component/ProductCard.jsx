import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Contex/ProductContex'

const ProductCard = () => {
  const { selectimage, setselectimage,
    clickedProduct, setClickedProduct,
    categoryWise, setCategoryWise } = useContext(ProductContext)

    const filterproducts = selectimage.filter(elem=> {
      if(categoryWise === "All") return true
      return elem.category === categoryWise;
    })

  const navigate = useNavigate()

  return (
    <div>
      <h2 className='flex font-bold text-6xl m-3 mb-14 justify-center'>our products</h2>
      {filterproducts.length === 0 ? (
        <p className=' text-red-600 font-extrabold text-center text-5xl'>! No product found</p>
      )
        : (
          <div className='flex flex-wrap gap-2 p-2'>
            {filterproducts.map((elem, idx) => {
              return (
                <div key={idx} className='md:w-72 w-30 p-1 font-bold md:text-2xl text-sm text-amber-50 bg-red-800 '>
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

export default ProductCard