import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client=new PrismaClient();

export async function GET(){
    const data=await client.user.findMany();
    return NextResponse.json(data);
}

export async function POST(req:NextRequest){
      
    const data=await req.json();
    console.log('data...',data);
    const resp=await client.user.create({
        data:{
            name:data.name,
            email:data.email,
            password:data.email
        }
    })
    console.log('resp..',resp);
    return NextResponse.json({message:'Successfully signed up !'});
}

export async function PUT(){
    return Response.json({message:'update'});
}
