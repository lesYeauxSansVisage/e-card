import { Component, OnInit, Input } from '@angular/core';
import ICard from '../../../interfaces/ICard';

@Component({
  selector: 'app-computer-card',
  templateUrl: './computer-card.component.html',
  styleUrls: ['./computer-card.component.scss'],
})
export class ComputerCardComponent implements OnInit {
  @Input() card: ICard;

  constructor() {}

  ngOnInit(): void {}
}
