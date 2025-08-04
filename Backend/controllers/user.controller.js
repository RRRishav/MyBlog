import { User } from "../models/user.model.js"
import { v2 as cloudinary } from 'cloudinary';
export const register = async (req, res) => {




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
    const newUser = new  User ({ email, name, password, phone, education, role,photo:{
        public_id: cloudinaryResponse.public_id,
        url:cloudinaryResponse.url
    } })
    await newUser.save()

    if(newUser){
        res.status(201).json({
            message:"user registered successfully",newUser
        })
    }

}