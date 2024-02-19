import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddComponent } from './add.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [AddComponent],
  exports: [AddComponent],
})
export class AddModule {}
