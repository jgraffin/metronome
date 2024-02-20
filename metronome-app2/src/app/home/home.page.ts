import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonModal, ModalController } from '@ionic/angular';
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
    private modalCtrl: ModalController,
    private alertController: AlertController
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
      });
  }

  editConfirm(role: string) {
    if (role === 'confirm') {
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

  async presentDeleteConfirmation(id: string) {
    const alert = await this.alertController.create({
      header: 'Confirma exclusão?',
      message: 'Tem certeza que deseja excluir este andamento?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Excluir',
          handler: () => {
            this.removeConfirm(id);
          },
        },
      ],
    });

    await alert.present();
  }

  async addNew() {
    const modal = await this.modalCtrl.create({
      component: AddComponent,
    });
    modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.getSongs();
    }
  }
}
