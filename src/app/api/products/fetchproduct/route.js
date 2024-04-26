import { connect } from "@/dbconfig/dbConfig.js";
import { NextResponse } from "next/server";
import { ApiError } from "@/helpers/ApiError.js";
import Product from "@/models/productModel";

connect();

export async function POST(request) {
  try {
    const { id } = await request.json();
    if (!id) throw new ApiError(400, "Id not provided");

    const product = await Product.findById(id);
    if (!product) throw new ApiError(404, "Product not found");

    const response = NextResponse.json(
      {
        message: "Product Fetched successfully",
        data: product,
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
