import { Deuda } from './deuda';

export class Pago {
    id:number;
    fechaPago:Date;
    importe:number;
    deuda:Deuda;
}
