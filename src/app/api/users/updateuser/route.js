import { verifyToken } from "@/helpers/verifyToken.js";
import { connect } from "@/dbconfig/dbConfig.js";
import { ApiError } from "@/helpers/ApiError.js";
import User from "@/models/userModel.js";
import { NextResponse } from "next/server";


connect();

export async function POST(request){
    try {
        const id = verifyToken(request);
        if(!id) throw new ApiError(400, "Unauthorized user");

        const { username, email, address } = await request.json();

        if(!username || !email || !address) throw new ApiError(400, "All fields should have some value");
        
        const user = await User.findById(id);
        if(!user) throw new ApiError(404, "User not found");

        user.username = username;
        user.email = email;
        user.address = address;
        
        await user.save();
    
        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            data: user
        }, {status: 200})

    } catch (error) {

        return NextResponse.json({
            success: false,
            message: error.message
        }, {
            status: error.statusCode || 500
        })
    }
}