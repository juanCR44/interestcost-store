import { CuentaCredito } from './cuenta-credito';
import { Pago } from './pago';

export class Deuda {
    id:number;
    fechaPago:Date;
    monto:number;
    mantenimiento:number;
    interes:number;
    mora:number;
    total:number;
    cuentaCredito:CuentaCredito;
    pago:Pago;
}
