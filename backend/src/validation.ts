import z from "zod"
export const signupValidation = z.object({
    email: z.string().min(5).email(),
    password: z.string().min(5),
    name: z.string().optional()
})
export type SignupValidation = z.infer<typeof signupValidation>