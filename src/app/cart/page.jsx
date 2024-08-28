"use client"
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem } from '@/store/cartSlice.js';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const items = useSelector((state) => state.cart.items);
  const totalQuantity = useSelector((state) => state.cart.quantity);
  const totalPrice = useSelector((state) => state.cart.price);

  const handleAddItem = (item, key) => {
    dispatch(addItem({...item, _id: key}));
  };

  const handleRemoveItem = (item, key) => {
    
    if(item.qty == 1){
      dispatch(removeItem({...item, qty: 0, _id: key}));
    }else{
      dispatch(removeItem({...item, _id: key}));
    }
    
  };

  const handleDelivery = () => {
    console.log("routing delivery")
    router.push('/tracker')
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Cart Items</h2>
        {Object.keys(items).length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <ul>
            {Object.keys(items).map((key) => {
              const item = items[key];
              return (
                <li key={key} className="flex items-center justify-between py-4 border-b">
                  <div className="flex items-center space-x-4">
                    <img src={item.images} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-gray-600">Price: ₹{item.price}</p>
                      {/* <p className="text-gray-600">Quantity: {item.qty}</p> */}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      onClick={() => handleAddItem(item, key)}
                    >
                      +
                    </button>
                    <p>{item.qty}</p>
                    <button 
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleRemoveItem(item, key)}
                    >
                      -
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Total</h2>
        <p className="text-lg">Total Quantity: {totalQuantity}</p>
        <p className="text-lg">Total Price: ₹{totalPrice.toFixed(2)}</p>

        <Button className="w-full my-4">Proceed To Checkout</Button>
        <Button className="w-full" variant="outline" onClick={handleDelivery}>Pay on Delivery</Button>
      </div>
    </div>
  );
};

export default Cart;