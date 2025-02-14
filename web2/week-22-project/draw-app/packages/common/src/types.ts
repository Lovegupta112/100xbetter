import {z} from 'zod';


export const signupSchema=z.object({
  username:z.string(),
  email:z.string().email(),
  password:z.string().min(5)
})
export const signinSchema=z.object({
  email:z.string().email(),
  password:z.string().min(5)
})

export const createRoomSchema=z.object({
    slug:z.string(),
    adminId:z.string()
})