import { Erine, Events } from "../main"

export class Event {
    public bot: Erine
    public event: keyof Events
    constructor(bot: Erine) {
        this.bot = bot
        this.event = this.constructor.name as keyof Events
    }
    async code(...args: unknown[]) {
        console.log(this.event + " was executed!")
    }
    async run() {
        this.bot.on(this.event, this.code)
    }
}