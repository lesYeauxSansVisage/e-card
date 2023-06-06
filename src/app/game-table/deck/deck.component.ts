import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ICard from '../../interfaces/ICard';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.scss'],
})
export class DeckComponent implements OnInit {
  @Input() deck: ICard[];
  @Input() player: string;
  @Input() choosenCardID: number | null = null;

  @Output() cardClicked = new EventEmitter<ICard>();

  constructor() {}

  ngOnInit(): void {
    console.log(this.choosenCardID);
  }

  onClick(card: ICard) {
    this.cardClicked.emit(card);
    this.choosenCardID = card.id;
  }
}
