import { Operator, OperatorFilters } from "../../models/operator/operator.model";

export function filterOperators(operators: Operator[], filters: OperatorFilters): Operator[]{
    let filtered = [...operators];
   
    if(filters.searchQuery.trim()){
        const query = filters.searchQuery.toLocaleLowerCase();
        filtered = filtered.filter(op =>
            op.name.toLocaleLowerCase().includes(query) //, add other way to filter the operators : class, sub class, rarity
        );
    }

    if(filters.rarity !== null){
        filtered = filtered.filter(op => op.rarity === filters.rarity);
    }

    return filtered;

}