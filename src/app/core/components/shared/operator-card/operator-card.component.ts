import { Component, Input } from '@angular/core';
import { Operator } from '../../../../data/models/operator/operator.model';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-operator-card',
  imports: [NgFor, NgIf],
  templateUrl: './operator-card.component.html',
  styleUrl: './operator-card.component.scss'
})
export class OperatorCardComponent {

  @Input() operator!: Operator;

  /**
   * Ce getter permet de générer un tableau de taille allant de 1 à 6 selon l'opérateur.
   * Chaque case est rempli de 0.
   * Ce tableau permet d'itérer dans le template pour génrer le bon nombre d'étoiles
   */
  get stars(): number[] {
    return Array(this.operator.rarity).fill(0);
  }
}
