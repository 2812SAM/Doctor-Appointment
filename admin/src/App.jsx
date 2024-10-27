import React,{useContext, useState} from 'react'
import Login from './pages/Login.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import NavBar from './components/NavBar.jsx';
import SideBar from './components/SideBar.jsx';
import { Routes,Route } from 'react-router-dom';
import DashBoard from './pages/admin/DashBoard.jsx';
import AllAppointments from './pages/admin/AllAppointments.jsx';
import AddDoctor from './pages/admin/AddDoctor.jsx';
import DoctorsList from './pages/admin/DoctorsList.jsx';

function App() {
  const {aToken} = useContext(AdminContext);

  return aToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<DashBoard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoctor/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
}

export default App;
