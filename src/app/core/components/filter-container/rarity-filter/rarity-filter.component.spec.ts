import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RarityFilterComponent } from './rarity-filter.component';

describe('RarityFilterComponent', () => {
  let component: RarityFilterComponent;
  let fixture: ComponentFixture<RarityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RarityFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RarityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
