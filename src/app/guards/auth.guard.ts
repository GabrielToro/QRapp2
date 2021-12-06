import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root' // ADDED providedIn root here.
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private storage: Storage) {}

  // eslint-disable-next-line @typescript-eslint/member-ordering

  canActivate(){
    const logged = (!!this.storage.get('sesionActiva'));
    if (logged) {
      console.log('habilitado');
      this.router.navigate(['/home']);
      return true;
    } else {
      console.log('no habilitado');
      return false;
    }
  }

}
