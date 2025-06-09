import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyOrders = () => {
  const [myOrder, setMyOrder] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      if (!user || !user.id) {
        toast.error("User not logged in");
        return;
      }

      // ✅ Await the request and destructure correctly
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

  return (
    <div className="mt-14 pb-16">
      <div className="flex flex-col items-end w-max mb-8">
        <p className="text-2xl font-medium uppercase">My Orders</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {myOrder.length > 0 ? (
        myOrder.map((order) => (
          <div
            key={order._id}
            className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl"
          >
            <p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
              <span>Order ID: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>
                Total Amount: {currency}
                {order.amount}
              </span>
            </p>

            {order.items.map((item, idx) => (
              <div
                key={item.product._id + idx}
                className={`relative bg-white text-gray-500/70 ${
                  idx !== order.items.length - 1
                    ? "border-b border-gray-500 pb-4 mb-4"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between ">
                  <div className="flex items-center">
                    <div className="bg-primary/10 p-4 rounded-lg">
                      <img
                        src={item.product.image?.[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    <div className="ml-4">
                      <h2 className="text-xl font-medium text-gray-800">
                        {item.product.name}
                      </h2>
                      <p>Category: {item.product.category}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center md:ml-8 mb-4 md:mb-0">
                    <p>Quantity: {item.quantity || "1"}</p>
                    <p>Status: {order.status}</p>
                    <p>
                      Date:{" "}
                      {new Date(
                        order.createdt || order.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-primary">
                    Amount: {currency}
                    {item.product.offerPrice * (item.quantity || 1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default MyOrders;
