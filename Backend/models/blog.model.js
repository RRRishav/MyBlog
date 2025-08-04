import mongoose, { Schema } from "mongoose";

import validator from "validator"

const blogShema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    
    blogImage:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    category:{
        type:String,
        required:true

    },
    about:{
        type :String,
        required:true,
        minlength:200
    },
    adminName:{
        require:true,
        type:string

    },
    adminPhoto:{
        type:string,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },

})


export const Blog = mongoose.model("User",blogShema)