
import { ShipSpawnRange } from "@/models/interfaces";

export function determineShipSpawnRange(shipOffsets: number[][], mapSize: number): ShipSpawnRange {
    console.log("received the following offsets:" + shipOffsets);
    
    const maxShipDim: number = 4;

    let rowMin: number = -1;
    let rowMax: number = mapSize - maxShipDim + 1;
    let colMin: number = -1;
    let colMax: number = mapSize - maxShipDim + 1;
    
    shipOffsets.forEach(offset => {
        //row indices = 0
        if (offset[0] === 0){
            rowMin = 0;
        }
        //row indices = max ship size
        if (offset[0] === maxShipDim - 1){
            rowMax = mapSize - maxShipDim;
        }

        //col indices = 0
        if (offset[1] === 0){
            colMin = 0;
        }
        //col indices = max ship size
        if (offset[1] === maxShipDim - 1){
            colMax = mapSize - maxShipDim;
        }
    });
    
    return {'rowMin': rowMin, 'rowMax': rowMax, 'colMin': colMin, 'colMax': colMax};
}