import { Erine, GroupBuilder, Command, CommandOptions, Plugin } from "../main"

export interface GroupOptions {
    data: GroupBuilder
    plugins?: Plugin[]
}

export class Group {
    public bot: Erine
    public options?: GroupOptions
    public fallback?: Command
    public commands: Command[]
    public name: string
    constructor(bot: Erine, options?: GroupOptions) {
        this.bot = bot
        this.options = options
        this.name = options?.data?.name?.toLowerCase() || this.constructor.name.toLowerCase()
        this.commands = []
    }
    addCommand(command: CommandOptions, fallback?: boolean) {
        let cls = new Command(this.bot, command)
        this.commands.push(cls)
        if(fallback) this.fallback = cls
        return this
    }
}