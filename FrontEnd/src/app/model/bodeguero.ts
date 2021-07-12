import { Cliente } from './cliente';

export class Bodeguero {
    id:number;
    nombre:string;
    apellido:string;
    password:string;
    ruc:string;
    clientes:Cliente[] = [];
}
