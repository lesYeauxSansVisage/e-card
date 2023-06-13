import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss'],
})
export class ScoreboardComponent implements OnInit {
  @Input() turn: number;
  @Input() playerPoints: number;
  @Input() computerPoints: number;
 
  constructor() {}

  ngOnInit(): void {}
}
