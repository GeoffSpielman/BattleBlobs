import {playerStatus} from "@/models/enums"

export interface PlayerEntry{
    status: playerStatus;
    key: string | null;
    name: string;
    alias: string;
    color: string;
    captainNum: number;
    shipOneKey: string;
    shipTwoKey: string;
}   