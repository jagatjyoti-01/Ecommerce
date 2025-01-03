const userModel = require("../models/Usermodel")
async function updateUser(req,res) {
    try{
        const sessionUser=req.userId
        const {userid,email,name,role}=req.body
        const payload={
            ...( email && { email : email}),
            ...( name && { name : name}),
            ...( role && { role : role}),
        }
        const user=await userModel.findById(sessionUser)
        console.log("user role ",user.role)

        const updateUser=await userModel.findByIdAndUpdate(userid,payload)
        res.json({
            data:updateUser,
            message:'user Update',
            success:true,
            error:false
        })
    }catch(err){
        res.status(400).json({
            message : err.message|| err,
            error:true,
            success:false            
        })
    }   
}
module.exports=updateUser