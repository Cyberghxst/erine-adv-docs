import { Client, ClientOptions } from 'oceanic.js';
export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: any) => Promise<string> | string);
    owners?: string[];
    guildOnly?: boolean;
}
export declare class ErineClient extends Client {
    constructor(options: SetupOptions);
}
