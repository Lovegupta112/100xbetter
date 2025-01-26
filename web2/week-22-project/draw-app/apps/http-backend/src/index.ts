import express from 'express';
import authRouter from './routes/auth';
const app=express();
const port=3001;

app.use(express.json());

app.get('/api/v1/serverHealth',(req,res)=>{
    res.send('Server is Healthy.');
})

app.post('/api/v1/auth',authRouter);

app.listen(port,()=>console.log(`Server is listening on port: ${port}`));