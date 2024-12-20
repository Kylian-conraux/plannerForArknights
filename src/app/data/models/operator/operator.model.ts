// Interface représentant un opérateur dans le système
export interface Operator {
    id: number; // Identifiant unique de l'opérateur
    name: string; // Nom de l'opérateur
    class: string; // Classe de l'opérateur (ex: Medic, Guard, etc.)
    job: string; // Job spécifique de l'opérateur
    rarity: number; // Rareté de l'opérateur (ex: 3, 4, 5, 6 étoiles)
    elite: number; // Niveau d'élite de l'opérateur (0, 1, 2, etc.)
    
    // Statistiques de base de l'opérateur
    stats: {
        hp: number; // Points de vie
        atk: number; // Attaque
        def: number; // Défense
        res: number; // Résistance
    };

    skills: Skill[]; // Liste des compétences de l'opérateur
    talents: Talent[]; // Liste des talents de l'opérateur
    modules: Module[]; // Liste des modules liés à l'opérateur
}

// Interface représentant une compétence (skill) d'un opérateur
export interface Skill {
    name: string; // Nom de la compétence
    desc: string; // Description de la compétence
    level: number; // Niveau de la compétence
}

// Interface représentant un talent d'un opérateur
export interface Talent {
    name: string; // Nom du talent
    desc: string; // Description du talent
}

// Interface représentant un module lié à un opérateur
export interface Module {
    name: string; // Nom du module
    talent: string; // Nom du talent affecté par le module
    level: number; // Niveau requis ou actuel du module
}

// Interface pour représenter les filtres appliqués lors de la recherche d'opérateurs
export interface OperatorFilters {
    searchQuery: string; // Terme de recherche (nom ou autres critères)
    rarity: number | null; // Filtrage par rareté (null pour ne pas filtrer)
    page: number; // Page actuelle pour la pagination
    pageSize: number; // Nombre d'éléments par page pour la pagination
}
