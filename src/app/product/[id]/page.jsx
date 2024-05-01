"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import axios from "axios";

function Page() {
  const [product, setProduct] = useState({});
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.post("/api/products/fetchproduct", params);
        const response = res.data;

        console.log(response.data);
        setProduct(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [params]);

  return (
    <div className="flex w-full justify-center gap-20 my-5">
      <div className="w-1/2 h-[70vh] border-2 border-black/5 rounded-md flex items-center justify-center">
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
          <h1 className="text-2xl font-bold font-sans my-14">₹ {product.price}</h1>
        </div>
        <Button variant="default" className="w-32">Add</Button>
      </div>
    </div>
  )
}

export default Page;
