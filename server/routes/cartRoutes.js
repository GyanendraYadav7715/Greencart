import express from 'express';
import { updateCart } from "../controllers/cartController.js"
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/update", protect, updateCart);

export default router;