// src/entities/Entity.ts
export interface Position {
    x: number;
    y: number;
}

export abstract class Entity {
    protected id: string;
    protected position: Position;
    protected size: number;
    protected isAlive: boolean;

    constructor(id: string, position: Position, size: number) {
        this.id = id;
        this.position = position;
        this.size = size;
        this.isAlive = true;
    }

    // Update the entity's state
    public abstract update(deltaTime: number): void;

    // Render the entity on the canvas
    public abstract render(ctx: CanvasRenderingContext2D): void;

    // Mark the entity for removal
    public destroy(): void {
        this.isAlive = false;
    }

    // Check if the entity is still active
    public get isActive(): boolean {
        return this.isAlive;
    }

    // Method to set position
    public setPosition(position: Position): void {
        this.position = position;
    }

    // Method to get position
    public getPosition(): Position {
        return this.position;
    }

    // Method to get ID
    public getId(): string {
        return this.id;
    }

    // Method to get size
    public getSize(): number {
        return this.size;
    }
}
