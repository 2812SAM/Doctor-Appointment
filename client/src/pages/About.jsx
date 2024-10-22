import React from 'react'
import {assets} from '../assets/assets_frontend/assets'

function About() {
  return (
      <div>
        <p className='text-center text-[20px] text-gray-600'>ABOUT <span className='font-semibold'>US</span></p>

        <div className='mt-8 flex gap-8 sm:flex-row flex-col'>
          <img 
            className='w-full sm:max-w-[250px] object-cover h-auto'
            src={assets.about_image} 
            alt="" 
          />

          <div className='text-[12px] text-gray-600 flex flex-col gap-4'>
            <p>
            Welcome to Prescripto, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
            </p>
            <p>
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, Prescripto is here to support you every step of the way.
            </p>
            <p className='font-semibold text-black'>
             Our Vision
            </p>
            <p>
            Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
            </p>
          </div>
        </div>

        <p className='text-[14px] mt-16'>WHY <span className='font-semibold text-black'>CHOOSE US</span></p>

        <div className='mt-8 flex sm:flex-row flex-col'>
          <div className='border w-full sm:w-1/3 p-8 hover:bg-primary hover:text-white'>
            <p className='text-[10px] font-semibold'>EFFICIENCY:</p>

            <p className=' text-[10px] mt-6'>
              Streamlined appointment scheduling that fits into your busy lifestyle.
            </p>
          </div>

          <div className='border w-full sm:w-1/3 p-8 hover:bg-primary hover:text-white'>
            <p className='text-[10px] font-semibold'>CONVINIENCE:</p>

            <p className=' text-[10px] mt-6'>
              Access to a network of trusted healthcare professionals in your area.
            </p>
          </div>

          <div className='border w-full sm:w-1/3 p-8 hover:bg-primary hover:text-white'>
            <p className='text-[10px] font-semibold'>PERSONALIZATION:</p>

            <p className=' text-[10px] mt-6'>
              Tailored recommendations and reminders to help you stay on top of your health.
            </p>
          </div>
        </div>
      </div>
  )
}

export default About