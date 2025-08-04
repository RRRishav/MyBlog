import { User } from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from "bcryptjs"
import createToken from  "../jwt/authToken.js"




export const createBlog = async (req, res) => {




     if(!req.files||Object.keys(req.files).length == 0){
        return res.status(400).json({
           message:"please upload the file "
        })
     }


     const {photo}  =req.files;
     const allowedFormat  = ["image/jpeg","image/png","image/webp"]

     if(!allowedFormat.includes(photo.mimetype)){
        return res.status(400).json({
            message:"Inavlid format"
        })
     }


    const { email, name, password, phone, education, role } = req.body
     
  

    if (!email || !name || !password || !phone
        || !education || !role || !photo) {
        return res.status(400).json({
            message: "please fill fields that are required "
        })
    }

    const user =await  User.findOne({
        email
    })

    if (user) {
        return res.status(400).json({
            message: "user are already exist  "
        })
    }

const cloudinaryResponse = await cloudinary.uploader.upload(
    photo.tempFilePath
)


if(!cloudinaryResponse ||  cloudinaryResponse.error){
    console.log(cloudinaryResponse.error)
}



    const HashedPassword = await bcrypt.hash(password,10)
    
    const newUser = new  User ({ email, name, password:HashedPassword, phone, education, role,photo:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.url
    } })
    await newUser.save()

    if(newUser){
        const token = await   createToken(newUser._id,res)
        res.status(201).json({
            message:"user registered successfully",newUser,token:token
        })
    }

}



export const login = async(req,res)  => {

    const {email ,  password ,role} = req.body;

    try{
        if(!email || !password ||!role){
            return res.status(400).json({
                message:"please fill required filed "
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user.password){
            return res.status(402).json({
                message:"INVALID CREDENTIALS "
            })

        }

    const isMatch = await bcrypt.compare(password,user.password)

    if(!user|| !isMatch){
        return res.status(402).json({
            message:"INVALID CREDENTIALS "
        })
    }

    if(user.role!==role){
        return res.status(401).json({
            message:`GIVEN ROLE ${role} NOT FOUND`
        })
    }

    const token = await createToken(user._id,res)
     res.status(200).json({
        message:"USER LOGIN SUCCESSFULLY",user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        },token:token
     })
    }

    catch (error) {
        console.log(eror)
    }
}



export const logOut = (req,res)=>{
    res.clearCookie("jwt",{httpOnly:true})
    res.status(200).json({
        message:"User Logout successfully"
    })
}
