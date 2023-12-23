import z  from "zod"

export const SignUpAccountValidator = z.object({
    username: z.string({required_error:"Username is required"}).min(6,"Username must be at least 6 characters long"),
    email: z.string({required_error:"Email is required"}).email({message:"Email is invalid"}),
    password: z.string({required_error:"Password is required"}).min(5,"Password must be at least 5 characters long"),
    confirmPassword:z.string()
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password doesn't match",
    path:['confirmPassword']
});

export type SignUpAccountRequest = z.infer<typeof SignUpAccountValidator>;