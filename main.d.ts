import { Awaitable, BitFieldResolvable, ClientOptions, Snowflake, Client, ClientEvents, Message, User, TextChannel, GuildMember, Guild, CommandInteraction, Collection, SlashCommandBuilder } from "discord.js";
import { PrefixBuilder } from "src/classes/PrefixBuilder";
import { Context } from "src/classes/Context";

export class ErineClient extends Client {
    constructor(options: ErineOptions)
}

interface ErineEvents extends ClientEvents {
    contextError: [ctx: any]
}

export interface ErineOptions extends ClientOptions {
    prefix: string | Awaitable<string>
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

export interface Event<T> {
    name: keyof ErineEvents
    code: (nature: T) => Promise<void>
}

export interface CommandStructures {
    PrefixType: {
        data: PrefixBuilder
        type: 'PREFIX' | 'HYBRID' | 'SLASH'
        code: (ctx: Context) => Promise<void>
    }
    HybridType: {
        data: PrefixBuilder | SlashCommandBuilder
        type: 'PREFIX' | 'HYBRID' | 'SLASH'
        code: (ctx: Context) => Promise<void>
    }
    SlashType: {
        data: SlashCommandBuilder
        type: 'PREFIX' | 'HYBRID' | 'SLASH'
        code: (ctx: Context) => Promise<void>
    }
}

export enum Types {
    Prefix = 'PrefixType',
    Hybrid = 'HybridType',
    Slash = 'SlashType'
}

export type Command<K extends keyof CommandStructures = 'PrefixType'> = CommandStructures[K]