const NewProduct = require("../models/New");

exports.getNewProducts = async (req, res) => {
    try {
        const products = await NewProduct.find();
        res.status(200).json({
            message: "Products found successfully",
            data: products
        });
    } catch (error) {
        res.status(400).json({ message: "Products not found", error: error.message });
    }
};
