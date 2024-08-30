const asyncHandler = (reqHandlerfn) => (req,res, next) => {
    Promise.resolve( reqHandlerfn(req, res, next))
            .catch((err)=> next(err))
}
 
export {asyncHandler}
//created a wrapper function
// const asyncHandler = (fn) => async(req, res, next) =>{  
//     try {
//         await fn(req, res, next)
//     }catch (error) {
//         res.status(error.code || 500).json({
//             success: false,
//             message: error.message
//         })
//     }
// }