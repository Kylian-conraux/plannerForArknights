import { PaginatedResult, PaginationConfig } from "../../interface/pagination/pagination.interface";

/**
 * Crée un résultat paginé basé sur les éléments, la configuration de pagination, et les éléments filtrés.
 * @template T Le type des éléments paginés.
 * @param items Les éléments originaux (non utilisés directement pour la pagination ici).
 * @param config Configuration de pagination (contient la page actuelle et la taille de page).
 * @param filteredItems Les éléments filtrés à paginer.
 * @returns Un objet de type `PaginatedResult<T>` contenant les éléments paginés et les métadonnées.
 */
export function createPaginationResult<T>(
    items: T[], 
    config: PaginationConfig, 
    filteredItems: T[]
): PaginatedResult<T> {
    // Total des éléments filtrés
    const total = filteredItems.length;

    // Calcul du nombre total de pages
    const totalPages = Math.ceil(total / config.pageSize);

    // Indice de début pour la page actuelle
    const start = (config.currentPage - 1) * config.pageSize;

    // Indice de fin pour la page actuelle
    const end = start + config.pageSize;

    // Extraction des éléments pour la page actuelle
    const paginatedItems = filteredItems.slice(start, end);

    // Retourne l'objet paginé avec les éléments et les métadonnées
    return {
        items: paginatedItems, // Éléments de la page actuelle
        total,                // Nombre total d'éléments
        currentPage: config.currentPage, // Page actuelle
        totalPages,           // Nombre total de pages
        hasNext: config.currentPage < totalPages, // Indique s'il y a une page suivante
        hasPrevious: config.currentPage > 1       // Indique s'il y a une page précédente
    };
}
