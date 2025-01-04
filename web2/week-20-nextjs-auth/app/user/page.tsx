'use client';
import jwt from 'jsonwebtoken';
import { useEffect } from 'react';

export default  function (){
 
    
    useEffect(()=>{
        const token=localStorage.getItem('token') || '';
        const secretKey=process.env.JWTSECRETKEY as string;
        console.log('11,,',token,secretKey);
        const userInfo=jwt.verify(token,secretKey);
       console.log('12..',userInfo);
        
    },[]);
 
}