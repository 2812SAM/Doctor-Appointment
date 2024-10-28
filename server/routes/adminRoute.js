import express from 'express'
import { addDoctor,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js';
import { allDoctors } from '../controllers/adminController.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();

adminRouter.post('/addDoctor',authAdmin,upload.single('imageFile'),addDoctor);
adminRouter.post('/login',loginAdmin);
adminRouter.get('/allDoctors',authAdmin,allDoctors)
adminRouter.post('/changeAvailability',authAdmin,changeAvailability)

export default adminRouter;
