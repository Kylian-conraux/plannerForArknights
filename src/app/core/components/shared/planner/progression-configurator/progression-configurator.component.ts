import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { OperatorService } from '../../../../../core/services/operator.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    
  }

  handleLevelToReachValidation(): void {
    const levelControl = this.fGroup.get('level');
    console.log('levelControl', levelControl?.value);
    const levelToReachControl = this.fGroup.get('levelToReach');
    console.log('levelToReachControl', levelToReachControl?.value);

    if (!levelControl || !levelToReachControl) return;

    // Constrain 'level' after editing
    const levelValue = Math.min(Math.max(levelControl.value, 1), this.maxLevel); //[min : 1 ; max : this.maxLevel] 
    console.log('levelValue', levelValue);
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
    const skillField = this.fGroup.get('skill');
    const skillToReachField = this.fGroup.get('skillToReach');
    const eliteField = this.fGroup.get('elite');
    const eliteToReachField = this.fGroup.get('eliteToReach');

    if (rarity <= 2) {
      eliteToReachField?.setValue(0);
      [skillField, skillToReachField, eliteField, eliteToReachField].forEach((field) => field?.disable());
    } else if (rarity === 3) {
      eliteToReachField?.setValue(1);
      this.fGroup.patchValue({ eliteToReach: 1 });
      this.allEliteOptions = [0, 1];
    }

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
    if(skillToReachValue < 7){
      //this.operatorService.setIsMasteryAvailable(false);
    }else{
      //this.plannerOperatorService.setIsMasteryAvailable(true);
    }
    
  }


}
