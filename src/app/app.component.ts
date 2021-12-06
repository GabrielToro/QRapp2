/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { BdLocalService } from './services/bd-local.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})


export class AppComponent {

constructor(private bdLocal: BdLocalService){
  bdLocal.crearUsuario();
 }

}
