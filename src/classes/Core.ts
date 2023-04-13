import { Erine, BaseParam, Context, ChannelParam, Errors } from "../main";
import { AnyChannel, Guild, Role, User, ApplicationCommandOptionTypes } from 'oceanic.js';

export class Core {
    public readonly bot: Erine
    constructor(bot: Erine) {
        this.bot = bot
    }
    isClass(fn: any) {
        return /class/gi.test(fn.constructor) || /class/gi.test(fn);
    }
    getClassOf(fn: any) {
        return fn.constructor.name;
    }
    noop() {
        return null
    } 
    async getMember(query: string, options: {guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let member = some_id ? options.guild.members.get(some_id): null
        if(!member) member = (options.guild!.members.find(m => m.user.username.includes(query)) || null)
        if(!member && some_id && options.force) member = await options.guild.getMember(some_id)
        return member
    }
    async getChannel(query: string, options: { guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let channel = some_id ? this.bot.getChannel(some_id): null
        if(!channel) channel = (options.guild.channels.find(c => c.name.includes(query)) || null)
        if(!channel && some_id && options.force) channel = await this.bot.rest.request<AnyChannel>({ method: "GET", path: `/channels/${some_id}` }).catch(this.noop)
        return channel
    }
    async getRole(query: string, options: { guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let role = some_id ? options.guild.roles.get(some_id): null
        if(!role) role = options.guild.roles.find(r => r.name.includes(query)) || null
        if(!role && options.force && some_id) role = await this.bot.rest.request<Role>({ method: "GET", path: `/guilds/${options.guild.id}/roles/${some_id}` }).catch(this.noop)
        return role || null
    }
    async transform(input: string, param: BaseParam, ctx: Context, seeable = true) {
        if(param.type === ApplicationCommandOptionTypes.STRING) return { break: false, value: input }
        else if(param.type === ApplicationCommandOptionTypes.NUMBER) {
            if(isNaN(Number(input))) { ctx.bot.emit("commandError", new Errors.InvalidParamNumber(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: Number(input) }
        } else if(param.type === ApplicationCommandOptionTypes.BOOLEAN) {
            let b = input.toLowerCase() === "false" ? false: input.toLowerCase() === "true" ? true: null
            if(b === null) { ctx.bot.emit("commandError", new Errors.InvalidParamBoolean(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionTypes.USER) {
            let b = await this.getMember(input, { guild: ctx.guild!, force: true})
            if(!b) { ctx.bot.emit("commandError", new Errors.InvalidParamMember(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionTypes.CHANNEL) {
            let b = await this.getChannel(input, { guild: ctx.guild!, force: true })
            if(!b) { ctx.bot.emit("commandError", new Errors.InvalidParamChannel(ctx, param)); return { break: true, value: null } }
            else {
                if((param as ChannelParam).channel_types && !(param as ChannelParam).channel_types!.includes(b!.type)) { ctx.bot.emit("commandError", new Errors.InvalidChannelType(ctx, param, b!.type, (param as ChannelParam).channel_types!)); return { break: true, value: null }}
                return { break: false, value: b }
            }
        } else if(param.type === ApplicationCommandOptionTypes.ROLE) {
            let b = await this.getRole(input, { guild: ctx.guild!, force: true })
            if(!b) { ctx.bot.emit("commandError", new Errors.InvalidParamRole(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: b }
        } else if(param.type === ApplicationCommandOptionTypes.ATTACHMENT) {
            let att = ctx.message?.attachments?.first()
            if(!att && param.required) { ctx.bot.emit("commandError", new Errors.InvalidParamAttachment(ctx, param)); return {break: true, value: null} }
            else return { break: false, value: att }
        }
        return { break: false, value: null }
    }
}