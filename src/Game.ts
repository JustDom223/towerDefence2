import { MapData } from './config/MapTypes';
import MAPS from './data/Maps';
import { BasicEnemy } from './entities/enemies/BasicEnemy';

export class Game {
    private backgroundCanvas: HTMLCanvasElement;
    private gameplayCanvas: HTMLCanvasElement;
    private backgroundCtx: CanvasRenderingContext2D;
    private gameplayCtx: CanvasRenderingContext2D;
    private isRunning: boolean;
    private currentMap: MapData | null;
    private enemies: BasicEnemy[] = []

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
        this.currentMap = map
        console.log(`Map "${mapName}" loaded`)
    }
    // Scale Nodes
    private scaleNode(node: { x: number; y: number }): { x: number; y: number } {
        const scaledX = (node.x / 100) * this.backgroundCanvas.width; // Scale to canvas width
        const scaledY = (node.y / 100) * this.backgroundCanvas.height; // Scale to canvas height
        return { x: scaledX, y: scaledY };
    }
    
// Draw map
private drawPaths(): void{
    if (!this.currentMap){
        console.error('No map loaded')
        return
    }
    const {nodes, edges} = this.currentMap
    this.backgroundCtx.lineWidth = 30
    this.backgroundCtx.lineCap = 'round'

    edges.forEach(edge => {
        const fromNode = nodes.find(node => node.id === edge.from)
        const toNode = nodes.find(node => node.id === edge.to)

        if (!fromNode || !toNode){
            console.error(`Invalid edge: ${edge.from} -> ${edge.to}`)
            return
        }
        const scaledFrom = this.scaleNode(fromNode)
        const scaledTo = this.scaleNode(toNode)
        this.backgroundCtx.beginPath()
        this.backgroundCtx.moveTo(scaledFrom.x, scaledFrom.y)
  
            this.backgroundCtx.lineTo(scaledTo.x,scaledTo.y )

    
        this.backgroundCtx.strokeStyle = 'gray'// default colour
        this.backgroundCtx.stroke()
    })
 }

    // Start the game
    public start(): void {
        this.isRunning = true;
        this.init(); // Initialize game components
        this.loop(); // Start the game loop
    }

    // Initialize game components
    private init(): void {
        this.loadMap('Level One')
        this.drawPaths()

        // Placholder for future initialization logic
        console.log('Game initialized');
    }

    // The main game loop
    private loop = (): void => {
        if (!this.isRunning) return;

        this.update(); // Update game state
        this.render(); // Render game frame

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
