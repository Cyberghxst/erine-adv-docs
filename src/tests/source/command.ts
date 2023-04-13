import { Erine, Command, CommandOptions } from "main";

export const data = class Ping extends Command {
    constructor(bot: Erine, options: CommandOptions) {
        super(bot, options);
    }
    async code(ctx: any): Promise<void> {
        console.log(ctx);
    }
}