import User from "../models/User.js";  

export const updateCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { cartItems } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { cartItems },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        res.status(200).json({
            success: true,
            message: "Cart is updated",
            data: updatedUser.cartItems,
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };