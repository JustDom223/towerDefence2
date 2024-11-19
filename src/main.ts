import { Game } from './Game';

window.addEventListener('load', () => {
    // Hide the loading element if it exists
    const loading = document.getElementById('loading');
    if (loading) {
        loading.style.display = 'none';
    }

    // Get the canvas elements
    const backgroundCanvas = document.getElementById('backgroundCanvas') as HTMLCanvasElement | null;
    const gameplayCanvas = document.getElementById('gameplayCanvas') as HTMLCanvasElement | null;

    // Resize function for the canvas elements
    function resizeCanvas(canvas: HTMLCanvasElement): void {
        canvas.width = canvas.offsetWidth; // Match internal width to CSS width
        canvas.height = canvas.offsetHeight; // Match internal height to CSS height
    }
    

    // Safely resize canvases and prepare the game if canvases exist
    if (backgroundCanvas && gameplayCanvas) {
        resizeCanvas(backgroundCanvas);
        resizeCanvas(gameplayCanvas);

        // Listen for window resize to adjust canvas sizes dynamically
        window.addEventListener('resize', () => {
            resizeCanvas(backgroundCanvas);
            resizeCanvas(gameplayCanvas);
        });

        // Initialize and start the game
        const game = new Game(backgroundCanvas, gameplayCanvas);
        game.start(); // Start the game logic
    } else {
        console.error('One or both canvas elements could not be found.');
    }
});
