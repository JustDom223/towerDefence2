// src/entities/enemies/BasicEnemy.ts
import { EnemyFoundation } from './EnemyFoundation';
import { Position } from '../Entity';
import { Node } from '../../config/MapTypes';

export class BasicEnemy extends EnemyFoundation {
    private static MAX_HEALTH = 100;
    private static SIZE = 30; // Adjusted size for better visualization
    private static SPEED = 50; // Adjusted speed for smoother movement

    constructor(
        id: string,
        position: Position,
        path: Node[],
        onReachedEnd: () => void
    ) {
        super(
            id,
            position,
            BasicEnemy.SIZE,
            BasicEnemy.MAX_HEALTH,
            BasicEnemy.SPEED,
            path,
            onReachedEnd
        );
    }

    protected getMaxHealth(): number {
        return BasicEnemy.MAX_HEALTH;
    }

    protected onDeath(): void {
        // Logic for when BasicEnemy dies (e.g., award resources to player)
        console.log(`${this.id} has been destroyed.`);
        // Example: player.resources += 10;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red'; // Specific color for BasicEnemy
        super.render(ctx);
    }
}
