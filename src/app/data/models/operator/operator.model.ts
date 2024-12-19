export interface Operator{
    id: number;
    name: string;
    class: string;
    job: string; 
    rarity: number;
    elite: number;
    stats: {
        hp: number,
        atk: number,
        def: number,
        res: number,
    }
    skills: Skill[];
    talents: Talent[];
    modules: Module[];
}

export interface Skill{
    name: string,
    desc: string,
    level: number
}

export interface Talent{
    name: string,
    desc: string,
}

export interface Module{
    name: string,
    talent: string,
    level: number,
}

export interface OperatorFilters {
    searchQuery: string;
    rarity: number | null;
    page: number;
    pageSize: number;
  }