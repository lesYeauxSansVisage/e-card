import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-end-screen',
  templateUrl: './end-screen.component.html',
  styleUrls: ['./end-screen.component.scss'],
})
export class EndScreenComponent implements OnInit {
  @Output() restartGame = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  onRestart() {
    console.log('clicked restart button');
    this.restartGame.emit();
  }
}
