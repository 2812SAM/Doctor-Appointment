import React, { useContext } from 'react'
import {AppContext} from '../context/AppContext'

function MyAppointments() {
  const {doctors} = useContext(AppContext);

  return (
    <div className='mt-16 pb-20'>
      <p className='text-gray-600 font-medium'>My appoitments</p>
      <hr className='bg-gray-300 h-[2px] mt-2'/>

      <div>
        {
          doctors.slice(0,2).map((item,index) => (
            <>
              <div key={index} className='flex mt-4 gap-3 w-full flex-col sm:flex-row items-center'>
                <img 
                  className='w-[300px] sm:w-[150px] object-cover h-auto bg-[#C9D8FF]'
                  src={item.image} 
                />

                <div className='w-full flex flex-row justify-between gap-2'>
                  <div>
                    <p className='font-medium'>{item.name}</p>
                    <p className='text-[12px] text-gray-500'>{item.speciality}</p>

                    <p className='mt-4 font-medium text-gray-700 text-[14px] pb-1'>Address:</p>
                    <p className='text-[12px] text-gray-500'>{item.address.line1}</p>
                    <p className='text-[12px] text-gray-500'>{item.address.line2}</p>

                    <div className='flex w-full mt-4 items-center gap-2'>
                      <p className='font-medium text-gray-700 text-[14px]'>Date & Time:</p>
                      <p className='text-[12px] text-gray-500'>25,July,2024 | 8:30 PM</p>
                    </div>
                  </div>

                  <div className='flex flex-col gap-3 justify-end text-[14px] text-gray-600'>
                    <button className='px-4 py-2 md:px-6 border hover:text-white hover:bg-primary'>Pay Online</button>
                    <button className='px-4 py-2 md:px-6 border hover:bg-red-600 hover:text-white'>Cancel appointment</button>
                  </div>
                </div>
              </div>
            <hr className='bg-gray-300 h-[2px] mt-2'/>
          </>
          ))
        }
      </div>
    </div>
  )
}

export default MyAppointments