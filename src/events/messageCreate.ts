import { Command, Event, Types } from "@types";
import { Message } from "discord.js";
import { isAsyncFunction, isPromise } from "util/types";
import { ErineClient } from "../classes/Base";
import { Context } from "../classes/Context";
import * as Errors from "../classes/Errors";

async function LoadPrefixCommand(ctx: Context, prefix_command: Command<Types.Prefix>, args: string[]) {
    if(!prefix_command) return
    if(prefix_command.plugins) {
        for(const plugin of prefix_command.plugins) {
            if(isPromise(plugin)) {
                if(!(await (await plugin)(ctx))) return
            } else {
                if(!await plugin(ctx)) return
            }
        }
    }
    if(prefix_command) {
        if(prefix_command.params) {
            let missing = prefix_command.params.params.find((x, i) => !args[i] && x.required)
            if(missing) return ctx.bot.emit('contextError', new Errors.MissingRequiredParam(ctx, missing))
            let types = prefix_command.params.params.map(x => x.type)
            for(let i = 0; i < types.length; i++) {
                let parsed = ctx.bot.coreback.convertParamType(args[i], prefix_command.params.params[i], ctx)
                if(parsed?.break) return
                if(prefix_command.params.params[i].long) prefix_command.params.params[i].value = args.slice(i).join(' ')
                else prefix_command.params.params[i].value = parsed?.value
            }
            ctx.params = prefix_command.params.params
        }
    }
    ctx.args = args
    try {
        if(prefix_command) prefix_command!.code(ctx).catch(e => ctx.bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
    } catch(e) {
        ctx.bot.emit('contextError', new Errors.UnknownCommandError(ctx, e))
    }
}

async function LoadHybridCommand(ctx: Context, hybrid_command: Command<Types.Hybrid>, args: string[]) {
    if(!hybrid_command) return
    if(hybrid_command.plugins) {
        for(const plugin of hybrid_command.plugins) {
            if(isPromise(plugin)) {
                if(!(await (await plugin)(ctx))) return
            } else {
                if(!await plugin(ctx)) return
            }
        }
    }
    if(hybrid_command) {
        if(hybrid_command.params) {
            let missing = hybrid_command.params.params.find((x, i) => !args[i] && x.required)
            if(missing) return ctx.bot.emit('contextError', new Errors.MissingRequiredParam(ctx, missing))
            let types = hybrid_command.params.params.map(x => x.type)
            for(let i = 0; i < types.length; i++) {
                let parsed = ctx.bot.coreback.convertParamType(args[i], hybrid_command.params.params[i], ctx)
                if(parsed?.break) return
                if(hybrid_command.params.params[i].long) hybrid_command.params.params[i].value = args.slice(i).join(' ')
                else hybrid_command.params.params[i].value = parsed?.value
            }
            ctx.params = hybrid_command.params.params
        }
    }
    ctx.args = args
    try {
        if(hybrid_command) hybrid_command!.code(ctx).catch(e => ctx.bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
    } catch(e) {
        ctx.bot.emit('contextError', new Errors.UnknownCommandError(ctx, e))
    }
}

async function LoadHybridGroup(ctx: Context, hybrid_group: Command<Types.HybridGroup>, args: string[]) {
    if(!hybrid_group) return
    let probably = args?.shift()?.toLowerCase()
    if(!probably) return
    let sub = hybrid_group.data.commands?.find(c => c.data.name.toLowerCase() == probably || c.data.aliases.includes(probably!))
    if(!sub) return
    ctx.parent = hybrid_group
    LoadHybridCommand(ctx, sub!, args).catch(e => ctx.bot.emit('contextError', new Errors.UnknownCommandError(new Context(ctx.message!, ctx.bot), e)))
}

const event: Event = {
    name: 'messageCreate',
    async code(message: Message, bot: ErineClient) {
        if(message.author.bot) return
        let ctx = new Context(message, bot)
        if(bot._options.guildOnly && !message.guild) return bot.emit('contextError', new Errors.GuildOnly(ctx))
        let prefix: string;
        if(typeof bot._options.prefix === 'string') prefix = bot._options.prefix
        else {
            if(isAsyncFunction(bot._options.prefix)) prefix = await bot._options.prefix(ctx)
            else prefix = bot._options.prefix(ctx)
        }
        if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return
        let args = message.content.slice(prefix.length).trim().split(/ +/)
        let probably = args.shift()?.toLowerCase()
        if(!probably) return;
        let prefix_command = bot.skyfold.commands.PrefixType?.find(c => c.data.names.includes(probably!))
        let hybrid_command = bot.skyfold.commands.HybridType?.find(c => c.data.name.toLowerCase() == probably || c.data.aliases.includes(probably!))
        let hybrid_group = bot.skyfold.commands.HybridGroupType?.find(c => c.data.name.toLocaleLowerCase() == probably)
        if(!prefix_command && !hybrid_command && !hybrid_group) return bot.emit('contextError', new Errors.CommandNotFound(ctx, probably))
        LoadHybridGroup(ctx, hybrid_group!, args).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
        LoadHybridCommand(ctx, hybrid_command!, args).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
        LoadPrefixCommand(ctx, prefix_command!, args).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
    }
}

export { event }