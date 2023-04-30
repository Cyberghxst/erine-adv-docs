import { ClientEvents } from 'oceanic.js';
import { Erine } from './classes/Bot';
import { Command } from './decorators/CommandMacro';
import { Group } from './decorators/GroupMacro';
import { Event } from './decorators/EventMacro';
import { Core } from './classes/Core';
import { Context } from './classes/Context';
import { Fold } from './classes/Fold';
import { Maker } from './classes/Maker';
import { BaseParam, StringParam, NumberParam, ChannelParam, TypeOfParam, Param, ParamType } from './decorators/ParamsMacro';
import * as Errors from './classes/Errors';
import * as Plugins from './decorators/PluginsMacro';
export declare type AnyError = Errors.InvalidParam | Errors.GuildOnly | Errors.NotOwner | Errors.CommandNotFound | Errors.UnknownCommandError | Errors.MissingRequiredParam | Errors.InvalidParamNumber | Errors.InvalidParamChoice | Errors.MissingPermission | Errors.MissingChannelPermission | Errors.MissingBotPermission | Errors.MissingBotChannelPermission | Errors.InvalidParamBoolean | Errors.InvalidParamMember | Errors.InvalidParamChannel | Errors.InvalidParamRole | Errors.InvalidChannelType | Errors.InvalidParamAttachment | Errors.NotNSFW | Errors.NotInChannelType | Errors.OnlyForIDs | Errors.CommandInCooldown;
export interface Events extends ClientEvents {
    commandError: [error: AnyError];
}
export interface GroupObject {
    name: string;
    description?: string;
    usage?: string;
    fallback?: boolean;
}
export interface CommandObject {
    name: string;
    description: string;
    group?: GroupObject;
    aliases: string[];
    plugins: Plugin[];
    params: TypeOfParam<ParamType>[];
    allowed: string[];
    key: string;
    maker: any;
}
export declare enum Bucket {
    Member = "MEMBER",
    User = "USER",
    Guild = "GUILD",
    Channel = "CHANNEL"
}
export declare type AsyncFunction<S, T> = (args: S) => Promise<T>;
export declare type SyncFunction<S, T> = (args: S) => T;
export declare type Plugin = AsyncFunction<Context, boolean> | SyncFunction<Context, boolean> | Promise<(ctx: Context) => Promise<boolean>>;
export * from 'oceanic.js';
export { BaseParam, ChannelParam, NumberParam, StringParam, Erine, Fold, Command, Event, Core, Group, Context, Errors, Plugins, Param, TypeOfParam, ParamType, Maker };
declare const _default: {
    Erine: typeof Erine;
    Fold: typeof Fold;
    Command: typeof Command;
    Event: typeof Event;
    Core: typeof Core;
    Group: typeof Group;
    Context: typeof Context;
    Errors: typeof Errors;
    Plugins: typeof Plugins;
    Maker: typeof Maker;
};
export default _default;
