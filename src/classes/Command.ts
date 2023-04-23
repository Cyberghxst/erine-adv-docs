import { Erine, CommandBuilder, ParamsBuilder, Plugin, Group } from "../main";

export interface CommandOptions {
    data: CommandBuilder
    plugins?: Plugin[]
    params?: ParamsBuilder
}

export class Command {
    public bot: Erine
    public options?: CommandOptions
    public name: string
    public plugins: Plugin[]
    public aliases: string[]
    public description: string
    public withPrefix: boolean
    public withSlash: boolean
    public parent: Group | null
    constructor(bot: Erine, options?: CommandOptions) {
        this.bot = bot
        this.options = options
        this.name = options?.data?.name?.toLowerCase() || this.constructor.name.toLowerCase()
        this.aliases = options?.data?.aliases || []
        this.description = options?.data.description || "..."
        this.withPrefix = options?.data?.as_prefix ?? true
        this.withSlash = options?.data?.as_slash ?? true
        this.parent = null
        this.plugins = options?.plugins || []
    }
    async code(ctx: any): Promise<any> {
        console.log("Command executed: ", this.name);
    }
}