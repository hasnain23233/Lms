const User = require('../Model/UserModel');
const bcrypt = require('bcrypt');

exports.portAuthRequest = async (req, res, next) => {
    try {
        console.log(req.body);
        const { name, email, password, confirmPassword, role, phone, country } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password and Confirm Password do not match" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const SaveUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            phone,
            country
        });

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
exports.portLoginRequest = async (req, res, next) => {
    try {
        const { email, password, role } = req.body;
        console.log(req.body)

        // Step 1: Email ke base pe user find karo
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Step 2: Password compare karo (bcrypt)
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Step 3: Role check karo
        if (user.role !== role) {
            return res.status(403).json({ message: "Access denied for this role" });
        }

        // Step 4: Token generate karo (JWT)
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        // Final Response (password mat bhejo)
        return res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
            },
        });

    } catch (err) {
        console.error("Error during login:", err.message);
        return res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};
