import { Awaitable, BitFieldResolvable, ClientOptions, Snowflake, Client, ClientEvents, Message, User, TextChannel, GuildMember, Guild, CommandInteraction, Collection, SlashCommandBuilder } from "discord.js";
import { PrefixBuilder } from "src/classes/PrefixBuilder";
import { HybridBuilder } from "src/classes/HybridBuilder";
import { Context } from "src/classes/Context";
import { on } from "events";
import { ParamsBuilder } from "src/classes/ParamsBuilder";

export class ErineClient extends Client {
    constructor(options: ErineOptions)
    public on<K extends keyof ErineEvents>(event: K, listener: (...args: ErineEvents[K]) => Awaitable<void>): this;
    public on<S extends string | symbol>(event: Exclude<S, keyof ErineEvents>, listener: (...args: any[]) => Awaitable<void>): this;
}

interface ErineEvents extends ClientEvents {
    contextError: [ctx: Context]
}

export interface ErineOptions extends ClientOptions {
    prefix: string | CallableFunction
    guildOnly?: boolean
    owners?: Snowflake[]
}

export interface SkyfoldManagerOptions {
    client: ErienClient
}

export interface ErineCollected {
    PrefixType: Collection<string, Command> | null
    HybridType: Collection<string, Command<'HybridType'>> | null
    SlashType: Collection<string, Command<'SlashType'>> | null
}

export interface Event {
    name: keyof ErineEvents
    code: (...args) => Promise<any>
}

export type Plugin = AsyncFunction<Context, boolean> | SyncFunction<Context, boolean> | Promise<(ctx: Context) => Promise<boolean>>

export interface CommandStructures {
    PrefixType: {
        data: PrefixBuilder
        params?: ParamsBuilder
        plugins?: Plugin[]
        code: (ctx: Context) => Promise<void>
    }
    HybridType: {
        data: HybridBuilder
        params?: ParamsBuilder
        plugins?: Plugin[]
        code: (ctx: Context) => Promise<void>
    }
    SlashType: {
        data: SlashCommandBuilder
        params?: ParamsBuilder
        code: (ctx: Context) => Promise<void>
    }
}

export enum Types {
    Prefix = 'PrefixType',
    Hybrid = 'HybridType',
    Slash = 'SlashType'
}

export interface BaseParam {
    name: string
    description: string
    required: boolean
    type?: ApplicationCommandOptionType
    value?: any
    long?: boolean
}

export type AsyncFunction<S, T> = (args: S) => Promise<T>
export type SyncFunction<S, T> = (args: S) => T

declare global {
    interface ClientEvents {
        contextError: [ctx: any]
    }
}

export type Command<K extends keyof CommandStructures = 'PrefixType'> = CommandStructures[K]