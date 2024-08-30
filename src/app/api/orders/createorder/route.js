import { ApiError } from "@/helpers/ApiError.js";
import { NextResponse } from "next/server";
import Order from "@/models/orderModel.js";
import { verifyToken } from "@/helpers/verifyToken.js";


export async function POST(request){
    try {
        const { items, quantity, totalCost, paymentType } = await request.json();

        if (!items || !quantity || !totalCost || !paymentType) throw new ApiError(400, "All fields are required");

        const customer = verifyToken(request);

        if(!customer) throw new ApiError(400, 'You are not authorized');


        const newOrder = await Order.create({
            customer,
            items,
            quantity,
            totalCost,
            paymentType,
        });

        if(!newOrder) throw new ApiError(500, "Unable to create order");

        return NextResponse.json({
            success: true,
            message: "Order created successfully",
            data: newOrder
        }, { status: 201})

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