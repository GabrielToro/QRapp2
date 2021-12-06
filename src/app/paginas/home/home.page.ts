import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  private _storage: Storage | null = null;

  constructor(private router: Router, storage: Storage) {
  }

  paginaLogin(){
    // Función para dirigirse al Login de usuario
    this.router.navigate(['/login']);
  }
}
