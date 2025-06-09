import express from 'express';
import upload from '../configuration/multer.js';
import {
    addProduct,
    productsList,
    productById,
    changeStock,
    deleteProduct,
} from '../controllers/productController.js';
import { authSeller } from '../middlewares/authSeller.js';

const router = express.Router();

// ✅ Correct usage of upload middleware
router.post('/add', authSeller, upload.array('image', 5), addProduct);

router.get('/list', productsList);
router.get('/:id', productById);
router.put('/stock', changeStock);
router.delete('/:id', deleteProduct);

export default router;
