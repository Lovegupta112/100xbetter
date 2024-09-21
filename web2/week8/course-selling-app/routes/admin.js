const {Router}=require('express');
const {adminModel}=require('../db');

const adminRouter=Router();


adminRouter.post('/signin',(req,res)=>{
    
})

adminRouter.post('/signup',(req,res)=>{

})

adminRouter.post('/create-course',(req,res)=>{

})
adminRouter.delete('/delete/:courseId',(req,res)=>{

})

adminRouter.get('/all-course',(req,res)=>{

})

module.exports={adminRouter}