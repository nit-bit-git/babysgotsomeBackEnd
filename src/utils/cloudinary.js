import {v2 as cloudinary} from "cloudinary";
import fs from "fs"; //file system package needee for file handling 

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API, 
        api_secret: process.env.CLOUD_SECRET
});

const  uploadOnCloud = async (localFilePath) => {
    try {
        if (!localFilePath) return null 
       
        //upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        // file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url);

        return response
    }catch (error){
        fs.unlinkSync(localFilePath) // remove the locally saved temp file as the upload operation got failed
        return null
    }
}

// const uploadResult = await cloudinary.uploader
// .upload(
//     'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//         public_id: 'shoes',
//     }
// )
// .catch((error) => {
//     console.log(error);
// });

// console.log(uploadResult);

export {uploadOnCloud}