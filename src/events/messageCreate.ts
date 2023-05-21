import { Event, Context, Errors, Message, CommandObject, ApplicationCommandOptionTypes } from "../main";
import { isPromise, isAsyncFunction } from "util/types";
import { Maker } from "../classes/Maker";

class MessageHandler extends Maker {
    @Event
    async messageCreate(message: Message) {
        if(message.author.bot) return
        let ctx = this.bot.getContext(message)
        if(this.bot.ops.guildOnly && !message.guild) throw new Errors.GuildOnly(ctx)
        let prefix: string;
        if(typeof this.bot.ops.prefix === 'string') prefix = this.bot.ops.prefix
        else {
            if(isAsyncFunction(this.bot.ops.prefix)) prefix = await this.bot.ops.prefix(ctx)
            else prefix = this.bot.ops.prefix(ctx) as string
        }
        if(!prefix) return;
        ctx.prefix = prefix
        if(!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return
        let args = this.splitArgs(message.content.slice(prefix.length).trim())
        let argsForSub: string[] = args.slice(1)
        let probably = args.shift()?.toLowerCase()
        if(!probably) return
        let command = this.bot.fold.getAllCommands().find(c => !c.group && (c.name.toLowerCase() == probably || c.aliases.includes(probably!) && c.allowed.includes("prefix")))
        let subcommand = this.bot.fold.getAllCommands().find(c => c.group && (c.group.name.toLowerCase() == probably || c.group.aliases?.map(s=>s.toLowerCase())?.includes(probably!)) && (c.name == argsForSub[0]?.toLowerCase() || c.aliases.map(s=>s.toLowerCase()).includes(argsForSub[0]?.toLowerCase())) && c.allowed.includes("prefix")) || this.bot.fold.getAllCommands().find(c => c.group && (c.group.name == probably || c.group.aliases?.map(s=>s.toLowerCase())?.includes(probably!)) && c.group.fallback && c.allowed.includes("prefix"))
        if(command) this.runCommand(ctx, command, args)
        if(subcommand) this.runCommand(ctx, subcommand, subcommand.group!.fallback && subcommand.name !== argsForSub[0]?.toLowerCase() ? argsForSub: argsForSub.slice(1))
    }

    async runCommand(ctx: Context, command: CommandObject, args: string[]) {
        if(!command) return
        ctx.command = command
        ctx.parent = command.group || null
        if(command.plugins.length) {
            for(const plugin of command.plugins) {
                if(isPromise(plugin)) {
                    if(!(await (await plugin)(ctx))) return
                } else {
                    if(!await plugin(ctx)) return
                }
            }
        }
        if(command.params.length) {
            let missing = command.params.filter(x => x.type != ApplicationCommandOptionTypes.ATTACHMENT)?.find((x, i) => !args[i] && x.required)
            if(missing) throw new Errors.MissingRequiredParam(ctx, missing)
            let types = command.params.map(x => x.type)
            let argi = 0
            for(let i = 0; i < types.length; i++) {
                let parsed
                if(types[i] === ApplicationCommandOptionTypes.ATTACHMENT) { parsed = await ctx.bot.core.transform("", command.params[i], ctx, false); argi--}
                else parsed = await ctx.bot.core.transform(args[argi], command.params[i], ctx)
                if(parsed?.break) return
                if(command.params[i]?.ellipsis) command.params[i].value = args.slice(i).join(' ')
                else command.params[i].value = parsed?.value
                argi++
            }
            ctx.params = command.params
        }
        ctx.args = args
        command.maker[command.key](ctx)
    }

    splitArgs(text: string) {
        const regex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|[\S]+)/g;
        const args = [];
        let match;
        while((match = regex.exec(text))) {
            const arg = match[0].replace(/^(['"])(.*)\1$/, '$2').replace(/\\(.)/g, '$1');
            args.push(arg);
        }
        return args;
      }
}

export const data = MessageHandler