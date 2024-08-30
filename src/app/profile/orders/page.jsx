"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Order() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('/api/orders/getuserorders')
      .then((response) => {
        console.log(response.data.data);
        setOrders(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // return (
  //   <div className="p-4 overflow-y-scroll h-[60vh]">
  //     <h1 className="text-2xl font-bold mb-4 mx-auto text-center">Your Orders</h1>
  //     {orders.length > 0 ? (
  //       <div className="space-y-4">
  //         {orders.map((order, index) => (
  //           <div key={order._id} className="border p-4 rounded-lg shadow-sm">
  //             <h2 className="font-thin text-black mb-2">Order #{order._id}</h2>
  //             <p><strong>Date:</strong> {new Date(order.date).toLocaleString()}</p>
  //             <p><strong>Total Cost:</strong> ₹{order.totalCost}</p>
  //             <p><strong>Payment Type:</strong> {order.paymentType}</p>
  //             <p><strong>Items:</strong> {order.items.length}</p>
  //             <p><strong>Quantity:</strong> {order.quantity}</p>
  //           </div>
  //         ))}
  //       </div>
  //     ) : (
  //       <p>No orders found.</p>
  //     )}
  //   </div>
  // );

  return (
    <div className="p-6 overflow-y-scroll h-[70vh] my-auto bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Orders</h1>
      {orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={order._id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-gray-800 md:visible hidden">Order #{order._id}</h2>
                <p className="text-gray-500">{new Date(order.date).toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <p>
                  <strong className="text-gray-600">Total Cost:</strong> ₹
                  {order.totalCost}
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
        <p className="text-gray-500 text-center">No orders found.</p>
      )}
    </div>
  )
}

export default Order;
