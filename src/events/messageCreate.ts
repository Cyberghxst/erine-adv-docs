import { Event, Erine, Message, Context, Command, Group, ApplicationCommandOptionTypes, Errors } from "../main";
import { isAsyncFunction, isPromise } from "util/types";

class messageCreate extends Event {
    constructor(bot: Erine) {
        super(bot)
    }
    async code(message: Message): Promise<void> {
        
    }
    private async loadCommand(ctx: Context, command: Command, args: string[]) {
        ctx.command = command
        if(command.plugins) {
            for(const plugin of command.plugins) {
                if(isPromise(plugin)) {
                    if(!(await (await plugin)(ctx))) return
                } else {
                    if(!await plugin(ctx)) return
                }
            }
        }
        if(command.options?.params) {
            let missing = command.options.params.params?.filter(x => x.type != ApplicationCommandOptionTypes.ATTACHMENT)?.find((x, i) => !args[i] && x.required)
            if(missing) return ctx.bot.emit("commandError", new Errors.MissingRequiredParam(ctx, missing))
            let types = command.options.params.params.map(x => x.type)
            let argi = 0
            for(let i = 0; i < types.length; i++) {
                let parsed
                if(types[i] === ApplicationCommandOptionTypes.ATTACHMENT) { parsed = await ctx.bot.core.transform("", command.options.params.params[i], ctx, false); argi--}
                else parsed = await ctx.bot.core.transform(args[argi], command.options.params.params[i], ctx)
                if(parsed?.break) return
                if(command.options.params.params[i]?.long) command.options.params.params[i].value = args.slice(i).join(' ')
                else command.options.params.params[i].value = parsed?.value
                argi++
            }
            ctx.params = command.options.params.params
        }
        ctx.args = args
        try {
            if(command) command.code(ctx).catch(e => ctx.bot.emit("commandError", new Errors.UnknownCommandError(ctx, e)))
        } catch(e) {
            ctx.bot.emit("commandError", new Errors.UnknownCommandError(ctx, e))
        }
    }
    private loadGroup(ctx: Context, group: Group, args: string[]) {
        const [all, probably] = [args || [], args?.shift()?.toLowerCase()]
        let sub = probably ? group.commands?.find(c => (c.name.toLowerCase() == probably || c.aliases.includes(probably!)) && c.withPrefix): null
        if(sub) {
            ctx.command = sub
            ctx.parent = group
            this.loadCommand(ctx, sub!, args).catch(e => ctx.bot.emit("commandError", new Errors.UnknownCommandError(new Context(ctx.bot, ctx.message!), e)))
        } else {
            let fall = group.fallback
            if(fall) this.loadCommand(ctx, fall, all)
        }
    }
    private splitArgs(text: string) {
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

export const data = messageCreate