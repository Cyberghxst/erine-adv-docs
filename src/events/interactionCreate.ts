import { Event } from "@types";
import { Interaction, InteractionType } from "discord.js";
import { ErineClient } from "../classes/Base";
import { Context } from "../classes/Context";
import * as Errors from "../classes/Errors";

const event: Event = {
    name: 'interactionCreate',
    async code(int: Interaction, bot: ErineClient) {
        if(int.type !== InteractionType.ApplicationCommand) return
        let ctx = new Context(int, bot)
        if(bot._options.guildOnly && !int.guild) return bot.emit('contextError', new Errors.GuildOnly(ctx))
        let slash_command = bot.skyfold.commands.SlashType?.find(c => c.data.name === int.commandName)
        let hybrid_command = bot.skyfold.commands.HybridType?.find(c => c.data.name === int.commandName)
        let hybrid_group = bot.skyfold.commands.HybridGroupType?.find(c => c.data.name.toLocaleLowerCase() == int.commandName)
        if(!slash_command && !hybrid_command && !hybrid_group) return bot.emit('contextError', new Errors.CommandNotFound(ctx, int.commandName))
        let sub = hybrid_group && int.options?.data?.[0]?.type == 1 ? hybrid_group.data.commands.find(c => c.data.name === int.options.data[0].name): null
        try {
            if(slash_command) slash_command!.code(ctx).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
            if(hybrid_command) hybrid_command!.code(ctx).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
            if(sub) sub!.code(ctx).catch(e => bot.emit('contextError', new Errors.UnknownCommandError(ctx, e)))
        } catch(e) {
            bot.emit('contextError', new Errors.UnknownCommandError(ctx, e))
        }
    },
}

export { event }