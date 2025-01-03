const  jwt = require('jsonwebtoken');
async function authToken(req,res,next){
   try{
   const token=req.cookies?.token 
   console.log("token is     -" ,token)
   if(!token){
    return res.status(200).json({
      message: "User not login",
      error:true,
      success:false     
    })
   }
   jwt.verify(token,process.env.TOKEN_SECRET_KEY, function(err, decoded) {
    console.log(err)
    console.log("decodedd",decoded) // bar

    if (err) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid token',
        error: true,
        success: false,
      });
    }
    req.userId=decoded?.tokondata?._id
    console.log("userId is",req.userId)
      
    next()
  });
  
   }
   catch(err){
    res.status(400).json({
        message:err.message,
        data:[],
        console:true,
        success:false
        
    })
   }
}

module.exports=authToken