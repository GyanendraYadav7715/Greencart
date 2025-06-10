import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const useUserAuth = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const { setShowUserLogin, setUser, navigate } = useAppContext();

    const validate = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email");
            return false;
        }
        if (!password) {
            toast.error("Password is required");
            return false;
        }
        if (state === "register" && !name) {
            toast.error("Name is required for registration");
            return false;
        }
        return true;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            const { data } = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password,
            });

            setUser(data.user);
            toast.success(data.message);
            setShowUserLogin(false);
            navigate("/");
        } catch (error) {
            toast.error(
                error.response?.data?.message || error.message || "Operation failed"
            );
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        setState,
        name,
        setName,
        email,
        setEmail,
        password,
        setPassword,
        loading,
        onSubmitHandler,
        setShowUserLogin
    };
};

export default useUserAuth;
