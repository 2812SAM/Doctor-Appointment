import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        
        // Connect to the database
        const res = await mongoose.connect(process.env.MONGODB_URI);
        
        // Once connected, this event will fire
        mongoose.connection.on('connected', () => {
            console.log("Database connected");
        });
    } catch (err) {
        console.log("Database connection error:", err);
    }
};

export default connectDB;
