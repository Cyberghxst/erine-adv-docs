import { Event, Context, Interaction, InteractionTypes, CommandInteraction, ApplicationCommandTypes, Errors, ComponentInteraction, ModalSubmitInteraction, ApplicationCommandInteractionData } from "../main";
import { isPromise } from "util/types";
import { Maker } from "../classes/Maker";

class InteractionHandler extends Maker {
    @Event
    async interactionCreate(interaction: Interaction) {
        switch(interaction.type) {
            case InteractionTypes.APPLICATION_COMMAND: {
                switch((interaction as CommandInteraction).data.type) {
                    case ApplicationCommandTypes.CHAT_INPUT: {
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
                        break;
                    }
                    case ApplicationCommandTypes.USER: {
                        let int = this.bot.fold.getAllContexts().find(i => i.name === (interaction as any).data.name)
                        if(!int) return
                        try {
                            int.maker[int.name](interaction).catch(console.log)
                        } catch(e) {
                            console.log(e)
                        }
                        break;
                    }
                    case ApplicationCommandTypes.MESSAGE: {
                        let int = this.bot.fold.getAllContexts().find(i => i.name === (interaction as unknown as ApplicationCommandInteractionData).name)
                        if(!int) return
                        try {
                            int.maker[int.name](interaction).catch(console.log)
                        } catch(e) {
                            console.log(e)
                        }
                        break;
                    }
                }
                break;
            }
            case InteractionTypes.MESSAGE_COMPONENT: {
                let int = this.bot.fold.getAllInteractions().find(i => i.id === (interaction as ComponentInteraction).data.customID)
                if(!int) return
                try {
                    int.maker[int.id](interaction).catch(console.log)
                } catch(e) {
                    console.log(e)
                }
                break;
            }
            case InteractionTypes.MODAL_SUBMIT: {
                let int = this.bot.fold.getAllInteractions().find(i => i.id === (interaction as ModalSubmitInteraction).data.customID)
                if(!int) return
                try {
                    int.maker[int.id](interaction).catch(console.log)
                } catch(e) {
                    console.log(e)
                }
                break;
            }
        } 
    }
}

export const data = InteractionHandler