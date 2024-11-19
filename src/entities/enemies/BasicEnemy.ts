import { Entity, Position } from '../Entity';
import { MapData, Node } from '../../config/MapTypes';

export class BasicEnemy extends Entity {
    private health: number;
    private speed: number;
    private currentNodeIndex: number;
    private path: Node[];
    private onReachedEnd: () => void; //A callback for when the enemy reaches the end of a path

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
        this.currentNodeIndex = 0; // start with the first node
        this.onReachedEnd = onReachedEnd;
    }
    public update(deltaTime: number): void {
        if (this.currentNodeIndex >= this.path.length) return;

        const targetNode = this.path[this.currentNodeIndex];

        // Move towards the target node
        const dx = targetNode.x - this.position.x;
        const dy = targetNode.y - this.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.speed * deltaTime) {
            // Snap to the target node and advance to the next
            this.setPosition({ x: targetNode.x, y: targetNode.y });
            this.currentNodeIndex++;
            //Check if the current node is an end node
            if (targetNode.type === 'end') this.onReachedEnd();
            this.destroy;
        } else {
            // Move closer to the target node
            this.setPosition({
                x: this.position.x + (dx / distance) * this.speed * deltaTime,
                y: this.position.y + (dy / distance) * this.speed * deltaTime,
            });
        }
    }
    public render(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = 'red' // Enemy Colour
        ctx.fillRect(
            this.position.x - this.size /2,
            this.position.y - this.size /2,
            this.size,
            this.size
        )

        ctx.fillStyle = 'green'
        ctx.fillRect(
            this.position.x - this.size / 2,
            this.position.y - this.size / 2 -5,
            (this.health / 100) * this.size, 
            3
        )
    }
    public takeDamage(amount: number): void{
        this.health -= amount
        if(this.health <= 0){
            this.destroy()
        }
    }

}
