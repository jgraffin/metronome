import { Component, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { EditComponent } from '../modal/edit/edit.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonModal) modal!: IonModal;

  constructor(private modalCtrl: ModalController) {}

  audioContext = null as any;
  notesInQueue = [] as any;
  currentBeatInBar = 0;
  beatsPerBar = 1;
  song = '';
  tempo = 100 as any;
  lookahead = 25;
  scheduleAheadTime = 0.1;
  nextNoteTime = 0.0;
  isRunning = false;
  intervalID = null as any;
  status = 'play-circle';
  isModalOpen = false;

  nextNote() {
    let secondsPerBeat = 60.0 / this.tempo;
    this.nextNoteTime += secondsPerBeat;

    this.currentBeatInBar++;

    if (this.currentBeatInBar == this.beatsPerBar) {
      this.currentBeatInBar = 0;
    }
  }

  scheduleNote(beatNumber: number, time: number) {
    this.notesInQueue.push({ note: beatNumber, time: time });

    // create an oscillator
    const osc = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();

    osc.frequency.value = beatNumber % this.beatsPerBar == 0 ? 1000 : 800;
    envelope.gain.value = 1;
    envelope.gain.exponentialRampToValueAtTime(1, time + 0.001);
    envelope.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    osc.connect(envelope);
    envelope.connect(this.audioContext.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  }

  scheduler() {
    while (
      this.nextNoteTime <
      this.audioContext.currentTime + this.scheduleAheadTime
    ) {
      this.scheduleNote(this.currentBeatInBar, this.nextNoteTime);
      this.nextNote();
    }
  }

  start() {
    if (this.isRunning) return;

    if (this.audioContext == null) {
      this.audioContext = new window.AudioContext();
    }

    this.isRunning = true;

    this.currentBeatInBar = 0;
    this.nextNoteTime = this.audioContext.currentTime + 0.05;

    this.intervalID = setInterval(() => this.scheduler(), this.lookahead);
  }

  stop() {
    this.isRunning = false;

    clearInterval(this.intervalID);
  }

  startStop() {
    if (this.isRunning) {
      this.stop();
      this.status = 'play-circle';
    } else {
      this.start();
      this.status = 'pause-circle';
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.tempo = ev.detail.data;
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: EditComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    console.log(data);

    if (role === 'confirm') {
      this.tempo = data.tempo;
      this.song = data.song;
    }
  }
}
