import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EditComponent } from 'src/app/modal/edit/edit.component';

@Component({
  selector: 'app-tempo',
  templateUrl: './tempo.component.html',
  styleUrls: ['./tempo.component.scss'],
})
export class TempoComponent implements OnInit {
  @Input() tempo!: number;
  @Input() id!: string;
  @Input() name!: string;
  @Input() status!: string;
  @Output() editConfirmEmitter = new EventEmitter();
  @Output() removeConfirmEmitter = new EventEmitter();

  isActive!: boolean;

  audioContext = null as any;
  notesInQueue = [] as any;
  currentBeatInBar = 0;
  beatsPerBar = 4;

  lookahead = 25;
  scheduleAheadTime = 0.1;
  nextNoteTime = 0.0;
  isRunning = false;
  intervalID = null as any;
  isModalOpen = false;
  songs = [] as any;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

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

  startStop(event: any, id: string) {
    if (this.isRunning) {
      this.stop();
      this.isActive = false;
    } else {
      this.start();
      this.isActive = true;
    }
  }

  async openModal(id: string, name: string, tempo: number) {
    if (this.isRunning) {
      this.stop();
      this.isActive = false;
    }

    const modal = await this.modalCtrl.create({
      component: EditComponent,
      componentProps: {
        item: {
          id,
          name,
          tempo,
        },
      },
    });
    modal.present();

    const { role } = await modal.onWillDismiss();

    this.editConfirmEmitter.emit(role);
  }

  removeSong(id: string) {
    this.removeConfirmEmitter.emit(id);
  }
}
