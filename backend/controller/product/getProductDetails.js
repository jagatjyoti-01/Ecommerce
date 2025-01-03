const productModel = require("../../models/productModel")
const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({
            data: product,
            status: true,
            message: "Product details retrieved successfully",
            error: false,
            success: true
        })
    } catch (err) {
        res.json({
            status: false,
            message: err?.message || err,
            error: true,
            success: false


        })
    }
}
module.exports = getProductDetails