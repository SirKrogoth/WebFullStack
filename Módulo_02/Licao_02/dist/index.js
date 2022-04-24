"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//estudar interceptionTypes
const Cliente_1 = require("./Controller/Cliente");
(0, Cliente_1.salvarCliente)({
    nome: {
        nome: 'Joao',
        sobrenome: 'Menezes'
    },
    email: 'joao@gft.com',
    idade: 33,
    telefone: '456564'
});
(0, Cliente_1.salvar)({
    nome: {
        nome: 'Joao',
        sobrenome: 'Menezes'
    },
    email: 'joao@gft.com',
    idade: 33,
    telefone: '456564'
});
(0, Cliente_1.salvar)({
    email: 'joao@gft.com',
    telefone: '64545615'
});
