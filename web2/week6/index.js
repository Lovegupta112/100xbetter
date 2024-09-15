const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const auth=require('./middlewares/AuthMiddleware');
const logger=require('./middlewares/LoggerMiddleware');
const JWT_SECRET='My123'
const PORT=3000;



app.use(express.json());

const userArr=[];
app.post('/signup',logger,(req,res)=>{

    const name=req.body.name;
    const password=req.body.password;

    if(userArr.find((elm)=>elm.name===name)){
        return res.status(400).send('User already Exist!');
    }
     userArr.push({name,password});
     return res.status(200).json({message:'You have successfully signed up.'})

})

app.post('/signin',logger,(req,res)=>{

    const {name,password}=req.body;

    let foundUser=userArr.find((elm)=>elm.name===name && elm.password===password);

    if(!foundUser){
        res.status(403).send("Incorrect Credentials !");
    }
    else{
        const token=jwt.sign({name},JWT_SECRET);
        res.status(200).json({message:"Successfully signed in", token});
    }

})
app.get('/me',auth,logger,(req,res)=>{

//   const token=req.headers.token;
//   const decodedToken=jwt.verify(token,JWT_SECRET);

//   let currentUser;
//   if(decodedToken){
//    currentUser=userArr.find((elm)=>elm.name===decodedToken.name);
//    return res.status(200).json({name:currentUser.name,password:currentUser.password});
//   }
//   if(decodedToken){
  let currentUser=userArr.find((elm)=>elm.name===req.username);
  console.log('56...',currentUser);
   return res.status(200).json({name:currentUser.name,password:currentUser.password});
//   }
})

app.listen(PORT,()=>console.log(`Server is listening on ${PORT}`))