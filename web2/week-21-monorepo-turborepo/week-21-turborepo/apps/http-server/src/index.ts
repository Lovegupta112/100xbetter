import express from 'express';
const app=express();
const PORT=3001;

app.get('/health',(req,res)=>{
    res.send('server is healthy.');
})

app.get('signup',(req,res)=>{
    
})
app.get('signin',(req,res)=>{

})
app.get('/room-chat',(req,res)=>{

})

app.listen(PORT,()=>console.log(`Server is listening on port : ${PORT}`));