import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import Stripe from "stripe";

export const placeorderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid data",
            });
        }

        let amount = 0;
        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({
                    success: false,
                    message: `Product with ID ${item.product} not found`,
                });
            }
            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02); // 2% tax

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD",
        });

        res.json({
            success: true,
            message: "Order placed successfully",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "Missing userId",
            });
        }

        const order = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }, { isPaid: true }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({ success: true, order });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            $or: [{ paymentType: "COD" }, { isPaid: false }],
        })
            .populate("items.product address")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            orders,
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const placeorderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;

        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invalid data",
            });
        }

        let productData = [];
        let amount = 0;

        for (const item of items) {
            const product = await Product.findById(item.product);
            if (!product) {
                return res.json({
                    success: false,
                    message: `Product with ID ${item.product} not found`,
                });
            }

            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity,
            });

            amount += product.offerPrice * item.quantity;
        }

        amount += Math.floor(amount * 0.02); // 2% tax

        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online",
        });

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const line_items = productData.map((item) => ({
            price_data: {
                currency: "usd", // change to "inr" if needed
                product_data: { name: item.name },
                unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
            },
            quantity: item.quantity,
        }));

        const session = await stripeInstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader/?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId,
            },
        });

        res.json({
            success: true,
            url: session.url,
            message: "Order placed successfully",
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message,
        });
    }
};

export const stripeWebhooks = async (req, res) => {
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"];
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    try {
        switch (event.type) {
            case "payment_intent_succeeded": {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;

                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });

                const { orderId, userId } = session.data[0].metadata;

                await Order.findByIdAndUpdate(orderId, { isPaid: true });
                await User.findByIdAndUpdate(userId, { cartItems: {} });
                break;
            }

            case "payment_intent_failed": {
                const paymentIntent = event.data.object;
                const paymentIntentId = paymentIntent.id;

                const session = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntentId,
                });

                const { orderId } = session.data[0].metadata;
                await Order.findByIdAndDelete(orderId);
                break;
            }

            default:
                console.error(`Unhandled event type ${event.type}`);
        }

        res.json({ received: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
