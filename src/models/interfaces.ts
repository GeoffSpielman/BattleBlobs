import {playerStatus} from "@/models/enums"

export interface PlayerEntry{
    key: string | null;
    status: playerStatus;
    name: string;
    alias: string;
    color: string;
    captainNum: number;
    shipOneKey: string;
    shipTwoKey: string;
}