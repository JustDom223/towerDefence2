import exp from 'constants';
import { MapData } from '../config/MapTypes';

export const MAPS: MapData[] = [
    {
        name: 'Level One',
        nodes: [
            { id: 'A', x: 0, y: 20 }, // Start
            { id: 'B', x: 80, y: 20 },
            { id: 'C', x: 80, y: 50 },
            { id: 'D', x: 20, y: 50 },
            { id: 'E', x: 20, y: 80 },
            { id: 'F', x: 40, y: 80 },
            { id: 'G', x: 20, y: 100 }, // End
        ],
        edges: [
            { from: 'A', to: 'B', type: 'line' },
            { from: 'B', to: 'C', type: 'line' }, 
            { from: 'C', to: 'D', type: 'line' },
            { from: 'D', to: 'E', type: 'line' },
            { from: 'E', to: 'F', type: 'line' },
            { from: 'F', to: 'G', type: 'line' },
        ],
    },
];

function validateMap(map: MapData): boolean {
    const nodeIds = new Set(map.nodes.map((node) => node.id));
    for (const edge of map.edges) {
        if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
            console.error(
                `Invalid edge in map "${map.name}": ${edge.from} -> ${edge.to}`
            );
            return false;
        }
    }
    return true;
}

// Validate all maps during development
MAPS.forEach((map) => {
    if (!validateMap(map)) {
        console.error(`Map "${map.name}" failed validation.`);
    }
});

export default MAPS;
