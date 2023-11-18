const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required : true, 
    },
    email: {
        type: String,
        default: '',
        required : true, 
        index: { unique: true }
    },
    password: {
        type: String,
        default: '',
        required : true, 
    },
    phone: {
        type: String,
        default: '',
    },
    avatar: {
        type: String,
        default: ''
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
},{timestamps: true});

module.exports = mongoose.model('USER', UserSchema);