import { Maker, Context, Erine } from "../../main";
declare class Ping extends Maker {
    constructor(bot: Erine);
    ping(ctx: Context): Promise<void>;
}
export declare const data: typeof Ping;
export {};
