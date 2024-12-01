import zod from "zod";
export declare const userStyle1: zod.ZodObject<{
    name: zod.ZodString;
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    name: string;
    email: string;
    password: string;
}, {
    name: string;
    email: string;
    password: string;
}>;
export declare const userStyle2: zod.ZodObject<{
    email: zod.ZodString;
    password: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const blogStyle1: zod.ZodObject<{
    title: zod.ZodString;
    description: zod.ZodString;
    subject: zod.ZodString;
}, "strip", zod.ZodTypeAny, {
    title: string;
    description: string;
    subject: string;
}, {
    title: string;
    description: string;
    subject: string;
}>;
export declare const blogStyle2: zod.ZodObject<{
    title: zod.ZodOptional<zod.ZodString>;
    description: zod.ZodOptional<zod.ZodString>;
    subject: zod.ZodOptional<zod.ZodString>;
}, "strip", zod.ZodTypeAny, {
    title?: string | undefined;
    description?: string | undefined;
    subject?: string | undefined;
}, {
    title?: string | undefined;
    description?: string | undefined;
    subject?: string | undefined;
}>;
export type signup = zod.infer<typeof userStyle1>;
export type signin = zod.infer<typeof userStyle2>;
export type blogcreate = zod.infer<typeof blogStyle1>;
export type blogupdate = zod.infer<typeof blogStyle2>;
