import validator from 'validator'
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'
import jwt from 'jsonwebtoken'
import doctorModel from '../models/doctorModel.js'

//api for adding doctor
const addDoctor = async(req,res) => {
    try{
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
        const imageFile = req.file
        
        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address){
            return res.json({success: false,message: "Missing details"});
        }

        //validating the email format
        if(!validator.isEmail(email)){
            return res.json({success: false,message: "Please enter valid email"});
        }

        //validate password
        if(password.length < 8){
            return res.json({success: false,message: "Please enter a strong password"});
        }

        //hashing the doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        // upload image to cloudinary
        const imageUpload = await cloudinary.v2.uploader.upload(imageFile.path,{resource_type:"image"});
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }

        const newDoctor = new doctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true,message:"doctor added"});
    }
    catch(err){
        console.log("error in adding data by admin : ",err);
        res.json({success:false,message:err.message})
    }
}

//api for the admin login
const loginAdmin = async(req,res) => {
    try{
        const {email,password} = req.body;

        if(!email || !password){
            return res.json({success: false,message: "Missing details"});
        }

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid credentials"})
        }
    }
    catch(err){
        console.log("error in login by admin : ",err);
        res.json({success:false,message:err.message})
    }
}

const allDoctors = async(req,res) => {
    try{
        const doctors = await doctorModel.find({}).select('-password');
        res.json({success:true,doctors})
    }   
    catch(err){
        console.log("error in getting data of all doctors by admin : ",err);
        res.json({success:false,message:err.message})
    }
}

export {addDoctor,loginAdmin,allDoctors}