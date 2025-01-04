import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
const  JWTSECRETKEY= '1234';

// signin routes ----
export async function POST(req:NextRequest){
    
    const body=await req.json();
    console.log('7..',body);
    if(req.url.includes('signin')){
        const token=jwt.sign(body.email,JWTSECRETKEY);
        return NextResponse.json({message:'Successfully signed In!',token});
    }
    else{
        return NextResponse.json({message:'Successfully signed up!'})
    }
}


