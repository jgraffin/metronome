import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() allBands: any;

  constructor() {}

  bands = [
    { name: 'Atreyu', id: '0' },
    { name: 'Bad Religion', id: '1' },
    { name: 'Bless The Fall', id: '2' },
    { name: 'Foo Fighters', id: '3' },
    { name: 'Pulley', id: '4' },
  ];

  ngOnInit(): void {
    console.log(this.allBands);
  }
}
