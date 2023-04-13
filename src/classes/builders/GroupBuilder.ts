import type { Command } from "../Command";

export class GroupBuilder {
    name: string
    description: string
    commands: Command[]
    as_slash: boolean
    as_prefix: boolean
    constructor() {
        this.name = ''
        this.description = '...'
        this.commands = []
        this.as_slash = true
        this.as_prefix = true
    }
    setName(name: string): GroupBuilder {
        this.name = name
        return this
    }
    setDescription(description: string): GroupBuilder {
        this.description = description
        return this
    }
    addCommand(command: Command): GroupBuilder {
        this.commands.push(command)
        return this
    }
    allowPrefix(allow: boolean): GroupBuilder {
        this.as_prefix = allow
        return this
    }
    allowSlash(allow: boolean): GroupBuilder {
        this.as_slash = allow
        return this
    }
}