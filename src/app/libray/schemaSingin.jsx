import mongoose from "mongoose"

const singin = mongoose.Schema({
    email:String,
    password:String
})

if (mongoose.models['singin']) {
    delete mongoose.models['singin']
}

const schemaSingin = mongoose.model('singin', singin)

export default schemaSingin