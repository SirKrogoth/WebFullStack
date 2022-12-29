import request from "supertest";
import app from "../src/app";
import repository from '../src/models/accountRepository';
import { IAccount } from "../src/models/IAccount";

const testEmail = 'jest@test.com';
const hashPassword = '$2a$10$x2YedLGwnQsjwuBSWRcDHeff9gk/qHtVIwxwbw.Ry18rDF7cqE/76';//123456
const testPassword = '123456';

beforeAll(async () => {
    const testAccount : IAccount = {
        name: 'jest',
        email: testEmail,
        password: hashPassword,
        domain: 'jest.com'
    }

    await repository.add(testAccount);
})

afterAll(async () => {
    await repository.removeByEmail(testEmail);
})

describe('Testando rotas de autenticação', () => {
    it('POST /accounts/login - 200 OK', async () => {  
        const payload = {
            email: testEmail,
            password: testPassword
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(resultado.status).toEqual(200);
        expect(resultado.body.auth).toBeTruthy();
        expect(resultado.body.token).toBeTruthy();
    })

    it('POST /accounts/login - 422 Unprocessable Entity', async () => {
        const payload = {
            email: testEmail,
            password: 'abc'
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(resultado.status).toEqual(422);
    })

    it('POST /accounts/login - 422 Unprocessable Entity', async () => {
        const payload = {
            email: testEmail
        }

        const result = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(result.status).toEqual(422);
    })

    it('POST /accounts/login - 401 Unautorized', async () => {
        const payload = {
            email: testEmail,
            password: "JKASFJKFHASJK"
        }

        const resultado = await request(app)
            .post('/accounts/login')
            .send(payload);

        expect(resultado.status).toEqual(401);
    })

    it('POST /accounts/logout - 200', async () => {
        const resultado = await request(app)
            .post('/accounts/logout');

        expect(resultado.status).toEqual(200);
    })
})

