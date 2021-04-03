import {PlayerStatus} from "@/models/enums"
import {ColourStatus} from "@/models/enums"

export interface PlayerEntry{
    key: string | null;
    status: PlayerStatus;
    name: string;
    alias: string;
    color: string;
    captainNum: number;
    shipOneKey: string;
    shipTwoKey: string;
}

export interface ColourEntry{
    name: string;
    hexCode: string;
    status: ColourStatus;
}

export interface ColourUpdateObject{
    hexCode: string;
    status: string;
}