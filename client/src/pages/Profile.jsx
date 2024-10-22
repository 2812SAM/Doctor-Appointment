import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets'

function Profile() {
  const [userData,setUserData] = useState({
    name : 'Edward Vincent',
    image: assets.profile_pic,
    email: 'edward@gmail.com',
    phone: '+91 9999999999',
    address: {
      line1: '57th Cross, Richmond ',
      line2: 'Circle, Church Road, London'
    },
    gender: 'Male',
    DOB: '2000-01-20'
  })

  const [isEdit,setIsEdit] = useState(false);

  const handleEdit = () => {
    if(isEdit) setIsEdit(false)
    else  setIsEdit(true)
  }

  return (
    <div className='max-w-lg flex flex-col gap-2'>
      <img 
        className='max-w-[150px] rounded-lg'
        src={userData.image} 
        alt="" 
      />

      {
        isEdit ? 
        <input 
          className='bg-gray-100 text-3xl font-medium max-w-60 mt-4 rounded-lg '
          type="text"
          name='name'
          onChange={(e) => setUserData(prev => ({...prev,name:e.target.value}))}
          value={userData.name} 
        />:
        <p className='text-[30px] mt-4 '>
          {userData.name}
        </p>
      }

      <hr className='h-[2px] bg-gray-400'/>

      <p className='text-gray-400 underline mt-4'>Contact Information</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-300'>
        <p>Email id:</p>
        <p className='text-blue-500'>{userData.email}</p>

        <p className='font-medium'>Phone:</p>
        {
          isEdit
            ? <input 
                className='bg-gray-100 max-w-52 rounded-lg '
                type="phone"
                name='phone'
                onChange={(e) => setUserData(prev => ({...prev,phone:e.target.value}))}
                value={userData.phone} 
              />
            : <p className='text-blue-400'>{userData.phone}</p>
        }

        <p className='font-medium'>Address : </p>
        {
          isEdit
            ? <p>
              <input 
                className='bg-gray-100 max-w-60 rounded-lg '
                type="text" 
                name=""
                onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line1: e.target.value}}))}
                value={userData.address.line1}
                />
              <br />
              <input 
                className='bg-gray-100 max-w-60 rounded-lg mt-2 '
                type="text" 
                name="" 
                onChange={e => setUserData(prev => ({...prev,address:{...prev.address,line2: e.target.value}}))}
                value={userData.address.line2}
               />
            </p>
            : <p className='text-gray-500'>
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
        }
      </div>

      <p className='text-gray-400 underline mt-4'>Basic Information</p>
      <div className='grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-natural-300'>
        <p className='font-medium'>Gender : </p>
        {
          isEdit ? 
            <select className='max-w-20 bg-gray-100 rounded-lg' onChange={(e) => setUserData(prev => ({...prev,gender:e.target.value}))} value={userData.gender}>
              <option className='text-gray-500'  value="Male">Male</option>
              <option className='text-gray-500'  value="Female">Female</option>
            </select>
          :<p className='text-gray-500'>
            {userData.gender}
          </p>
        }

        <p className='font-medium'>BirthDay :</p>
        {
          isEdit ? <input className='max-w-40 bg-gray-100 rounded-lg' type="date" onChange={(e) => setUserData(prev => ({...prev,DOB:e.target.value}))} value={userData.DOB}/>
          : <p className='text-gray-500'>{userData.DOB}</p>
        }
      </div>

      <div className='flex gap-4 mt-4 text-gray-400'>
        {
          isEdit 
          ?  <button 
              onClick={handleEdit}
              className='py-2 px-6 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white'
            >
              Save Information
            </button>
          : <button 
              onClick={handleEdit}
              className='py-2 px-8 border border-blue-600 rounded-full hover:bg-blue-600 hover:text-white'
            >
              Edit
            </button>
        }
      </div>
    </div>
  )
}

export default Profile