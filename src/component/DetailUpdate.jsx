import React, { useContext, useState } from 'react'
import { Signintype } from '../Contex/Signincontext'
import { SquarePen, X } from 'lucide-react';

const DetailUpdate = () => {
  const {
    name, setname,
    Mobile, setMobile,
    Gmail, setGmail,
    DOB, setDOB,
    Password, setPassword,
    confirmpassword, setconfirmpassword,
    address, setAddress
  } = useContext(Signintype)

  const [Alluser, setAlluser] = useState(() => {
    const savee = localStorage.getItem('currentUser')
    return savee ? JSON.parse(savee) : {}
  })

  const [isOpen, setisOpen] = useState(false)
  const [newValue, setNewValue] = useState('')

  const [editfield, seteEditfield] = useState('')

  const openModel =(fieldName)=>{
    seteEditfield(fieldName)
    setNewValue('')
    setisOpen(true)
  }

  const handleUpdate = () => {
    if (newValue === '') {
      alert('kripya naya name dale')
      return
    }

    const updateUser = { ...Alluser, [editfield]: newValue }
    setAlluser(updateUser)

    localStorage.setItem('currentUser', JSON.stringify(updateUser))

    const mainData = JSON.parse(localStorage.getItem('Data'))

    const updatemainData = mainData.map((user)=>{
      if(user.Gmail === Alluser.Gmail){
        return {...user , [editfield]:newValue}
      } return user
    })

    localStorage.setItem('Data', JSON.stringify(updatemainData))

    if(editfield === 'name'){setname(newValue)}
    if(editfield === 'Gmail'){setGmail(newValue)}
    if(editfield === 'DOB'){setDOB(newValue)}
    if(editfield === 'Mobile'){setMobile(newValue)}
    if(editfield === 'Password'){setPassword(newValue)}
    if(editfield === 'Address'){setAddress(newValue)}

    setname(newValue)
    setNewValue('')

    setisOpen(false)
  }

  return (
    <div>
      <div className='Dataready flex flex-col gap-5 p-5'>
        <div>
          <h1><b>name</b> : {Alluser.name}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('name')
            }} /></h2>
        </div>
        <div>
          <h1><b>Gmail</b> : {Alluser.Gmail}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('Gmail')
            }}
          /></h2>
        </div>
        <div>
          <h1><b>Mobile</b> : {Alluser.Mobile}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('Mobile')
            }} /></h2>
        </div>
        <div>
          <h1><b>DOB</b> : {Alluser.DOB}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('DOB')
            }} /></h2>
        </div>
        <div>
          <h1><b>password</b> : {Alluser.Password}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('Password')
            }} /></h2>
        </div>
        <div>
          <h1><b>Address</b> : {Alluser.Address}</h1>
          <h2><SquarePen
            size={50}
            onClick={() => {
              openModel('Address')
            }} /></h2>
        </div>
      </div>
      {isOpen && (
        <div className={`fixed inset-0 flex items-center justify-center  bg-black/60 `}>
          <div className='bg-[#690517] min-w-1/3 min-h-1/3 p-8 rounded text-white flex flex-col gap-4'>

            <div>
              <span>Old {editfield} :</span> <b>{Alluser[editfield]}</b>
            </div>

            <input
              className='py-3 px-2 border-2'
              type={editfield === 'Gmail' ? 'email' : editfield === 'Password' ? 'password' : editfield === 'DOB'? 'date' : editfield === 'Mobile'? 'tel' : 'text'}
              placeholder={`new ${editfield}`}
              value={newValue}
              onChange={(e) => { setNewValue(e.target.value) }}
            />
            <button
              onClick={handleUpdate}
              className='bg-white text-black p-4 rounded'
            >Update {editfield}</button>
            <button
              onClick={() => { setisOpen(false) }}
              className='bg-white text-black p-4 rounded'
            >Close box</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailUpdate