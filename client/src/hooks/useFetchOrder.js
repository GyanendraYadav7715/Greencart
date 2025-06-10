import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export const useFetchOrder = () => {
    const [myOrder, setMyOrder] = useState([]);
    const { currency, axios, user } = useAppContext();
   
    const fetchMyOrders = async () => {
        try {
            if (!user || !user._id) {
                toast.error("User not logged in");
                return;
            }
            const response = await axios.get("/api/order/user", {
                params: { userId: user._id },
            });
            const data = response.data;

            if (data && data.success) {
                setMyOrder(data.order);
            } else {
                toast.error(data?.message || "Failed to fetch orders");
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
        if (user) {
            fetchMyOrders();
        }
    }, [user]);

    return {
        myOrder,
        currency
    }
}

  