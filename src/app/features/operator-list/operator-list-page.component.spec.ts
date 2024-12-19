import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorListComponentPage } from './operator-list-page.component';

describe('OperatorListComponent', () => {
  let component: OperatorListComponentPage;
  let fixture: ComponentFixture<OperatorListComponentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperatorListComponentPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorListComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
