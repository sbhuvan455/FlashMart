import { connect } from "@/dbconfig/dbConfig.js";
import { ApiError } from "@/helpers/ApiError.js";
import Product from "@/models/productModel.js";
import { NextResponse } from "next/server";
import redisClient from "@/lib/redis";

connect();

export async function POST(request) {
  try {
    const { category } = await request.json();

    if (!category) throw new ApiError(400, "Category is required");

    // const cachedData = await redisClient.get(category);
    const cachedData = await redisClient.get(category);

    if (cachedData) {
      console.log("Cache hit for category:", category);
      return NextResponse.json(
        {
          message: "Product fetched from cache",
          data: JSON.parse(cachedData),
          success: true,
        },
        { status: 200 }
      );
    }

    const products = await Product.find({ category });

    await redisClient.set(category, JSON.stringify(products), "EX", 60 * 5);

    const response = NextResponse.json(
      {
        message: "Product Fetched successfully",
        data: products,
        success: true,
      },
      {
        status: 200,
      }
    );

    return response;
  } catch (error) {
    const response = NextResponse.json(
      {
        message: error.message,
        success: false,
      },
      {
        status: error.statusCode || 500,
      }
    );

    return response;
  }
}
