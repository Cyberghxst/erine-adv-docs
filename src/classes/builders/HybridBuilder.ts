import { SlashCommandBuilder } from "discord.js"

export interface DataHybridBuilder {
    name: string
    aliases?: string[]
    description?: string
}

export class HybridBuilder extends SlashCommandBuilder {
    name: string
    aliases: string[]
    description: string
    constructor(options?: DataHybridBuilder) {
        super()
        this.name = options?.name || ""
        this.aliases = options?.aliases || []
        this.description = options?.description || '...'
    }
    setAliases(...aliases: string[]): HybridBuilder {
        this.aliases = aliases
        return this
    }
}