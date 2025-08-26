const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    userType: { type: String, enum: ['student', 'teacher'], required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', useSchema)
