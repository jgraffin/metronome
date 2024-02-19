import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { SongsService } from '../services/songs.service';
import { AddComponent } from '../modal/add/add.component';

@UntilDestroy()
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(
    private readonly songsService: SongsService,
    private modalCtrl: ModalController
  ) {}

  title = 'Músicas';
  songs = [] as any;

  ngOnInit() {
    this.getSongs();
  }

  getSongs() {
    this.songsService
      .getAllSongs()
      .pipe(untilDestroyed(this))
      .subscribe((result: any) => {
        this.songs = result;
        console.log('result', result);
      });
  }

  editConfirm(role: string) {
    if (role === 'confirm') {
      console.log(role);
      this.getSongs();
    }
  }

  removeConfirm(id: string) {
    this.songsService
      .deleteSong(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.getSongs();
      });
  }

  async addNew() {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();
    console.log(role);

    if (role === 'confirm') {
      console.log(role);
      this.getSongs();
    }
  }
}
