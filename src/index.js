// require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constant";
import connectDB from "./db/index.js";
import dotenv from "dotenv";

const port = process.env.PORT || 8000
dotenv.config({
    path : './env'
});

connectDB() //promise is below to handle this async function
.then(()=>{
    app.on("Errror", (err) => {
        console.log("ERRRORR!! : ", err);
        throw err;
    })
    app.listen(port, () => {
        console.log(`server is running at port: ${port} `);
    })
})
.catch((err)=> {
    console.log("MONGODB conn. FAILED!!!", err);
})


//approach 1 all here approach
// import express from "express";
// const app = express
// using IFFE
// ;(async()=>{
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("ERRROR", (error)=>{
//             console.error("ERRRoR", error);
//             throw error
//         })
//         app.listen(process.env.PORT, ()=>{
//             console.log(`app is listening at port: ${PORT}`);
//         })
//     }catch(err){
//         console.error("ERROR:". err)
//         throw err
//     }
// })()