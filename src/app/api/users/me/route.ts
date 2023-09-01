import {connect} from "@/dbConfig/dbConfig"
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModels";

connect();

export async function GET(request: NextRequest ){
    try {
        
        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password")
        console.log("me user : "+ user);
        
        return NextResponse.json({message: "success", data: user})

    } catch (error: any) {
        console.log("me catch : "+ error);
        return NextResponse.json({error: error.message}, {status: 400})
    }
}