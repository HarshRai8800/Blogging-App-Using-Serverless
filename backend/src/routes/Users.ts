import { Hono} from "hono";
import {userStyle1,userStyle2} from "@harshrai/blogging"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from "hono/jwt";
export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
 }>()


 userRouter.post('/signup',async (c) => {
  
    console.log("in")
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const succes = userStyle1.safeParse(body)
    if(!succes.success){
      return c.json({
        msg:"error hai",
        succes
      })
    }
    console.log(body)
    const res = await prisma.user.create({
      data:{
        name:body.name,
        email:body.email,
        password:body.password
      } 
    })
    console.log(res)
    if(res){
      const token = await sign({id:res.id},c.env.JWT_SECRET)
      return c.json({
        token,
        res,
        msg:"done"
      })
    }else{
        return c.json({
         
            msg:"failed"
    })
  }
})






  userRouter.post('/signin',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl:c.env.DATABASE_URL
    }).$extends(withAccelerate())
    const body = await c.req.json()
    const succes = userStyle2.safeParse(body)
    if(!succes.success){
      return c.json({
        msg:"error hai",
        succes
      })
    }
    const res = await prisma.user.findMany({
       where:{
        email:body.email,
        password:body.password
       }
    })
  
    if(!res){
      return c.json({
        msg:"user not found"
      })
    }
    const token = await sign({id:res[0].id},c.env.JWT_SECRET)
    return c.json({
      token,
      res,
      msg:"done"
    })
  })
  
