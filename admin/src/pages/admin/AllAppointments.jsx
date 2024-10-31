import React,{useContext, useEffect} from 'react'
import { AdminContext } from '../../context/AdminContext.jsx'
import { AppContext } from '../../context/AppContext.jsx'
import {assets} from '../../assets/assets_admin/assets.js'

function AllAppointments() {
  const {aToken,appointments,setAppointments,getAllAppointments,cancelAppointment} = useContext(AdminContext)
  const {calculateAge,slotFormat} = useContext(AppContext);

  useEffect(() => {
    if(aToken){
      getAllAppointments()
    }
  },[aToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll min-h-[60vh]'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-black'>
          <p>#</p>
          <p>Patient </p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {
          appointments.map((item,idx) => (
            <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 px-6 py-3 border-b hover:bg-gray-50' key={idx}>
              <p className='max-sm:hidden'>{idx+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-12 rounded-full ' src={item.userData.image} alt="" />
                <p>{item.userData.name}</p>
              </div>
              <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
              <p>{slotFormat(item.slotDate)}, {item.slotTime}</p>
              <div className='flex items-center gap-2'>
                <img className='w-12 rounded-full bg-gray-200' src={item.docData.image} alt="" />
                <p>{item.docData.name}</p>
              </div>
              <p>{item.docData.fees}$</p>
              {
                item.cancelled
                ? <p className='text-red-400 text-sm font-medium'>Cancelled</p>
                : item.isCompleted 
                  ? <p className='text-green-400 text-xs font-medium '>Completed</p>
                  : <img onClick={() => cancelAppointment(item._id)} className='w-18 cursor-pointer' src={assets.cancel_icon} alt="" />
              }
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default AllAppointments