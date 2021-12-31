
import { ShipEntry } from "@/models/interfaces";
import { GridSquare } from "@/models/interfaces";

export function addShipToMap(shipData: ShipEntry, mapData: {[coords: string]: GridSquare}, mapSize: number): {[coords: string]: GridSquare} {

    console.log("Ship key: " + shipData.key);
    
    
    return mapData;

}