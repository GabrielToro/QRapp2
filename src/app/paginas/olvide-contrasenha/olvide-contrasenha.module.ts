import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OlvideContrasenhaPageRoutingModule } from './olvide-contrasenha-routing.module';

import { OlvideContrasenhaPage } from './olvide-contrasenha.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OlvideContrasenhaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [OlvideContrasenhaPage]
})
export class OlvideContrasenhaPageModule {}
