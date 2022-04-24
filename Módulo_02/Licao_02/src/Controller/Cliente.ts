interface INomeCompleto{
    nome: string,
    sobrenome: string
}

export interface IPessoa {
    nome: string | INomeCompleto;
    idade: number | string;
}

export interface IContato{
    telefone: string;
    email: string;
}

//export me permite exportar minha variavel Cliente
export type ICliente = IPessoa & IContato;

export function salvarCliente(cliente: ICliente){
    cliente.nome = "Joao";

    const numero = cliente.idade as number;
}

export function salvar<T>(args: T): T{
    //
    return args;
}