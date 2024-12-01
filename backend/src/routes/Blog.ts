import { Hono} from "hono";
import { blogStyle1,blogStyle2 } from "@harshrai/blogging";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from "hono/jwt";
export const blogRouter= new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    },
    Variables:{
        userId:string
    }
 }>()


 blogRouter.use("/*",async(c,next)=>{
    const headers = c.req.header("Authorization") ||" "
    const token = headers?.split(" ")[1]
    const check = await verify(token,c.env.JWT_SECRET)
    console.log(check)
    if(check.id){
        console.log(check.id)
    
  
   try {
    //@ts-ignore
     await  c.set("userId",check.id)
       return await next()
   } catch (error) {
    console.log(error)
   }
    }else{
      c.status(403)
      return c.json({error:"unauthorized"});
    }
    
    
    
    
    })
    
    
    blogRouter.post('/', async(c) => {
       try {
        console.log("in")
         const prisma = new PrismaClient({
             datasourceUrl:c.env.DATABASE_URL
           }).$extends(withAccelerate())
           console.log(prisma)
         const body =await c.req.json()   
         const succes = blogStyle1.safeParse(body)
    if(!succes.success){
      return c.json({
        msg:"error hai",
        succes
      })
    }
    if(!succes.success){
      return c.json({
        msg:"error hai"
      })
    } 
         const check = await prisma.posts.findMany({where:{
            title:body.title
         }})
         console.log(check)
         if(check.length>0){
            return c.json({
                msg:"alrady exists"
            })
         }
        
         console.log(body + c.get("userId"))
     const res = await prisma.posts.create({
         data:{
             title:body.title,
             description:body.description,
             subject:body.subject,
             userId:Number(c.get("userId"))
         }
     })
     return c.json({
        res
     })
  
    }
        catch (error) {
        console.log(error)
       }
    })
    
    blogRouter.put('/',async (c) => {
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
          }).$extends(withAccelerate())
        const body =await c.req.json() 
        const succes = blogStyle2.safeParse(body)
        if(!succes.success){
          return c.json({
            msg:"error hai",
            succes
          })
        }
        console.log(body)
       const res = await prisma.posts.update({
        where:{
          id:Number(body.id)
        },
        data:{
            title:body.title,
            description:body.description,
            subject:body.subject,
        }
       })
if(!res){
    await c.status(411)
    return c.json({
        msg:"error"
    })
}else{
    await c.status(200)
    return c.json({
        msg:"done",
        res
    })
}


    })
    blogRouter.get('/get/:id',async (c) => {
        const id = c.req.param("id")
        const prisma = new PrismaClient({
            datasourceUrl:c.env.DATABASE_URL
          }).$extends(withAccelerate())
     console.log(id)
       const res = await prisma.posts.findMany({
        where:{
            id:Number(id)
        },
        select:{
          title:true,
          description:true,
          subject:true,
          id:true,
          users:true
        }
      
       })
       console.log(res)
if(!res){
    await c.status(411)
    return c.json({
        msg:"error"
    })
}else{
    await c.status(200)
    return c.json({
        msg:"done",
        res
    })
}})


blogRouter.get('/all',async (c) => {
  try {
      const prisma = new PrismaClient({
          datasourceUrl:c.env.DATABASE_URL
        }).$extends(withAccelerate())
     
     const res = await prisma.posts.findMany({
     select:{
      id:true,
      title:true,
      description:true,
      subject:true,
      users:{
        select:{
          name:true,
          email:true,
          
        }
      }
     }
     })
     console.log(res)
  if(!res){
  await c.status(411)
  return c.json({
      msg:"error"
  })
  }else{
  await c.status(200)
  return c.json({
      msg:"done",
      res
  })
  }
  } catch (error) {
    console.log(error)
  }})

    