import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-search-bar',
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  @Input() operatorName: string = '';
  @Output() search = new EventEmitter<string>();

  get operatorNameQuerry(): string {
    return this.operatorName;
  }

  set searchQuery(opName: string) {
    this.operatorName = opName;
  }

  onSearch() {
    this.search.emit(this.operatorName);
  }
}
