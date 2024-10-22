import React,{useContext, useDebugValue, useEffect,useState} from 'react'
import { assets} from '../assets/assets_frontend/assets';
import {useParams} from 'react-router-dom'
import {AppContext} from '../context/AppContext'

function Appointments() {
  const {docId} = useParams();
  const [doc, setDoc] = useState({});
  const {doctors,currencySymbol} = useContext(AppContext);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime,setSlotTime] = useState('');

  const dayOsWeek = ['SUN','MON','TUE','WED','THU','FRI','SAT','SUN'];
  
  const findDoc = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    if (doctor) {
      setDoc(doctor);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);
    
    let today = new Date();

    for(let i = 0;i < 7;i++){
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21,0,0,0);

      if(today.getDate === currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours()+1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      }else{
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime){
        let formattedTime = currentDate.toLocaleTimeString([],{hour: '2-digit',minutes: '2-digit'});
        
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime
        })

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot(prev => ([...prev,timeSlots]));
    }


  }

  useEffect(() => {
    findDoc();
  }, [doctors,docId]);

  useEffect(() => {
    getAvailableSlots();
  },[doc])

  useEffect(() => {
    console.log(docSlot);

    
  },[docSlot])
  // console.log(doc);

  return (
    <div>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img 
            className='bg-primary w-full sm:max-w-[1000px] rounded-lg' // Added max-width and object-cover
            src={doc.image} 
            alt="" 
          />
        </div>
        <div>
          <div className='p-8 py-7 border border-gray-400 rounded-lg  mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
            <div className='flex items-center gap-3'>
              <p className='text-3xl font-semibold text-gray-700'>{doc.name}</p>
              <img src={assets.verified_icon} alt="" />
            </div>
            
            <div className='text-md flex gap-3 text-gray-500 items-center mt-2'>
              <p>{doc.degree} - {doc.speciality}</p>
              <p className='border border-gray-600 py-[1px] px-3 rounded-full'>{doc.experience}</p>
            </div>
            
            <div className='flex gap-2 mt-2'>
              <p>About</p>
              <img src={assets.info_icon} alt="" />
            </div>
            
            <p className='text-md text-gray-500 mt-1'>{doc.about}</p>

            <div className='flex mt-3 items-center'>
              <p className='text-lg text-gray-600'>Appointment fees :</p>
              <p>${doc.fees}</p> 
            </div>
          </div>

          <div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointments