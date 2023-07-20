import { Router } from "express"
import userModel from "../dao/models/user.js"


const router = Router()

router.post('/register',async(req,res)=>{
    const result = await userModel.create(req.body)
    res.send({status:"success",payload:result})
})

router.post('/login',async(req,res)=>{
    const {email, password} = req.body
    const user = await userModel.findOne({email,password})
    if(!user) return res.status(400).send({status:"error",error:"Invalid username or password"})
    else if (email !== "adminCoder@coder.com" || password !== "adminCod3r123" ){
        req.session.admin = true
    }
    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email:user.email
    }
    res.json({ status: "success" })
})

export default router