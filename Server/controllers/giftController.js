

const GiftProduct = require("../models/Gifting");

exports.getGiftProducts = async (req, res) => {
    try {
        const products = await GiftProduct.find();
        res.status(200).json({
            message: "Products found successfully",
            data: products
        });
    } catch (error) {
        res.status(400).json({ message: "Products not found", error: error.message });
    }
};
