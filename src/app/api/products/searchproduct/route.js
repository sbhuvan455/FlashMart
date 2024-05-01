import { connect } from "@/dbconfig/dbConfig.js";
import { ApiError } from "@/helpers/ApiError.js";
import Product from "@/models/productModel.js";
import { NextResponse } from "next/server";

connect();

export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    // query is "hello" for /api/search?query=hello

    if(!query) throw new ApiError(400, "query not found");

    const data = await Product.aggregate([
    [
        {
        $match: {
            $or: [
            { name: { $regex: query, $options: "i" } },
            { category: { $regex: query, $options: "i" } },
            ],
        },
        },
    ],
    ]);

    if(!data || data.length === 0) throw new ApiError(404, "data not found");

    const response = NextResponse.json({
        message: "search succeessful",
        success: true,
        data
    },{
        status: 200
    })

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
