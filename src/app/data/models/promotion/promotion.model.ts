export interface Promotion {
    elite: number;
    cost: number;
}

export interface PromotionCost {
    rarity: number;
    promotion: Promotion[];
}