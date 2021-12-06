/* eslint-disable no-underscore-dangle */
/* eslint-disable @angular-eslint/contextual-lifecycle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Clases } from '../interfaces/clases';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Usuarios } from '../interfaces/usuarios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class BdLocalService {

  usuario: Usuarios[]=[];
  clase: Clases[]=[];

  httpOptions = {
    headers: new HttpHeaders({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Content-Type': 'application/json',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Access-Control-Allow-Origin': '*'
    })
  };

  apiURL = 'http://192.168.1.40:3000';

  private _storage: Storage | null = null;

  constructor(private storage: Storage, private http: HttpClient, private router: Router) {
    this.init();
    this.cargarClase();
    this.getUsuarios();
  }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface

  getClases(): Observable<any>{
    return this.http.get(this.apiURL + '/clases').pipe(
      retry(3)
    );
  }

  async getUsuarios() {
    const usuariosBd = await this.storage.get('usuario');
    if (usuariosBd) {
      this.usuario = usuariosBd;
    }
  }

  // Función para validar que el usuario esté en la base de datos
  existeUsuario(user: string, pass: string) {
    const existe = this.usuario.find(
        u=>u.strUsuario === user && u.strPassword === pass
      );
    if (existe) {
      this.storage.set('sesionActiva', '1');
      return true;
    } else {
      return false;
    }
  }

  async cargarClase() {
    const nuevaClase = await this.storage.get('clase');

    if (nuevaClase) {
      this.clase = nuevaClase;
    }
  }

  guardarClase(
    idAsignatura: string,
    seccion: string,
    asignatura: string,
    docente: string,
    correo: string,)
    {
      this.clase.unshift({
        strIdAsignatura: idAsignatura,
        strSeccion: seccion,
        strAsignatura: asignatura,
        strDocente: docente,
        strCorreo: correo});
      // eslint-disable-next-line no-underscore-dangle
      this.storage.set('clase',this.clase);
      console.log('Clase agregada');
    }

  crearUsuario() {
    this.usuario.unshift({strUsuario: 'basti.rojasv', strPassword: 'password', strNombre: 'Bastian'});
    this.storage.set('usuario',this.usuario);
  }

  async init() {
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }
}

