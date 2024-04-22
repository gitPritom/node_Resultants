const mongoose = require('mongoose');

//define the menu schema
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ['sweet', "Sweet", 'spicy', 'Spicy', 'sour', 'Sour'],
        required: true
    },
    is_drink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    num_sales: {
        type: Number,
        default: 0
    }
});

//create Menu Item Model
const Menu = mongoose.model('Menu', menuItemSchema, 'MenuItem');
module.exports = Menu;


//comment added for testing purpose