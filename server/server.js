import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import connectiontoMogodbcluster from "./configuration/database.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import addressRoutes from './routes/addressRoutes.js';
import orderRoutes from "./routes/orderRoutes.js"
import conncectCloudinary from "./configuration/cloudinary.js"
import { requestLogger } from "./middlewares/requestLogger.js";
import { stripeWebhooks } from "./controllers/orderController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ✅ Allow multiple frontend origins
const allowedOrigins = ['http://localhost:5173', 'https://greencart-frontend-pearl.vercel.app'];

app.post('/stripe', express.raw({
    type:" application/json"
}),stripeWebhooks)

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
    app.use(requestLogger);
}
await connectiontoMogodbcluster();
await conncectCloudinary();

app.get("/", (req, res) => {
    res.send("Api is working")
})
app.use("/api/user", userRoutes)
app.use("/api/seller", sellerRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/order', orderRoutes);


app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
