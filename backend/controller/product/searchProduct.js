const productModel = require("../../models/productModel");

async function searchProduct(req,res){
    try{
        const query = req.query.q
        //console.log('query', query)    it show the quarry which the user enter

        const regex = new RegExp(query, "i")
        const product=await productModel.find({

            "$or":[
                {productName:regex},
                {catagory:regex}
            ]
        })

        res.json({
            error:false,
            success:true,
            message:"search product",
            data:product

        })

    }catch(err){
        res.json({
            error:true,
            success:false,
            message:err.message,
            data:null,

        })
        
    }
}
module.exports=searchProduct