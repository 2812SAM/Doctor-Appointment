import userModel from "../models/userModel.js";
import doctorModel from '../models/doctorModel.js'
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary' 
import appointmentModel from "../models/appointmentModel.js";

//api to register user
const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        if(!email || !password || !name){
            return res.json({success:false,message:'missing data'});
        }

        if(!validator.isEmail(email)){
            return res.json({success:false,message:'Invalid email'});
        }

        if(password.length < 8){
            return res.json({success:false,message:'enter a strong password'});
        }

        const hashedPassword = await bcrypt.hash(password,10);
        
        const userData = {
            name,
            email,
            password:hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err}); 
    }
}

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({success:false,message:'missing data'});
        }

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:'user does not exist'});
        }
        
        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success:false,message:'enter correct password'});
        }
        
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET);

        res.json({success:true,token});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const getProfile = async(req,res) => {
    try{
        const {userId} = req.body

        const userData = await userModel.findById(userId).select('-password');
        console.log(userData);
        
        res.json({success:true,userData});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const updateProfile = async(req,res) => {
    try{
        const {userId,name,phone,address,dob,gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !address || !dob || !gender){
            return res.json({success:false,message:'missing data'});
        }

        await userModel.findByIdAndUpdate(userId,{name,phone,address:JSON.parse(address),dob,gender});

        if(imageFile){
            const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type:'image'});
            const imageURL = imageUpload.secure_url

            await userModel.findByIdAndUpdate(userId,{image:imageURL})
        }

        res.json({success:true,message:"profile updated"});
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

const bookAppointment = async(req,res) => {
    try{
        const {userId,docId,slotDate,slotTime} = req.body
        const docData = await doctorModel.findById(docId).select('-password')

        if(!slotTime){
            return res.json({success:false,message:"select time"})
        }

        if(!slotDate){
            return res.json({success:false,message:"select date"})
        }
        
        if(!docData.available){
            return res.json({success:false,message:"Doctor not available"})
        }

        let slotsBooked = docData.slotsBooked
        if(slotsBooked[slotDate]){
            if(slotsBooked[slotDate].includes[slotTime]){
                return res.json({success:false,message:"slot not available"});
            }
            else{
                slotsBooked[slotDate].push(slotTime);
            }
        }
        else{
            slotsBooked[slotDate] = []
            slotsBooked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select('-password')

        delete docData.slotsBooked;

        const appointment = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now(),
        }

        const newAppointment = new appointmentModel(appointment);
        newAppointment.save();

        await doctorModel.findByIdAndUpdate(docId,{slotsBooked})

        res.json({success:true,message:"appointment is booked"})
    }
    catch(err){
        console.log(err);   
        res.json({success:false,message:err});
    }
}

export {registerUser,loginUser,getProfile,updateProfile,bookAppointment}