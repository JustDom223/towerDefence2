// src/entities/enemies/FastEnemy.ts
import { EnemyFoundation } from './EnemyFoundation';
import { Position } from '../Entity';
import { Node } from '../../config/MapTypes';

export interface IBEnemy{
    
}

export class FastEnemy extends EnemyFoundation {
    private static MAX_HEALTH = 75;
    private static SPEED = 50

    constructor(
        id: string,
        position: Position,
        size: number,
        speed: number,
        path: Node[],
        onReachedEnd: () => void
    ) {
        super(id, position, size, FastEnemy.MAX_HEALTH, speed, path, onReachedEnd);
    }

    protected getMaxHealth(): number {
        return FastEnemy.MAX_HEALTH;
    }

    protected onDeath(): void {
        // Logic for when FastEnemy dies
        console.log(`${this.id} has been destroyed.`);
        // Example: player.resources += 15;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'orange'; // Specific color for FastEnemy
        super.render(ctx);
    }
}
