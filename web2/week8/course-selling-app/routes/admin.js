const {Router}=require('express');
const {adminModel,courseModel}=require('../db');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const adminRouter=Router();
require('dotenv').config();
const jwtSecret=process.env.JWT_SECRET_KEY;
const {authAdminMiddleware}=require('../middlewares/authMiddleware');



adminRouter.post('/signup',async (req,res)=>{
    try {
        const {email,password,firstName,lastName}=req.body;
    
    const salt=10;
    const hashedPassword=await bcrypt.hash(password,salt);
    
    await adminModel.create({
        email,
        password:hashedPassword,
        firstName,
        lastName
    })

    res.status(200).json({message:'SuccessFully signedup !'});

    } catch (error) {
        console.log('Error: ',error.message);
        res.status(400).json({error:error.message});
    }
})

adminRouter.post('/signin',async (req,res)=>{

    const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(400).json({error:'Invalid credentials'});
    }
    const userInfo=await adminModel.findOne({email});

    if(!userInfo){
        return res.status(200).json({message:`email doesn't exist !`});
    }
    const match=await bcrypt.compare(password,userInfo.password);
    
    if(!match){
        return res.status(400).json({error:'Invalid credentials'});
    }

    const accessToken=jwt.sign({userId:userInfo._id,role:'admin'},jwtSecret);
    
    res.status(200).json({accessToken});
})

adminRouter.post('/create-course',authAdminMiddleware,async (req,res,next)=>{
try{
    const {title,description,price,imageUrl}=req.body;
    await courseModel.create({title,description,price,imageUrl});
    res.status(201).json({message:'course created !'});
}
catch(error){
    next();
}
})

adminRouter.delete('/delete/:courseId',(req,res)=>{

})

adminRouter.get('/all-course',authAdminMiddleware,async (req,res,next)=>{
try{
  const adminId=req.headers.adminId;

  const courses=await courseModel.find({creatorId:adminId});

  if(courses){
    return res.status(200).json({courses});
  }
}
catch(error){
    next();
}
})

module.exports={adminRouter}