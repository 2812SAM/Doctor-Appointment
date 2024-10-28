import userModel from "../models/userModel.js";
import validator from 'validator'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

//api to register user
const registerUser = async(req,res) => {
    try{
        const {name,email,password} = req.body;

        if(!email || !password || !name){
            return res.json({success:true,message:'missing data'});
        }

        if(!validator.isEmail(email)){
            return res.json({success:true,message:'Invalid email'});
        }

        if(password.length < 8){
            return res.json({success:true,message:'enter a strong password'});
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

export {registerUser}