import { Cliente } from './cliente';
import { Deuda } from './deuda';
import { Venta } from './venta';

export class CuentaCredito {
    id:number;
    activo:Boolean;
    valorTasa:number;
    tipoTasa:String;
    moneda:string;
    saldoConsumido:number;
    saldoDisponible:number;
    saldoTotal:number;
    fechaApertura:Date;
    fechaLimite:Date;
    cliente:Cliente;
    ventas:Venta[] = [];
    deuda:Deuda;
}
