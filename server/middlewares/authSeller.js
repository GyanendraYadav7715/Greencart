import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
    const { sellertoken } = req.cookies;

    if (!sellertoken) {
        return res.status(401).json({
            success: false,
            message: "Seller token not found"
        });
    }

    try {
        const decoded = jwt.verify(sellertoken, process.env.JWT_SECRET);

        if (decoded.email === process.env.SELLER_EMAIL) {
            next(); // Authorized
        } else {
            res.status(403).json({
                success: false,
                message: "Not authorized as seller"
            });
        }

    } catch (err) {
        console.error("Auth Error:", err);
        res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
