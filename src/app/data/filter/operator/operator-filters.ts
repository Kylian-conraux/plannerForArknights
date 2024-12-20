import { Operator, OperatorFilters } from "../../models/operator/operator.model";

/**
 * Filtre une liste d'opérateurs en fonction des filtres spécifiés.
 * @param operators La liste complète des opérateurs à filtrer.
 * @param filters Les critères de filtrage (recherche, rareté, etc.).
 * @returns Une liste d'opérateurs filtrée.
 */
export function filterOperators(operators: Operator[], filters: OperatorFilters): Operator[] {
    // Copie la liste originale des opérateurs pour préserver l'immutabilité
    let filtered = [...operators];
   
    // Filtre par recherche textuelle (nom, classe, sous-classe)
    if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLocaleLowerCase();
        filtered = filtered.filter(op =>
            // Vérifie si le nom, la classe ou le job contient la requête
            op.name.toLocaleLowerCase().includes(query) ||
            op.class.toLocaleLowerCase().includes(query) ||
            op.job.toLocaleLowerCase().includes(query)
        );
    }

    // Filtre par rareté si une valeur est spécifiée
    if (filters.rarity !== null) {
        filtered = filtered.filter(op => op.rarity === filters.rarity);
    }

    // Retourne la liste filtrée
    return filtered;
}
