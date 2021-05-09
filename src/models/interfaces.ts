import { PlayerStatus } from "@/models/enums"
import { ColourStatus } from "@/models/enums"
import { ShipStatus } from "@/models/enums"

export interface PlayerEntry {
    key: string | null;
    status: PlayerStatus;
    name: string;
    alias: string;
    colour: string;
    captainNum: number;
    shipOneKey: string;
    shipTwoKey: string;
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
    captainNum: number;
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

export interface ShipSpawnRange{
    rowMin: number;
    rowMax: number;
    colMin: number;
    colMax: number;
}

export interface MessageEntry{
    senderAlias: string;
    content: string;
    repeatSender: boolean;
}

export interface ChatEntry{
    pairingKey: string; 
    otherPlayerAlias: string;
    otherPlayerColour: string;
}

export interface PowerupEntry{
    name: string;
    remaining: number;
    deployed: number;
}