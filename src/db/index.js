import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB Connected!! DB HOST: ${connectionInstance.connection.host}`); // check consoling just the object.
    }catch (error){
        console.error("MongoDB conn FAILED", error);
        process.exit(1);//node js gives access to the current process running in the application
    }

}

export default connectDB;