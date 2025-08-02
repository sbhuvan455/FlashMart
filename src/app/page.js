import React from "react";
import HomePage from "@/components/HomePage";

const Page = async () => {
  const base_Url = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const categories = [
    "Fruits & Vegetables",
    "Daily use Products",
    "Masala & Dry Fruits",
    "Toys",
    "Baby Products",
    "Dairy Bread and Eggs",
  ];

  const categoryData = await Promise.all(
    categories.map(async (category) => {
      const res = await fetch(`${base_Url}/api/products/fetchdata`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ category }),
      });

      if (!res.ok) {
        console.error(
          `Failed to fetch category "${category}":`,
          await res.text()
        );
        return [];
      }

      const json = await res.json();
      return json?.data ?? [];
    })
  );

  // console.log("Category Data:", categoryData);

  return (
    <div className="my-3">
      <HomePage categoryData={categoryData} />
    </div>
  );
};

export default Page;
