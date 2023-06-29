import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { CardComponent } from './game-table/deck/card/card.component';
import { ComputerCardComponent } from './game-table/deck/computer-card/computer-card.component';
import { GameTableComponent } from './game-table/game-table.component';
import { DeckComponent } from './game-table/deck/deck.component';
import { ScoreboardComponent } from './game-table/scoreboard/scoreboard.component';
import { EndScreenComponent } from './game-table/end-screen/end-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ComputerCardComponent,
    GameTableComponent,
    DeckComponent,
    ScoreboardComponent,
    EndScreenComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
