const userModel = require("../models/Usermodel")

async function allUser(req,res) {
    try{
      // console.log("userid all user",req.userId)   //it show which user loged in 
      const alluser=await userModel.find()
      res.json({
        message:'All User',
        data:alluser,
        success:true,
        error:false

      })
    } catch(err){
        res.status(400).json({
            message : err.message|| err,
            error:true,
            success:false

        })
    }
}

module.exports=allUser