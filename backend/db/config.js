import mongoose from "mongoose";

const config = async(req,res) =>{
    try {
        await mongoose.connect(process.env.MONGO_URL )
        console.log('Connected to MONGO_DB')
    } catch (error) {
        console.error('MongoDB connection error:', error)
    }
}

export default config;