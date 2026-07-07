import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ProductContext } from '../Contex/ProductContex'

const Login = () => {
    const { setCurrentUser } = useContext(ProductContext)

    const [Loginuser, setLoginuser] = useState(() => {
        const logData = localStorage.getItem('Data')
        return logData ? JSON.parse(logData) : []
    })

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        const foundUser = Loginuser.find(user => user.Gmail === email && user.Password === password)

        if (foundUser) {
            localStorage.setItem('currentUser', JSON.stringify(foundUser))
            setCurrentUser(foundUser)
            navigate('/Profile', { replace: true })
        } else {
            alert('pls put right email and password')
        }
    }

    const inputStyle =
        "border-2 rounded py-2 px-2 "

    return (
        <div >
            <form
                className='h-screen logined flex text-xl flex-col justify-center items-center gap-3'
                onSubmit={handleLogin}>
                <div className='flex flex-col gap-3 bg-[#570000] text-white p-9 rounded'>
                    <input
                        className={inputStyle}
                        type="text"
                        placeholder='email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <input
                        className={inputStyle}
                        type="password"
                        placeholder='password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <button
                        className='bg-[#ffffff] active:scale-98 text-[#780000] font-bold px-3 py-1 rounded'
                    >Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login