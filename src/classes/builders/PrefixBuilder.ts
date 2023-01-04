import { PermissionResolvable } from "discord.js"

export interface DataPrefixBuilder {
    names: string[]
    description?: string | null
    usage?: string | null
    cooldown?: number
    args?: number
    isDev?: boolean
    category?: string | null
    extra?: any
    permissions?: { user: PermissionResolvable[], bot: PermissionResolvable[] }
}

export class PrefixBuilder {
    names: string[]
    description: string | null
    usage: string | null
    cooldown?: number
    args: number
    isDev: boolean
    category: string | null
    extra: any
    permissions: { user: PermissionResolvable[], bot: PermissionResolvable[] }
    constructor(data?: DataPrefixBuilder) {
        this.names = data?.names || []
        this.description = data?.description || null
        this.usage = data?.usage || null
        this.cooldown = data?.cooldown || 2000
        this.args = data?.args || 0
        this.isDev = data?.isDev || false
        this.category = data?.category || null
        this.extra = data?.extra || null
        this.permissions = { user: [], bot: [] }
    }
    setNames(...names: string[]): PrefixBuilder {
        this.names = names
        return this
    }
    setDescription(data: string): PrefixBuilder {
        this.description = data
        return this
    }
    setUsage(data: string): PrefixBuilder {
        this.usage = data
        return this
    }
    setCooldown(cooldown: number): PrefixBuilder {
        this.cooldown = cooldown * 1000
        return this
    }
    setArgs(args: number): PrefixBuilder {
        this.args = args
        return this
    }
    setDev(is: boolean): PrefixBuilder {
        this.isDev = is
        return this
    }
    setPerms(options: { type: 'bot' | 'user', list: PermissionResolvable[] }): PrefixBuilder {
        this.permissions[options.type] = options.list
        return this
    }
    setExtra(data: any): PrefixBuilder {
        this.extra = data
        return this
    }
}