import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {AppContext} from '../context/AppContext'

function Doctors() {
  const {speciality} = useParams();
  const {doctors} = useContext(AppContext)
  const [filterDoc, setfilterDoc] = useState([]);
  const [showFilter,setShowFilter] = useState(false);
  const navigate = useNavigate();

  const applyFilter = () => {
    if(speciality){
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setfilterDoc(doctors);
    }
  }

  useEffect(() => {
    applyFilter();
  },[doctors,speciality]);

  return (
    <div>
      <p className='text-[18px] text-gray-600 mt-10'>Browse through the doctors specialist.</p>
      <div className='flex flex-col sm:flex-row gap-4 mt-4'>
        <div>
          <button className={`inline-block py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters</button>
        </div>
        
        <div className={`${showFilter ? '' : 'hidden'} sm:block`}>
          <p onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'General physician' ? 'bg-[#C9D8FF]' : ''}`}>
              General physician
          </p>

          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Gynecologist' ? 'bg-[#C9D8FF]' : ''}`}>
              Gynecologist
          </p>

          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Dermatologist' ? 'bg-[#C9D8FF]' : ''}`}>
              Dermatologist
          </p>

          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Pediatricians' ? 'bg-[#C9D8FF]' : ''}`}>
              Pediatricians
          </p>

          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Neurologist' ? 'bg-[#C9D8FF]' : ''}`}>
              Neurologist
          </p>

          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')} 
            className={`p-2 mb-2 border border-gray-300 lg:w-[200px] rounded-lg cursor-pointer ${speciality === 'Gastroenterologist' ? 'bg-[#C9D8FF]' : ''}`}>
              Gastroenterologist
          </p>

        </div>

        <div className='w-full grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4 gap-y-6'>
        {
          filterDoc.map((item,index) => (
            <div onClick={() => navigate(`/appointment/${item._id}`)} className='rounded-lg border border-[#C9D8FF] cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
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

      </div>
    </div>
  )
}

export default Doctors