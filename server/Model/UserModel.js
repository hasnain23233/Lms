const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'teacher'], required: true },
    phone: { type: String, required: true, unique: true },
    country: { type: String, },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('users', useSchema)
