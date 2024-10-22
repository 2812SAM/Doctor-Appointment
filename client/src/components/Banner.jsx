import React from 'react';
import { assets } from '../assets/assets_frontend/assets.js';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-14 lg:px-20 my-20 md:mx-4 text-white '>
      {/* Left Section */}
      <div className='flex flex-col gap-8 my-10 md:my-0 md:w-1/2 md:py-16 lg:py-24 lg:pl-5'>
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left'>
          Book Appointment 
        </p>
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-center md:text-left'>
          With 100+ Trusted Doctors
        </p>

        <div className="flex">
        <button 
          onClick={() => navigate('/login')} 
          className='bg-white object-scale-down  text-gray-600 px-2 py-2 rounded-full hover:scale-105 transition-all'
          >
          Create account
        </button>
        </div>
      </div>

      {/* Right Section */}
      <div className='hidden md:block w-1/2 relative'>
        <img 
          src={assets.appointment_img} 
          alt="" 
          className='w-full max-w-[400px] h-auto rounded-lg absolute right-0 bottom-0'
        />
      </div>
    </div>
  );
}

export default Banner;
