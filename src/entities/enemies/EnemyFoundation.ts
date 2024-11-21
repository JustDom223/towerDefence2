// src/entities/enemies/EnemyFoundation.ts
import { Entity, Position } from '../Entity';
import { Node } from '../../config/MapTypes';

export abstract class EnemyFoundation extends Entity {
    protected health: number;
    protected speed: number;
    protected path: Node[];
    protected currentNodeIndex: number;
    protected onReachedEnd: () => void;
    protected isDestroyed: boolean = false;

    constructor(
        id: string,
        position: Position,
        size: number,
        health: number,
        speed: number,
        path: Node[],
        onReachedEnd: () => void
    ) {
        super(id, position, size);
        this.health = health;
        this.speed = speed;
        this.path = path;
        this.currentNodeIndex = 1; // Start moving towards the second node
        this.onReachedEnd = onReachedEnd;
    }

    // Common movement logic
    public update(deltaTime: number): void {
        if (this.currentNodeIndex >= this.path.length) return;

        const targetNode = this.path[this.currentNodeIndex];

        // Calculate the distance to the target node
        const dx = targetNode.x - this.position.x;
        const dy = targetNode.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed * deltaTime) {
            // Snap to the target node and advance to the next
            this.setPosition({ x: targetNode.x, y: targetNode.y });
            this.currentNodeIndex++;

            // Check if the current node is an end node
            if (targetNode.type === 'end') {
                this.onReachedEnd();
                this.destroy();
            }
        } else {
            // Move closer to the target node
            this.setPosition({
                x: this.position.x + (dx / distance) * this.speed * deltaTime,
                y: this.position.y + (dy / distance) * this.speed * deltaTime,
            });
        }
    }

    // Common render logic (can be overridden by subclasses)
    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red'; // Default Enemy Color
        ctx.fillRect(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2,
            this.size,
            this.size
        );

        // Render Health Bar
        ctx.fillStyle = 'green';
        ctx.fillRect(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2 - 10, // Positioned above the enemy
            (this.health / this.getMaxHealth()) * this.size,
            5
        );
    }

    // Method to handle taking damage
    public takeDamage(amount: number): void {
        this.health -= amount;
        if (this.health <= 0) {
            this.destroy();
            this.onDeath();
        }
    }

    // Abstract method to get max health (must be implemented by subclasses)
    protected abstract getMaxHealth(): number;

    // Abstract method to handle death (can be implemented by subclasses)
    protected abstract onDeath(): void;

    // Override destroy to set the destruction flag
    public destroy(): void {
        super.destroy();
        this.isDestroyed = true;
        // Additional cleanup if necessary
    }
}
