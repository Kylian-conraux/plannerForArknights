import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { OperatorService } from '../../../../../core/services/operator.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progression-configurator',
  imports: [CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './progression-configurator.component.html',
  styleUrl: './progression-configurator.component.scss'
})
export class ProgressionConfiguratorComponent implements OnInit {

  fGroup!: FormGroup;

  @Input() operator: Operator | undefined = undefined;

  allSkillOptions = [1, 2, 3, 4, 5, 6, 7];
  allEliteOptions = [0, 1, 2];
  maxLevel!: number;

  constructor(private fBuilder: FormBuilder, private operatorService: OperatorService) {
    this.fGroup = this.fBuilder.group({//create with default value
      level: [1],
      elite: [0],
      skill: [1],
      levelToReach: [90],
      eliteToReach: [2],
      skillToReach: [7]
    });
  }

  ngOnInit(): void {

    const fields = [
      this.getField('skill'),
      this.getField('skillToReach'),
      this.getField('elite'),
      this.getField('eliteToReach'),
      this.getField('level'),
      this.getField('levelToReach'),
    ];

    if (!this.operator) {
      this.disableFields(fields);
    }
  }

  ngOnChanges(): void {
    if (this.operator) {
      this.updateForms(this.operator.rarity, this.operator.elite);
    }
  }

  private updateEliteOptions(rarity: number): void {  
    if (rarity === 3) {
      this.fGroup.patchValue({ eliteToReach: 1 });
      this.allEliteOptions = [0, 1];
    } else {
      this.fGroup.patchValue({ eliteToReach: 2 });
      this.allEliteOptions = [0, 1, 2];
    }
  }

  private getField(fieldName: string): AbstractControl {
    const field = this.fGroup.get(fieldName);
    if (!field) {
      throw new Error(`Field '${fieldName}' not found in the form group.`);
    }
    return field;
  }


  enableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      if (!field.enabled) {
        field.enable();
      }
    });
  }

  disableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      if (field.enabled) {
        field.disable();
      }
    });
  }
  
  checkFieldsToEnable(rarity: number): void {
    const fieldsToDisable = [
      this.getField('skill'),
      this.getField('skillToReach'),
      this.getField('elite'),
      this.getField('eliteToReach'),
    ];
    const fieldsToEnable = [
      this.getField('level'),
      this.getField('levelToReach'),
    ];
  
    if (rarity <= 2) {
      this.disableFields(fieldsToDisable);
      this.enableFields(fieldsToEnable);
    } else {
      this.enableFields([...fieldsToDisable, ...fieldsToEnable]);
      this.updateEliteOptions(rarity);
    }
  }

  handleLevelToReachValidation(): void {
    const levelControl = this.fGroup.get('level');
    const levelToReachControl = this.fGroup.get('levelToReach');
    const elite = this.fGroup.get('elite')?.value;

    if (!levelControl || !levelToReachControl) return;

    // Constrain 'level' after editing
    const rarity = this.operator?.rarity ?? 0; // Default to 0 if undefined
    const maxLevel = this.operatorService.getMaxLevelByRarityAndElite(rarity, elite);
    const levelValue = Math.min(Math.max(levelControl.value, 1), maxLevel);
    if (levelControl.value !== levelValue) {
      levelControl.setValue(levelValue);
    }

    // Constrain 'levelToReach' after editing
    const levelToReachValue = Math.min(Math.max(levelToReachControl.value, levelValue), this.maxLevel);
    if (levelToReachControl.value !== levelToReachValue) {//check if we need to update the forms
      levelToReachControl.setValue(levelToReachValue, { emitEvent: false });
    }
  }

  updateForms(rarity: number, elite: number): void {
    this.checkFieldsToEnable(rarity);
    this.maxLevel = this.operatorService.getMaxLevelByRarityAndElite(rarity, elite);
    this.fGroup.get('levelToReach')?.setValue(this.maxLevel);
  }


  onEliteChange(): void {
    this.updateDependantField('elite', 'eliteToReach');
    this.updateMaxLevelFieldWithElite(this.fGroup.get('eliteToReach')?.value);
  }

  updateDependantField(
    primaryField: string,
    dependentField: string
  ): void {
    const primaryValue = this.fGroup.get(primaryField)?.value;
    const dependentValue = this.fGroup.get(dependentField)?.value;

    // Ensure the dependent field value is greater than or equal to the primary field value
    if (dependentValue < primaryValue) {
      this.fGroup.get(dependentField)?.setValue(primaryValue);
    }
  }

  updateMaxLevelFieldWithElite(elite: number) {
    const levelToReachField = this.fGroup.get('levelToReach');
    const newMaxLevel = this.operator ? this.operatorService.getMaxLevelByRarityAndElite(this.operator.rarity, elite) : 0;
    this.maxLevel = newMaxLevel;
    levelToReachField?.setValue(newMaxLevel);

  }


  onSkillToReachChange(): void {
    const skillToReachValue = this.fGroup.get('skillToReach')?.value;
    if (skillToReachValue < 7) {
      //this.operatorService.setIsMasteryAvailable(false);
    } else {
      //this.plannerOperatorService.setIsMasteryAvailable(true);
    }

  }


}
