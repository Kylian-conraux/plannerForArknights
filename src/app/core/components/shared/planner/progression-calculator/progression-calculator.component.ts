import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { FormGroup } from '@angular/forms';

import { PromotionsService } from '../../../../services/promotions.service';

@Component({
  selector: 'app-progression-calculator',
  imports: [],
  templateUrl: './progression-calculator.component.html',
  styleUrl: './progression-calculator.component.scss'
})
export class ProgressionCalculatorComponent implements OnInit {

  @Input() operator: Operator | undefined = undefined;

  @Input() formGroup!: FormGroup;
 
  
  constructor(private promotionService: PromotionsService) {
  }

  ngOnInit(): void {
    this.formGroup.valueChanges.subscribe(value => {
      this.calulatePromotion();
    });

    
  }

  ngOnChanges(): void {
    console.log('Operator changed', this.operator);
  }

  calulatePromotion(): void {
   let elite = this.formGroup.get('elite');
   let eliteToReach = this.formGroup.get('eliteToReach');

   if(this.operator){
      this.promotionService.getPromotionByRarity(this.operator.rarity).subscribe(promotion => {
        console.log('Promotion', promotion);
      });
   }
  }


}
