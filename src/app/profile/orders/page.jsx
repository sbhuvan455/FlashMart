"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Orders() {
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("/api/orders/getuserorders")
      .then((response) => {
        console.log(response.data.data);
        setFilteredOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilter = () => {
    setIsLoading(true); // Start loading
    if (selectedDate) {
      const filtered = filteredOrders.filter((order) => {
        const orderDate = new Date(order.date).toISOString().split("T")[0];
        return orderDate === selectedDate;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(filteredOrders);
    }

    setIsLoading(false); // Stop loading
  };

  function LoaderCircle() {
    return (
      <svg
        className="animate-spin h-8 w-8 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
    );
  }

  return (
    <div className="p-6 overflow-y-scroll h-[70vh] my-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleFilter}
          className="ml-4 px-4 py-2 bg-black text-white rounded-lg hover:bg-black"
        >
          Find Orders
        </button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <span>
            <LoaderCircle />
          </span>
        </div>
      ) : filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800 md:visible hidden">
                  Order #{order._id}
                </h2>
                <p className="text-gray-500">
                  {new Date(order.date).toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong className="text-gray-600">Total Cost:</strong> ₹
                  {order.totalCost}
                </p>
                <p>
                  <strong className="text-gray-600">Payment Type:</strong>{" "}
                  {order.paymentType}
                </p>
                <p>
                  <strong className="text-gray-600">Items:</strong>{" "}
                  {order.items.length}
                </p>
                <p>
                  <strong className="text-gray-600">Quantity:</strong>{" "}
                  {order.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">
          No orders found for the selected date.
        </p>
      )}
    </div>
  );
}
