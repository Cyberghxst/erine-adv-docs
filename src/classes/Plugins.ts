import { Context, Errors, AnyTextChannelWithoutGroup, ChannelTypes, TextChannel, PermissionName, Member } from '../main';

export class Plugins {
    static async isGuild(ctx: Context) {
        if(ctx.channel?.type == ChannelTypes.DM) {
            ctx.bot.emit('commandError', new Errors.GuildOnly(ctx));
            return false
        } else return true
    };

    static async isInChannelType(...types: ChannelTypes[]) {
        return (async (ctx: Context) => {
            let channel: AnyTextChannelWithoutGroup = ctx.channel!;
            if(types.includes(ctx.channel!.type)) return true
            else {
                ctx.bot.emit('commandError', new Errors.NotInChannelType(ctx, types, channel));
                return false;
            };
        })
    };

    static async isOwner(ctx: Context): Promise<boolean> {
        if(ctx.bot.ops.owners?.includes(ctx.author.id)) return true
        else {
            ctx.bot.emit('commandError', new Errors.NotOwner(ctx));
            return false;
        };
    };

    static async isNSFW(ctx: Context): Promise<boolean> {
        if(await (ctx.channel as TextChannel).nsfw) return true
        else {
            ctx.bot.emit('commandError', new Errors.NotNSFW(ctx));
            return false;
        };
    };

    static async hasAnyBotPerms(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            if(!perms.some(perm => (ctx.guild?.members.get(ctx.bot.user.id) as Member).permissions.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingBotPermission(ctx, perms));
                return false;
            } else return true;
        });
    };

    static async hasBotPerms(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            if(!perms.every(perm => (ctx.guild?.members.get(ctx.bot.user.id) as Member).permissions.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingBotPermission(ctx, perms));
                return false;
            } else return true;
        });
    };

    static async hasAnyPerms(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            if(!perms.some(perm => (ctx.member as Member).permissions.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingPermission(ctx, perms));
                return false;
            } else return true;
        });
    };

    static async hasPerms(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            if(!perms.every(perm => (ctx.member as Member).permissions.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingPermission(ctx, perms));
                return false;
            } else return true;
        });
    };

    static async hasAnyBotPermsInChannel(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            let channel = (ctx.channel as TextChannel),
                bot = (ctx.guild?.members.get(ctx.bot.user.id) as Member),
                channelPerms = channel.permissionsOf(bot);
            if(!perms.some(perm => channelPerms.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingBotChannelPermission(ctx, perms, channel));
                return false;
            } else return true;
        });
    };

    static async hasBotPermsInChannel(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            let channel = (ctx.channel as TextChannel),
                bot = (ctx.guild?.members.get(ctx.bot.user.id) as Member),
                channelPerms = channel.permissionsOf(bot);
            if(!perms.every(perm => channelPerms.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingBotChannelPermission(ctx, perms, channel));
                return false;
            } else return true;
        });
    };

    static async hasAnyPermsInChannel(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            let channel = (ctx.channel as TextChannel),
                member = (ctx.member as Member),
                channelPerms = channel.permissionsOf(member);
            if(!perms.some(perm => channelPerms.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingChannelPermission(ctx, perms, channel));
                return false;
            } else return true;
        });
    };

    static async hasPermsInChannel(...perms: PermissionName[]) {
        return (async (ctx: Context) => {
            let channel = (ctx.channel as TextChannel),
                member = (ctx.member as Member),
                channelPerms = channel.permissionsOf(member);
            if(!perms.every(perm => channelPerms.has(perm))) {
                ctx.bot.emit('commandError', new Errors.MissingChannelPermission(ctx, perms, channel));
                return false;
            } else return true;
        });
    };

    static async onlyForIDs(snowflakes: string[]) {
        return (async (ctx: Context) => {
            if(!snowflakes.includes(ctx.author.id)) {
                ctx.bot.emit('commandError', new Errors.OnlyForIDs(ctx, snowflakes));
                return false;
            } else return true;
        })
    };
}