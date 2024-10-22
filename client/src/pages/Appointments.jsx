import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets_frontend/assets';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../components/RelatedDoctors';

function Appointments() {
  const { docId } = useParams();
  const [doc, setDoc] = useState({});
  const { doctors, currencySymbol } = useContext(AppContext);
  const [docSlot, setDocSlot] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const dayOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const findDoc = () => {
    const doctor = doctors.find(doc => doc._id === docId);
    if (doctor) {
      setDoc(doctor);
    }
  };

  const getAvailableSlots = async () => {
    setDocSlot([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime // ** Ensure time is formatted correctly **
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setDocSlot(prev => ([...prev, timeSlots]));
      console.log(docSlot.length);
    }
  }

  useEffect(() => {
    findDoc();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [doc]);

  useEffect(() => {
    console.log(docSlot);
  }, [docSlot]);

  return (
    <div className='flex flex-col justify-center align-middle gap-2'>
      <div className="flex flex-col sm:flex-row px-4 w-full gap-2">
        {/* Doctor Image Section */}
        <div className="flex-1 w-full sm:max-w-[300px] sm:w-[30vw] h-auto">
          <img
            className="bg-primary w-full sm:max-w-[1000px] rounded-lg object-cover"
            src={doc.image}
            alt=""
          />
        </div>

        {/* Doctor Information Section */}
        <div className="flex-1 p-8 py-7 border border-gray-400 rounded-lg sm:mx-0 flex flex-col">
          <div className="flex items-center gap-3">
            <p className="text-3xl font-semibold text-gray-700">{doc.name}</p>
            <img src={assets.verified_icon} alt="Verified Icon" />
          </div>

          <div className="text-md flex gap-3 text-gray-500 items-center mt-2">
            <p>{doc.degree} - {doc.speciality}</p>
            <p className="border border-gray-600 py-[1px] px-3 rounded-full">{doc.experience} years</p>
          </div>

          <div className="flex gap-2 mt-2">
            <p>About</p>
            <img src={assets.info_icon} alt="Info Icon" />
          </div>

          <p className="text-md text-gray-500 mt-1">{doc.about}</p>

          <div className="flex mt-3 items-center">
            <p className="text-lg text-gray-600">Appointment fees:</p>
            <p className="ml-2">{currencySymbol}{doc.fees}</p>
          </div>
        </div>
      </div>

      {/* Aligned Appointment Fees Section */}
      <div className="flex flex-col sm:flex-row px-4 w-full gap-2">
        <div className="flex-1 max-w-[300px] w-[30vw] h-auto"></div>

        <div className="flex-1 mt-4 sm:mx-0 flex-col">
          <p className="text-md text-gray-500">Booking Slots</p>
          <div className='flex flex-wrap gap-2 mt-4'>
            {
              docSlot.length && docSlot.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex flex-col justify-center items-center border border-gray-400 ${slotIdx === index ? 'bg-[#4F5FFF] text-white' : ''} py-6 px-3 w-[60px] rounded-full text-[13px] cursor-pointer`}
                  onClick={() => setSlotIdx(index)}
                >
                  <p>{item[0] && dayOfWeek[item[0].dateTime.getDay()]}</p>
                  <p>{item[0] && item[0].dateTime.getDate()}</p>
                </div>
              ))
            }
          </div>
          <div className='flex flex-wrap gap-2 mt-4 overflow-x-auto'>
            {
              docSlot.length && docSlot[slotIdx].map((item, index) => (
                <p 
                  key={index}
                  className={`flex justify-center items-center border border-gray-400 ${slotTime === item.time ? 'bg-[#4F5FFF] text-white' : ''} rounded-full text-[13px] cursor-pointer py-2 px-6`}
                  onClick={() => setSlotTime(item.time)}
                >
                  { item.time} {/* ** Ensure correct time format ** */}
                </p>
              ))
            }
          </div>

          <div className='mt-4 flex justify-center sm:justify-normal'>
            <button className='w-[170px] sm:w-[150px] md:w-[200px] lg:w-[250px] bg-primary p-2 rounded-full cursor-pointer text-white'>
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <RelatedDoctors docId={docId} speciality={doc.speciality}/>
    </div>
  );
}

export default Appointments;
