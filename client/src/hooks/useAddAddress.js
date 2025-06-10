// src/hooks/useAddAddressLogic.js
import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export  const useAddAddress = () => {
    const [address, setAddress] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: "",
    });

    const { axios, navigate, user } = useAppContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userId = user.id;
            const { data } = await axios.post("/api/addresses/add", {
                address,
                userId,
            });
            if (data.success) {
                toast.success(data.message || "Address added successfully");
                navigate("/cart");
            } else {
                toast.error(data.message || "Failed to add address");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message || "Something went wrong"
            );
        }
    };

    useEffect(() => {
        if (!user) {
            navigate("/cart");
        }
    }, [user, navigate]);

    return {
        address,
        handleChange,
        handleSubmit,
    };
};

 
