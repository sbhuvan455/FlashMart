import { connect } from "@/dbconfig/dbConfig.js"
import { ApiError } from "@/helpers/ApiError.js";
import Product from "@/models/productModel.js";
import { NextResponse } from "next/server";

connect();

export async function POST(request) {
    try {

        const { category } = await request.json();

        if (!category) throw new ApiError(400, "Category is required");


        const products = await Product.find({ category });

        const response = NextResponse.json({
            message: "Product Fetched successfully",
            data: products,
            success: true,
        }, {
            status: 200,
        });

        return response;
    } catch (error) {
        const response = NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        });

        return response;
    }
}