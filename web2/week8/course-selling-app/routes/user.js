const {Router}=require('express');
const userRouter=Router();
const {userModel}=require('../db');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();
const jwtSecret=process.env.JWT_USER_SECRET;
const {authUserMiddleware}=require('../middlewares/authMiddleware');

userRouter.post('/signup',async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    
    const salt=10;
    const hashedPassword=await bcrypt.hash(password,salt);
    
    await userModel.create({
        email,
        password:hashedPassword,
        firstName,
        lastName
    })

    res.status(200).json({message:'SuccessFully signedup !'});

})

userRouter.post('/signin',async (req,res)=>{
  
    const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(403).json({error:'Invalid credentials'});
    }
    const userInfo=await userModel.findOne({email});

    if(!userInfo){
        return res.status(403).json({message:`email doesn't exist !`});
    }
    const match=await bcrypt.compare(password,userInfo.password);
    
    if(!match){
        return res.status(403).json({error:'Invalid credentials'});
    }

    const accessToken=jwt.sign({userId:userInfo._id},jwtSecret);
    
    res.status(200).json({accessToken});
})

userRouter.get('/purchase',authUserMiddleware,(req,res)=>{

})


module.exports={userRouter};