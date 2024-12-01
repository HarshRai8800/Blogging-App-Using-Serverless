import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign,verify,decode} from "hono/jwt"
import {userRouter} from "./routes/Users"
import { blogRouter} from "./routes/Blog"
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  },
  Variables:{
    userId:string
  }
}>()
app.use("/*",cors())
//@ts-ignore
app.route('/api/v1/users',userRouter)
//@ts-ignore
app.route('/api/v1/blog',blogRouter)
export default app
