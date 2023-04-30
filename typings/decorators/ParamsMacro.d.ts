import { ApplicationCommandOptionTypes as T, ChannelTypes } from "oceanic.js";
export declare enum ParamType {
    String = 3,
    Number = 10,
    Member = 6,
    User = 20,
    Channel = 7,
    Boolean = 5,
    Attachment = 11,
    Role = 8
}
export interface BaseParam {
    name: string;
    description: string;
    required: boolean;
    type?: T | 20;
    value?: any;
    ellipsis?: boolean;
}
export interface StringParam extends BaseParam {
    choices?: {
        name: string;
        value: string;
    }[];
    max_length?: number;
    min_length?: number;
}
export interface NumberParam extends BaseParam {
    max_value?: number;
    min_value?: number;
    choices?: {
        name: string;
        value: string;
    }[];
}
export interface ChannelParam extends BaseParam {
    channel_types?: ChannelTypes[];
}
export interface ParamOptions {
    3: StringParam;
    10: NumberParam;
    6: BaseParam;
    20: BaseParam;
    7: ChannelParam;
    5: BaseParam;
    11: BaseParam;
    8: BaseParam;
}
export declare type TypeOfParam<T extends keyof ParamOptions> = ParamOptions[T];
export declare function Param<T extends keyof ParamOptions>(bucket: T, ops: ParamOptions[T]): (target: any, key: string, descriptor: PropertyDescriptor) => void;
