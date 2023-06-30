import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { EndScreenComponent } from './end-screen.component';
import { By } from '@angular/platform-browser';

describe('EndScreenComponent', () => {
  let component: EndScreenComponent;
  let fixture: ComponentFixture<EndScreenComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EndScreenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EndScreenComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the result', () => {
    component.result = 'loss';

    fixture.detectChanges();

    const resultEl = el.query(By.css('.end-screen__result'));

    expect(resultEl.nativeElement.textContent).toContain('loss');
  });

  it('should have an image with a filename contaning the result', () => {
    const result = 'loss';
    component.result = result;

    fixture.detectChanges();

    const image = el.query(By.css('.end-screen__img'));

    expect(image.nativeElement.src).toContain(result);
  });

  it('reset button should call the onRestart method', () => {
    spyOn(component, 'onRestart');

    const button = el.query(By.css('.btn-restart')).nativeElement;

    button.click();

    expect(component.onRestart).toHaveBeenCalledTimes(1);
  });
});
