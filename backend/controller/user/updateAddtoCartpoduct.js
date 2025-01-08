const addToCartmodel=require('../../models/cartProduct')
const updateAddtoCartpoduct = async (req, res) => {
    try{
        const currentUserId = req.userId
        const addtToaCartproductId= req?.body?._id 
        const qty=req.body.quantity        
        const updatedProduct = await addToCartmodel.updateOne({_id : addtToaCartproductId},{
            ...(qty && {quantity:qty})
        })
        res.json({
            status:200,
            success:true,
            message:'addtoCart product updated successfully',
            error:false,
            data:updatedProduct
        })


    }catch(err){
        res.json({
            error:true,
            status: 500,
            message: err.message,
            success: false,

        })
    }
}

module.exports=updateAddtoCartpoduct