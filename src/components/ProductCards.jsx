// components/ProductCard.js
import React from 'react';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product }) => {
  
  const { _id, name, price, quantity, images } = product;
  const router = useRouter();

  const addToCart = () => {
    // Implement the logic to add the product to the cart
    console.log(`Added ${name} to cart`);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border-[1px] w-40 h-[260px] md:w-64 md:h-[340px] transition duration-300 ease-in-out cursor-pointer select-none" onClick={() => router.push(`/product/${_id}`)}>
      <img className="md:h-40 h-20 w-2/3 mx-auto object-center" src={images[0]} alt={name} />
      <div className="p-6">
        <h2 className="md:font-semibold text-sm md:text-base font-sans text-gray-800 card__preview-text">{name}</h2>
        <p className="text-card-foreground mt-2">₹{price}</p>
        <p className="text-card-foreground mt-1">{quantity}</p>
        <button onClick={addToCart} className="mt-4 bg-primary text-xs text-white py-2 px-4 rounded-md hover:bg-primary-dark transition duration-300 ease-in-out">
          Add to Cart
        </button>
      </div>
    </div>  
  );
};

export default ProductCard;
