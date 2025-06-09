import Product from '../models/Product.js';
import { v2 as cloudinary } from 'cloudinary';


export const addProduct = async (req, res) => {
    try {
        let productsData = JSON.parse(req.body.productData)
        const images = req.files

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {
                    resource_type: 'image'
                });
                return result.secure_url
            })
        )

        await Product.create({ ...productsData, image: imagesUrl })
        res.json({
            success: true,
            message: "Product added"
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
};




export const productsList = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


export const productById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



export const changeStock = async (req, res) => {
    const { id, inStock } = req.body;
    try {
        await Product.findByIdAndUpdate(id, { inStock })
        res.json({ success: true, message: "Stock is updated" })


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

};

// @desc Delete product
export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error });
    }
};
