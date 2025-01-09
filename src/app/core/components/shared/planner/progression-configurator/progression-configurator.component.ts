import { Component, OnInit } from '@angular/core';
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

  operator: Operator | undefined = undefined;

  allSkillOptions = [1, 2, 3, 4, 5, 6, 7];
  allEliteOptions = [0, 1, 2];
  maxLevel!: number;

  constructor(private fBuilder: FormBuilder) {
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

  emptyForm(): void {}




}
