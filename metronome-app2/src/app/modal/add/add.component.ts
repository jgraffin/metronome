import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  name = '';
  tempo = null;
  band = '';

  constructor(
    private modalCtrl: ModalController,
    private readonly songsService: SongsService
  ) {}

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    let payload = {
      name: this.name,
      tempo: this.tempo,
      band: this.band,
    };

    return this.songsService.postSong(payload).subscribe(() => {
      this.modalCtrl.dismiss(payload, 'confirm');
    });
  }
}
