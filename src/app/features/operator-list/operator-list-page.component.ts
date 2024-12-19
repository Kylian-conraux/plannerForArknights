import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Operator, OperatorFilters } from '../../data/models/operator/operator.model';
import { PaginatedResult } from '../../data/interface/pagination/pagination.interface';
import { OperatorService } from '../../core/services/operator.service';
import { OperatorListComponent } from '../../core/components/shared/operator-list/operator-list.component';


@Component({
  selector: 'app-operator-list-page',
  imports: [OperatorListComponent],
  templateUrl: './operator-list-page.component.html',
  styleUrl: './operator-list-page.component.scss'
})
export class OperatorListComponentPage implements OnInit {



  operators: Operator[] = [];

  private subscription: Subscription = new Subscription();


  filters: OperatorFilters = {
    searchQuery: '',
    rarity: null,
    page: 1,
    pageSize: 14
  };

  paginatedResult: PaginatedResult<Operator> = {
    items: [],
    total: 0,
    currentPage: 1,
    totalPages: 1,
    hasNext: false,
    hasPrevious: false
  };


  constructor(private operatorService: OperatorService,
    private route: Router
  ) {

  }

  ngOnInit(): void {
    
    this.loadOperator();
    this.loadOperators();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * 
   */
  private loadOperator() {
    this.operatorService.getOperators().subscribe({
      next: (data) => {
        this.operators = data;
      },
      error: (err) => {
        console.error('Failed to load operators:', err);
      }
    });
   
  }


  /**
   * 
   * @param operator 
   */
  private onTileClick(operator: Operator): void {
    this.route.navigate(['/operator', operator.id]);
  }

  onFiltersChange(newFilters: OperatorFilters) {
    this.filters = {
      ...newFilters,
      page: 1
    };
    this.loadOperators();
  }

  onPageChange(page: number) {
    this.filters = {
      ...this.filters,
      page
    };
    this.loadOperators();
  }

  private loadOperators() {
    this.paginatedResult = this.operatorService.getPaginatedoperators(this.filters);
  }
}
