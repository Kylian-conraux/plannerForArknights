import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Operator } from '../../data/models/operator/operator.model';
import { OperatorService } from '../../core/services/operator.service';
import { FilterContainerComponent } from "../../core/components/filter-container/filter-container.component";
import { OperatorListComponent } from '../../core/components/shared/operator-list/operator-list.component';
import { BaseOperatorListPageComponent } from '../../core/components/shared/base-page-operator-list/base-operator-list-page.component';
import { ProgressionConfiguratorComponent } from '../../core/components/shared/planner/progression-configurator/progression-configurator.component';
import { ProgressionCalculatorComponent } from '../../core/components/shared/planner/progression-calculator/progression-calculator.component';

@Component({
  selector: 'app-planner',
  imports: [OperatorListComponent, FilterContainerComponent, CommonModule, ReactiveFormsModule, ProgressionConfiguratorComponent, ProgressionCalculatorComponent],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent extends BaseOperatorListPageComponent {

  operator: Operator | undefined = undefined;

  formGroup!: FormGroup;

  constructor(operatorService: OperatorService, private fBuilder: FormBuilder) {
    super(operatorService);
    this.formGroup = this.fBuilder.group({
      level: [1],
      elite: [0],
      skill: [1],
      levelToReach: [90],
      eliteToReach: [2],
      skillToReach: [7]
    });
    
    this.formGroup.valueChanges.subscribe(() => {
     // console.log('Form change', this.formGroup.value);
    });

  }


  onTileClick(operator: Operator): void {
    this.operator = operator;
  }

}
