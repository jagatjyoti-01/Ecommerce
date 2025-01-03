const UploadProductPermision = require("../helper/permision")
const productModel = require("../models/productModel")

async function uploadProduct(req,res){
    try{

        const sesssionUserId=req.userId
        if(!UploadProductPermision(sesssionUserId)){
            return res.status(403).json({message:"You dont have permission to upload product"})
        }
        
     const uploadProduct=new productModel(req.body)
     const saveProduct=await  uploadProduct.save()
     res.status(201).json({
        message:"Product uploaded successfullyy",
        data:saveProduct,
        error:false,
        success:true

     })

    }catch(err){
        res.status(400).json({
            message: 'Error uploading product',
            error: err,
            success:'false'


        })

    }
}

module.exports=uploadProduct