const mongoose = require('mongoose');
const UserModel = require("./user");


const productSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        validate: {
            validator: async function (value) {
                const userExists = await UserModel.exists({ _id: value });
                return userExists;
            },
            message: 'User does not exist.'
        }
    },
    name: {
        type: String,
        required: [true, 'Product name is required.'],
        trim: true,
        minlength: [2, 'Product name must be at least 2 characters long.'],
        maxlength: [50, 'Product name cannot exceed 50 characters.']
    },
    image: {
        type: String,
        required: [true, 'Product image URL is required.'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Product price is required.'],
        min: [0, 'Product price cannot be negative.']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required.'],
        min: [0, 'Product quantity cannot be negative.']
    },
    description: {
        type: String,
        required: [true, 'Product description is required.'],
        trim: true,
        minlength: [10, 'Product description must be at least 10 characters long.']
    },
    
    category: {
        type: String,
        required: [true, 'Product category is required.'],
        enum: ['Food', 'Craft'] // Replace with the desired category values
    },
    status: {
        type: String,
        default: 'waiting' // Set the default status to 'waiting'
    },
    
    recipes: {
        ingredient: {
            type: String,
            required: function () {
                return this.category === 'Food';
            }
        },
        time: {
            type: Number,
            required: function () {
                return this.category === 'Food';
            },
            min: [1, 'Recipe time must be a positive value.']
        },
        weight: {
            type: Number,
            required: function () {
                return this.category === 'Food';
            },
            min: [0, 'Product weight cannot be negative.']
        },
        method: {
            type: String,
            required: function () {
                return this.category === 'Food';
            }
        }
    }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;

// Example usage
