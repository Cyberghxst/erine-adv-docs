import { Context, ChannelTypes } from '../main';
export declare class Plugins {
    static isGuild(ctx: Context): Promise<boolean>;
    static isInChannelType(...types: ChannelTypes[]): Promise<(ctx: Context) => Promise<boolean>>;
    static isOwner(ctx: Context): Promise<boolean>;
}
