import express from 'express'
import { registerUser,loginUser,getProfile, updateProfile,bookAppointment, listAppointments, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js'

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/getProfile',authUser,getProfile)
userRouter.post('/updateProfile',upload.single('image'),authUser,updateProfile)
userRouter.post('/bookAppointment',authUser,bookAppointment);
userRouter.get('/listAppointments',authUser,listAppointments);
userRouter.post('/cancelAppointment',authUser,cancelAppointment);

export default userRouter;