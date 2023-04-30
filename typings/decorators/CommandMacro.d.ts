export interface CommandOptions {
    name?: string;
    description?: string;
    aliases?: string[];
    usage?: string;
    prefix?: boolean;
    slash?: boolean;
}
export declare function Command(options: CommandOptions): (target: any, key: string, descriptor: PropertyDescriptor) => void;
