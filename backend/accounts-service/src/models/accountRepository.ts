import { DestroyOptions } from "sequelize";
import accountModel, {IAccountModel} from "./accountModel";
import {IAccount} from './IAccount';

function findAll(){
    return accountModel.findAll<IAccountModel>();
}

function findById(id: number){
    return accountModel.findByPk<IAccountModel>(id);
}

function findByEmail(emailFilter: string){
    return accountModel.findOne<IAccountModel>({where: {email: emailFilter}});
}

function add(account: IAccount){
    return accountModel.create(account);
}

function remove(id: number){
    return accountModel.destroy({ where: { id: id }} as DestroyOptions<IAccount> )
}

function removeByEmail(email: string){
    return accountModel.destroy({ where: { email: email }} as DestroyOptions<IAccount> )
}

async function set(id: number, account: IAccount){
    const originalAccount = await accountModel.findByPk<IAccountModel>(id);

    if(originalAccount !== null){
        if(account.name)
            originalAccount.name = account.name;
        if(account.domain)
            originalAccount.domain = account.domain;
        if(account.status)
            originalAccount.status = account.status;
        if(account.password) 
            originalAccount.password = account.password;
            
        await originalAccount.save();
        return originalAccount;
    }
    throw new Error('Account not found.');
}

export default { findAll, findById, add, set, findByEmail, remove, removeByEmail }