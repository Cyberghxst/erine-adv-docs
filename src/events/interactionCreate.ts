import { Event, Context, Interaction, Maker, InteractionTypes, CommandInteraction, Errors } from "../main";
import { isPromise } from "util/types";

class InteractionHandler extends Maker {
    @Event
    async interactionCreate(interaction: Interaction) {
        if(interaction.type == InteractionTypes.APPLICATION_COMMAND) {
            let int = interaction as CommandInteraction
            let ctx = this.bot.getContext(int)
            if(this.bot.ops.guildOnly && !int.guild) return this.bot.emit("commandError", new Errors.GuildOnly(ctx))
            let command = this.bot.fold.getAllCommands().find(c => c.name == int.data.name && c.allowed.includes("slash"))
            if(command && command.plugins.length) {
                for(const plugin of command.plugins) {
                    if(isPromise(plugin)) {
                        if(!(await (await plugin)(ctx))) return
                    } else {
                        if(!await plugin(ctx)) return
                    }
                }
            }
            let subcommand = int.data.options.getSubCommand() ? this.bot.fold.getAllCommands().find(c => c.group && c.group.name.toLowerCase() == int.data.name && int.data.options.getSubCommand()!.at(0) == c.name.toLowerCase() && c.allowed.includes("slash")): null
            if(subcommand && subcommand.plugins) {
                for(const plugin of subcommand.plugins) {
                    if(isPromise(plugin)) {
                        if(!(await (await plugin)(ctx))) return
                    } else {
                        if(!await plugin(ctx)) return
                    }
                }
            }
            try {
                if(command) command.maker[command.key](ctx).catch((e: any) => this.bot.emit("commandError", new Errors.UnknownCommandError(ctx, e)))
                if(subcommand) subcommand.maker[subcommand.key](ctx).catch((e: any) => this.bot.emit("commandError", new Errors.UnknownCommandError(ctx, e)))
            } catch(e) {
                this.bot.emit("commandError", new Errors.UnknownCommandError(ctx, e))
            }
        }
    }
}

export const data = InteractionHandler