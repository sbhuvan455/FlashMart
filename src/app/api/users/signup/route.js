import mongoose from "mongoose";
import User from "@/models/userModel.js";
import { connect } from "@/dbconfig/dbConfig.js";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function POST(NextRequest){
    
    try {
        const reqbody = await NextRequest.json()
        console.log(reqbody)

        

    } catch (error) {
        return NextResponse.json({
            error: error.message,
            status: 500
        })
    }
}