import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [AddButtonComponent],
  exports: [AddButtonComponent],
  imports: [CommonModule, IonicModule],
})
export class AddButtonModule {}
