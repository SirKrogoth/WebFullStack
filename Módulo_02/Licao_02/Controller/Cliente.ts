interface IPessoa {
    nome: string;
    idade: number;
}

interface IContato{
    telefone: string;
    email: string;
}

//export me permite exportar minha variavel Cliente
export type ICliente = IPessoa & IContato;

export function salvarCliente(cliente: ICliente){
    cliente.nome = "Joao";
}