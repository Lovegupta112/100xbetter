const express= require('express');
const prisma = require('./config.js');

const app=express();
const PORT=3000;

app.use(express.json());


app.get('/health',(req,res)=>{
    res.send("server is healthy..");
})

app.get('/users',async (req,res)=>{
    try{
        const users=await prisma.user.findMany();
        res.status(200).json({users});
    }
    catch(err){
        console.log('err',err);
        res.sendStatus(500);
    }
})
app.post('/create-user',async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            res.status(400).json({error:"Invalid body.."});
            return;
        }
        const users=await prisma.user.create({
            data:{
                name,
                email,
                password
            }
        });
        res.status(201).json({message:"successfully created"});
    }
    catch(err){
        console.log('err',err);
        res.sendStatus(500);
    }
})

app.listen(PORT,()=>console.log(`Server is listening on port: ${PORT}`));