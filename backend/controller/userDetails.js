const userModel = require("../models/Usermodel")

async function userDetailsController(req,res){
    try{
        // console.log("userId iss-",req.userId)
        const user = await userModel.findById(req.userId)
        // console.log("user",user)

        res.status(200).json({
            data : user,
            error : false,
            success : true,
            message : "User details"
        })
        if (!req.userId) {
            return res.status(400).json({
              message: 'User ID is missing or invalid',
              error: true,
              success: false,
            });
          }
          
        // console.log("user",user)
    }
    catch(err){
        res.status(400).json({
            message : err.message|| err,
            error:true,
            success:false

        })
    }
}

module.exports=userDetailsController