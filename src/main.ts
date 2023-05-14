import { ApplicationCommandTypes, ClientEvents } from 'oceanic.js';
import * as Collectors from 'oceanic-collectors'
import * as Builders from '@oceanicjs/builders'
import { Erine } from './classes/Bot';
import { Command } from './decorators/CommandMacro';
import { Group } from './decorators/GroupMacro';
import { Dispatch } from './decorators/InteractionMacro';
import { ContextMenu } from './decorators/ContextMenuMacro';
import { Event } from './decorators/EventMacro';
import { Core } from './classes/Core';
import { Context } from './classes/Context';
import { Fold } from './classes/Fold';
import { Maker } from './classes/Maker'
import { BaseParam, StringParam, NumberParam, ChannelParam, TypeOfParam, Param, ParamType } from './decorators/ParamsMacro'
import * as Errors from './classes/Errors';
import * as Plugins from './decorators/PluginsMacro';

export type AnyError = Errors.InvalidParam | Errors.GuildOnly | Errors.NotOwner | Errors.CommandNotFound | Errors.UnknownCommandError | Errors.MissingRequiredParam | Errors.InvalidParamNumber | Errors.InvalidParamChoice | Errors.MissingPermission | Errors.MissingChannelPermission | Errors.MissingBotPermission | Errors.MissingBotChannelPermission | Errors.InvalidParamBoolean | Errors.InvalidParamMember | Errors.InvalidParamChannel | Errors.InvalidParamRole | Errors.InvalidChannelType | Errors.InvalidParamAttachment | Errors.NotNSFW | Errors.NotInChannelType | Errors.OnlyForIDs | Errors.CommandInCooldown;

export interface Events extends ClientEvents {
    commandError: [error: AnyError]
}

export interface GroupObject {
    name: string
    description?: string
    usage?: string
    aliases?: string[]
    fallback?: boolean
}

export interface CommandObject {
    name: string
    description: string
    group?: GroupObject
    aliases: string[]
    plugins: Plugin[]
    params: TypeOfParam<ParamType>[]
    allowed: string[]
    key: string
    maker: any
}

export interface InteractionObject {
    id: string
    maker: any
}

export interface ContextMenuObject {
    name: string
    type: ApplicationCommandTypes
    maker: any
}

export enum Bucket {
    Member = "MEMBER",
    User = "USER",
    Guild = "GUILD",
    Channel = "CHANNEL"
}

export type AsyncFunction<S, T> = (args: S) => Promise<T>
export type SyncFunction<S, T> = (args: S) => T
export type Plugin = AsyncFunction<Context, boolean> | SyncFunction<Context, boolean> | Promise<(ctx: Context) => Promise<boolean>>

export * from 'oceanic.js';
export { Builders, Collectors, Maker, BaseParam, ChannelParam, NumberParam, StringParam, Erine, Fold, Command, Dispatch, ContextMenu, Event, Core, Group, Context, Errors, Plugins, Param, TypeOfParam, ParamType }
export default { Builders, Collectors, Erine, Fold, Command, Dispatch, ContextMenu, Event, Core, Group, Context, Errors, Plugins, Maker }