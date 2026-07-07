import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductFulldetail = () => {

    const navigate = useNavigate()
    const { clickedProduct, setClickedProduct, currentUser, wishlistProduct, setWishlistProduct, cartProduct, setCartProduct } = useContext(ProductContext)
    const [feedback, setFeedback] = useState('')
    const [oldFeedback, setOldFeedback] = useState(()=>{
        return JSON.parse(localStorage.getItem('Feedback')) || []
    })

    const isAlreadyInWishlist = wishlistProduct ? wishlistProduct.some(item => item.Title === clickedProduct.Title) : false;
    const handlewishlisttoggle = () => {

        if (!currentUser || !currentUser.Gmail) {
            alert('login/sign in first')
            navigate('/Profile')
        }


        else {
            if (isAlreadyInWishlist) {
                const updatewishlist = wishlistProduct.filter(item => item.Title != clickedProduct.Title)
                setWishlistProduct(updatewishlist)
            } else {
                setWishlistProduct([...wishlistProduct, clickedProduct])
            }
        }
    }

    const isAlreadyInCart = cartProduct ? cartProduct.some(item => item.Title === clickedProduct.Title) : false;
    const Carttoggle = () => {

        if (!currentUser || !currentUser.Gmail) {
            alert('login/sign in first')
            navigate('/Profile')
        }

        else {
            if (isAlreadyInCart) {
                alert("this product is already in cart")
            } else {
                setCartProduct([...cartProduct, clickedProduct])
            }
        }
    }

    const handledBuyclick = () => {
        if (!currentUser || !currentUser.Gmail) {
            alert('pls login First')
            navigate('/Profile')
            return;
        } else if (currentUser && (currentUser.Address === '' || !currentUser.Address)) {
            alert('pls put your address , this is most important')
            navigate('/Profile/DetailUpdate')
            return
        }

        navigate('/Productfulldetail/Chackout', {
            state: {
                productData: clickedProduct
            }
        });
    }

    const feedbackhandler = (e) => {
        e.preventDefault();

        if (!feedback.trim()) {
            alert('pls enter some feedback first')
            return
        }

        const existingdata = localStorage.getItem('Feedback') || '[]'

        const parsedfeedback = JSON.parse(existingdata) || []

        const newfeedback = {
            product: clickedProduct.Title,
            text: feedback,
            date: new Date().toLocaleDateString(),
            user: currentUser?.name || 'Anonymous'
        }
        parsedfeedback.push(newfeedback)

        setOldFeedback(parsedfeedback)
        localStorage.setItem('Feedback', JSON.stringify(parsedfeedback))

        setFeedback('')
    }


    return (
        <div className='p-3'>
            <div className='flex lg:flex-row flex-col justify-between border'>
                <div className=' flex justify-center p-3'>
                    <img
                        className='w-90 md:min-w-150 border'
                        src={clickedProduct.image}
                        alt="" />
                </div>
                <div className='flex bg-[#570000] text-white flex-col gap-2'>
                    <h1 className=' p-5 text-xl md:text-3xl font-bold'>{clickedProduct.Title}</h1>
                    <table className='text-3xl border'>
                        <tbody>
                            <tr>
                                <th>Brand</th>
                                <td>: {clickedProduct.Brand}</td>
                            </tr>
                            <tr>
                                <th>FitType :</th>
                                <td>: {clickedProduct.FitType}</td>
                            </tr>
                            <tr>
                                <th>Itemweight :</th>
                                <td>: {clickedProduct.Itemweight}</td>
                            </tr>
                            <tr>
                                <th>Material :</th>
                                <td>: {clickedProduct.Material}</td>
                            </tr>
                            <tr>
                                <th>color :</th>
                                <td>: {clickedProduct.color}</td>
                            </tr>
                            <tr>
                                <th>Price :</th>
                                <td>: {clickedProduct.Price}</td>
                            </tr>
                        </tbody>
                    </table>
                    <p className=' p-3 font-bold text-xl md:text-xl'>{clickedProduct.Description}</p>
                    <div className='flex gap-2 justify-evenly items-center btn mt-5 mb-2 md:text-5xl'>
                        <button className='bg-white text-[#570000]' onClick={handledBuyclick}>Buy</button>
                        <button className='bg-white text-[#570000]' onClick={Carttoggle}>Cart</button>
                        <button className='bg-white text-[#570000]' onClick={handlewishlisttoggle}>{isAlreadyInWishlist ? <Heart fill='red' /> : <Heart color='red' />}</button>
                    </div>
                    <p className='text-2xl text-center border'>7 Days Return Policy</p>

                </div>
            </div>
            <div className='bg-[#570000] mt-2 p-2'>
                <div className='flex w-fit py-3 px-6 border items-end text-white'>
                    <div className='text-white  md:text-6xl text-xl'>
                    <h1>50+</h1>
                    <h1>100+</h1>
                    <h1>300+</h1>
                    <h1>70+</h1>
                    <h1>10+</h1>
                </div>
                <div className='flex flex-col gap-1 items-end'>
                    <span className='flex'>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                </span>
                <span className='flex'>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                </span>
                <span className='flex'>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                </span>
                <span className='flex'>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                </span>
                <span className='flex'>
                    <Star color='yellow' className='md:size-14' fill='yellow'/>
                </span>
                </div>
                </div>
            </div>
            <div className='px-3 py-6'>
                <form onSubmit={feedbackhandler}>
                    <label htmlFor="Feedback" className='md:text-4xl text-2xl'>comment your feedback</label>
                    <textarea
                        className='bg-gray-600 text-white cursor-pointer flex p-4 text-2xl rounded w-full'
                        value={feedback}
                        onChange={(e) => {
                            setFeedback(e.target.value)
                        }}
                    ></textarea>
                    <button
                        className='bg-[#570000] text-3xl text-white p-2 rounded mt-3'
                    >submit</button>
                </form>
            </div>
            <div className='flex flex-wrap gap-2'>
                {oldFeedback.map((elem, idx) => {
                    return (
                        (
                            elem.product === clickedProduct.Title && (
                                <div key={idx} className='text-[#570000] border w-fit px-2 flex flex-col gap-5'>
                                    <p>{elem.user}</p>
                                    <h1 className='text-2xl'>{elem.text}</h1>
                                </div>
                            )
                        )
                        
                    )
                })}
            </div>
        </div>
    )
}

export default ProductFulldetail