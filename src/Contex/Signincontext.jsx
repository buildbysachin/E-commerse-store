import React, { createContext, useState } from 'react'

export const Signintype = createContext()

const Signincontext = ({ children }) => {
    const [name, setname] = useState('')
    const [Mobile, setMobile] = useState('')
    const [Gmail, setGmail] = useState('')
    const [DOB, setDOB] = useState('')
    const [Password, setPassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [address, setAddress] = useState('')
    return (
        <Signintype.Provider value={{
            name, setname,
            Mobile, setMobile,
            Gmail, setGmail,
            DOB, setDOB,
            Password, setPassword,
            confirmpassword, setconfirmpassword,
            address, setAddress
        }}>
            {children}
        </Signintype.Provider >
    )
}

export default Signincontext