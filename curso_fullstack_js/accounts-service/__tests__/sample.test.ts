import {somar} from '../src/soma';

describe('Testando a função de soma', () => {
    it('Testando a soma de 1 + 2, resultado deverá ser igual a 3.', () => {
        const resultado = somar(1,2);

        expect(resultado).toEqual(3);
    })
})