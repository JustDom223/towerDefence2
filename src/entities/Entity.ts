export interface Position {
    x: number;
    y: number;
}
export class Entity {
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
    public update(deltaTime: number, ...args: any[]): void {
        // Base implementation (if needed)
    }

    // Render the entity on the canvas
    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#000';
        ctx.fillRect(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2,
            this.size,
            this.size
        );
    }
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
}
