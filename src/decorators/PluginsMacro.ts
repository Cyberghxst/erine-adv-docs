import { Context, Errors, AnyTextChannelWithoutGroup, ChannelTypes, TextChannel, PermissionName } from '../main';

export function isGuild(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if(ctx.channel?.type == ChannelTypes.DM) {
            ctx.bot.emit('commandError', new Errors.GuildOnly(ctx));
            return false
        } else return true
    })
}

export function isInChannelType(...types: ChannelTypes[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            let channel: AnyTextChannelWithoutGroup = ctx.channel!;
            if(!types.includes(ctx.channel!.type)) {
                ctx.bot.emit('commandError', new Errors.NotInChannelType(ctx, types, channel));
                return false
            } else return true
        })
    }
}

export function isNSFW(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if((ctx.channel as TextChannel).nsfw) {
            ctx.bot.emit('commandError', new Errors.NotNSFW(ctx))
            return true
        }
        else return false;
    })
}

export function isOwner(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if(!ctx.bot.ops.owners?.includes(ctx.author.id)) {
            ctx.bot.emit('commandError', new Errors.NotOwner(ctx))
            return false
        }
        else return true;
    })
}
/**
export function hasAnyBotPerms(...permissions: PermissionName[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            let channel: AnyTextChannelWithoutGroup = ctx.channel!;
            
            if(!permissions.includes(["ADD_REACTIONS"]) {
                ctx.bot.emit('commandError', new Errors.MissingBotPermission(ctx, permissions));
                return false
            } else return true
        })
    }
}
*/