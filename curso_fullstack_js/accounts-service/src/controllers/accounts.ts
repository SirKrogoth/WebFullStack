import {Request, Response} from 'express';
import { IAccount } from '../models/IAccount';
import AccountRepository, { AccountModel } from '../models/accountModel';

const accounts : IAccount[] = [];

async function getAccounts(req: Request, res: Response, next: any){
    const accounts = await AccountRepository.findAll<AccountModel>();
    res.json(accounts.map(item => {
        item.password = '';
        return item;
    }));
}

function getAccount(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);
        const index = accounts.findIndex(item => item.id === id);
        
        if(index === -1)
            return res.status(400).end();
        else
            res.status(200).json(accounts[index]);
    } catch (error) {
        console.error(error);
        res.status(404).end();
    }   
}

function addAccount(req: Request, res: Response, next: any){

    try {
        const newAccount = req.body as IAccount;
        accounts.push(newAccount);
        res.status(201).json(newAccount);
    } catch (error) {
        console.error(error);
        res.status(400).end();
    }
}

function setAccount(req: Request, res: Response, next: any){
    try {
        const accountId = parseInt(req.params.id);

        if(!accountId) throw new Error('Id is in invalid format.');

        const accountParams = req.body as IAccount;
        const index = accounts.findIndex(item => item.id === accountId);

        if(index === -1) return res.status(404).end();

        const originalAccount = accounts[index];

        if(accountParams.name) originalAccount.name = accountParams.name;
        if(accountParams.password) originalAccount.password = accountParams.password;

        accounts[index] = originalAccount;
        res.status(200).json(originalAccount);
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