
// Haan bilkul! 👍 Ye Authentication Middleware hai. Iska kaam hai check karna ke user login hai ya nahi aur uska JWT token valid hai ya nahi.
// Chalo beginner level par step by step sam
// Middleware ek function hota hai jo request aur controller ke darmiyan kaam karta hai.
// req = Frontend ki request.
// res = Frontend ko response.
// next = Agle function/controller par bhejna.
// split(" ") isko 2 parts mein divide karta hai:
// - [0] = Bearer
// - [1] = Actual token
const jwt = require("jsonwebtoken");
// Check karega user login hai ya nahi.
// Token check
const authMiddleware = (req, res, next) => {

    try {
// Frontend se token receive karta hai.req.headers.authorization?
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "Token required"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        res.status(401).json({
            message: "Invalid or expired token"
        });

    }
};
// Check karega user admin hai ya nahi.
const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "Access denied. Admin only"
        });
    }

    next();
};

module.exports = { authMiddleware, adminMiddleware };
