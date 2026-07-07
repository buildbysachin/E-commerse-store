import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import { children } from 'react'

export const ProductContext = createContext()

const ProductContex = ({ children }) => {
    const [selectimage, setselectimage] = useState(() => {
        const savedProduct = localStorage.getItem('Products')
        return savedProduct ? JSON.parse(savedProduct) : []
    })
    const [clickedProduct, setClickedProduct] = useState(() => {
        const savedClk = localStorage.getItem('clickedData')
        return savedClk ? JSON.parse(savedClk) : []

    })

    const [currentUser, setCurrentUser] = useState(()=>{
        const saveduser = localStorage.getItem('currentUser')
        return saveduser ? JSON.parse(saveduser): null
    })

    const [cartProduct, setCartProduct] = useState([])
    const [wishlistProduct, setWishlistProduct] = useState([])

    const [categoryWise, setCategoryWise] = useState(()=>{
        const saved = localStorage.getItem('selectedCategory')
        return saved ? JSON.parse(saved) : "All";
    })

    const [isRead, setIsRead] = useState(true)

    useEffect(() => {
        localStorage.setItem('Products', JSON.stringify(selectimage))
    }, [selectimage])

    useEffect(() => {
        localStorage.setItem('clickedData', JSON.stringify(clickedProduct))
    }, [clickedProduct])

    useEffect(()=>{
        localStorage.setItem('selectedCategory', JSON.stringify(categoryWise))
    }, [categoryWise])

    useEffect(() => {
        if (currentUser && currentUser.Gmail) {
            const savedCart = localStorage.getItem(`CartItem_${currentUser.Gmail}`)
            setCartProduct(savedCart ? JSON.parse(savedCart) : [])

            const savedWish = localStorage.getItem(`Wishlist_${currentUser.Gmail}`)
            setWishlistProduct(savedWish ? JSON.parse(savedWish) : [])
        } else {
            setCartProduct([])
            setWishlistProduct([])
        }
    }, [currentUser])

    // Jab Cart badle, toh user ke email ke naam par save karo
    useEffect(() => {
        if (currentUser && currentUser.Gmail) {
            localStorage.setItem(`CartItem_${currentUser.Gmail}`, JSON.stringify(cartProduct))
        }
    }, [cartProduct, currentUser])

    // Jab Wishlist badle, toh user ke email ke naam par save karo
    useEffect(() => {
        if (currentUser && currentUser.Gmail) {
            localStorage.setItem(`Wishlist_${currentUser.Gmail}`, JSON.stringify(wishlistProduct))
        }
    }, [wishlistProduct, currentUser])

    return (
        <ProductContext.Provider
            value={{
                selectimage, setselectimage,
                clickedProduct, setClickedProduct,
                cartProduct, setCartProduct,
                wishlistProduct, setWishlistProduct,
                categoryWise, setCategoryWise,
                currentUser, setCurrentUser,
                isRead, setIsRead
            }}>
            {children}
        </ProductContext.Provider>
    )
}

export default ProductContex