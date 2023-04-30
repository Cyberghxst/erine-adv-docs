import { ChannelTypes } from '../main';
export declare function isGuild(target: any, key: string, descriptor: PropertyDescriptor): void;
export declare function isInChannelType(...types: ChannelTypes[]): (target: any, key: string, descriptor: PropertyDescriptor) => void;
export declare function isOwner(target: any, key: string, descriptor: PropertyDescriptor): void;
