import {Request, Response} from 'express';
import contactRepository from '../models/contactRepository';
import controllerCommons from 'ms-commons/api/controllers/controller';
import {Token} from 'ms-commons/api/auth';
import { IContact } from '../models/IContact';

async function getContacts(req: Request, res: Response, next: any){
    try {
        const token = controllerCommons.getToken(res) as Token;
        const contacts = await contactRepository.findAll(token.accountId);
    
        res.json(contacts);        
    } catch (error) {
        console.log(`getContacts: ${error}`);
    }
    
}

async function getContact(req: Request, res: Response, next: any){
    try {
        const id = parseInt(req.params.id);

        if(!id) return res.status(400).end();
    
        const token = controllerCommons.getToken(res) as Token;
        const contact = await contactRepository.findById(id, token.accountId);
    
        if(contact === null) return res.status(404).end();
        else res.json(contact);   
    } catch (error) {
        console.log(`getContact: ${error}`);
        res.status(400).end();
    }    
}

async function addContact(req: Request, res: Response, next: any){
    try {
        console.log("entrou no addContact");
        const token = controllerCommons.getToken(res) as Token;
        const contact = req.body as IContact;
        const result = await contactRepository.add(contact, token.accountId);
        res.status(201).json(result);
    } catch (error) {
        console.log(`addContact: ${error}`);
        res.status(400).end();
    }
}

async function setContact(req: Request, res: Response, next: any){
    try {
        const contactId = parseInt(req.params.id);
        if(!contactId) return res.status(400).end();

        const token = controllerCommons.getToken(res) as Token;
        const contact = req.body as IContact;
        const result = await contactRepository.set(contactId, contact, token.accountId);
        if(!result) return res.status(404).end();

        res.json(result);
    } catch (error) {
        console.log(`setContact: ${error}`);
        res.status(400).end();
    }
}

export default {
    getContacts,
    getContact,
    addContact,
    setContact
}