import React from 'react'
import ProductCard from '../component/ProductCard'

const Home = () => {
  return (
    // Main container me md: breakpoint hi laga diya taaki tablet se hi display sahi ho jaye
    <div className='relative bgimage bg-cover bg-center w-full h-60 md:h-[70vh] lg:h-screen'>
      <div className="absolute inset-0 bg-black/40"></div>
      
      <div className='relative z-10 flex flex-col px-6 py-10 md:py-0 md:justify-center text-amber-50 font-bold w-full h-60 md:h-[70vh] lg:h-screen'>
        <h1 className="text-3xl md:text-6xl lg:text-8xl font-extrabold animate-pulse">
          welcome on
        </h1>
        <h2 className="text-4xl md:text-7xl lg:text-9xl font-extrabold animate-pulse">
          Aurixa
        </h2>
      </div>
      
      <div className='relative z-10 bg-white dark:bg-zinc-950'>
        <ProductCard/>
      </div>
    </div>
  )
}

export default Home