"use client"
import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCards';
import axios from 'axios';
import { useParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

const Page = () => {

  const [products, setProducts] = useState([]);
  const params = useParams()
  const { category } = params;

  const router = useRouter();

  const decodedCategory = category ? decodeURIComponent(category) : '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('/api/products/fetchdata', { category: decodedCategory });
        setProducts(response.data.data);
  
        if (response.data.success === false) router.push('/');
      } catch (error) {
        router.push('/');
      }
    };
  
    fetchData();
  }, [decodedCategory, router]);
  

  return (
    <>
    <h1 className='text-center text-3xl font-semibold font-sans my-8'>{decodedCategory}</h1>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
    </>
  );
};

export default Page;
