// @ts-nocheck

import { BaseParam, ErineClient } from "@types";
import { ApplicationCommandOptionType, Guild, GuildMember, PermissionResolvable } from "discord.js";
import { Context } from "./Context";
import * as Errors from "./Errors"

class Coreback {
    client: ErineClient
    constructor(client: ErineClient) {
        if(!client) throw new SyntaxError('Missing client')
        this.client = client
    }
    isType<T, R>(obj: any, func: (obj: R) => boolean): obj is T {
        return func(obj)
    }
    async getMember(query: string, guild: Guild) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let member = some_id ? guild!.members.cache.get(some_id) || (await guild!.members.fetch(some_id).catch(e=>null)): null
        if(!member) member = (guild!.members.cache.find(m => m.user.username.includes(query)) || null)
        return member
    }
    async getChannel(query: string, guild: Guild) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let channel = some_id ? guild.channels.cache.get(some_id) || (await guild.channels.fetch(some_id).catch(e=>null)): null
        if(!channel) channel = (guild.channels.cache.find(c => c.name.includes(query)) || null)
        return channel
    }
    async getRole(query: string, guild: Guild) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let role = some_id ? guild.roles.cache.get(some_id) || (await guild.roles.fetch(some_id).catch(e=>null)): null
        if(!role) role = (guild.roles.cache.find(r => r.name.includes(query)) || null)
        return role
    }
    async convertParamType(input: string, param: BaseParam, ctx: Context) {
        if(!input) return { break: false, value: null }  
        if(param.choices?.length) {
            let found = param.choices.find(x => x.name.toLowerCase() == input.toLowerCase())
            if(!found) { ctx.bot.emit('contextError', new Errors.InvalidParamChoice(ctx, param, param.choices)); return { break: true, value: null } }
            else return { break: false, value: found.value }
        }
        if(param.type === ApplicationCommandOptionType.String) return { break: false, value: input }
        else if(param.type === ApplicationCommandOptionType.Number) {
            let n = Number(input)
            if(isNaN(n)) { ctx.bot.emit('contextError', new Errors.NotParamNumber(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: Number(input) }
        } else if(param.type === ApplicationCommandOptionType.Boolean) {
            let b = input === 'false' ? false: input === 'true' ? true: null
            if(b === null) { ctx.bot.emit('contextError', new Errors.NotParamBoolean(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionType.User) {
            let b = await this.getMember(input, ctx.guild!)
            if(!b) { ctx.bot.emit('contextError', new Errors.InvalidParamMember(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionType.Channel) {
            let b = await this.getChannel(input, ctx.guild)
            if(!b) { ctx.bot.emit('contextError', new Errors.InvalidParamChannel(ctx, param)) }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionType.Role) {
            let b = await this.getRole(input, ctx.guild!)
            if(!b) { ctx.bot.emit('contextError', new Errors.InvalidParamRole(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        }
        return { break: false, value: null }
    }
}

const Plugins = {
    async isOwner(ctx: Context): Promise<boolean> {
        if(!ctx.bot._options.owners?.includes(ctx.message?.author.id)) { 
            ctx.bot.emit('contextError', new Errors.NotOwner(ctx))
            return false
        } else return true
    },
    async hasPerm(perm: PermissionResolvable) {
        return (async (ctx: Context) => {
            if(!(ctx.member as GuildMember).permissions.has(perm)) { ctx.bot.emit('contextError', new Errors.MissingPermission(ctx, perm)); return false }
            else return true
        })
    }
}

export { Coreback, Plugins }