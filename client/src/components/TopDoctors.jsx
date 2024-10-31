import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

function TopDoctors() {
  const navigate = useNavigate();
  const {doctors} = useContext(AppContext);

  return (
    <div className='flex flex-col justify-center items-center pt-16'>
        <h1 className='text-xl md:text-2xl lg:text-3xl font-semibold'>Top Doctors to Book</h1>
        <p className='text-gray-800 text-[12px] mt-2'>Simply browse through our extensive list of trusted doctors.</p>

        <div className='flex flex-wrap items-center justify-center gap-6 pt-8'>
            {
                doctors.slice(0,10).map((item,index) => (
                    <div onClick={() => {navigate(`/appointment/${item._id}`);scrollTo(0,0)}} className='sm:w-[230px] rounded-lg border border-[#C9D8FF] cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                        <img src={item.image} alt="" className='bg-[#C9D8FF] w-full object-cover rounded-lg'/>
                        <div className='p-4'>
                            <div className='flex gap-2 items-center'>
                                <div className={`w-[5px] h-[5px] ${item.available ? 'bg-green-500' : 'bg-red-500'} rounded-full`}></div>
                                <p className={`text-[10px] ${item.available ? 'text-green-500' : 'text-red-500'} `}>{item.available ? 'Available' : 'Not Available'}</p>
                            </div>
                            
                            <p className='font-semibold'>{item.name}</p>
                            <p className='text-[10px] text-gray-800'>{item.speciality}</p>
                        </div>
                    </div>
                ))
            }
        </div>

        <div onClick={() => {navigate('/doctors');scrollTo(0,0)}} className='mt-12 bg-[#C9D8FF] py-2 px-12 rounded-full text-sm cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
            more
        </div>
    </div>
  )
}

export default TopDoctors