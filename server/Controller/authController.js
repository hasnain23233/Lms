const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

exports.portAuthRequest = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, password, confirmPassword, role, phone, country } = req.body;

        // Confirm password check
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const SaveUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            country
        });

        // Save to DB
        await SaveUser.save();

        console.log('User saved successfully');
        return res.status(201).json({
            message: "User registered successfully",
            user: { name, email, role, phone, country }  // password ko response mai mat bhejo
        });

    } catch (err) {
        console.error("Error saving user:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
