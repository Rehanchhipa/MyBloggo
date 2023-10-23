import DbConnect from "@/app/libray/DbConnect";
import schemaAllBlogs from "@/app/libray/schemaAllBlogs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function DELETE(response ,content){

    // let res = await response.json()
    let id = content.params.id

    await mongoose.connect(DbConnect).then(()=>{
        console.log('delete api connect')
    })

    let find = await schemaAllBlogs.findOne({_id:id})

    if (find != null){
        let schema = await schemaAllBlogs.findOneAndDelete({_id:id})
        let result = await schemaAllBlogs.find()

        return NextResponse.json({
            data:result,
            message:'successfully delete'
        })
    }else {

        return NextResponse.json({
            data:null,
            message:'not found try again'
        })
    }


}