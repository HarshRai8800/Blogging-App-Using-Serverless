import zod from "zod"


export const userStyle1 =zod.object({
    name:zod.string(),
    email:zod.string().email(),
    password:zod.string().min(6)
})

export const userStyle2 =zod.object({
    email:zod.string().email(),
    password:zod.string().min(6)
})

export const blogStyle1=zod.object({
    title:zod.string(),
    description:zod.string().max(255),
  subject:zod.string().min(6)
})

export const blogStyle2=zod.object({
    title:zod.string().optional(),
    description:zod.string().max(255).optional(),
  subject:zod.string().min(6).optional()
})



export type signup = zod.infer<typeof userStyle1>

export type signin = zod.infer<typeof userStyle2>

export type blogcreate = zod.infer<typeof blogStyle1>

export type blogupdate = zod.infer<typeof blogStyle2>