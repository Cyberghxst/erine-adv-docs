import { Erine, CommandObject } from "../main";
export declare class Maker {
    bot: Erine;
    commands: CommandObject[];
    constructor(bot: Erine);
    __start__(): this;
    __getCommands__(): CommandObject[];
}
