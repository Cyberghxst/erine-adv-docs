import { Erine, BaseParam, Context, ChannelParam, Errors, AnyChannel, Guild, Role, ApplicationCommandOptionTypes } from "../main";

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
    /**
     * Equivalent to '(...args) => null', used to bypass errors
     * @returns 
     */
    noop() {
        return null
    }
    /**
     * Get a member from a string
     * @param query The possible member: ID, Mention, Partial Username, Username 
     * @param options guild is the way to get the member, force is if the bot should try to fetch it if it is not in cache
     * @returns The found member (if any)
     */
    async getMember(query: string, options: {guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let member = some_id ? options.guild.members.get(some_id): null
        if(!member) member = (options.guild!.members.find(m => m.user.username.includes(query)) || null)
        if(!member && some_id && options.force) member = await options.guild.getMember(some_id)
        return member
    }
    /**
     * Get a channel from a string
     * @param query The possible channel: ID, Mention, Partial Name, Name
     * @param options guild is the way to get the channel, force is if the bot should try to fetch it if it is not in cache
     * @returns The found channel (if any)
     */
    async getChannel(query: string, options: { guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let channel = some_id ? this.bot.getChannel(some_id): null
        if(!channel) channel = (options.guild.channels.find(c => c.name.includes(query)) || null)
        if(!channel && some_id && options.force) channel = await this.bot.rest.request<AnyChannel>({ method: "GET", path: `/channels/${some_id}` }).catch(this.noop)
        return channel
    }
    /**
     * Get a role from a string
     * @param query The possible role: ID, Mention, Partial Name, Name
     * @param options guild is the way to get the channel, force is if the bot should try to fetch it if its not in cache
     * @returns The found role (if any)
     */
    async getRole(query: string, options: { guild: Guild, force?: boolean }) {
        if(!query) return null
        let some_id = query.replace(/[^\d]/g, '')
        let role = some_id ? options.guild.roles.get(some_id): null
        if(!role) role = options.guild.roles.find(r => r.name.includes(query)) || null
        if(!role && options.force && some_id) role = await this.bot.rest.request<Role>({ method: "GET", path: `/guilds/${options.guild.id}/roles/${some_id}` }).catch(this.noop)
        return role || null
    }
    /**
     * Parse an argument to return a parameter value
     * @param input The argument string
     * @param param The Parameter type (BaseParam object or extended)
     * @param ctx The Context to use
     * @param seeable If the argument can be get from the command execution string-arguments, or not (i.e. attachments)
     * @returns The converted value (if possible)
     */
    async transform(input: string, param: BaseParam, ctx: Context, seeable = true) {
        if(!input && seeable) return { break: false, value: null }
        // @ts-ignore
        let choices = param.choices as { name: string, value: string }[]
        if(choices?.length) {
            let found = choices.find(x => x.name.toLowerCase() == input.toLowerCase())
            if(!found) { ctx.bot.emit("commandError", new Errors.InvalidParamChoice(ctx, param, choices)); return { break: true, value: null } }
            else return { break: false, value: found.value }
        }
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