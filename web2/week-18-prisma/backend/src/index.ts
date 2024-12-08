import express from 'express';
import userRouter from "./routes/userRoutes";
import { authMiddleware } from './middleware';
import todoRouter from './routes/todoRoutes';

const app=express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use('/api/v1/users',userRouter); 
app.use('/api/v1/todos',authMiddleware,todoRouter); 

app.listen(PORT,()=>console.log(`Server is listening on port: ${PORT}`));


