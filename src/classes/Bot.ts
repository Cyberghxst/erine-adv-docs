import { Events, Fold, Core, Context } from "../main";
import { Client, ClientOptions, CommandInteraction, Message } from "oceanic.js";
import { join } from "path";

export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: any) => Promise<string> | string)
    owners?: string[]
    guildOnly?: boolean
    context?: typeof Context
    autoSync?: boolean
}

export class Erine extends Client<Events>{ 
    /**
     * Setup the bot class with options.
     */
    public readonly ops: SetupOptions;
    public core: Core;
    public fold: Fold;
    constructor(options: SetupOptions) {
        super(options)
        this.ops = options
        this.fold = new Fold(this)
        this.core = new Core(this)
        
    }
    /**
     * 
     * @param {CommandInteraction | Message} data The iterator to create the Context 
     * @returns The Context class initializated
     */
    getContext(data: CommandInteraction | Message) {
        return new (this.ops.context || Context)(this, data)
    }
    /**
     * 
     * @param {string} dir The directory with the Makers 
     * @param {boolean} providingCwd If the directory already contains the home directory 'process.cwd()' 
     */
    async load(dir: string, providingCwd?: boolean): Promise<void> {
        await this.fold.load(dir, providingCwd);
    }
    /**
     * Starts the erine client
     */
    async connect() {
        await this.load(join(__dirname, "..", "events"), true)
        await super.connect()
        if(this.ops.autoSync) await this.fold.sync()
    }

}