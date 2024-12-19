import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorCardComponent } from './operator-card.component';

describe('OperatorCardComponent', () => {
  let component: OperatorCardComponent;
  let fixture: ComponentFixture<OperatorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
