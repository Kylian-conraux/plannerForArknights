import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionConfiguratorComponent } from './progression-configurator.component';

describe('ProgressionConfiguratorComponent', () => {
  let component: ProgressionConfiguratorComponent;
  let fixture: ComponentFixture<ProgressionConfiguratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressionConfiguratorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressionConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
