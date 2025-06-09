import express from 'express';
import { placeorderCOD, getOrderByUserId, getAllOrders, placeorderStripe } from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authSeller } from '../middlewares/authSeller.js';

const router = express.Router();

router.post('/cod', protect, placeorderCOD);
router.get('/user', protect, getOrderByUserId);
router.get('/seller', authSeller, getAllOrders);
router.post('/stripe', protect, placeorderStripe);


export default router;
