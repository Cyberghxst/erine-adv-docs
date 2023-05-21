import { Context, Errors, AnyTextChannelWithoutGroup, ChannelTypes, TextChannel, PermissionName, Bucket } from '../main';

export function isGuild(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if(ctx.channel?.type == ChannelTypes.DM) throw new Errors.GuildOnly(ctx)
        else return true
    })
}

export function isInChannelType(...types: ChannelTypes[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            let channel: AnyTextChannelWithoutGroup = ctx.channel!;
            if(!types.includes(ctx.channel!.type)) throw new Errors.NotInChannelType(ctx, types, channel)
            else return true
        })
    }
}

export function isNSFW(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if((ctx.channel as TextChannel).nsfw) throw new Errors.NotNSFW(ctx)
        else return false;
    })
}

export function isOwner(target: any, key: string, descriptor: PropertyDescriptor) {
    if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
    descriptor.value.__plugins__.push(async function(ctx: Context) {
        if(!ctx.bot.ops.owners?.includes(ctx.author.id)) throw new Errors.NotOwner(ctx)
        else return true;
    })
}

export function hasAnyBotPerms(...permissions: PermissionName[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            if(!permissions.some(p => ctx.guild?.clientMember.permissions.has(p))) throw new Errors.MissingBotPermission(ctx, permissions)
            else return true
        })
    }
}

export function hasBotPerms(...permissions: PermissionName[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            if(!permissions.every(p => ctx.guild?.clientMember.permissions.has(p))) throw new Errors.MissingBotPermission(ctx, permissions)
            else return true
        })
    }
}

export function hasAnyPerms(...permissions: PermissionName[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            if(!permissions.some(p => ctx.member?.permissions.has(p))) throw new Errors.MissingPermission(ctx, permissions)
            else return true
        })
    }
}

export function hasPerms(...permissions: PermissionName[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            if(!permissions.every(p => ctx.member?.permissions.has(p))) throw new Errors.MissingPermission(ctx, permissions)
            else return true            
        })
    }
}

export function onlyForIDs(...ids: string[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            if(!ids.includes(ctx.author.id)) throw new Errors.OnlyForIDs(ctx, ids)
            else return true
        })
    }
}

export function cooldown(seconds: number, bucket: Bucket) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
        if(!descriptor.value.__plugins__) descriptor.value.__plugins__ = []
        descriptor.value.__plugins__.push(async function(ctx: Context) {
            let body = bucket == Bucket.Guild ? ctx.guild?.id || "-1": bucket == Bucket.Member ? `${ctx.guild!.id}_${ctx.author.id}`: bucket == Bucket.User ? ctx.author.id: bucket == Bucket.Channel ? ctx.channel?.id || "-1": "-1"
            let b = await ctx.bot.cooldowns.check(ctx.command!.name, body, seconds * 1000, bucket)
            if(b) throw new Errors.CommandInCooldown(ctx, b.left)
            else {
                await ctx.bot.cooldowns.setCooldownSource(ctx.command!.name, body, bucket, seconds * 1000)
                return true
            }
        })
    }
}
