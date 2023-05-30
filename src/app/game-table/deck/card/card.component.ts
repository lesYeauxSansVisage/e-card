import { Component, OnInit, Input } from '@angular/core';
import Card from '../../../interfaces/ICard';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() cardData: Card;

  constructor() {}

  ngOnInit(): void {}
}
