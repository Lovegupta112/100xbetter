const zod=require('zod');

 const emailSchema=zod.string().email({ message: "Invalid email address" });

 const passwordSchema=zod.string().min(8,{ message: "Must be 8 or more than 8 characters long" });

// export const usernameSchema=zod.string().min(5,{ message: "Must be 5 or fewer characters long" })

module.exports={
    emailSchema,
    passwordSchema
}