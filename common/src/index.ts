import z from "zod"
export const signupValidation = z.object({
    email: z.string().min(5).email(),
    password: z.string().min(5),
    name: z.string().optional()
})

export const signinValidation = z.object({
    email: z.string().min(5).email(),
    password: z.string().min(5),
})
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    title: z.string(),
    content: z.string(),
    id: z.number()
})
export type SignupValidation = z.infer<typeof signupValidation>

export type SigninValidation = z.infer<typeof signinValidation>

export type CreateBlogInput = z.infer<typeof createBlogInput>

export type UpdateBlogInput = z.infer<typeof updateBlogInput>

