import { BaseParam, ChannelParam, Context, Channel, ChannelTypes, PermissionName } from '../main';
declare class GuildOnly {
    ctx: Context;
    constructor(context: Context);
    get user(): import("oceanic.js/dist/lib/structures/User").default;
}
declare class NotOwner {
    ctx: Context;
    constructor(context: Context);
    get user(): import("oceanic.js/dist/lib/structures/User").default;
}
declare class CommandNotFound {
    ctx: Context;
    provided: string;
    constructor(context: Context, provided: string);
}
declare class UnknownCommandError {
    ctx: Context;
    error: any;
    constructor(context: Context, error: any);
}
declare class MissingRequiredParam {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidParamNumber {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidParamBoolean {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidParamChoice {
    ctx: Context;
    param: BaseParam;
    choices: {
        name: string;
        value: any;
    }[];
    constructor(context: Context, param: BaseParam, choices: {
        name: string;
        value: any;
    }[]);
}
declare class InvalidParamMember {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidParamChannel {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidParamRole {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class InvalidChannelType {
    ctx: Context;
    param: ChannelParam;
    provided: ChannelTypes;
    expected: ChannelTypes[];
    constructor(context: Context, param: ChannelParam, provided: ChannelTypes, expected: ChannelTypes[]);
}
declare class InvalidParamAttachment {
    ctx: Context;
    param: BaseParam;
    constructor(context: Context, param: BaseParam);
}
declare class MissingPermission {
    ctx: Context;
    permissions: PermissionName;
    constructor(context: Context, perm: PermissionName);
}
declare class MissingChannelPermission {
    ctx: Context;
    permissions: PermissionName;
    channel: Channel;
    constructor(context: Context, perm: PermissionName, channel: Channel);
}
declare class MissingBotPermission {
    ctx: Context;
    permissions: PermissionName;
    constructor(context: Context, perm: PermissionName);
}
declare class MissingBotChannelPermission {
    ctx: Context;
    permissions: PermissionName;
    channel: Channel;
    constructor(context: Context, perm: PermissionName, channel: Channel);
}
declare class NotNSFW {
    ctx: Context;
    constructor(context: Context);
}
declare class NotInChannelType {
    ctx: Context;
    types: ChannelTypes[];
    channel: Channel;
    constructor(ctx: Context, types: ChannelTypes[], channel: Channel);
}
declare class OnlyForIDs {
    ctx: Context;
    snowflakes: string[];
    constructor(context: Context, snowflakes: string[]);
}
declare class CommandInCooldown {
    ctx: Context;
    timeLeft: number;
    constructor(context: Context, timeLeft: number);
}
declare class InvalidParam {
    ctx: Context;
    metadata: Record<string, any>;
    constructor(context: Context, metadata: Record<string, any>);
}
export { InvalidParam, GuildOnly, NotOwner, CommandNotFound, UnknownCommandError, MissingRequiredParam, InvalidParamNumber, InvalidParamChoice, MissingPermission, MissingChannelPermission, MissingBotPermission, MissingBotChannelPermission, InvalidParamBoolean, InvalidParamMember, InvalidParamChannel, InvalidParamRole, InvalidChannelType, InvalidParamAttachment, NotNSFW, NotInChannelType, OnlyForIDs, CommandInCooldown };
