import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TempoComponent } from './tempo.component';

@NgModule({
  declarations: [TempoComponent],
  exports: [TempoComponent],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class TempoModule {}
