import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'

import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const changeAvailability = async(req,res) => {
    try{
        const {docId} = req.body;

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available: !docData.available})
        res.json({success:true,message:'availability change'});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:err.message})
    }
}

const doctorList = async(req,res) => {
    try{
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
    }   
    catch(err){
        res.json({success:false,message:err.message})
        console.log(err.message);     
    }
}

const loginDoctor = async(req,res) => {
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.json({success:false,message:"Missing data"});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Enter valid email"})
        }
        
        // console.log(email);
        // console.log(password);
        
        const doctor = await doctorModel.findOne({email});
        // console.log(doctor);
        
        if(!doctor){
            return res.json({success:false,message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,doctor.password)

        if(!isMatch){
            return res.json({success:false,message:"Invalid Password"});
        }

        const dToken = jwt.sign({id:doctor._id},process.env.JWT_SECRET);

        res.json({success:true,dToken});
    }
    catch(err){
        res.json({success:false,message:err.message})
        console.log(err.message);     
    }
}

const allAppointments = async(req,res) => {
    try{
        const {docId} = req.body
        // console.log(docId);
        
        const appointmentData = await appointmentModel.find({docId});

        res.json({success:true,appointmentData});
    }
    catch(err){
        res.json({success:false,message:err.message})
        console.log(err.message);     
    }
}

export {changeAvailability,doctorList,loginDoctor,allAppointments};