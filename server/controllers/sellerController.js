import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const loginSeller = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {


            const token = jwt.sign(
                { email },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRE || "3d" }
            );
            res.cookie("sellertoken", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                success: true,
                message: "Seller logged in successfully",
            });

        }
        return res.status(401).json({
            success: false,
            message: "Invalid seller credentials",
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};



export const isSellerAuth = (req, res) => {
    try {
        const token = req.cookies.sellertoken;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token provided",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return res.json({ success: true });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

export const logoutSeller = (req, res) => {
    try {
        res.clearCookie("sellertoken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        });
        res.status(200).json({
            success: true,
            message: "Seller logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
