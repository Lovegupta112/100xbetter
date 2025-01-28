import express from 'express';
import authRouter from './routes/auth';
import authMiddleware from './middleware/authMiddleware';
import roomRouter from './routes/room';
const app=express();
const port=3001;

app.use(express.json());

app.get('/api/v1/serverHealth',(req,res)=>{
    res.send('Server is Healthy.');
})

app.use('/api/v1/auth',authRouter);
app.use('/api/v1/room',authMiddleware,roomRouter);
app.listen(port,()=>console.log(`Server is listening on port: ${port}`));