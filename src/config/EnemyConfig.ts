export interface EnemyConfig {
    type: string; // Unique name or identifier for the enemy
    health: number; // Total health points
    damage: number; // Damage dealt to the player when reaching the end node
    speed: number; // Movement speed
    size: number; // Physical size for rendering and collision
    armour?: number; // Optional: Reduces incoming damage
    reward: number; // Money or score awarded for defeating the enemy
    specialAbilities?: string[]; // Optional: Unique abilities (e.g., "heal", "shield")
    elementalResistances?: Record<string, number>; // Optional: Resistances or weaknesses
    behaviourTags?: string[]; // Optional: Behaviour traits (e.g., "healer", "exploder")
}

export const ENEMY_CONFIGS: EnemyConfig[] = [
    {
        type: 'basic',
        health: 100,
        damage: 1,
        speed: 0.05,
        size: 20,
        reward: 5,
    },
    {
        type: 'tank',
        health: 300,
        damage: 2,
        speed: 0.02,
        size: 30,
        armour: 10,
        reward: 10,
    },
    {
        type: 'fast',
        health: 50,
        damage: 1,
        speed: 0.1,
        size: 15,
        reward: 7,
        specialAbilities: ['speedBoost'],
    },
    {
        type: 'healer',
        health: 120,
        damage: 0,
        speed: 0.04,
        size: 25,
        reward: 15,
        behaviourTags: ['healer'],
        specialAbilities: ['heal'],
    },
];
