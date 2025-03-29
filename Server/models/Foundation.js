const mongoose = require('mongoose');

const FoundationSchema = new mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: null
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true });



const FoundationModel= mongoose.model("FoundationProduct",FoundationSchema)

module.exports = FoundationModel;
