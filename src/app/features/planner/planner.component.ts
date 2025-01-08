import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Operator } from '../../data/models/operator/operator.model';
import { OperatorService } from '../../core/services/operator.service';
import { FilterContainerComponent } from "../../core/components/filter-container/filter-container.component";
import { OperatorListComponent } from '../../core/components/shared/operator-list/operator-list.component';
import { BaseOperatorListPageComponent } from '../../core/components/shared/base-page-operator-list/base-operator-list-page.component';


@Component({
  selector: 'app-planner',
  imports: [OperatorListComponent, FilterContainerComponent, CommonModule],
  templateUrl: './planner.component.html',
  styleUrl: './planner.component.scss'
})
export class PlannerComponent extends BaseOperatorListPageComponent {

  operator: Operator | undefined = undefined;

  constructor(operatorService: OperatorService) {
    super(operatorService);
  }

  onTileClick(operator: Operator): void {
    this.operator = operator;
  }
}
