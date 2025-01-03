const productModel = require("../../models/productModel");

async function getAllProduct(req,res){
    try{
        const allproducts = await productModel.find().sort({ createdAt : -1 })
        res.json({
            message:'All-user',
            success:true,
            error:false,
            data:allproducts
        })
        
    }catch(err){
        res.status(400).json({
            message: 'Error uploading product',
            error: err,
            success:'false'


        })

    }
}
module.exports=getAllProduct