//estudar interceptionTypes
import { ICliente, IContato, salvarCliente, salvar } from './Controller/Cliente';

salvarCliente({
    nome: {
        nome: 'Joao',
        sobrenome: 'Menezes'
    },
    email: 'joao@gft.com',
    idade: 33,
    telefone: '456564'
})

salvar<ICliente>({
    nome: {
        nome: 'Joao',
        sobrenome: 'Menezes'
    },
    email: 'joao@gft.com',
    idade: 33,
    telefone: '456564'
})

salvar<IContato>({
    email: 'joao@gft.com',
    telefone: '64545615'
})