import { Request, Response } from "express";
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import { contactSchema, contactUpdateSchema } from "../models/contactSchemas";

function validateContactSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validadeSchema(contactSchema, req, res, next);
}

function validateUpdateContactSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validadeSchema(contactUpdateSchema, req, res, next);
}

async function validateAuth(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

export {
    validateContactSchema,
    validateUpdateContactSchema,
    validateAuth
}