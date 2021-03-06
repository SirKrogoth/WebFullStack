import { Request, Response } from "express";
import Joi from "joi";
import { accountSchema, accountUpdateSchema, loginSchema } from "../models/accountSchemas";

function validadeSchema(schema: Joi.ObjectSchema<any>, req: Request, res: Response, next: any){
    const { error } = schema.validate(req.body);
    
    if(error == null) return next();

    const { details } = error;
    const message = details.map(item => item.message).join(',');

    console.log(message);
    res.status(422).end();
}

function validateAccount(req: Request, res: Response, next: any){
    return validadeSchema(accountSchema, req, res, next);
}

function validateLogin(req: Request, res: Response, next: any){
    return validadeSchema(loginSchema, req, res, next);
}

function validateUpdateAccount(req: Request, res: Response, next: any){
    return validadeSchema(accountUpdateSchema, req, res, next);
}

export {
    validateAccount,
    validateLogin,
    validateUpdateAccount
}