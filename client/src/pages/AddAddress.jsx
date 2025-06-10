import InputField from "../components/InputField";
import { assets } from "../assets/assets";
import { useAddAddress } from "../hooks/useAddAddress"; // 👈

const AddAddress = () => {
  const { address, handleChange, handleSubmit } = useAddAddress();

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
