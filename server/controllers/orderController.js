import Order from "../models/Order.js"
import Product from "../models/Product.js"
import User from "../models/User.js"
import stripe from "stripe"
export const placeorderCOD = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invaild data"

            })
        }
        // calculate Amount Using items

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        //add tax charge (2%)

        amount += Math.floor(amount * 0.02)
        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "COD"

        });
        res.json({
            success: true,
            message: "order place successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}


export const getOrderByUserId = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing userId" });
        }

        const order = await Order.find({
            userId,
            $or: [{ paymentType: "COD" }
                , { isPaid: true }]
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
            $or: [{ paymenType: "COD" }, { isPaid: false }]

        }).populate("items.product address").sort({
            createdAt: -1
        })
            ;

        res.json({
            success: true,
            orders
        })


    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const placeorderStripe = async (req, res) => {
    try {
        const { userId, items, address } = req.body;
        const { origin } = req.headers;
        if (!address || items.length === 0) {
            return res.json({
                success: false,
                message: "Invaild data"

            })
        }
        let productData = [];
        // calculate Amount Using items

        let amount = await items.reduce(async (acc, item) => {
            const product = await Product.findById(item.product);
            productData.push({
                name: product.name,
                price: product.offerPrice,
                quantity: item.quantity
            })
            return (await acc) + product.offerPrice * item.quantity
        }, 0)

        //add tax charge (2%)

        amount += Math.floor(amount * 0.02)
        const order = await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: "Online"

        });

        //stripe gateway initalize

        const stripeinstance = new stripe(process.env.STRIPE_SECRET_KEY);
        //create line items for stripe

        const line_items = productData.map((item) => {
            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.floor(item.price + item.price * 0.02) * 100
                },
                quantity: item.quantity,
            }
        })


        //create session

        const session = await stripeinstance.checkout.sessions.create({
            line_items,
            mode: "payment",
            success_url: `${origin}/loader/?next=my-orders`,
            cancel_url: `${origin}/cart`,
            metadata: {
                orderId: order._id.toString(),
                userId
            }

        })

        res.json({
            success: true,
            url: session.url,
            message: "order place successfully"
        })

    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

export const stripeWebhooks = async (req, res) => {
    const stripeinstance = new stripe(process.env.STRIPE_SECRET_KEY);
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripeinstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        )
    } catch (error) {
        res.status(400).send(`Webhook erro ${error.message}`)
    }

    //handle the event

    switch (event.type) {
        case "payment_intent_succeeded": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeinstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })
            const { orderId, userId } = session.data[0].metadata;
            //AMrk paymen tas paid

            await Order.findByIdAndUpdate(orderId, { isPaid: true })
            //clear user cart

            await User.findByIdAndUpdate(userId, { cartItems: {} })
            break;
        }

            

        case "payment_intent_failed": {
            const paymentIntent = event.data.object;
            const paymentIntentId = paymentIntent.id;

            const session = await stripeinstance.checkout.sessions.list({
                payment_intent: paymentIntentId,
            })
            const { orderId, userId } = session.data[0].metadata;
            await Order.findByIdAndDelete(orderId);
            break;
        }
           
        default:
            console.error(`unhandle event type ${event.type}`)
            break;
    }
    response.json({
        recived:true
    })

}