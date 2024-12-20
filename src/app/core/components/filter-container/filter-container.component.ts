import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { OperatorFilters } from '../../../data/models/operator/operator.model';
import { OperatorService } from '../../services/operator.service';
//import {}

@Component({
  selector: 'app-filter-container',
  imports: [SearchBarComponent],
  templateUrl: './filter-container.component.html',
  styleUrl: './filter-container.component.scss'
})
export class FilterContainerComponent {

  @Input() opFilter!: OperatorFilters;

  @Output() filterChange = new EventEmitter<OperatorFilters>();

  class: string[] = [];

  constructor(private operatorService: OperatorService){
    this.class = this.operatorService.getAllclass();
  }

  onSearch(query: string){
    this.emitFilterChange({
      ...this.opFilter,
      searchQuery: query
    })
  }

  private emitFilterChange(newFilters: OperatorFilters) {
    this.filterChange.emit(newFilters);
  }

}
