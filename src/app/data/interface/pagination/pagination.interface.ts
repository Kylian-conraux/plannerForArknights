// Interface pour configurer les paramètres de pagination
export interface PaginationConfig {
    pageSize: number; // Nombre d'éléments affichés par page
    currentPage: number; // Numéro de la page actuelle (commence à 1)
    totalItems: number; // Nombre total d'éléments disponibles
}

// Interface pour représenter le résultat paginé d'une liste d'éléments génériques
export interface PaginatedResult<T> {
    items: T[]; // Liste des éléments de la page actuelle
    total: number; // Nombre total d'éléments dans la collection
    currentPage: number; // Numéro de la page actuelle
    totalPages: number; // Nombre total de pages
    hasNext: boolean; // Indique s'il y a une page suivante
    hasPrevious: boolean; // Indique s'il y a une page précédente
}
