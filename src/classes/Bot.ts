import { Events, Fold, Core, Context, HelpCommand, Cooldowns } from "../main";
import { Client, ClientOptions, CommandInteraction, Message } from "oceanic.js";
import { join } from "path";

export interface SetupOptions extends ClientOptions {
    prefix: string | ((ctx: Context) => Promise<string> | string)
    owners?: string[]
    guildOnly?: boolean
    helpCommand?: typeof HelpCommand
    context?: typeof Context
    autoSync?: boolean
}

export class Erine<L extends Events = Events> extends Client<L> { 
    /**
     * Setup the bot class with options.
     */
    public readonly ops: SetupOptions;
    public core: Core;
    public fold: Fold;
    public cooldowns: Cooldowns
    constructor(options: SetupOptions) {
        super(options)
        this.ops = options
        this.cooldowns = new Cooldowns(this)
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
        await this.load(join(__dirname, "..", "events"), true);
        if(this.ops.helpCommand) this.fold.makers.push((new this.ops.helpCommand(this)).__start__())
        await super.connect()
        if(this.ops.autoSync) await this.fold.sync()
    }

}