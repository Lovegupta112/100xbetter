import express from 'express';
const app=express();
const PORT=3000;

app.get('/health',(req,res)=>{
    res.send('server is healthy.');
})


app.listen(PORT,()=>console.log(`Server is listening on port : ${PORT}`));