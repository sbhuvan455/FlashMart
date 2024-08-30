import { ApiError } from "@/helpers/ApiError.js";
import { verifyToken } from "@/helpers/verifyToken.js";
import Order from "@/models/orderModel.js";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request){
    try {
        const customerId = verifyToken(request);

        if(!customerId) throw new ApiError(400, "You are not authorized");

        const orders = await Order.aggregate([{
            $match: {
                'customer': mongoose.Types.ObjectId(customerId)
            }
        }])

        if(!orders) throw new ApiError(500, "Unable to fetch orders");

        return NextResponse.json({
            success: true,
            message: "Order fetched successfully",
            data: orders
        }, {
            status: 200,
        })
    } catch (error) {
        const response = NextResponse.json({
            message: error.message,
            success: false,
        }, {
            status: error.statusCode || 500
        })

        return response;
    }
}