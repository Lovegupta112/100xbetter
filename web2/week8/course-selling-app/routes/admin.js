const {Router}=require('express');
const {adminModel,courseModel}=require('../db');
const bcrypt=require('bcrypt');
const jwt =require('jsonwebtoken');
const adminRouter=Router();
require('dotenv').config();
const jwtSecret=process.env.JWT_ADMIN_SECRET;
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

    const accessToken=jwt.sign({userId:userInfo._id},jwtSecret);
    
    res.status(200).json({accessToken});
})

adminRouter.post('/create-course',authAdminMiddleware,async (req,res,next)=>{
try{
    const {title,description,price,imageUrl}=req.body;
    const creatorId=req.adminId;
    const resp=await courseModel.create({title,description,price,imageUrl,creatorId});
    res.status(201).json({message:'course created !',courseId:resp._id});
}
catch(error){
    next();
}
})

adminRouter.delete('/delete/:courseId',authAdminMiddleware,(req,res)=>{

})

adminRouter.put('/course',authAdminMiddleware,async (req,res)=>{
    
    const {title,description,price,imageUrl,courseId}=req.body;
    const creatorId=req.adminId;

    const course=await courseModel.updateOne({_id:courseId,creatorId},{title,description,price,imageUrl});

    res.json({
        message:"course updated!",
        courseId:course._id
    });
})

adminRouter.get('/all-course',authAdminMiddleware,async (req,res,next)=>{
try{
  const adminId=req.adminId;
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