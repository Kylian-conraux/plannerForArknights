import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperatorCardComponent } from '../operator-card/operator-card.component';
import { PaginationOperatorListComponent } from '../pagination-operator-list/pagination-operator-list.component';
import { PaginatedResult } from '../../../../data/interface/pagination/pagination.interface';
import { Operator } from '../../../../data/models/operator/operator.model';

@Component({
  selector: 'app-operator-list',
  imports: [CommonModule, OperatorCardComponent, PaginationOperatorListComponent],
  templateUrl: './operator-list.component.html',
  styleUrl: './operator-list.component.scss'
})
export class OperatorListComponent {
  @Input() paginatedResult!: PaginatedResult<Operator>;
  @Output() pageChange = new EventEmitter<number>();

  @Output() operatorClick = new EventEmitter<Operator>();
  onOperatorClick(operator: Operator): void {
    this.operatorClick.emit(operator);
  }
}
