const addtoCartModel = require('../../models/cartProduct')
const addToCartViewProduct = async (req, res) => {
    try {
        const currentUser = req.userId
        const result=await addtoCartModel.find({userId:currentUser})
        res.json({
            success: true,
            data: result,
            error: false
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message||err,
            error: true
            
        })
    }
}
module.exports = addToCartViewProduct
