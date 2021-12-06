import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import jsQR from 'jsqr';
import { LoginPage } from 'src/app/paginas/login/login.page';
import { BdLocalService } from 'src/app/services/bd-local.service';

@Component({
  selector: 'app-lector-qr',
  templateUrl: './lector-qr.component.html',
  styleUrls: ['./lector-qr.component.scss'],
})

export class LectorQRComponent {
  @ViewChild('video', { static: false }) video: ElementRef; // Instancia de ViewChild para hacer uso de un video
  @ViewChild('canvas', { static: false }) canvas: ElementRef; // Instancia de ViewChild para hacer uso de un canva para analizar la imagen
  videoElement: any; // Variable donde se almacenará el video
  canvasElement: any; // Variable donde se almacenará el canvas
  canvasContext: any; // Variable para darle contorno al canvas
  loading: HTMLIonLoadingElement; // Se agrega loading al HTML
  scanActive = false; // Se instancia esta variable, la cual le dirá a la aplicación que el escaneo está inactivo
  scanResult = null;  // Variable que tomará el resultado, se inicia en null ya que no tiene ningún resultado
  jsonResult = null;

  // Se coloca en el constructor un toastCtrl y un loadingCtrl
  constructor(private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private bdLocal: BdLocalService,
    private router: Router,
    private login: LoginPage) { }

  // Sirve para ejecutar luego de que cargo el componente completamente
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngAfterViewInit() {
    // Inicio de variables
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d'); // Para comenzar a dibujar dentro del canvas
  }

  // Función para comenzar a escanear
  async startScan(){
    const stream = await navigator.mediaDevices.getUserMedia({ // A la constante stream le pasaremos el video de nuestra cámara
      video: { facingMode: 'environment' } // Se le asigna la cámara trasera
    });
    this.videoElement.srcObject = stream; // Iniciamos la cámara en stream
    this.videoElement.setAttribute('playsinline', true); // Función para iOS para que funcione de manera correcta
    this.videoElement.play(); // Se inicia la función de video

    this.loading = await this.loadingCtrl.create({}); // Crea una instancia de carga
    await this.loading.present(); // Se presenta la instancia de carga
    requestAnimationFrame(this.scan.bind(this)); // Se llama a la funcion scan
  }

  // Función que analiza los datos a través de la cámara
  async scan() {
    console.log('ESCANEANDO');
    // Al momento de iniciar la cámara, comprueba si hay datos suficientes
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) { // Si está cargando...
        await this.loading.dismiss(); // Se deja de cargar
        this.loading = null;
        this.scanActive = true; // Comienza a escanear
      }

      // Se le da un tamaño al canvas
      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      // Función que dibujará dentro del canvas el video
      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      // Función que obtiene los datos del contexto canvas
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      // Pasaremos todo a la librería jsQR
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert' // Para procesar más rápido
      });
      console.log('code: ', code); // Por consola se pasan los datos

      // Si conseguimos un código, dejaremos de escanear
      if (code){
        this.scanActive = false; // Deja de escanear
        this.scanResult = code.data; // Se le pasa el resultado
        this.toJson(); // Se convierte a formato JSON
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this)); // Ocupa la función hasta que tenga los datos suficiente
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this)); // Ocupa la función hasta que tenga los datos suficientes
    }
  }

  // Función para dejar de escanear, toma la variable scanActive y la cambia a false
  stopScan(){
    this.scanActive = false;
  }

  // Función para reiniciar el escaneo, solo estará disponible cuando el programa haya empezado a escanear
  reset(){
    this.scanResult = null;
  }

  // Función para convertir el texto del QR en formato .JSON
  toJson() {
    this.jsonResult = JSON.parse(this.scanResult);
    console.log(this.jsonResult);
    this.showQrToast();
  }

  confirmarAsistencia() {
    this.bdLocal.guardarClase(
      this.jsonResult.idAsignatura,
      this.jsonResult.seccion,
      this.jsonResult.asignatura,
      this.jsonResult.docente,
      this.jsonResult.correo);
  }

  // Elemento Toast para mostrar los resultados y si quiere aceptarlos
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: '¿Confirmas la asistencia para ' + this.jsonResult.asignatura + ' ' + this.jsonResult.seccion +'?',
      position: 'bottom',
      buttons: [
        {
          text: 'Si',
          handler: () => {
            this.confirmarAsistencia();
          }
        }
      ]
    });
    toast.present();
  }

  verClases() {
    this.router.navigate(['/verClases']);
  }

}

