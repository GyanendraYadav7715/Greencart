import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

export const useAddProductForm = () => {
  const { axios } = useAppContext();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    offerPrice: "",
  });

  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false); // ✅ loading state

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ disable the button

    try {
      const form = new FormData();
      form.append("productData", JSON.stringify(formData));

      images.forEach((img) => {
        if (img) form.append("image", img);
      });

      const { data } = await axios.post("/api/product/add", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        toast.success(data.message, {
          duration: 2000,
          position: "top-center",
        });
        setFormData({
          name: "",
          description: "",
          category: "",
          price: "",
          offerPrice: "",
        });
        setImages([null, null, null, null]);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
        duration: 2000,
        position: "top-center",
      });
    } finally {
      setTimeout(() => {
        setLoading(false); // ✅ re-enable after toast delay
      }, 2000); // toast duration must match
    }
  };

  return {
    formData,
    images,
    loading, // 🔥 return loading to control button
    handleInputChange,
    handleImageChange,
    handleSubmit,
  };
};
