import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-progression-calculator',
  imports: [],
  templateUrl: './progression-calculator.component.html',
  styleUrl: './progression-calculator.component.scss'
})
export class ProgressionCalculatorComponent implements OnInit {

  @Input() operator: Operator | undefined = undefined;

  @Input() formGroup!: FormGroup;
 
  
  constructor() {
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(value => {
      
    });
  }

  ngOnChanges(): void {
    
  }

  calulatePromotion(): void {
  
  }


}
