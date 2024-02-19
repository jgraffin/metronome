import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  name = '';
  tempo = null;

  constructor(
    private modalCtrl: ModalController,
    public readonly navParams: NavParams,
    private readonly songsService: SongsService
  ) {
    this.name = navParams.get('name');
    this.tempo = navParams.get('tempo');
  }

  ngOnInit() {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  onSubmit() {
    let payload = {
      name: this.name,
      tempo: this.tempo,
    };

    return this.songsService.postSong(payload).subscribe(() => {
      this.modalCtrl.dismiss(payload, 'confirm');
    });
  }
}
