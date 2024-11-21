import { MapData ,Node} from './config/MapTypes';
import MAPS from './data/Maps';
import { EnemyFoundation } from './entities/enemies/EnemyFoundation';
import { BasicEnemy } from './entities/enemies/BasicEnemy';
import { FastEnemy } from './entities/enemies/FastEnemy';
import { TankEnemy } from './entities/enemies/TankEnemy';

export class Game {
    private backgroundCanvas: HTMLCanvasElement;
    private gameplayCanvas: HTMLCanvasElement;
    private backgroundCtx: CanvasRenderingContext2D;
    private gameplayCtx: CanvasRenderingContext2D;
    private isRunning: boolean;
    private currentMap: MapData | null;
    private enemies: EnemyFoundation[] = [];

    constructor(
        backgroundCanvas: HTMLCanvasElement,
        gameplayCanvas: HTMLCanvasElement
    ) {
        this.backgroundCanvas = backgroundCanvas;
        this.gameplayCanvas = gameplayCanvas;
        this.backgroundCtx = backgroundCanvas.getContext('2d')!;
        this.gameplayCtx = gameplayCanvas.getContext('2d')!;
        this.isRunning = false;
        this.currentMap = null;
    }
    // Load map from Maps.ts
    private loadMap(mapName: string): void {
        const map = MAPS.find((m) => m.name === mapName);
        if (!map) {
            console.error(`Map "${mapName}" not found`);
            return;
        }
        this.currentMap = map;
        console.log(`Map "${mapName}" loaded`);
    }
    // Scale Nodes
    private scaleNode(node: Node): Node {
        const scaledX = (node.x / 100) * this.backgroundCanvas.width; // Scale to canvas width
        const scaledY = (node.y / 100) * this.backgroundCanvas.height; // Scale to canvas height
        
        return {
            ...node, // Spread existing properties (id, type, etc.)
            x: scaledX,
            y: scaledY
        };
    }
    

    // Draw map
    private drawPaths(): void {
        if (!this.currentMap) {
            console.error('No map loaded');
            return;
        }
        const { nodes, edges } = this.currentMap;
        this.backgroundCtx.lineWidth = 30;
        this.backgroundCtx.lineCap = 'round';

        edges.forEach((edge) => {
            const fromNode = nodes.find((node) => node.id === edge.from);
            const toNode = nodes.find((node) => node.id === edge.to);

            if (!fromNode || !toNode) {
                console.error(`Invalid edge: ${edge.from} -> ${edge.to}`);
                return;
            }
            const scaledFrom = this.scaleNode(fromNode);
            const scaledTo = this.scaleNode(toNode);
            this.backgroundCtx.beginPath();
            this.backgroundCtx.moveTo(scaledFrom.x, scaledFrom.y);

            this.backgroundCtx.lineTo(scaledTo.x, scaledTo.y);

            this.backgroundCtx.strokeStyle = 'gray'; // default colour
            this.backgroundCtx.stroke();
        });
    }

    // Start the game
    public start(): void {
        this.isRunning = true;
        this.init(); // Initialize game components
        this.loop(); // Start the game loop
    }

    // Initialize game components
    private init(): void {
        this.loadMap('Level One');
        this.drawPaths();
    
        if (!this.currentMap) return;
    
        // Assume the path is an array of nodes defining the enemy's path
        const mapNodes = this.currentMap.nodes
        const enemyPath = mapNodes.map((node) => this.scaleNode(node));
    
        // Spawn a BasicEnemy as a test
        const basicEnemy = new BasicEnemy(
            'enemy1',
            { x: enemyPath[0].x, y: enemyPath[0].y }, // Start at the first node
            enemyPath,
            this.handleEnemyReachedEnd.bind(this),
        );
    
        this.enemies.push(basicEnemy);
    
        console.log('Game initialized and BasicEnemy spawned');
    }
    private handleEnemyReachedEnd(): void {
        console.log('An enemy has reached the end!');
        // Implement logic such as reducing player health or lives
        // Example:
        // this.playerLives -= 1;
        // if (this.playerLives <= 0) {
        //     this.gameOver();
        // }
    }
    

    // The main game loop
    private loop = (): void => {
        if (!this.isRunning) return;

        this.update(); // Update game state
        this.render(); // Render game frame
        this.enemies.forEach((enemy)=> {
            enemy.render(this.gameplayCtx)
            enemy.update(1)
        })

        requestAnimationFrame(this.loop); // Schedule the next frame
    };

    // Update game state
    private update(): void {
        // Update game entities, manage game logic
        // console.log('Updating game state...');
    }

    // Render game frame
    private render(): void {
        // Clear the gameplay canvas
        this.gameplayCtx.clearRect(
            0,
            0,
            this.gameplayCanvas.width,
            this.gameplayCanvas.height
        );
        // console.log('Rendering game frame...');
    }
}
