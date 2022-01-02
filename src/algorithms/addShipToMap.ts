
import { MapType } from "@/models/enums";
import { ShipEntry, ShipSpawnRange, GridSquare, AddShipToMapReturn } from "@/models/interfaces";

let toAttempt: number[][];
let testedDrops: number[][];
let shipData: ShipEntry;



function randDropPoint(spawnRange: ShipSpawnRange): number[] {
    return [
        Math.floor(Math.random() * (spawnRange.rowMax - spawnRange.rowMin + 1)) + spawnRange.rowMin,
        Math.floor(Math.random() * (spawnRange.colMax - spawnRange.colMin + 1)) + spawnRange.colMin
    ];
}

function shiftWithinShipRanges(dropPoint: number[], shiftDir: number[]): boolean {
    if (
        dropPoint[0] + shiftDir[0] <= shipData.spawnRange.rowMax &&
        dropPoint[0] + shiftDir[0] >= shipData.spawnRange.rowMin &&
        dropPoint[1] + shiftDir[1] <= shipData.spawnRange.colMax &&
        dropPoint[1] + shiftDir[1] >= shipData.spawnRange.colMin
    ) {
        return true;
    }
    return false;
}

function shiftUnexplored(dropPoint: number[], shiftDir: number[]): boolean {
    if (
        testedDrops.some((element) => 
            element[0] === dropPoint[0] + shiftDir[0] &&
            element[1] === dropPoint[1] + shiftDir[1]
        )||
        toAttempt.some((element) => 
            element[0] === dropPoint[0] + shiftDir[0] &&
            element[1] === dropPoint[1] + shiftDir[1]
        )
    ){
        return false;
    }
    return true;
}

function tentativeExplore(dropPoint: number[], shiftDir: number[]) {

    //if it's possible to simply move in the shift direction, do that
    if (shiftWithinShipRanges(dropPoint, shiftDir) && shiftUnexplored(dropPoint, shiftDir)) {
        toAttempt.push([
            dropPoint[0] + shiftDir[0],
            dropPoint[1] + shiftDir[1]
        ]);
    }
    //otherwise we can't move in the shift direction and we need to 'branch out'
    else{
        //if the shift direction was up or down, time to branch out horizontally
        if (shiftDir[0] !== 0 && shiftDir[1] === 0) {
            //can we move right?
            if (shiftWithinShipRanges(dropPoint, [0, 1]) && shiftUnexplored(dropPoint, [0, 1])) {
                toAttempt.push([dropPoint[0], dropPoint[1] + 1]);
            }
            //can we move left?
            if (shiftWithinShipRanges(dropPoint, [0, -1]) && shiftUnexplored(dropPoint, [0, -1])) {
                toAttempt.push([dropPoint[0], dropPoint[1] - 1]);
            }
        }
        //if the shift direction was right or left, time to branch out vertically
        else if (shiftDir[0] === 0 && shiftDir[1] !== 0) {
            //can we move up?
            if (shiftWithinShipRanges(dropPoint, [-1, 0]) && shiftUnexplored(dropPoint, [-1, 0])) {
              toAttempt.push([dropPoint[0] - 1, dropPoint[1]]);
            }
            //can we move down?
            if (shiftWithinShipRanges(dropPoint, [1, 0]) && shiftUnexplored(dropPoint, [1, 0])) {
                toAttempt.push([dropPoint[0] + 1, dropPoint[1]]);
            }
        } 
        else {
            alert(
              "Logic Error: tentativeExplore() received a faulty shiftDir"
            );
        }
    }
}


export function addShipToMap(recShipData: ShipEntry, mapData: { [coords: string]: GridSquare }, mapSize: number): AddShipToMapReturn {

    shipData = recShipData;
    toAttempt = [randDropPoint(shipData.spawnRange)];
    testedDrops = [];
    let attemptsCount: number = 0;
    const maxAttemps = 200;
    

    while (toAttempt.length > 0 && attemptsCount < maxAttemps) {
        let dropPoint: number[] = toAttempt.shift() as number[];
        let interferingOffsets: number[][] = [];

        for (let i = 0; i < shipData.intactOffsets.length; i++) {
            let curOffset = shipData.intactOffsets[i];

            //check for any interferences at the current drop point
            if (mapData[[dropPoint[0] + curOffset[0], dropPoint[1] + curOffset[1]].join(",")].mapType !== MapType.Water) {
                interferingOffsets.push(curOffset);
            }
        }

        //if there were no interferences, add the ship to the map at the current drop point and exit
        if (interferingOffsets.length === 0) {
            for (let i = 0; i < shipData.intactOffsets.length; i++) {
                let coordString = [shipData.intactOffsets[i][0] + dropPoint[0], shipData.intactOffsets[i][1] + dropPoint[1]].join(",");
                mapData[coordString].mapType = MapType.Ship;
                mapData[coordString].captains = [shipData.captainKey];
            }
            return { successful: true, mapData: mapData, anchorPoint: { row: dropPoint[0], col: dropPoint[1] } };
        }

        //if there were interferences, explore adjacent squares
        else {
            attemptsCount++;
            testedDrops.push(dropPoint);
            let interferenceWithShipExterior: boolean = false;

            //interference along left - move right
            if (interferingOffsets.some((element) => element[1] === 0)) {
                tentativeExplore(dropPoint, [0,1]);
                interferenceWithShipExterior = true;
            }
             //interference along right - move left
             if (interferingOffsets.some((element) => element[1] === 3)) {
                tentativeExplore(dropPoint, [0,-1]);
                interferenceWithShipExterior = true;
            }
             //interference along top - move down
             if (interferingOffsets.some((element) => element[0] === 0)) {
                tentativeExplore(dropPoint, [1,0]);
                interferenceWithShipExterior = true;
            }
             //interference along bottom - move up
             if (interferingOffsets.some((element) => element[0] === 3)) {
                tentativeExplore(dropPoint, [-1,0]);
                interferenceWithShipExterior = true;
            }

            //if the interference is ONLY with the core of the ship
            if (!interferenceWithShipExterior){
                //interference along inner left - move right
                if (interferingOffsets.some((element) => element[1] === 1)) {
                    tentativeExplore(dropPoint, [0, 1]);
                }
                //interference along inner right - move left
                if (interferingOffsets.some((element) => element[1] === 2)) {
                  tentativeExplore(dropPoint, [0, -1]);
                }
                //interference along inner top - move down
                if (interferingOffsets.some((element) => element[0] === 1)) {
                  tentativeExplore(dropPoint, [1, 0]);
                }
                //interference along inner bottom - move up
                if (interferingOffsets.some((element) => element[0] === 2)) {
                  tentativeExplore(dropPoint, [-1, 0]);
                }
            }

            //if we've already tried 15 locations in this area and our attempts count is fairly low, the initial placement was probably congested
            //reset everything except the attempts counter and pick a new random drop point to start over somewhere else
            if (testedDrops.length === 15 && attemptsCount < 17){
                toAttempt = [randDropPoint(shipData.spawnRange)];
                testedDrops = [];
            }
            
            //every 30 attempts, add a random point and 3 points from the other quadrants of the map
            if (attemptsCount > 29 && attemptsCount % 30 === 0){
                toAttempt.push(randDropPoint(shipData.spawnRange));
                //horizontally opposed quadrant
                toAttempt.push([dropPoint[0], dropPoint[1] + Math.trunc(mapSize/2) % mapSize]);
                //vertically opposed quadrand
                toAttempt.push([dropPoint[0] + Math.trunc(mapSize/2) % mapSize, dropPoint[1]]);
                //diagonally opposed quadrant
                toAttempt.push([dropPoint[0] + Math.trunc(mapSize/2) % mapSize, dropPoint[1] + Math.trunc(mapSize/2) % mapSize]);
            }
        }
    }

    //reached the max attempts count without placing the ship - map is too congested
    return { successful: false, mapData: mapData, anchorPoint: { row: -99, col: -99 } };
}

