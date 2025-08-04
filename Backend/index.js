dotenv.config()
import express from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"
import fileUpload from "express-fileupload"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from 'cloudinary';




import {User} from './models/user.model.js'
const app = express()
const port = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


app.use(express.json())



app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))


//DB CONNECTION
try {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log("DB IS CONNECTED"))
}
catch (err) {
    console.log(process.error)
}



app.use('/api/users',userRoute)

//CLOUDINARY


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.CLOUD_API_KEY, 
        api_secret: process.env.CLOUD_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
    
 

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
