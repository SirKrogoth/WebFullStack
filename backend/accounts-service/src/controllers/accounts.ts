import {Request, response, Response} from 'express';
import { IAccount } from '../models/IAccount';
import repository from '../models/accountRepository';
import auth from '../auth';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';

async function getAccounts(req: Request, res: Response, next: any){
    const accounts : IAccount[] = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

async function getAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);
        if(!id) return res.status(400).end();
        
        const account = await repository.findById(id);
        
        if(account === null)
            return res.status(404).end();
        else{
            account.password = '';
            res.status(200).json(account);
        }            
        
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }   
}

async function addAccount(req: Request, res: Response, next: any){

    try {
        const newAccount = req.body as IAccount;
        newAccount.password = auth.hashPassword(newAccount.password);
        const result = await repository.add(newAccount);
        newAccount.password = '';
        newAccount.id = result.id;  
        res.status(201).json(newAccount);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

async function setAccount(req: Request, res: Response, next: any){
    try {
        const accountId = parseInt(req.params.id);

        if(!accountId) throw new Error('Id is in invalid format.');

        const accountParams = req.body as IAccount;

        if(accountParams.password)
            accountParams.password = auth.hashPassword(accountParams.password);
            
        const updatedAccount = await repository.set(accountId, accountParams)

        if(updatedAccount !== null){
            updatedAccount.password = '';        
            res.status(200).json(updatedAccount);
        }
        else{
            res.status(404).end();
        }
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

async function loginAccount(req: Request, res: Response, next: any){
    try {
        const loginParams = req.body as IAccount;
        const account = await repository.findByEmail(loginParams.email);
        
        if(account !== null){
            const isValid = auth.comparePassword(loginParams.password, account.password);
            if(isValid){
                const token = await auth.sign(account.id!);
                return res.json({auth: true, token});
            }
        }

        return res.status(401).end();
    } catch (error) {
        res.status(400).end();
    }
}

function logoutAccount(req: Request, res: Response, next: any){
    try {
        res.json({ auth: false, token: null });
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

async function deleteAccount(req: Request, res: Response, next: any){
    try {       
        const accountId = parseInt(req.params.id);
        if(!accountId) return res.status(400).end();

        await repository.remove(accountId);
        res.status(200).end();
    } catch (error) {
        console.log('deleteAccount: ' + error);
        
    }
}

export default { getAccounts, addAccount, getAccount , setAccount, loginAccount, logoutAccount, deleteAccount }