import { Client, Message, Interaction } from "discord.js";
import { ErineOptions } from "@types";
import { Coreback } from "./Core";
import { Skyfold } from "./Skyfold";

class ErineClient extends Client {
    public coreback: Coreback
    public skyfold: Skyfold
    public _options: ErineOptions
    constructor(options: ErineOptions) {
        super(options)
        this.skyfold = new Skyfold({ client: this })
        this.coreback = new Coreback(this)
        this._options = options
        this.init()
    }
    async load_commands(dir: string): Promise<void> {
        this.skyfold.load_commands(dir)
    }
    async load_events(dir: string): Promise<void> {
        this.skyfold.load_events(dir)
    }
    private init(): void {
        let m = require('../events/messageCreate').event
        let i = require('../events/interactionCreate').event
        this.on(m.name, (message: Message) => m.code(message, this))
        this.on(i.name, (int: Interaction) => i.code(int, this))
    }
}

export { ErineClient }