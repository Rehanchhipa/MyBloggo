import DbConnect from "@/app/libray/DbConnect";
import schemaSingin from "@/app/libray/schemaSingin";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST(response){

    let res = await response.json()

    await mongoose.connect(DbConnect).then(()=>{
        console.log('singin api connect')
    })


    let find = await schemaSingin.findOne({email:res.email})

    if (find === null) {
        let result = await schemaSingin(res)
        let saveResult = await result.save()
        return NextResponse.json({
            data:saveResult,
            message:'successfully'
        })
    }
    else {

        return NextResponse.json({
            data:'data',
            message:'email is already exist'
        })
    }

}