import { expectCt } from 'helmet';
import { resourceUsage, send } from 'process';
import request from 'supertest';
import { isTypedArray } from 'util/types';
import { IAccount } from '../src/models/IAccount';
import app from './../src/app';
import repository from '../src/models/accountRepository';
import auth from '../src/auth';
import { resourceLimits } from 'worker_threads';

const testEmail = 'jest@test.com';
const hashPassword = '$2a$10$x2YedLGwnQsjwuBSWRcDHeff9gk/qHtVIwxwbw.Ry18rDF7cqE/76';//123456
const testPassword = '123456';
let jwt : string;
let idTest : number;

beforeAll(async () => {
    const testAccount : IAccount = {
        name: 'jest',
        email: testEmail,
        password: hashPassword,
        domain: 'jest.com'
    }

    const result = await repository.add(testAccount);
    idTest = result.id!;
    jwt = auth.sign(result.id!);
})

afterAll(async () => {
    await repository.removeByEmail(testEmail);    
    await repository.removeByEmail("soares@gremio.com");
})


describe('Testando rotas do accounts', () => {
    it('GET /accounts/ - Deverá retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/accounts/')
            .set('x-access-token', jwt);
        
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
        
    })    

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payloadTest : IAccount = {
            name: "Luizito Soares",
            email: "soares@gremio.com",
            password: "123456",
            domain: "soares.gremio.net"
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payloadTest);

        expect(resultado.status).toEqual(201);
        expect(resultado.status).toBeTruthy();
    })

    it('POST /accounts/ - Deverá retornar statusCode 422', async () => {
        const payload = {
            id: 1,
            street: 'rua dos cebolas',
            city: 'Gravatai',
            state: 'RS'
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload);

        expect(resultado.status).toEqual(422);
    })
    
    it('GET /account/:id - Deve retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/accounts/1')
            .set('x-access-token', jwt);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })
        
    it('PATCH /accounts/:id - Deve retornar statuscode 200', async () => {
        const payload = {
            name: 'Pedro Geromel'
        }        

        const resultado = await request(app)
            .patch('/accounts/' + idTest)
            .send(payload)
            .set('x-access-token', jwt);         

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toEqual(idTest);
        expect(resultado.body.name).toEqual(payload.name);
    })
});