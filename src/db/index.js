// this is mongoose export
import mongoose from "mongoose";
// this is constanct 
import { DB_NAME } from "../constant.js";

const connectDB = async () => {
    try {
       const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB connected: !! DB HOST : ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MONGODB CONNECTION ERROR:", error);
        process.exit(1);
    }
};
export default connectDB