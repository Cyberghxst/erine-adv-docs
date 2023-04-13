import { Client, ClientOptions, ClientEvents, CommandInteraction, Message } from 'oceanic.js';
import { Events, Fold, Core, Context } from "../main"

export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: any) => Promise<string> | string)
    owners?: string[]
    guildOnly?: boolean
    context?: typeof Context
}

export class Erine extends Client<Events>{
    /**
     * Setup the bot class
     */
    public readonly ops: SetupOptions;
    public core: Core
    public fold: Fold
    constructor(options: SetupOptions) {
        super(options)
        this.ops = options
        this.fold = new Fold(this)
        this.core = new Core(this)
        
    }
    getContext(data: CommandInteraction | Message) {
        return new (this.ops.context || Context)(this, data)
    }
    async load(dir: string): Promise<void> {
        this.fold.load(dir);
    }
}