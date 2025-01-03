const addToCartmodel=require('../../models/cartProduct')
const countAddToCartProduct=async(req,res)=>{
    try{
         const userId=req?.userId
         const count=await addToCartmodel.countDocuments({userId:userId})
         res.json({
            data:{
                count:count
            },
            message:'ok',
            error:false,
            success:true
         })
    }catch(err){
        res.status(500).json({
            message:err.message,
            data:[],
            error:true,
            success:false
        })
    }

}
module.exports=countAddToCartProduct