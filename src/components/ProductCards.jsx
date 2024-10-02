// components/ProductCard.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "@/store/cartSlice";

const ProductCard = ({ product }) => {
  const { _id, name, price, quantity, images } = product;
  const router = useRouter();

  const { items } = useSelector(state => state.cart);

  const dispatch = useDispatch();

  const [counter, setCounter] = useState(0);

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

    if(items[_id]){
      setCounter(items[_id].qty);
    }

  }, [items])

  return (
    <div
      className="bg-white rounded-lg overflow-hidden border-[1px] w-40 h-[260px] md:w-64 md:h-[340px] transition duration-300 ease-in-out cursor-pointer select-none"
      onClick={() => router.push(`/product/${_id}`)}
    >
      <img
        className="md:h-40 h-20 w-2/3 mx-auto object-center"
        src={images[0]}
        alt={name}
      />
      <div className="p-6">
        <h2 className="md:font-semibold text-sm md:text-base font-sans text-gray-800 card__preview-text">
          {name}
        </h2>
        <p className="text-card-foreground mt-2">₹{price}</p>
        <p className="text-card-foreground mt-1">{quantity}</p>
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
};

export default ProductCard;
