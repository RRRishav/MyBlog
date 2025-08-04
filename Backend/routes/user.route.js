import express from 'express'
import  {login,logOut,register} from '../controllers/user.controller.js'
const router = express.Router()



router.post("/register",register)
router.post("/login",login)
router.get("/logOut",logOut)
export default router