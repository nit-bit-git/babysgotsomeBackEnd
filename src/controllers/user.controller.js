import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloud } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiResponse.js"
const registerUser = asyncHandler( async (req,res)=> {
    //1. get user details from front end / postman depending on the user model
    //2. validation
    //3. check if user already exists : via username and email
    //4. check if we have the necessary files(images and avatar) 
    //5. upload them to cloudinary, verify avatar
    //6. create user object- create entry in DB 
    //7. remove password and refresh token field from response
    //8. check for user creation
    //9. return response

    const {fullname, email, username, password } = req.body 
    console.log("email: ",email );

    // if(fullname === "") {
    //     throw new ApiError(400, "Fullname is required")
    // }

    if (
        [fullname, email, username, password].some((field) =>
            field?.trim() === "")
    ){ 
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ username },{ email }]
    })

    if (existedUser){
        throw new ApiError(409, "Email or username already exists ")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path

    console.log(req.files)

    const coverImageLocalPath = req.files?.coverImage[0]?.path // [0] gives 1st property which can give us the path //  if file not retrieved check multer middleware for file naming issues
    // validate correct email format as well 
    
    if (!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloud(avatarLocalPath)
    const coverImage = await  uploadOnCloud(coverImageLocalPath)

    if (!avatar){
        throw new ApiError(400, "Avatar file upload failed")
    }

    const user = await User.create({
        fullname, 
        avatar: avatar.url,
        coverImage: coverImage?.url || "", //since its not compulsory 
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(// to verify the user was created or not.
        "-password -refreshToken" // to hide any field put - before the required field coz by default all fields are selectec 
    ) 
    
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    
    return res.status(201).json(
        new ApiResponse(200, createdUser,"User registered successfully!")
    )
    // res.status(200).json({
    //     message: req.body.email
    // })

})

export {registerUser};