const EyeProduct = require("../models/Eye");

exports.getEyeProducts = async (req, res) => {
    try {
        const products = await EyeProduct.find();
        res.status(200).json({
            message: "Products found successfully",
            data: products
        });
    } catch (error) {
        res.status(400).json({ message: "Products not found", error: error.message });
    }
};
