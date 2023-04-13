import { CommandDataBuilder } from "typings/classes/builders/CommandBuilder";

export class CommandBuilder {
    name: string
    aliases: string[]
    description: string
    as_prefix: boolean
    as_slash: boolean
    constructor(options?: CommandDataBuilder) {
        this.name = options?.name || ""
        this.aliases = options?.aliases || []
        this.description = options?.description || '...'
        this.as_prefix = true
        this.as_slash = true
    }
    setName(name: string): CommandBuilder {
        this.name = name
        return this
    }
    setDescription(description: string): CommandBuilder {
        this.description = description
        return this
    }
    setAliases(...aliases: string[]): CommandBuilder {
        this.aliases = aliases
        return this
    }
    allowPrefix(allow: boolean): CommandBuilder {
        this.as_prefix = allow
        return this
    }
    allowSlash(allow: boolean): CommandBuilder {
        this.as_slash = allow
        return this
    }
}