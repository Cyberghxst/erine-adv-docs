import { Context, Maker, Message, CommandObject } from "../main";
declare class MessageHandler extends Maker {
    messageCreate(message: Message): Promise<boolean | undefined>;
    runCommand(ctx: Context, command: CommandObject, args: string[]): Promise<boolean | undefined>;
    splitArgs(text: string): string[];
}
export declare const data: typeof MessageHandler;
export {};
