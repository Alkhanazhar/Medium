import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        SECRET_KEY: string
    },
    Variables: {
        userId: string
    }
}>()

blogRouter.use('/*', async (c, next) => {
    const header = c.req.header("authorization") || ""
    // const token = header?.split(" ")[1]
    const user = await verify(header, c.env.SECRET_KEY)
    if (user) {
        c.set("userId", user?.id)
        await next()
    }
    else {
        c.status(403)
        return c.json({ error: "un authorized" })
    }
})

blogRouter.post("/", async (c) => {
    try {
        const authorId = c.get("userId")
        const body = await c.req.json()
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        const { success } = createBlogInput.safeParse(body)
        if (!success) {
            c.status(411)
            return c.json({ error: 'validation failed' })
        }
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: Number(authorId)

            }
        })
        return c.json({ message: "created successfully", id: blog.id })
    }

    catch (error) {
        console.log(error)
        return c.text("not created something went wrong")
    }
})

blogRouter.put("/", async (c) => {
    try {

        const body = await c.req.json()
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())
        const { success } = updateBlogInput.safeParse(body)
        if (!success) {
            c.status(411)
            return c.json({ error: 'validation failed' })
        }
        await prisma.blog.update({
            where: {
                id: body.id,
            },
            data: {
                title: body.title,
                content: body.content,
            }
        })
        return c.json({ message: "created successfully" })
    }

    catch (error) {
        console.log(error)
        return c.text("not uhpdated something went wrong")
    }
})
blogRouter.get("/bulk", async (c) => {
    try {
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL
        }).$extends(withAccelerate())
        const blogs = await prisma.blog.findMany({
            select: {
                author: {
                    select: {
                        name: true,
                    }
                }, content: true, title: true, id: true
            }
        })
        return c.json(blogs)
    } catch (error: any | Error) {
        console.log(error)

        return c.text(error)
    }
})

blogRouter.get("/:id", async (c) => {
    try {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL,
        }).$extends(withAccelerate())


        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            },
            select: {
                author: {
                    select: {
                        name: true,
                    }
                }, content: true, title: true, id: true
            }
        })
        return c.json(blog)
    } catch (error) {
        console.log(error)
        return c.text("cant get something went wrong")
    }

})
