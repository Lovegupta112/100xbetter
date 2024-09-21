const {Router}=require('express');
const userRouter=Router();
const {userModel}=require('../db');
const bcrypt=require('bcrypt');


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

    res.status(200).json({message:'SuccessFully signedin'});

})

userRouter.post('/signin',async (req,res)=>{
  
    const {email,password}=req.body;
    
    if(!email || !password){
        return res.status(400).json({error:'Invalid credentials'});
    }
    const userInfo=userModel.findOne({email});

    if(!userInfo){
        return res.status(200).json({message:`email doesn't exist !`});
    }
    const match=await bcrypt.compare(password,userInfo.password);
    
    if(!match){
        return res.status(400).json({error:'Invalid credentials'});
    }

    const verify=await j
    

})

userRouter.get('/purchase',(req,res)=>{

})


module.exports={userRouter};