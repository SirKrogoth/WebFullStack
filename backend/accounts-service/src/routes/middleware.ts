import { Request, Response } from "express";
import commonsMiddleware from 'ms-commons/api/routes/middlewares';
import { accountSchema, accountUpdateSchema, loginSchema } from "../models/accountSchemas";
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';
import controller from "ms-commons/api/controllers/controller";

function validateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validadeSchema(accountSchema, req, res, next);
}

function validateUpdateAccountSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validadeSchema(accountUpdateSchema, req, res, next);
}

function validateLoginSchema(req: Request, res: Response, next: any){
    return commonsMiddleware.validadeSchema(loginSchema, req, res, next);
}

async function validateAuth(req: Request, res: Response, next: any){
    return commonsMiddleware.validateAuth(req, res, next);
}

function validateAuthorization(req: Request, res: Response, next: any){
    //pegando ID de quem está autenticado
    const accountId = parseInt(req.params.id);
    if(!accountId) return res.status(400).end();

    const token = controllerCommons.getToken(res) as Token;
    console.log(accountId);
    console.log(token.accountId);
    if(accountId !== token.accountId) return res.status(403).end();

    next();
}

export {
    validateAccountSchema,
    validateLoginSchema,
    validateUpdateAccountSchema,
    validateAuth,
    validateAuthorization
}