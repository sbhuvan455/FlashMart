import { connect } from "@/dbconfig/dbConfig.js";
import { ApiError } from "@/helpers/ApiError.js";
import { NextResponse } from "next/server";


connect()

export async function DELETE(request){
    try {
        const token = request.cookies.get('access_token')?.value || "";
        if(!token) throw new ApiError(400, "Access token not found")

        const response = NextResponse.json({
            success: true,
            message: "User Logged Out"
        }, {status: 200})

        response.cookies.delete('access_token')

        return response;
    } catch (error) {
        return NextResponse.json({
            message: error.message,
            success: false,
        }, {status: 500})
    }
}