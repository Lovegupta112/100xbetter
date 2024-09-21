const express=require('express');
const app=express();
const {userRouter}=require('./routes/user');
const {courseRouter}=require('./routes/course');
const {adminRouter}=require('./routes/admin');
const mongoose=require('mongoose');
require('dotenv').config();

app.use(express.json());
app.use('/api/v1/user',userRouter);
app.use('/api/v1/course',courseRouter);
app.use('/api/v1/admin',adminRouter);




async function main(params) {
    await mongoose.connect(process.env.MONGODB_CONNECTION_URI);
    app.listen(3000,()=>console.log("App is running .."));
}

main();