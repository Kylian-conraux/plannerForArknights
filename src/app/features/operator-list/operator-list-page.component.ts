import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Operator} from '../../data/models/operator/operator.model';
import { OperatorService } from '../../core/services/operator.service';
import { OperatorListComponent } from '../../core/components/shared/operator-list/operator-list.component';
import { FilterContainerComponent } from "../../core/components/filter-container/filter-container.component";
import { BaseOperatorListPageComponent } from '../../core/components/shared/base-page-operator-list/base-operator-list-page.component';


@Component({
  selector: 'app-operator-list-page',
  imports: [OperatorListComponent, FilterContainerComponent],
  templateUrl: './operator-list-page.component.html',
  styleUrl: './operator-list-page.component.scss'
})
export class OperatorListComponentPage extends BaseOperatorListPageComponent implements OnInit {


  constructor(operatorService: OperatorService,
    private route: Router
  ) {
    super(operatorService);
  }


  /**
   * Navigue vers la page d'un opérateur spécifique
   * @param operator L'opérateur cliqué
   */
  onTileClick(operator: Operator): void {
    this.route.navigate(['/operator', operator.id]);
  }



}
