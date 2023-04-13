import { ClientEvents } from 'oceanic.js';
import { Erine } from './classes/Bot';
import { CommandBuilder } from './classes/builders/CommandBuilder';
import { ParamsBuilder } from './classes/builders/ParamsBuilder';
import { GroupBuilder } from './classes/builders/GroupBuilder';
import { Command, CommandOptions } from './classes/Command';
import { Group } from './classes/Group';
import { Event } from './classes/Event';
import { Core } from './classes/Core';
import { Context } from './classes/Context';
import { Fold } from './classes/Fold';
import { BaseParam, StringParam, NumberParam, ChannelParam } from './classes/builders/ParamsBuilder';
import * as Errors from './classes/Errors';

export interface Events extends ClientEvents {
    commandError: [error: any]
}

export type AsyncFunction<S, T> = (args: S) => Promise<T>
export type SyncFunction<S, T> = (args: S) => T
export type Plugin = AsyncFunction<Context, boolean> | SyncFunction<Context, boolean> | Promise<(ctx: Context) => Promise<boolean>>

export { BaseParam, ChannelParam, NumberParam, StringParam, CommandBuilder, Erine, Fold, GroupBuilder, ParamsBuilder, Command, Event, CommandOptions, Core, Group, Context, Errors }
export default { CommandBuilder, Erine, Fold, GroupBuilder, ParamsBuilder, Command, Event, Core, Group, Context, Errors }