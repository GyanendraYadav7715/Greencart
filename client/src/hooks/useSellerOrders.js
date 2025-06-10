import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const useSellerOrders = () => {
    const { axios, currency } = useAppContext();
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("/api/order/seller", {
                params: { ts: Date.now() }, // bypass caching
                headers: { "Cache-Control": "no-cache" },
            });
            const data = response.data;
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message || "Failed to fetch orders");
            }
        } catch (error) {
            toast.error(
                error?.response?.data?.message ||
                error.message ||
                "Error fetching orders"
            );
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    return { orders, currency };
};

export default useSellerOrders;
