import {Request, response, Response} from 'express';
import { IAccount } from '../models/IAccount';
import repository from '../models/accountModel';
import auth from '../auth';

const accounts : IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any){
    const accounts = await repository.findAll();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

async function getAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);
        console.log(id);
        
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
        accountParams.password = auth.hashPassword(accountParams.password);
        const updatedAccount = await repository.set(accountId, accountParams)
        updatedAccount.password = '';        
        res.status(200).json(updatedAccount);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

function loginAccount(req: Request, res: Response, next: any){
    try {
        const loginParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.email === loginParams.email && item.password === loginParams.password);

        if(index === -1) return res.status(401).end();

        res.json({ auth: true, token: {} });
    } catch (error) {
        console.error(error);
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

export default { getAccounts, addAccount, getAccount , setAccount, loginAccount, logoutAccount }