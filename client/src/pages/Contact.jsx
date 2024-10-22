import React from 'react'
import {assets} from '../assets/assets_frontend/assets'

function Contact() {
  return (
    <div>
      <p className='text-center text-[20px] text-gray-600'>CONTACT <span className='font-semibold'>US</span></p>
      
      <div className='flex flex-col gap-6 mt-8 sm:flex-row justify-center items-center'>
        <img 
          className='w-full max-w-[300px] sm:max-w-[300px] object-cover h-auto'
          src={assets.contact_image} 
          alt="" 
        />

        <div> 
          <p className='text-gray-600 text-[16px] font-semibold'>
            OUR OFFICE
          </p>

          <p className='text-[10px] text-gray-600 mt-4'>
            54709 Willms Station <br/> Suite 350, Washington, USA
          </p>
          <p className='text-[10px] text-gray-600 mt-4'>
          Tel: (415) 555‑0132 <br/> Email: greatstackdev@gmail.com
          </p>

          <p className='text-gray-600 text-[16px] font-semibold mt-4'>
            CAREERS AT PRESCRIPTO
          </p>

          <p className='text-[10px] text-gray-600 mt-4'>
            Learn more about our teams and job openings.
          </p>

          <button className='border border-gray-600 mt-4 py-2 px-4 text-[10px] hover:bg-black hover:text-white'>
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  )
}

export default Contact