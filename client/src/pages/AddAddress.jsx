import { useEffect, useState } from "react";
import InputField from "../components/InputField";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const AddAddress = () => {
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

  return (
    <div className="min-h-[90vh] flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-10 bg-white">
      {/* Form Section */}
      <div className="md:w-1/2 w-full">
        <h1 className="text-3xl font-semibold mb-8">
          Add Shipping <span className="text-primary">Address</span>
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <InputField
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>
          <InputField
            type="email"
            name="email"
            value={address.email}
            onChange={handleChange}
            placeholder="Email address"
          />
          <InputField
            type="text"
            name="street"
            value={address.street}
            onChange={handleChange}
            placeholder="Street"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
            />
            <InputField
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              type="text"
              name="zipcode"
              value={address.zipcode}
              onChange={handleChange}
              placeholder="Zip code"
            />
            <InputField
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              placeholder="Country"
            />
          </div>
          <InputField
            type="number"
            name="phone"
            value={address.phone}
            onChange={handleChange}
            placeholder="Phone"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dull transition cursor-pointer"
          >
            SAVE ADDRESS
          </button>
        </form>
      </div>

      {/* Illustration */}
      <div className="hidden md:flex w-1/2 justify-center">
        <img
          src={assets.add_address_iamge}
          alt="Address Illustration"
          className="w-2/3"
        />
      </div>
    </div>
  );
};

export default AddAddress;
