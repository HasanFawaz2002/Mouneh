const mongoose = require('mongoose');
//const connect = require('../server/connect');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'First name is required.'],
        minlength: [3, 'First name must be at least 2 characters long.'],
        maxlength: [30, 'First name cannot exceed 50 characters.']
    },
    lastname: {
        type: String,
        required: [true, 'Last name is required.'],
        minlength: [3, 'Last name must be at least 2 characters long.'],
        maxlength: [30, 'Last name cannot exceed 50 characters.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        unique: [true, 'Email address must be unique.'],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        validate: {
            validator: function (value) {
                // Minimum length of 6 characters
                if (value.length < 6) {
                    return false;
                }

                // At least one capital letter
                if (!/[A-Z]/.test(value)) {
                    return false;
                }

                return true;
            },
            message: 'Password must be at least 6 characters long and contain at least one capital letter.'
        }
    },
    phonenumber: {
        type: Number,
        required: [true, 'Number is required.'],
        min: [0, 'Number must be a positive value.']
    },
    city: {
        type: String,
        required: [true, 'Address is required.'],
        trim: true,
        minlength: [2, 'Address must be at least 5 characters long.']
    },
    age: {
        type: Number,
        required: [true, 'Age is required.'],
        min: [18, 'Minimum age allowed is 18.'],
        max: [100, 'Maximum age allowed is 100.']
    },
    isAdmin: { 
        type: Boolean,
        default: false 
    }
},{ timestamps: true }
);
/*const UserSchema =new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);*/


const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;



//connect();