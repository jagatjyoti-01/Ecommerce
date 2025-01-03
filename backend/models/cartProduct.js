const mongoose=require('mongoose')
const addToCart=mongoose.Schema({
    productId:{
        ref:'product',
        type:String,
    },
    quantity : Number,
   userId : {
    type: String,
    require:true
   },
},{
    timestamps:true
})
const addToCartmodel=mongoose.model("addToCart",addToCart)
module.exports=addToCartmodel