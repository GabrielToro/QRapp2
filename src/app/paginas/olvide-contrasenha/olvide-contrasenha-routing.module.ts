import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OlvideContrasenhaPage } from './olvide-contrasenha.page';

const routes: Routes = [
  {
    path: '',
    component: OlvideContrasenhaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OlvideContrasenhaPageRoutingModule {}
