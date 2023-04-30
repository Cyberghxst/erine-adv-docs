import { Erine, Maker } from '../main';
export declare class Fold {
    client: Erine;
    makers: Maker[];
    constructor(client: Erine);
    load(dir: string): Promise<void>;
    getAllCommands(): import("../main").CommandObject[];
    sync(): Promise<void>;
}
