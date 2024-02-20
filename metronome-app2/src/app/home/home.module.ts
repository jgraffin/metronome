import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { EditModule } from '../modal/edit/edit.module';
import { TempoModule } from '../components/tempo/tempo.module';
import { AddModule } from '../modal/add/add.module';
import { AddButtonModule } from '../components/add-button/add-button.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddButtonModule,
    AddModule,
    EditModule,
    TempoModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePage],
  exports: [HomePage],
})
export class HomePageModule {}
