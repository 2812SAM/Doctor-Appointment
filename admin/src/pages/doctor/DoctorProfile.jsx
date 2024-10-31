import React, { useContext, useEffect, useState } from 'react'
import {DoctorContext} from '../../context/DoctorContext'
import {AdminContext} from '../../context/AdminContext'
import { toast } from 'react-toastify';
import axios from 'axios'

function DoctorProfile() {
  const [isEdit,setIsEdit] = useState(false);

  const {dToken,profileData,setProfileData,getProfileData} = useContext(DoctorContext)
  const {backendUrl} = useContext(AdminContext)

  const updateProfile = async() => {
    try{
      const updateData = {
        address:profileData.address,
        available:profileData.available,
        fees:profileData.fees,
      }
      console.log(backendUrl);
      

      const {data} = await axios.post(backendUrl+'/api/doctor/updateProfile',updateData,{headers:{dToken}})

      if(data.success){
        setIsEdit(false);
        toast.success("profile updated")
        getProfileData()
      }
      else{
        toast.error(data.message);
      }
    }
    catch(err){
      console.log(err);
      toast.error(err.message)
    }
  }

  useEffect(() => {
    if(dToken){
      getProfileData()

    }
  },[dToken])

  return profileData && (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
          <p className='flex items-centergap-3 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-neutral-800'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>${isEdit ? <input type="number" onChange={(e) => setProfileData((prev) => ({...prev,fees:e.target.value}))} value={profileData.fees} name="" id="" />: profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e) => setProfileData((prev) => ({...prev,address:{...prev.address,line1:e.target.value}}))} value={profileData.address.line1} name="" id="" /> : profileData.address.line1}
              <br/>
              {isEdit ? <input type="text" onChange={(e) => setProfileData((prev) => ({...prev,address:{...prev.address,line2:e.target.value}}))} value={profileData.address.line2} name="" id="" /> : profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({...prev,available:!prev.available}))} checked={profileData.available} type="checkbox" name="" id="" />
            <label htmlFor="">Available</label>
          </div>

          {!isEdit && <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white hover:transition-all'>Edit</button>}
          {isEdit && <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white hover:transition-all'>Save</button>}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile