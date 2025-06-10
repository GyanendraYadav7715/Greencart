import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const useCartLogic = () => {
    const {
        products,
        currency,
        cartItems,
        setCartItems,
        navigate,
        axios,
        user,
    } = useAppContext();

    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState("COD");

    const getCart = () => {
        const tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item) => item._id === key);
            if (product && product.offerPrice != null) {
                tempArray.push({ ...product, quantity: cartItems[key] });
            } else {
                console.warn(`Product not found or invalid for cart item key: ${key}`);
            }
        }
        setCartArray(tempArray);
    };

    const getUserAddress = async () => {
        try {
            const { data } = await axios.get(`/api/addresses/get?userId=${user._id}`);
            if (data.success) {
                setAddresses(data.addresses);
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0]);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const placeOrder = async () => {
        try {
            if (!selectedAddress) return toast.error("Please select an address");

            const payload = {
                userId: user._id,
                items: cartArray.map((item) => ({
                    product: item._id,
                    quantity: item.quantity,
                })),
                address: selectedAddress._id,
            };

            const endpoint =
                paymentOption === "COD" ? "/api/order/cod" : "/api/order/stripe";
            const { data } = await axios.post(endpoint, payload);

            if (data.success) {
                if (paymentOption === "COD") {
                    toast.success(data.message);
                    setCartItems({});
                    navigate("/my-orders");
                } else {
                    window.location.replace(data.url);
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (products.length > 0 && cartItems) getCart();
    }, [products, cartItems]);

    useEffect(() => {
        if (user) getUserAddress();
    }, [user]);

    return {
        cartArray,
        addresses,
        showAddress,
        setShowAddress,
        selectedAddress,
        setSelectedAddress,
        paymentOption,
        setPaymentOption,
        placeOrder,
        currency,
    };
};

export default useCartLogic;
