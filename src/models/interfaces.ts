import { PlayerStatus } from "@/models/enums"
import { ColourStatus } from "@/models/enums"
import { ShipStatus } from "@/models/enums"
import { MapType } from "@/models/enums"
import { PowerupName } from "@/models/enums"

export interface PlayerEntry {
    key: string | null;
    status: PlayerStatus;
    name: string;
    alias: string;
    colour: string;
    captainNum: number;
    shipOneKey: string;
    shipTwoKey: string;
    powerups: {};
}

export interface ColourEntry {
    name: string;
    hexCode: string;
    status: ColourStatus;
}

export interface ColourUpdateObject {
    hexCode: string;
    status: string;
}

export interface ShipEntry {
    key: string | null;
    captainKey: string;
    status: ShipStatus;
    intactOffsets: number[][];
    damagedOffsets: number[][];
    anchorPoint: Coord;
    spawnRange: ShipSpawnRange;
}

export interface Coord {
    row: number;
    col: number;
}

export interface ShipSpawnRange {
    rowMin: number;
    rowMax: number;
    colMin: number;
    colMax: number;
}

export interface MessageEntry {
    senderAlias: string;
    content: string;
    repeatSender: boolean;
}

export interface ChatEntry {
    pairingKey: string;
    otherPlayerAlias: string;
    otherPlayerColour: string;
    showNotification: boolean;
}

export interface PowerupEntry {
    name: string;
    remaining: number;
    deployed: number;
    sortOrder: number;
}

export interface GridSquare {
    row: number;
    col: number;    
    revealed: boolean;
    mapType: MapType;
    powerup: PowerupName;
    captains: string[];
}

export interface AddShipToMapReturn {
    successful: boolean;
    mapData: {[coords: string]: GridSquare};
    anchorPoint: {row: number; col: number};
}

export interface SelectedSquareData{
    top: number; 
    left: number; 
    width: number;
}

export interface authEntry{
    uid: string;
    email: string;
}