import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets.js'
import {Link} from 'react-router-dom'

function SpecialityMenu() {
  return (
    <div id='speciality' className='mt-16 flex flex-col items-center'>
        <p className='text-xl md:text-2xl lg:text-3xl font-semibold'>Find by Speciality</p>

        <div className='flex flex-col items-center mt-6'>
            <p className='text-center'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free. </p>
        </div>
        
        <div className='pt-16 flex flex-wrap gap-8 justify-center '>
            {specialityData.map((obj) => (
                <Link 
                    onClick={() => scrollTo(0,0)}
                    to={`/doctors/${obj.speciality}`} className='flex flex-col items-center justify-between gap-4 text-gray-800 cursor-pointer text-[12px] hover:translate-y-[-10px] transition-all duration-500'>
                    <img src={obj.image} alt="" className='w-20 h-20'/>
                    <p>{obj.speciality}</p>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SpecialityMenu