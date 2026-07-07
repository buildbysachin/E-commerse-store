import React, { useContext } from 'react'
import { ProductContext } from '../Contex/ProductContex'
import { data, useNavigate } from 'react-router-dom'

const Chackout = () => {
    const navigate = useNavigate()
    const { clickedProduct, setClickedProduct, currentUser } = useContext(ProductContext)

    const handlePayment =()=>{
        const numericPrice = Number(clickedProduct.Price.replace(/[^0-9]/g, ''))
        const AmountInPaisa = numericPrice * 100

        const options = {
            key:"rzp_test_TA26rWDIos0QMD",
            amount:AmountInPaisa,
            currency:"INR",
            name:"Aurixa Store",
            description: `buying ${clickedProduct.Title}`,
            image: "src/assets/Aurixa.png",
            handler:function(response){
                alert(`Payment Successful! ID: ${response.razorpay_payment_id}`);
                const existingOrders = JSON.parse(localStorage.getItem(`Orders_${currentUser.Gmail}`)) ||[]

                const newOrder = {
                    orderId: response.razorpay_payment_id,
                    Buyingproduct: clickedProduct,
                    date: new Date().toLocaleDateString(),
                    status: "Success"
                };


                existingOrders.push(newOrder)
                localStorage.setItem(`Orders_${currentUser.Gmail}`, JSON.stringify(existingOrders))

                const allNotification = JSON.parse(localStorage.getItem('AdminNotification')) || []
                const OrderNotification = {
                    id: Date.now(),
                    type:'Order',
                    title:'naya Order aaya hai',
                    message:`new order aaya hai ${currentUser.name} ne ${clickedProduct.Title} mangaya hai`,
                    time:new Date().toLocaleTimeString(),
                    date:new Date().toLocaleDateString(),
                    isRead: false
                }
                allNotification.unshift(OrderNotification)
                localStorage.setItem('AdminNotification', JSON.stringify(allNotification))

                navigate('/Order')

            },
            prefill:{
                name:currentUser.name,
                email:currentUser.Gmail,
                contact:currentUser.Mobile
            },
            theme:{
                color: "#690517"
            },
            modal: {
                ondissmiss :function(){
                    alert('payment cancel by user')
                }
            }
        }
        const rzp = new window.Razorpay(options)
        rzp.open()
    }

    const buttonStyle =
    "w-full bg-[#ffffff] text-[#570000] font-bold py-2 px-3 rounded-md mt-2 shadow-md hover:bg-gray-500 active:scale-95 transition";
    return (
        <div className='flex justify-center h-[85vh] items-center'>
            <div className='bg-[#570000] text-white flex flex-col w-[85vh] justify-evenly h-[80vh] p-5 rounded'>
                <h1 className='font-extrabold text-center text-[7vh]'>Confirm Details</h1>
                <h1 className='text-[5vh] font-bold'>{currentUser.name}</h1>
                <p className='max-w-[30ch] text-[3vh]'>{currentUser.Address}</p>
                <div className='flex items-center gap-2 border-2 p-1'>
                    <img src={clickedProduct.image} className='w-[15vh] border-2' alt="" />
                    <p className='md:text-[4vh] text-[3vh]'>{clickedProduct.Title}</p>
                </div>
                <h2 className='border-2 w-fit px-2 rounded text-[5vh]'>{clickedProduct.Price}</h2>
                <button onClick={handlePayment} className={buttonStyle}>Rojgar pay online payment</button>
            </div>
        </div>
    )
}

export default Chackout