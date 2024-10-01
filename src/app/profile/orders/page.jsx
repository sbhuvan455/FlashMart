"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Orders() {
  const [selectedDate, setSelectedDate] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

    useEffect(() => {
      axios.get('/api/orders/getuserorders')
        .then((response) => {
          console.log(response.data.data);
          setFilteredOrders(response.data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleFilter = () => {
    if (selectedDate) {
      const filtered = filteredOrders.filter(order => {
        const orderDate = new Date(order.date).toISOString().split('T')[0];
        return orderDate === selectedDate;
      });
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(filteredOrders);
    }
  };

  return (
    <div className="p-6 overflow-y-scroll h-[70vh] my-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Orders</h1>
      <div className="flex justify-between items-center mb-4">
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        />
        <button
          onClick={handleFilter}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Find Orders
        </button>
      </div>
      {filteredOrders.length > 0 ? (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800 md:visible hidden">Order #{order._id}</h2>
                <p className="text-gray-500">{new Date(order.date).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong className="text-gray-600">Total Cost:</strong> ₹{order.totalCost}
                </p>
                <p>
                  <strong className="text-gray-600">Payment Type:</strong> {order.paymentType}
                </p>
                <p>
                  <strong className="text-gray-600">Items:</strong> {order.items.length}
                </p>
                <p>
                  <strong className="text-gray-600">Quantity:</strong> {order.quantity}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No orders found for the selected date.</p>
      )}
    </div>
  );
}
