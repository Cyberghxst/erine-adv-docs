import { Maker, Context } from "../../main";
declare class User extends Maker {
    hello(ctx: Context): Promise<void>;
    av(ctx: Context): Promise<void>;
    info(ctx: Context): Promise<void>;
}
export declare const data: typeof User;
export {};
