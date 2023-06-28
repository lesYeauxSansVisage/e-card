import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoreboardComponent } from './scoreboard.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the current turn', () => {
    const scoreboardTurnEl = el.query(By.css('.scoreboard__turn'));

    component.turn = 2;
    fixture.detectChanges();

    expect(scoreboardTurnEl.nativeElement.textContent).toContain('Turn 2');
  });

  it('should show the current player points', () => {
    const playerPointsEl = el.queryAll(
      By.css('.scoreboard__points')
    )[0];

    component.playerPoints = 10;
    fixture.detectChanges();

    expect(playerPointsEl.nativeElement.textContent).toBe('10');
  });

  it('should show the current computer points', () => {
    const computerPointsEl = el.queryAll(
      By.css('.scoreboard__points')
    )[1];

    component.computerPoints = 10;
    fixture.detectChanges();

    expect(computerPointsEl.nativeElement.textContent).toBe('10');
  });
});
