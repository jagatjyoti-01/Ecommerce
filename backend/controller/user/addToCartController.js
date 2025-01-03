const addToCartmodel = require('../../models/cartProduct');

const addToCartController = async (req, res) => {
    try {
        const { productId } = req.body; // Extract productId from request body
        const currentUser = req?.userId; // Assuming userId is attached to the request
console.log('userid ',req?.userId)
        // Validate inputs
        if (!productId) {
            return res.status(400).json({
                message: "Product ID is required",
                status: 400,
                success: false,
                error: true,
            });
        }

        // Check if the product is already in the cart
        const isProductAvailable = await addToCartmodel.findOne({ productId, userId: currentUser });
        if (isProductAvailable) {
            return res.status(200).json({
                message: "Product already exists in the cart",
                status: 200,
                success: false,
                error: true,
            });
        }

        // Construct the payload and save the new product in the cart
        const payload = {
            productId,
            quantity: 1,
            userId: currentUser,
        };

        const newAddToCart = new addToCartmodel(payload);
        const saveProduct = await newAddToCart.save();

        return res.status(200).json({
            data: saveProduct,
            message: "Product added to the cart successfully",
            status: 200,
            success: true,
            error: false,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message || "Internal server error",
            status: 500,
            error: true,
            success: false,
        });
    }
};

module.exports = addToCartController;
