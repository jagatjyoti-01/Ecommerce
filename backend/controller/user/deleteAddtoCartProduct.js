const addToCartmodel = require("../../models/cartProduct");
const deleteAddtoCartProduct = async (req, res) => {
    try {
        const currentUserId = req.userId;
        const addtocartProductId = req.body._id;
        const deleteProduct=await addToCartmodel.deleteOne({_id:addtocartProductId})
        res.json({
            status: 200,
            success: true,
            message: "addtoCart product deleted successfully",
            error: false,
            data: deleteProduct
        });
    }catch (err) {
        res.json({
            error: true,
            status: 500,
            message: err.message,
            success: false,
        });

    }
}
module.exports = deleteAddtoCartProduct;