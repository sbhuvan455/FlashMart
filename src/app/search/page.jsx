"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from '@/components/ProductCards';
import axios from "axios";

function page() {
  const [searchResults, setSearchResults] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `/api/products/searchproduct?query=${search}`
        );
        const response = res.data;

        setSearchResults(response.data);
      } catch (error) {
        console.log(error);
        setSearchResults([]);
      }
    };

    fetchResults();
  }, [search, searchParams]);

  return (
    <div className="mx-20 my-6">
      {searchResults.length} results found
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 my-5 mb-14 md:mb-5">
        {searchResults.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default page;
