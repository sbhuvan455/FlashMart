"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";
import axios from "axios";

function Page() {
  const [product, setProduct] = useState({});
  const [counter, setCounter] = useState(0);

  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/products/fetchproduct", { id: params.id });
        const response = res.data;

        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error.message);
      }
    };

    fetchData();
  }, [params]);

  const addToCart = (event) => {
    event.stopPropagation();
    const newCounter = counter + 1;
    setCounter(newCounter);

    dispatch(addItem({ ...product, qty: newCounter }));
  };

  const removeFromCart = (event) => {
    event.stopPropagation();
    const newCounter = counter - 1;
    setCounter(newCounter);

    dispatch(removeItem({ ...product, qty: newCounter }));
  };

  useEffect(() => {
    if (items[product._id]) {
      setCounter(items[product._id].qty);
    }
  }, [items, product._id]);

  return (
    <div className="flex md:flex-row flex-col w-full items-center justify-center gap-20 my-5">
      <div className="w-1/2 md:h-[70vh] h-[30vh] border-2 border-black/5 rounded-md flex items-center justify-center">
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : ""}
          alt={product.name}
          className="h-56"
        />
      </div>
      <div className="w-1/2 my-4">
        <div className="flex flex-col gap-3 justify-start">
          <h1 className="text-2xl font-bold font-sans">{product.name}</h1>
          <p className="text-xl font-light">{product.quantity}</p>
          <h1 className="text-2xl font-bold font-sans md:my-14 my-8">₹ {product.price}</h1>
        </div>
        {counter === 0 ? (
          <button
            onClick={addToCart}
            className="mt-4 bg-primary text-xs text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out z-10"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center mt-4">
            <button
              id="decrease"
              className="bg-primary text-white font-bold py-1 px-2 rounded-l"
              onClick={removeFromCart}
            >
              -
            </button>
            <input
              type="text"
              id="count"
              value={counter}
              className="w-16 py-1 text-center border border-gray-300 rounded-none select-none outline-none cursor-pointer"
              disabled={true}
              readOnly
            />
            <button
              id="increase"
              className="bg-primary text-white font-bold py-1 px-2 rounded-r"
              onClick={addToCart}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
