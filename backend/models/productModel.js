const mongoose=require('mongoose')

const UserSchema=mongoose.Schema({
    productName: String,
    brandName: String,
    catagory: String,
    productImage: [],
    description:String,
    price:String,
    sellingPrice: String,
},
{
    timestamps:true

}
)

const productModel=mongoose.model("product",UserSchema)
module.exports=productModel