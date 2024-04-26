import { connect } from "@/dbconfig/dbConfig.js"
import { ApiError } from "@/helpers/ApiError.js";
import Product from "@/models/productModel.js";
import { NextResponse } from "next/server";

connect();

export async function POST(request){
    try {
        const { name, category, price, quantity, images } = await request.json();
        if(!name || !category || !price || !quantity || !images) throw new ApiError (400, "All fields are required")

        const newProduct = await Product.create({
            name,
            category,
            price,
            quantity,
            images
        })

        if(!newProduct) throw new ApiError(500, "Unable to store product")

        const response = NextResponse.json({
            message: "Product created successfully",
            success: true,
        }, {
            status: 200,
        })

        return response;
    } catch (error) {
        const response = NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        })

        return response;
    }
}