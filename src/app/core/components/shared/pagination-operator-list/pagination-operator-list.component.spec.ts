import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationOperatorListComponent } from './pagination-operator-list.component';

describe('PaginationOperatorListComponent', () => {
  let component: PaginationOperatorListComponent;
  let fixture: ComponentFixture<PaginationOperatorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationOperatorListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationOperatorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
