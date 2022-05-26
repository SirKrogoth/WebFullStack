import { expectCt } from 'helmet';
import { resourceUsage, send } from 'process';
import request from 'supertest';
import { isTypedArray } from 'util/types';
import app from './../src/app';

describe('Testando rotas do accounts', () => {
    it('GET /accounts/ - Deverá retornar statusCode 200', async () => {
        const resultado = await request(app)
            .get('/accounts/');
        
        console.log(resultado);
        expect(resultado.status).toEqual(200);
        expect(Array.isArray(resultado.body)).toBeTruthy();
        
    })    

    it('POST /accounts/ - Deve retornar statusCode 201', async () => {
        const payload = {
            id: 1,
            name: 'Pedro Geromel',
            email: 'pedraodageral@gremio.net',
            password: '123456',
            status: 100
        }

        const resultado = await request(app)
            .post('/accounts/')
            .send(payload);

        expect(resultado.status).toEqual(201);
        expect(resultado.body.id).toBe(1);
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
            .get('/accounts/1');

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toBe(1);
    })

    it('GET /account/:id - Deve retornar statusCode 400', async () => {
        const resultado = await request(app)
            .get('/accounts/abv');

        expect(resultado.status).toEqual(400);
    })

    it('PATCH /accounts/:id - Deve retornar statuscode 200', async () => {
        const payload = {
            name: 'Pedro Geromel',
            email: 'pedraodageral@gremio.net',
            password: '123456789'
        }        

        const resultado = await request(app)
            .patch('/accounts/1')
            .send(payload);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.id).toEqual(1);
    })

    it('PATCH /accounts/:id - Deve retornar statuscode 400', async () => {
        const payload = {
            name: 'Pedro Geromel',
            email: 'pedraodageral@gremio.net',
            password: '123456789'
        }        

        const resultado = await request(app)
            .patch('/accounts/abc')
            .send(payload);

        expect(resultado.status).toEqual(400);
    })

    it('PATCH /accounts/:id - Deve retornar statuscode 404', async () => {
        const payload = {
            name: 'Pedro Geromel',
            email: 'pedraodageral@gremio.net',
            password: '123456789'
        }        

        const resultado = await request(app)
            .patch('/accounts/-1')
            .send(payload);

        expect(resultado.status).toEqual(404);
    })
});