import express from 'express';
const app=express();
const port=3002;

app.get('/api/v1/serverHealth',(req,res)=>{
    res.send('Server is Healthy.');
})

app.post('/api/v1/signup',(req,res)=>{

    const {email,password}=req.body;

    //todo: hashed password and store in db --- 

    res.status(200).send('successfully signedup!');
})
app.post('/api/v1/signin',(req,res)=>{

    const {email,password}=req.body;

    //todo: sign jwt token and send and check also email exist or not --- 

    res.status(200).send('Successfully signed In !');
})

app.listen(port,()=>console.log(`Server is listening on port: ${port}`));