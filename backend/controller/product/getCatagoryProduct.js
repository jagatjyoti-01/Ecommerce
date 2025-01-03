const productModel = require("../../models/productModel")

const getCatagoryProduct = async (req, res) => {
    try {
        const productCatagory = await productModel.distinct("catagory")
        // console.log('productcatagory are ', productCatagory)

        //array of 1st product of each catagory
        const producBycatagory = []
        for (const catagory of productCatagory) {
            // console.log("catagory",catagory)
            const product = await productModel.findOne({ catagory })
            
            if (product) {
                producBycatagory.push(product)
            }

        }
        //console.log(" product by catagory are ", producBycatagory)
        res.json({
            message:'product catagory',
            data:producBycatagory,
            success:true,
            error:false


        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        })
    }
}

module.exports = getCatagoryProduct