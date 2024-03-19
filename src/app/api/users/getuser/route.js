import User from "@/models/userModel.js";
import { connect } from "@/dbconfig/dbConfig.js";
import { NextResponse } from "next/server";
import { ApiError } from "@/helpers/ApiError.js";
import { verifyToken } from "@/helpers/verifyToken.js";

connect();

export async function GET(request){
    try {
        const id = verifyToken(request)
        if(!id) throw new ApiError(400, "id not recieved");
    
        const presentUser = await User.findById(id).select('-password');
        if(!presentUser) throw new ApiError(404, "user not found");
    
        return NextResponse.json({
            success: true,
            message: "User found successfully",
            data: presentUser
        }, {status: 200})
    } catch (error) {
        return  NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        })
    }
}