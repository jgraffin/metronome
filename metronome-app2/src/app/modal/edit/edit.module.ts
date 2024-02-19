import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  declarations: [EditComponent],
  exports: [EditComponent],
})
export class EditModule {}
