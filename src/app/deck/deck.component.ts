import { Component, OnInit, Input } from '@angular/core';
import ICard from '../interfaces/ICard';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @Input() deck: ICard[];
  @Input() player: string;

  constructor() {}

  ngOnInit(): void {}
}
