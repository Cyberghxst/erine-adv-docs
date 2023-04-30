import { Erine, BaseParam, Context, AnyChannel, Guild, Role } from "../main";
export declare class Core {
    readonly bot: Erine;
    constructor(bot: Erine);
    isClass(fn: any): boolean;
    getClassOf(fn: any): any;
    noop(): null;
    getMember(query: string, options: {
        guild: Guild;
        force?: boolean;
    }): Promise<import("oceanic.js/dist/lib/structures/Member").default | null>;
    getChannel(query: string, options: {
        guild: Guild;
        force?: boolean;
    }): Promise<AnyChannel | null>;
    getRole(query: string, options: {
        guild: Guild;
        force?: boolean;
    }): Promise<Role | null>;
    transform(input: string, param: BaseParam, ctx: Context, seeable?: boolean): Promise<{
        break: boolean;
        value: null;
    } | {
        break: boolean;
        value: string;
    } | {
        break: boolean;
        value: number;
    } | {
        break: boolean;
        value: boolean;
    } | {
        break: boolean;
        value: import("oceanic.js/dist/lib/structures/Member").default;
    } | {
        break: boolean;
        value: AnyChannel;
    } | {
        break: boolean;
        value: Role;
    } | {
        break: boolean;
        value: import("oceanic.js/dist/lib/structures/Attachment").default | undefined;
    }>;
}
