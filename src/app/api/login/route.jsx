import DbConnect from "@/app/libray/DbConnect";
import schemaAllBlogs from "@/app/libray/schemaAllBlogs";
import schemaSingin from "@/app/libray/schemaSingin";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(request){

    let res = await request.json()

    await mongoose.connect(DbConnect).then(()=>{
        console.log('login api connect')
    })

    let find = await schemaSingin.findOne({email:res.email})


    if (find === null){
        
        return NextResponse.json({
            data:null,
            message:'email not found'
        })
    }
    else{
        if (find.password === res.password){
        //   let schema = await schemaSingin(res)

        let Blog = await schemaAllBlogs.find()
          return NextResponse.json({
            data:find,
            blogs:Blog,
            message:'successfully login'
          })
        } else {
            return NextResponse.json({
                data:null,
                message:'Password incorrect'
            })
        }
    }

}