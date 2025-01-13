import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionCalculatorComponent } from './progression-calculator.component';

describe('ProgressionCalculatorComponent', () => {
  let component: ProgressionCalculatorComponent;
  let fixture: ComponentFixture<ProgressionCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
