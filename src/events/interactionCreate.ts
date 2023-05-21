import { Event, Interaction, InteractionTypes, CommandInteraction, ApplicationCommandTypes, Errors, ComponentInteraction, ModalSubmitInteraction, ApplicationCommandInteractionData } from "../main";
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
                        if(this.bot.ops.guildOnly && !int.guild) throw new Errors.GuildOnly(ctx)
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
                        if(command) command.maker[command.key](ctx)
                        if(subcommand) subcommand.maker[subcommand.key](ctx)
                        break;
                    }
                    case ApplicationCommandTypes.USER: {
                        let int = this.bot.fold.getAllContexts().find(i => i.name === (interaction as any).data.name)
                        if(!int) return
                        int.maker[int.name](interaction)
                        break;
                    }
                    case ApplicationCommandTypes.MESSAGE: {
                        let int = this.bot.fold.getAllContexts().find(i => i.name === (interaction as unknown as ApplicationCommandInteractionData).name)
                        if(!int) return
                        
                        int.maker[int.name](interaction)
                        break;
                    }
                }
                break;
            }
            case InteractionTypes.MESSAGE_COMPONENT: {
                let int = this.bot.fold.getAllInteractions().find(i => i.id === (interaction as ComponentInteraction).data.customID)
                if(!int) return
                int.maker[int.id](interaction)
                break;
            }
            case InteractionTypes.MODAL_SUBMIT: {
                let int = this.bot.fold.getAllInteractions().find(i => i.id === (interaction as ModalSubmitInteraction).data.customID)
                if(!int) return
                int.maker[int.id](interaction)
                break;
            }
        } 
    }
}

export const data = InteractionHandler