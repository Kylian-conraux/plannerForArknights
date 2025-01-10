import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressionConfiguratorComponent } from './progression-configurator.component';

import { FormBuilder } from '@angular/forms';
import { OperatorService } from '../../../../../core/services/operator.service';
import { of } from 'rxjs';
import { Operator } from '../../../../../data/models/operator/operator.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ProgressionConfiguratorComponent Extended Tests', () => {
  let component: ProgressionConfiguratorComponent;
  let fixture: ComponentFixture<ProgressionConfiguratorComponent>;
  let operatorService: OperatorService;

  beforeEach(() => {
    const operatorServiceMock = {
      getMaxLevelByRarityAndElite: jasmine.createSpy('getMaxLevelByRarityAndElite').and.returnValue(90)
    };

    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule,ProgressionConfiguratorComponent],
      providers: [
        FormBuilder,
        { provide: OperatorService, useValue: operatorServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProgressionConfiguratorComponent);
    component = fixture.componentInstance;
    operatorService = TestBed.inject(OperatorService);
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default form values', () => {
    expect(component.fGroup.value).toEqual({
      level: 1,
      elite: 0,
      skill: 1,
      levelToReach: 90,
      eliteToReach: 2,
      skillToReach: 7
    });
  });

  it('should clamp level value on handleLevelValidation', () => {
    component.fGroup.patchValue({ level: 999 });
    component.handleLevelValidation();
    expect(component.fGroup.get('level')?.value).toBeLessThanOrEqual(90);
  });

  it('should clamp levelToReach properly with handleLevelToReachValidation', () => {
    component.fGroup.patchValue({ levelToReach: 999 });
    component.handleLevelToReachValidation();
    expect(component.fGroup.get('levelToReach')?.value).toBeLessThanOrEqual(90);
  });

  it('should update skillToReach if skill is greater in updateDependantField', () => {
    component.fGroup.patchValue({ skill: 5, skillToReach: 3 });
    component.updateDependantField('skill', 'skillToReach');
    expect(component.fGroup.get('skillToReach')?.value).toBe(5);
  });

  it('should call getMaxLevelByRarityAndElite on updateMaxLevelFieldWithElite', () => {
    component.updateMaxLevelFieldWithElite(2);
    expect(operatorService.getMaxLevelByRarityAndElite).toHaveBeenCalled();
  });

  it('should execute onEliteChange and update fields', () => {
    spyOn(component, 'updateDependantField').and.callThrough();
    spyOn(component, 'updateMaxLevelFieldWithElite').and.callThrough();
    component.onEliteChange();
    expect(component.updateDependantField).toHaveBeenCalled();
    expect(component.updateMaxLevelFieldWithElite).toHaveBeenCalled();
  });

  it('should disable fields with rarity <= 2 in checkFieldsToEnable', () => {
    component.checkFieldsToEnable(2);
    expect(component.fGroup.get('skill')?.disabled).toBeTrue();
    expect(component.fGroup.get('level')?.disabled).toBeFalse();
  });

  it('should enable fields with rarity > 2 in checkFieldsToEnable', () => {
    component.checkFieldsToEnable(5);
    expect(component.fGroup.get('skill')?.enabled).toBeTrue();
    expect(component.fGroup.get('level')?.enabled).toBeTrue();
  });

  it('should set form based on updateForms', () => {
    component.updateForms(2, 1);
    expect(operatorService.getMaxLevelByRarityAndElite).toHaveBeenCalledWith(2, 1);
    expect(component.fGroup.get('levelToReach')?.value).toBe(90);
  });

  it('should do nothing special for onSkillToReachChange if value < 7', () => {
    component.fGroup.patchValue({ skillToReach: 5 });
    component.onSkillToReachChange();
    // expect no error thrown (future logic can be tested here)
    expect(true).toBeTrue();
  });
});
