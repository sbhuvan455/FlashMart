"use client";

import React from "react";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/ProductCards";
import { Skeleton } from "@/components/ui/skeleton";

function HomePage({ categoryData }) {
  if (categoryData.length <= 0) {
    return (
      <div className="w-[90vw] mx-auto space-y-10">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <div className="flex space-x-4">
              {[...Array(4)].map((_, j) => (
                <Skeleton key={j} className="h-[200px] w-[200px]" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  //   console.log("Category Data:", categoryData);

  return (
    <div>
      <div className="mt-10 mb-24">
        {categoryData.map((category, index) => (
          <div key={index} className="mb-8">
            <div className="flex items-center justify-between mx-24 mb-4">
              <h1 className="text-xs md:text-2xl font-semibold text-foreground">
                {category[0]?.category}
              </h1>
              <Link
                href={`/${encodeURIComponent(category[0]?.category)}`}
                className="text-red-500"
              >
                See all →
              </Link>
            </div>

            <Carousel className="w-[90vw] mx-auto">
              <CarouselContent>
                {category.map((product, index) => (
                  <CarouselItem key={index} className="basis-1/8">
                    <ProductCard product={product} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
