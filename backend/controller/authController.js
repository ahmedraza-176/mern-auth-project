const User = require("../models/User");
const  bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register 
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check karo user pehle se exist toh nahi karta
        const existUser = await User.findOne({ email });

        if (existUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        // Password hash karo
        const hashedPassword = await bcrypt.hash(password, 10);

        // Database mein user create karo
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Success response frontend ko bhejo
        res.status(201).json({
            message: "Register successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
// LOGIN
const login = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Wrong password"
            });
        }

       
        // Generate token
const token = jwt.sign(
    {
        id: user._id,
        role: user.role
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
);

// Save token in cookie
res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000
});

res.json({
    message: "Login successful"
});

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const logout = (req, res) => {

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    });

    res.json({
        message: "Logout successful"
    });

};

module.exports = {
    register,
    login,
    logout
};
