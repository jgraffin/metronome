import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavParams } from '@ionic/angular';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  item: any;

  constructor(
    private modalCtrl: ModalController,
    public readonly navParams: NavParams,
    private readonly songsService: SongsService
  ) {
    this.item = navParams.get('item');
  }

  ngOnInit() {
    console.log(this.item);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    return this.songsService
      .updateSong(this.item.id, this.item)
      .subscribe(() => {
        this.modalCtrl.dismiss(this.item, 'confirm');
      });
  }
}
