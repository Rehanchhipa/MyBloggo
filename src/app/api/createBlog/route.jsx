import DbConnect from "@/app/libray/DbConnect";
import schemaAllBlogs from "@/app/libray/schemaAllBlogs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(response){

    let res = await response.json()

    await mongoose.connect(DbConnect).then(()=>{
        console.log('create login api connect')
    })

    let schema = await schemaAllBlogs(res)
    let result = await schema.save()

    let resolve = await schemaAllBlogs.find()

    return NextResponse.json({
        data:resolve,
        message:'create sucessfully'
    })
}