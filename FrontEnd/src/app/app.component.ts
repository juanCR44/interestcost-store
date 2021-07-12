import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TrabFinanzas';
  showMenu: Boolean;

  constructor(router:Router) {
    router.events.forEach((event) => {
        if(event instanceof NavigationStart) {
           // var a = event.url.slice
            var url:any;
            var lastInd = event.url.length
            if(!isNaN(Number(event.url[lastInd-1]))){
              url = event.url.slice(0,-1)
            }
    
            this.showMenu = (event.url != "/login" && url != "/cuentacredito/" && url != "/detalleconsumo/" && url != "/deudacliente/" && url != "/movimientocliente/");
        }
    });
  }
}
