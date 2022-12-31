import { Event } from "@types";
import { Message } from "discord.js";
import { isAsyncFunction } from "util/types";
import { ErineClient } from "../classes/Base";
import { Context } from "../classes/Context";
import * as Errors from "../classes/Errors";

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
        if(!prefix_command && !hybrid_command) return bot.emit('contextError', new Errors.CommandNotFound(ctx, probably))
        if(prefix_command) {
            if(prefix_command.params) {
                let missing = prefix_command.params.params.find((x, i) => !args[i])
                if(missing) return bot.emit('contextError', new Errors.MissingRequiredParam(ctx, missing))
                let types = prefix_command.params.params.map(x => x.type)
                for(let i = 0; i < types.length; i++) {
                    let parsed = bot.coreback.convertParamType(args[i], prefix_command.params.params[i], ctx)
                    if(parsed?.break) return
                    if(prefix_command.params.params[i].long) prefix_command.params.params[i].value = args.slice(i).join(' ')
                    else prefix_command.params.params[i].value = parsed?.value
                }
                ctx.params = prefix_command.params.params
            }
        }
        if(hybrid_command) {
            if(hybrid_command.params) {
                let missing = hybrid_command.params.params.find((x, i) => !args[i])
                if(missing) return bot.emit('contextError', new Errors.MissingRequiredParam(ctx, missing))
                let types = hybrid_command.params.params.map(x => x.type)
                for(let i = 0; i < types.length; i++) {
                    let parsed = bot.coreback.convertParamType(args[i], hybrid_command.params.params[i], ctx)
                    if(parsed?.break) return
                    if(hybrid_command.params.params[i].long) hybrid_command.params.params[i].value = args.slice(i).join(' ')
                    else hybrid_command.params.params[i].value = parsed?.value
                }
                ctx.params = hybrid_command.params.params
            }
        }
        ctx.args = args
        try {
            if(prefix_command) prefix_command!.code(ctx).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
            if(hybrid_command) hybrid_command!.code(ctx).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
        } catch(e) {
            bot.emit('contextError', new Errors.UnknownCommandError(ctx, e))
        }
    }
}

export { event }