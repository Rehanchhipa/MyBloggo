import mongoose from "mongoose";

const allBlogs = mongoose.Schema({
    title:String,
    discription:String,
    url:String,
    id:String,
})

if (mongoose.models['allBlogs']){
    delete mongoose.models['allBlogs']
}

const schemaAllBlogs =  mongoose.model('allBlogs', allBlogs)

export default schemaAllBlogs