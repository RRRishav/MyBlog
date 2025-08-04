import mongoose, { Schema } from "mongoose";

import validator from "validator"

const userShema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail,"please enter a valid email"],
        unique:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    photo:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    education:{
        type:Array,
        required:true

    },
    role:{
        type :String,
        required:true,
        enum:["user","admin"],
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})


export const User = mongoose.model("User",userShema)