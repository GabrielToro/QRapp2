import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexPage } from './index.page';
import { LectorQRComponent } from 'src/app/componentes/lector-qr/lector-qr.component';

const routes: Routes = [
  {
    path: '',
    component: IndexPage,
    // Se declaran las rutas hijas
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IndexPageRoutingModule {}
