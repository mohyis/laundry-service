const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     firstName: {
        type: String,
        required: true
    },
     lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'manager', 'customer'],
        default: 'user',
        require: true
    }
}, {timestamps: true})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel