import { Bodeguero } from './bodeguero';
import { CuentaCredito } from './cuenta-credito';

export class Cliente {
    id:number;
    nombre:string;
    apellido:string;
    dni:string;
    password:string;
    cuentaCredito: CuentaCredito[] = [];
    bodeguero:Bodeguero;
}
