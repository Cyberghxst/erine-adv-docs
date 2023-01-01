// @ts-nocheck

import { BaseParam, ErineClient } from "@types";
import { ApplicationCommandOptionType, GuildMember, PermissionResolvable } from "discord.js";
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
    convertParamType(input: string, param: BaseParam, ctx: Context) {
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