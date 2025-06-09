import express from 'express';
import { addAddress, getAddress } from '../controllers/addressController.js';
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/add',protect, addAddress);
router.get('/get',protect, getAddress);

export default router;
