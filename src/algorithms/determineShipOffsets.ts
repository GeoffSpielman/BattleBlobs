import { ShipSpawnRange } from "@/models/interfaces";

export function determineShipOffsets(shipOffsets: number[][]): ShipSpawnRange {
    let rowMin:number = 10;
    let rowMax: number = 20;
    let colMin: number = 30;
    let colMax: number = 40;

    
    return {'rowMin': rowMin, 'rowMax': rowMax, 'colMin': colMin, 'colMax': colMax};
}