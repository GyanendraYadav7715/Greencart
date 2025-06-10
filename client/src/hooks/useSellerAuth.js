import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const useSellerAuth = () => {
    const { seller, setSeller, navigate, axios } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Check if already authenticated
    useEffect(() => {
        const checkSellerAuth = async () => {
            try {
                const { data } = await axios.get("/api/seller/is-auth");
                if (data.success) {
                    setSeller(true);
                    navigate("/seller");
                }
            } catch (error) {
                console.error("Seller auth check failed:", error);
            }
        };
        if (!seller) checkSellerAuth();
    }, [seller, navigate, axios, setSeller]);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post("/api/seller/login", {
                email,
                password,
            });
            if (data.success) {
                toast.success("Welcome Back Boss");
                setSeller(true);
                navigate("/seller");
            } else {
                toast.error(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Seller login error:", error);
            toast.error(
                error.response?.data?.message || error.message || "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        seller,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        onSubmitHandler,
    };
};

export default useSellerAuth;
