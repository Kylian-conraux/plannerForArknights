import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Operator } from '../../data/models/operator/operator.model';
import { OperatorService } from '../../core/services/operator.service';

@Component({
  selector: 'app-operator-details',
  imports: [CommonModule],
  templateUrl: './operator-details.component.html',
  styleUrl: './operator-details.component.scss'
})
export class OperatorDetailsComponent implements OnInit {

  operator!: Operator;

  constructor(private route: ActivatedRoute, private operatorService: OperatorService) {}

  ngOnInit(): void {
    // Extract the operator ID from the route parameters
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id >= 0) {
      this.operatorService.getOperatorById(id).subscribe({
        next: (operator) => {
          if (operator) {
            this.operator = operator;
          } else {
            // Handle the case where the operator is not found
            console.error('Operator not found');
          }
        },
        error: (err) => {
          // Handle the case where an error occurs
          console.error('Error fetching operator details:', err);
        }
      });
    }
  }

  // Helper to determine if operator data is loaded
  get hasOperator(): boolean {
    return !!this.operator;
  }

}
