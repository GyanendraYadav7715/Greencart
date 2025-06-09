import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
    const token = req.cookies.token; // Assumes token is stored in cookies
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Not authorized, token missing",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id }; // Sets req.user with the user's ID
        next();
    } catch (err) {
        console.error("Auth Error:", err.message);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};