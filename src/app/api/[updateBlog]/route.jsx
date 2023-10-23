import DbConnect from "@/app/libray/DbConnect";
import schemaAllBlogs from "@/app/libray/schemaAllBlogs";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function PUT(response, content){

    let res = await response.json()
    let id = await content.params.updateBlog
    
    await mongoose.connect(DbConnect).then(()=>{
        console.log('update api connect')
    })

    let find = await schemaAllBlogs.findOne({_id:id})

    if (find != null){
        let result = await schemaAllBlogs.findOneAndUpdate(find,res)
        let data = await schemaAllBlogs.find()

        return NextResponse.json({
            data: data,
            message:'successfully update'
        })
    }
   else {
       return NextResponse.json({
           data:null,
           message:'update error'
       })
   }

}