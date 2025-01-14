import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { FormGroup } from '@angular/forms';

import { PromotionsService } from '../../../../services/promotions.service';
import { Subscription } from 'rxjs';
import { PromotionCost} from '../../../../../data/models/promotion/promotion.model';

@Component({
  selector: 'app-progression-calculator',
  imports: [],
  templateUrl: './progression-calculator.component.html',
  styleUrl: './progression-calculator.component.scss'
})
export class ProgressionCalculatorComponent implements OnInit, OnDestroy {

  @Input() operator: Operator | undefined = undefined;

  @Input() formGroup!: FormGroup;

  private subscription: Subscription = new Subscription();
  promotionCosts: PromotionCost[] = [];
  coutPromotion: number = 0;

  constructor(private promotionService: PromotionsService) {
  }

  ngOnInit(): void {
    this.formGroup.get('elite')?.valueChanges.subscribe(() => this.calulatePromotion());
    this.formGroup.get('eliteToReach')?.valueChanges.subscribe(() => this.calulatePromotion());


    this.promotionService.getPromotions().subscribe({
      next: (data) => {
        this.promotionCosts = data;
      },
      error: (error) => {
        console.error('Error', error);
      }
    });


  }

  ngOnChanges(): void {
    this.calulatePromotion();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  calulatePromotion(): void {
    let elite = this.formGroup.get('elite');
    let eliteToReach = this.formGroup.get('eliteToReach');

    if (this.operator) {
      let promotionCost = this.promotionCosts.find(promotion => promotion.rarity === this.operator?.rarity);
      if (promotionCost) {
        this.coutPromotion = this.getTotalCost(elite?.value, eliteToReach?.value, promotionCost);
        console.log('Promotion cost : ', this.coutPromotion);
      }
    }
  }

  getTotalCost(elite: number, eliteToReach: number, promotionCost: PromotionCost): number {
    let compare = eliteToReach - elite;

    switch (compare) {
      case 1:
        let promo;
        if (eliteToReach === 1) {
          promo = promotionCost.promotion.find(obj => obj.elite === 1);
        } else {
          promo = promotionCost.promotion.find(obj => obj.elite === 2);
        }
        return promo?.cost || 0;
      case 2:
        let eliteOne = promotionCost.promotion.find(obj => obj.elite === 1)?.cost || 0;
        let eliteTwo = promotionCost.promotion.find(obj => obj.elite === 2)?.cost || 0;
        let total = eliteOne + eliteTwo;
        return total;
      default:
        return 0;
    }
  }

}
