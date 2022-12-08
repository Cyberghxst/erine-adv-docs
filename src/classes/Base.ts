import { Client } from "discord.js";
import { ErineOptions } from "@types"
import { Coreback } from "./Core"
import { Skyfold } from "./Skyfold"

class ErineClient extends Client {
    public coreback: Coreback
    public skyfold: Skyfold
    constructor(options: ErineOptions) {
        super(options)
        this.skyfold = new Skyfold({ client: this })
        this.coreback = new Coreback(this)
    }
    async load_commands(dir: string): Promise<void> {
        this.skyfold.load_commands(dir)
    }
    async load_events(dir: string): Promise<void> {
        this.skyfold.load_events(dir)
    }
}

export { ErineClient }