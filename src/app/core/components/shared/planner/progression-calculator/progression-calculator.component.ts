import { Component, Input, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { FormGroup } from '@angular/forms';

import { PromotionsService } from '../../../../services/promotions.service';
import { Subscription } from 'rxjs';
import { PromotionCost } from '../../../../../data/models/promotion/promotion.model';

@Component({
  selector: 'app-progression-calculator',
  imports: [],
  templateUrl: './progression-calculator.component.html',
  styleUrl: './progression-calculator.component.scss'
})
export class ProgressionCalculatorComponent implements OnInit, OnChanges, OnDestroy {

  @Input() operator: Operator | undefined = undefined;

  @Input() formGroup!: FormGroup;

  private subscription: Subscription = new Subscription();
  promotionCosts: PromotionCost[] = [];

  constructor(private promotionService: PromotionsService) {
  }

  ngOnInit(): void {
   
    this.promotionService.getPromotions().subscribe({
      next: (data) => {
        console.log('Promotions', data);
        this.promotionCosts = data;
      },
      error: (error) => {
        console.error('Error', error);
      }
    });


  }

  ngOnChanges(): void {
    console.log('Operator changed (from calculator) : ', this.operator);
    this.calulatePromotion();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calulatePromotion(): void {
    let elite = this.formGroup.get('elite');
    let eliteToReach = this.formGroup.get('eliteToReach');

    if (this.operator) {
      console.log('Calculating promotion for operator', this.operator);
      console.log('Elite', elite?.value);
      console.log('Elite to reach', eliteToReach?.value);

      let promotionCost = this.promotionCosts.find(promotion => promotion.rarity === this.operator?.rarity);
      if (promotionCost) {
        console.log('Promotion cost', promotionCost);
      }
    }
  }

}
