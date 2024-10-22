import React from 'react'
import { assets } from '../assets/assets_frontend/assets'
import { Link, useNavigate } from 'react-router-dom'

function Footer() {
  const navigate = useNavigate();

  return (
    <div>
        <div className='flex  mb-10 mt-10 gap-6 flex-wrap lg:flex-nowrap justify-center lg:justify-between'>
            <div className='w-1/2'>
                <img src={assets.logo} alt="" className='w-[150px]'/>
                <p className='mt-12'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil, dicta facilis eos quae obcaecati facere sapiente, ipsum ducimus culpa rerum voluptas ipsam labore laudantium inventore recusandae tempora officia magnam ad modi itaque? Alias cum, ex ipsam magnam excepturi repellat fugiat dolores explicabo tenetur incidunt eos, minus at possimus perferendis nostrum.
                </p>
            </div>

            <div className='w-1/4 flex flex-col items-center'>
                <p className='text-xl text-gray-700 font-semibold'>COMPANY</p>
                <div className='mt-12'>
                    <ul className='flex flex-col gap-2 text-gray-600'>
                        <li 
                            className='hover:underline cursor-pointer'
                            onClick={() => {navigate('/');scrollTo(0,0)}}
                        >
                            Home
                        </li>

                        <li 
                            className='hover:underline cursor-pointer'
                            onClick={() => {navigate('/about');scrollTo(0,0)}}
                        >
                            About us
                        </li>

                        <li 
                            className='hover:underline cursor-pointer'
                            onClick={() => {navigate('/contact');scrollTo(0,0)}}
                        >
                            Contact us
                        </li>

                        <li 
                            className='hover:underline cursor-pointer'
                            onClick={() => {navigate('/privacy');scrollTo(0,0)}}
                        >
                            Privacy policy
                        </li> 
                    </ul>
                </div>
            </div>

            <div className='w-1/4 flex flex-col items-center'>
                <p className='text-xl text-gray-700 font-semibold'>GET IN TOUCH</p>
                <div className='mt-12 flex flex-col gap-2 text-gray-600'>
                    <p className='cursor-pointer'>+1-212-456-7890</p>
                    <p className='cursor-pointer'>greatstackdev@gmail.com</p>
                </div>
            </div>
        </div>
        <hr className='bg-gray-300 h-1 w-full'/>
        <p className='text-center mt-8'>
            Copyright © 2024 GreatStack - All Right Reserved.
        </p>
    </div>
  )
}

export default Footer