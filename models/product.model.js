const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required : true, 
    },
    price: {
        type: Number,
        default: '',
        required : true, 
    },
    description: {
        type: String,
        default: '',
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: ''
    },
},{timestamps: true});

module.exports = mongoose.model('Product', ProductSchema);