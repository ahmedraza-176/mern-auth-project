const express = require("express");
const router = express.Router();

const {
    register,
    login,
    logout
    
} = require("../controller/authController");
const {
    authMiddleware,
    adminMiddleware
} = require("../middleware/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

// Protected route
router.get("/profile", authMiddleware, (req, res) => {

    res.json({
        message: "Welcome to profile",
        user: req.user
    });

});

// Admin route
router.get("/admin", authMiddleware, adminMiddleware, (req, res) => {

    res.json({
        message: "Welcome Admin"
    });

});

module.exports = router;