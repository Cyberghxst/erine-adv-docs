import { Client, ClientOptions } from 'oceanic.js';

export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: any) => Promise<string> | string)
    owners?: string[]
    guildOnly?: boolean
}

export class ErineClient extends Client {
    /**
     * Setup the bot class
     */
    constructor(options: SetupOptions) {
        super(options)
    }
}