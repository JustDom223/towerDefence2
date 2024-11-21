// src/entities/enemies/TankEnemy.ts
import { EnemyFoundation } from "./EnemyFoundation";
import { Position } from '../Entity';
import { Node } from "../../config/MapTypes";

export class TankEnemy extends EnemyFoundation {
    private static MAX_HEALTH = 200;

    constructor(
        id: string,
        position: Position,
        size: number,
        speed: number,
        path: Node[],
        onReachedEnd: () => void
    ) {
        super(id, position, size, TankEnemy.MAX_HEALTH, speed, path, onReachedEnd);
    }

    protected getMaxHealth(): number {
        return TankEnemy.MAX_HEALTH;
    }

    protected onDeath(): void {
        // Logic for when TankEnemy dies
        console.log(`${this.id} has been destroyed.`);
        // Example: player.resources += 30;
    }

    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'darkred'; // Specific color for TankEnemy
        super.render(ctx);
    }
}
