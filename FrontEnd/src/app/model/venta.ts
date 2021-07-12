import { CuentaCredito } from './cuenta-credito';

export class Venta {
    id:number;
    descripcion:string;
    delivery:Boolean;
    total:number;
    importe:number;
    fechaConsumo:Date;
    cuentaCredito:CuentaCredito;
}
