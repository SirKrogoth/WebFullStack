//import { expectCt } from 'helmet';
import { resourceUsage, send } from 'process';
import request from 'supertest';
import { isTypedArray } from 'util/types';
import { IContact } from '../src/models/IContact';
import app from './../src/app';
import repository from '../src/models/contactRepository';
import { resourceLimits } from 'worker_threads';
import {jest, describe, expect, it, beforeAll, afterAll} from '@jest/globals';
//nosso contact nao tem permissao de criar rota, por isso precisa do microserviço de account
import accountsApp from '../../accounts-service/src/app';

const testName = 'Jest';
const testEmail = 'jest@test.com';
const testPassword = '123456';
const testDomain = 'jest.com';
let jwt : string;
let testAccountId : number;
let testContactId : number; 

beforeAll(async () => {
    //Antes de iniciar esses testes, precisamos criar o usuário, buscar o ID dele e por fim, autenticar
    //1 - Criando usuário
    const testAccount = {
        name: testName,
        email: testEmail,
        password: testPassword,
        domain: testDomain
    }

    const account = await request(accountsApp)
        .post('/accounts/')
        .send(testAccount);    

    //2 - Buscar o ID do usuário cadastrado

    testAccountId = account.body.id;

    //3 - Autenticar o usuário criado
    const result = await request(accountsApp)
        .post('/accounts/login')
        .send({
            email: testEmail,
            password: testPassword
        });

    jwt = result.body.token;
})

afterAll(async () => {
    //Removendo usuário criado
    await request(accountsApp)
        .delete('/accounts/' + testAccountId);
})

describe('Testando rotas do contacts', () => {
    it('GET /contacts/ - Deverá retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/contacts/')
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
    })
})
