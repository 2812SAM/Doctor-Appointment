import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = '$';
    const [doctors,setDoctorsData] = useState([]);
       
    const value = {
        doctors,currencySymbol
    }

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getDoctorsData = async() => {
        try{
            const {data} = await axios.get(backendUrl+'/api/doctor/list')
            if(data.success){
                console.log(data);
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

    useEffect(() => {
        getDoctorsData()
    },[])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;
