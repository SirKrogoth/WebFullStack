import { Router, Request, Response } from "express";
import Joi from "joi";
import account from '../controllers/accounts';
import { accountSchema, loginSchema } from "../models/IAccount";

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

const router = Router();

router.get('/accounts/', account.getAccounts);
router.get('/accounts/:id', account.getAccount);
router.post('/accounts/', validateAccount, account.addAccount);
router.post('/accounts/login', validateLogin, account.loginAccount);
router.post('/accounts/logout', account.logoutAccount);
router.patch('/accounts/:id', validateAccount, account.setAccount);


export default router;