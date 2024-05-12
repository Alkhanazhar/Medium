import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinValidation, signupValidation } from "@azhar_india_96/validations";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        SECRET_KEY: string
    }
}>()

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req?.json()
    const { success } = signupValidation.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ error: 'validation failed' })
    }
    const user = await prisma.user.create({
        data: {
            // name: body.name,
            email: body.email,
            password: body.password
        }
    })
    const jwt = await sign({ id: user?.id }, c.env.SECRET_KEY)
    return c.json({ jwt: jwt })
})

userRouter.post('/signin', async (c) => {
    const body = await c.req?.json()
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const { success } = signinValidation.safeParse(body)
    if (!success) {
        c.status(411)
        return c.json({ error: 'validation failed' })
    }

    const user = await prisma.user.findFirst({
        where: {
            email: body.email,
            password: body.password
        }
    })
    if (!user) {
        c.status(403)
        return c.json({ error: 'User not found' })
    }
    const jwt = await sign({ id: user?.id }, c.env.SECRET_KEY)
    return c.json({ jwt: jwt })
})