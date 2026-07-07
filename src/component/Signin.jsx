import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Signintype } from '../Contex/Signincontext'
import { ProductContext } from '../Contex/ProductContex'
import emailjs from '@emailjs/browser'

const Signin = () => {

  const navigate = useNavigate()

  const { setCurrentUser, currentUser } = useContext(ProductContext)
  const [generatedOTP, setGeneratedOTP] = useState('');
  const [userOTP, setUserOTP] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const {
    name, setname,
    Mobile, setMobile,
    Gmail, setGmail,
    DOB, setDOB,
    Password, setPassword,
    confirmpassword, setconfirmpassword,
    address, setAddress,
    isRead, setIsRead
  } = useContext(Signintype)

  const [Data, setData] = useState(() => {
    const savedData = localStorage.getItem('Data')
    return savedData ? JSON.parse(savedData) : []
  })

  // Yaha pe usestate ki chije khatm ho gayi hai and function wali chije chalu ho gayi hai

  useEffect(() => {
    localStorage.setItem('Data', JSON.stringify(Data))
  }, [Data])

// ye hamara handling function start hota hai jo ki sara 
// data complete hone ke baad last me form me chalta  hai 
  const handling = (e) => {
    e.preventDefault()

    if (userOTP !== generatedOTP) {
      alert('OTP is wrong , pls write the correct OTP')
      return
    }

    const role = Gmail === "vsjsmart@gmail.com" ? "Admin" : "user"
    const copyData = [...Data]
    copyData.push({ name, Mobile, Gmail, address, DOB, Password, Role: role })
    setData(copyData)
    console.log(copyData);

    const ValueData = {
      name: name,
      Gmail: Gmail,
      Role: role,
      Mobile: Mobile,
      DOB: DOB,
      Password: Password,
      Address: address
    }
    const value = localStorage.setItem('currentUser', JSON.stringify(ValueData))
    setCurrentUser(ValueData)

    alert('OTP verification successfully complete your account created ')

    const allNotification = JSON.parse(localStorage.getItem('AdminNotification')) || []
    const UserNotification = {
      id: Date.now(),
      type: 'user_signin',
      title: 'naya user register hua hai',
      message: `${name} ${Gmail} ne account banaya hai`,
      time: new Date().toLocaleTimeString(),
      date: new Date().toLocaleDateString(),
      isRead:false
    }
    allNotification.unshift(UserNotification)
    localStorage.setItem('AdminNotification', JSON.stringify(allNotification))
    setIsRead(false)
    
    navigate('/Profile')
  }
  // yaha pe handling function khatm ho jata hai
  // aur ye main OTP function start hota hai jo ki 
  // hamare gmail pe otp bhejega
  

  const sendOTP = async (e) => {
    e.preventDefault()

    if (!Gmail || !name) {
      alert('please enter name and gmail')
      return
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOTP(otp)

    const formData = {
      access_key:"230f3fc3-8917-4882-a346-d592ff5762c4",
      from_name: "Aurixa Store",
      to_email:Gmail,
      subject:"your verification code for Aurixa",
      message:`Hello ${name} , \n\nYour verification code is: ${otp} \n\nvalid for 15 minutes.`
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Accept:"application/json"
        },
        body:JSON.stringify(formData),
      })

      const result = await response.json();

      if(result.success) {
        alert("your 4 digit otp sent on your gmail")
        setIsOtpSent(true)
      } else {
        alert('something went wrong with web3forms')
      }

    }
    catch (error) {
      console.log("Status:", error.status);
      console.log("Text:", error.text);
      console.log("Full Error:", error);

      alert(error.text);
    }
  }

  // yaha pe otp function bhi khatm ho jata hai

  const inputStyle =
    "w-full px-4 py-2 rounded-md bg-white text-black text-base outline-none border border-transparent focus:border-amber-400 transition";

  const buttonStyle =
    "w-full bg-white text-[#690517] font-bold py-2 rounded-md mt-2 shadow-md hover:bg-gray-100 active:scale-95 transition";

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-xl bg-[#690517] p-6 sm:p-8 shadow-2xl">

        <h2 className="mb-6 text-center text-3xl font-bold text-white">
          Sign In
        </h2>

        {!isOtpSent ? (
          <form className="flex flex-col gap-4" onSubmit={sendOTP}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} className={inputStyle} />
            <input type="tel" placeholder="Mobile No." value={Mobile} maxLength="10" onChange={(e) => setMobile(e.target.value)} className={inputStyle} />
            <input type="email" placeholder="Gmail ID" value={Gmail} onChange={(e) => setGmail(e.target.value)} className={inputStyle} />
            <input type="date" value={DOB} onChange={(e) => setDOB(e.target.value)} className={inputStyle} />
            <input type="password" placeholder="Password" minLength="8" value={Password} onChange={(e) => setPassword(e.target.value)} className={inputStyle} />
            <input type="password" placeholder="Confirm Password" minLength="8" onChange={(e) => setconfirmpassword(e.target.value)} className={inputStyle} />
            <input type="text" value={address} placeholder="Address" onChange={(e) => setAddress(e.target.value)} className={inputStyle} />

            <button className={buttonStyle}>
              Sent OTP to Email
            </button>
          </form>
        ) : (
          <form onSubmit={handling}>
            <p className='text-white p-3 flex justify-center font-bold text-xl'> Plese Enter 4-digit code sent to your {Gmail}</p>

            <input
              type="text"
              maxLength="4"
              className={inputStyle}
              placeholder='Enter 4-Digit OTP'
              value={userOTP}
              onChange={(e) => { setUserOTP(e.target.value) }} />

            <button className={buttonStyle}>
              Verify and create account
            </button>

            <button
              className={buttonStyle}
              onClick={() => { setIsOtpSent(false) }}>
              back to details
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

export default Signin