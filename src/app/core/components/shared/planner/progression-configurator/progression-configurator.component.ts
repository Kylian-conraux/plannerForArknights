import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Operator } from '../../../../../data/models/operator/operator.model';
import { OperatorService } from '../../../../../core/services/operator.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-progression-configurator',
  imports: [CommonModule, MatInputModule, MatSelectModule, MatFormFieldModule, ReactiveFormsModule],
  templateUrl: './progression-configurator.component.html',
  styleUrl: './progression-configurator.component.scss'
})
export class ProgressionConfiguratorComponent implements OnInit {

  fGroup!: FormGroup;

  @Input() operator: Operator | undefined = undefined;

  allSkillOptions = [1, 2, 3, 4, 5, 6, 7];
  allEliteOptions = [0, 1, 2];
  maxLevel!: number;

  constructor(private fBuilder: FormBuilder, private operatorService: OperatorService) {
    this.fGroup = this.fBuilder.group({//create with default value
      level: [1],
      elite: [0],
      skill: [1],
      levelToReach: [90],
      eliteToReach: [2],
      skillToReach: [7]
    });
  }

  ngOnInit(): void {

    const fields = [
      this.getField('skill'),
      this.getField('skillToReach'),
      this.getField('elite'),
      this.getField('eliteToReach'),
      this.getField('level'),
      this.getField('levelToReach'),
    ];

    if (!this.operator) {
      this.disableFields(fields);
    }
  }

  ngOnChanges(): void {
    if (this.operator) {
      this.updateForms(this.operator.rarity, this.operator.elite);
    }
  }

  /**
  * Met à jour les options de stage élite en fonction de la rareté.
  * @param rarity Rareté de l'opérateur
  */
  private updateEliteOptions(rarity: number): void {
    if (rarity === 3) {
      this.fGroup.patchValue({ eliteToReach: 1 });
      this.allEliteOptions = [0, 1];
    } else {
      this.fGroup.patchValue({ eliteToReach: 2 });
      this.allEliteOptions = [0, 1, 2];
    }
  }

  /**
  * Récupère un champ spécifique du formulaire.
  * @param fieldName Nom du champ à récupérer
  * @returns Le contrôle abstrait du champ
  */
  private getField(fieldName: string): AbstractControl {
    const field = this.fGroup.get(fieldName);
    if (!field) {
      throw new Error(`Field '${fieldName}' not found in the form group.`);
    }
    return field;
  }

  /**
     * Active les champs spécifiés.
     * @param fields Liste des champs à activer
     */
  enableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      if (!field.enabled) {
        field.enable();
      }
    });
  }

  /**
  * Désactive les champs spécifiés.
  * @param fields Liste des champs à désactiver
  */
  disableFields(fields: AbstractControl[]): void {
    fields.forEach((field: AbstractControl) => {
      if (field.enabled) {
        field.disable();
      }
    });
  }

  /**
   * Vérifie et active/désactive les champs selon la rareté de l'opérateur.
   * @param rarity Rareté de l'opérateur
   */
  checkFieldsToEnable(rarity: number): void {
    const fieldsToDisable = [
      this.getField('skill'),
      this.getField('skillToReach'),
      this.getField('elite'),
      this.getField('eliteToReach'),
    ];
    const fieldsToEnable = [
      this.getField('level'),
      this.getField('levelToReach'),
    ];

    if (rarity <= 2) {
      this.disableFields(fieldsToDisable);
      this.enableFields(fieldsToEnable);
    } else {
      this.enableFields([...fieldsToDisable, ...fieldsToEnable]);
      this.updateEliteOptions(rarity);
    }
  }

  /**
  * Limite une valeur entre un minimum et un maximum.
  * @param value Valeur à limiter
  * @param min Valeur minimale
  * @param max Valeur maximale
  * @returns La valeur limitée
  */
  private clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  /**
   * Calcule le niveau maximum en fonction de la rareté et du stage élite.
   * @returns Le niveau maximum possible
   */
  private getMaxLevel(): number {
    const rarity = this.operator?.rarity ?? 0;
    let elite = -1;
    let eliteField = this.getField('elite');
    if (eliteField.disabled) {
      elite = this.operator?.elite ?? 0;
    } else {
      elite = this.fGroup.get('elite')?.value;
    }

    return this.operatorService.getMaxLevelByRarityAndElite(rarity, elite);
  }

  /**
   * Vérifie si le champ "elite" et "eliteToReach" ont la même valeur.
   * @returns Vrai si les valeurs sont identiques, sinon faux.
   */
  checkEliteEquality(): boolean {
    const eliteControl = this.fGroup.get('elite');
    const eliteToReachControl = this.fGroup.get('eliteToReach');

    if (!eliteControl || !eliteToReachControl) {
      return false;
    }

    return eliteControl.value === eliteToReachControl.value;
  }


  /**
   * Valide et contraint le champ "level" à une valeur comprise entre 1 et le niveau maximum.
   */
  handleLevelValidation(): void {
    const levelControl = this.fGroup.get('level');
    if (!levelControl) return;
    const maxLevelofElite = this.getMaxLevel();
    this.validateAndConstrainControl(levelControl, 1, maxLevelofElite);

  }

  /**
   * Valide et ajuste un contrôle en le limitant à une plage spécifique.
   * @param control Le contrôle à valider
   * @param min Valeur minimale
   * @param max Valeur maximale
   */
  validateAndConstrainControl(control: AbstractControl, min: number, max: number): void {
    const { value: controlValue } = control;
    const constrainedValue = this.clamp(controlValue, min, max);
    control.setValue(constrainedValue);

  }

  /**
  * Valide et ajuste le champ "levelToReach" selon la valeur d'élite et le niveau maximum.
  */
  handleLevelToReachValidation(): void {

    const levelToReachControl = this.fGroup.get('levelToReach');
    let checkEliteEquality = this.checkEliteEquality();
    if (!levelToReachControl) return;
    if (!checkEliteEquality) {
      this.validateAndConstrainControl(levelToReachControl, 1, this.maxLevel);
    } else {
      this.validateAndConstrainControl(levelToReachControl, this.fGroup.get('level')?.value, this.maxLevel);
    }
  }

  /**
  * Met à jour les champs de formulaire et calcule le niveau maximum en fonction de la rareté et du stage élite.
  * @param rarity Rareté de l'opérateur
  * @param elite Stage élite actuel
  */
  updateForms(rarity: number, elite: number): void {
    this.checkFieldsToEnable(rarity);
    this.maxLevel = this.operatorService.getMaxLevelByRarityAndElite(rarity, elite);
    this.fGroup.get('levelToReach')?.setValue(this.maxLevel);
  }


  /**
 * Met à jour les dépendances et le niveau maximum lorsque la valeur du champ "elite" change.
 */
  onEliteChange(): void {
    this.updateDependantField('elite', 'eliteToReach');
    this.updateMaxLevelFieldWithElite(this.fGroup.get('eliteToReach')?.value);
  }

  /**
   * Met à jour un champ dépendant pour garantir que sa valeur est cohérente avec le champ principal.
   * @param primaryField Nom du champ principal
   * @param dependentField Nom du champ dépendant
   */
  updateDependantField(
    primaryField: string,
    dependentField: string
  ): void {
    const primaryValue = this.fGroup.get(primaryField)?.value;
    const dependentValue = this.fGroup.get(dependentField)?.value;

    // Ensure the dependent field value is greater than or equal to the primary field value
    if (dependentValue < primaryValue) {
      this.fGroup.get(dependentField)?.setValue(primaryValue);
    }
  }

  /**
   * Met à jour le niveau maximum en fonction du stage élite sélectionné.
   * @param elite Stage élite
   */
  updateMaxLevelFieldWithElite(elite: number) {
    const levelToReachField = this.fGroup.get('levelToReach');
    const newMaxLevel = this.operator ? this.operatorService.getMaxLevelByRarityAndElite(this.operator.rarity, elite) : 0;
    this.maxLevel = newMaxLevel;
    levelToReachField?.setValue(newMaxLevel);

  }


  /**
   * Gère la logique liée au changement de la compétence maximale atteignable (skillToReach).
   */
  onSkillToReachChange(): void {
    const skillToReachValue = this.fGroup.get('skillToReach')?.value;
    if (skillToReachValue < 7) {
      //this.operatorService.setIsMasteryAvailable(false);
    } else {
      //this.plannerOperatorService.setIsMasteryAvailable(true);
    }

  }


}
