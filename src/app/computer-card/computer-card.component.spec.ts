import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComputerCardComponent } from './computer-card.component';

describe('ComputerCardComponent', () => {
  let component: ComputerCardComponent;
  let fixture: ComponentFixture<ComputerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComputerCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComputerCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
