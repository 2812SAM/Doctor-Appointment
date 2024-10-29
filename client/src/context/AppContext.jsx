import { createContext, useDebugValue, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [doctors,setDoctorsData] = useState([]);
    const [token,setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData,setUserData] = useState(false);

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctorsData = async() => {
        try{
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                // console.log(data);
                setDoctorsData(data.doctors);
            }
            else{
                toast.error(data.message)
            }
        }
        catch(err){
            toast.error(err.message);
            console.log(err); 
        }
    }

    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(backendUrl + '/api/user/getProfile', { headers: { token } });
            if (data.success) {
                setUserData(data.userData)
                // console.log(data);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
            console.log(err);
        }
    };
    
    const value = {
        doctors,getDoctorsData,
        currencySymbol,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserProfileData
    }

    useEffect(() => {
        getDoctorsData()
    },[])

    useEffect(() => {
        if(token){
            loadUserProfileData();
            // console.log(userData);
        }
        else{
            setUserData(false);
        }
    },[token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
