import { Command, Types } from "@types"

export class HybridGroup {
    name: string
    description: string
    commands: Command<Types.Hybrid>[]
    constructor() {
        this.name = ''
        this.description = '...'
        this.commands = []
    }
    setName(name: string): HybridGroup {
        this.name = name
        return this
    }
    setDescription(description: string): HybridGroup {
        this.description = description
        return this
    }
    addCommand(command: Command<Types.Hybrid>): HybridGroup {
        this.commands.push(command)
        return this
    }
    toJSON() {
        return { "name": this.name, "description": this.description, "options": [] as any[] }
    }
}