import { Events, Fold, Core, Context } from "../main";
import { Client, ClientOptions, CommandInteraction, Message } from "oceanic.js";
export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: any) => Promise<string> | string);
    owners?: string[];
    guildOnly?: boolean;
    context?: typeof Context;
    autoSync?: boolean;
}
export declare class Erine extends Client<Events> {
    readonly ops: SetupOptions;
    core: Core;
    fold: Fold;
    constructor(options: SetupOptions);
    getContext(data: CommandInteraction | Message): Context;
    load(dir: string): Promise<void>;
    connect(): Promise<void>;
}
