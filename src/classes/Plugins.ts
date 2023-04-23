import { Context, Errors, AnyTextChannelWithoutGroup, ChannelTypes } from '../main';

export class Plugins {
    static async isGuild(ctx: Context) {
        if(ctx.channel?.type == ChannelTypes.DM) {
            ctx.bot.emit('commandError', new Errors.GuildOnly(ctx));
            return false
        } else return true
    }

    static async isInChannelType(...types: ChannelTypes[]) {
        return (async (ctx: Context) => {
            let channel: AnyTextChannelWithoutGroup = ctx.channel!;
            if(!types.includes(ctx.channel!.type)) {
                ctx.bot.emit('commandError', new Errors.NotInChannelType(ctx, types, channel));
                return false
            } else return true
        })
    }

    static async isOwner(ctx: Context): Promise<boolean> {
        if(!ctx.bot.ops.owners?.includes(ctx.author.id)) {
            ctx.bot.emit('commandError', new Errors.NotOwner(ctx))
            return false
        }
        else return true;
    }
}