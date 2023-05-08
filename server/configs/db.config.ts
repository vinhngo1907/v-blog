import mongoose from "mongoose";
const URL = process.env.DB_URL;

mongoose.set("strictQuery", false);
export const connectDB = async () => {
    try {
        await mongoose.connect(`${URL}`);
        console.log('MongoDB connected');
    } catch (error: any) {
        console.log(error.message);
        process.exit(1);
    }
}