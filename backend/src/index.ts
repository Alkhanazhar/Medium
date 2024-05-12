import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { verify } from "hono/jwt"
import { blogRouter } from '../routes/blogs'
import { userRouter } from '../routes/users'

const app = new Hono()
app.use("/*", cors())
app.route("/blogs", blogRouter)
app.route("/users", userRouter)
//hono middleware
// app.use('/blog/*', async (c, next) => {
//   const header = c.req.header("Authorization") || ""
//   const token = header?.split(" ")[1]
//   const jwt = await verify(token, c.env.SECRET_KEY)
//   if (jwt?.id) {

//     await next()
//   }
//   else {
//     return c.json({ error: "un authorized" })
//   }
// })


//hono gives us one object call context 
export default app
