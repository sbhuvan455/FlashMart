import { ApiError } from "@/helpers/ApiError.js";
import { connect } from "@/dbconfig/dbConfig.js";
import User from "@/models/userModel.js";
import jwt from 'jsonwebtoken'
import { NextResponse } from "next/server";

connect();

export async function POST(request){

    try {
        const { email, name } = await request.json();
        console.log("1");
        if(!email) throw new ApiError(500, "email not recieved");
        console.log("2");
        const presentUser = await User.findOne({email});
        console.log("3");
    
        if(presentUser){
            console.log("4");
            const token = jwt.sign(
                {
                    id: presentUser._id
                }, 
                process.env.ACCESS_TOKEN_SECRET, 
                {
                    expiresIn: "1d"
                }
            )

            console.log("5");
    
            if(!token) throw new ApiError(500, "token not recieved");

            console.log("6");
    
            const response = NextResponse.json({
                message: "Successfully logged in",
                success: true,
                data: presentUser
            }, { status: 200 })

            console.log("7");
    
            response.cookies.set("access_token", token, { httpOnly: true, secure: true });
            console.log("8");
            return response;
            
        }else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            console.log("9");
            const newUser = await User.create({
                username: name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4),
                email,
                password: generatedPassword,
                address: "abc"
            })
            console.log("10");
            if(!newUser) throw new ApiError(500, "Unable to create user")
                console.log("11");
            const token = jwt.sign(
                {
                    id: newUser._id
                },
                process.env.ACCESS_TOKEN_SECRET,
                {
                    expiresIn: "1d"
                }
            )
            console.log("12");
            const response = NextResponse.json({
                message: "User created successfully",
                success: true,
                data: newUser
            }, { status: 200 })
            console.log("13");
            response.cookies.set("access_token", token, {
                httpOnly: true,
                secure: true
            })
            console.log("14");
            return response;
        }
    } catch (error) {
        console.log("15");
        const response = NextResponse.json({
            message: error.message,
            success: false
        }, {
            status: error.statusCode || 500
        })
        console.log("16");
        return response;
    }

}