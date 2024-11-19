export interface Node {
    id: string;
    x: number;
    y: number;
}
export interface Edge {
    from: string;
    to: string;
    type: 'line' | 'curve';
    controlPoints?: { x: number; y: number }[];
}
export interface MapData {
    name: string;
    nodes: Node[];
    edges: Edge[];
}

