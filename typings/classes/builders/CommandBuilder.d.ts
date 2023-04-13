export interface CommandDataBuilder {
    name: string
    aliases?: string[]
    description?: string
}

export declare class CommandBuilder {
    name: string;
    aliases: string[];
    description: string;
    as_prefix: boolean;
    as_slash: boolean;
    constructor(options?: CommandDataBuilder);
    setName(name: string): CommandBuilder;
    setDescription(description: string): CommandBuilder;
    setAliases(...aliases: string[]): CommandBuilder;
    allowPrefix(allow: boolean): CommandBuilder;
    allowSlash(allow: boolean): CommandBuilder;
}
