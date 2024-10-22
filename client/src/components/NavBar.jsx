import React, { useState } from 'react'
import {assets} from '../assets/assets_frontend/assets.js'
import {NavLink, useNavigate} from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false)
  const [token, setToken] = useState(true);

  return (
    <div className='flex justify-between py-4 mb-5 border-b items-center text-sm'>
      <img onClick={() => navigate('/')} src={assets.logo} alt="" className='w-44 cursor-pointer'/>

        <ul className='hidden md:flex items-start gap-5 cursor-pointer font-medium'>
          <NavLink to='/'>
            <li className='py-1 '>HOME</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
          <NavLink to='/doctors'>
            <li className='py-1 '>ALL DOCTORS</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
          <NavLink to='/about'>
            <li className='py-1 '>ABOUT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
          <NavLink to='/contact'>
            <li className='py-1 '>CONTACT</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden'/>
          </NavLink>
        </ul>
  
        <div className='flex item-center gap-4'>
          {
            token 
            ? <div className='flex item-center gap-2 cursor-pointer group relative'>
                <img src={assets.profile_pic} alt="" className='w-8 rounded-full'/>
                <img src={assets.dropdown_icon} alt="" className='w-2.5'/>
                <div className='absolute top-0 right-0 pt-14 font-medium text-gray-600 z-20 hidden group-hover:block'>
                  <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                    <p onClick={() => setToken(false)} className='hover:text-black cursor-pointer'>Logout</p>
                  </div>
                </div>
              </div>
            : <button 
                onClick={() => navigate('/login')}
                className='bg-primary px-8 py-3 text-white rounded-full hover:bg-[#4B59D9] font-light hidden md:block'
              >
                Create account
              </button>
          }
          </div>
    </div>
  )
}

export default NavBar