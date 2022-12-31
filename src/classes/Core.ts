import { BaseParam, ErineClient } from "@types";
import { ApplicationCommandOptionType } from "discord.js";
import { Context } from "./Context";
import * as Errors from "./Errors"

class Coreback {
    client: ErineClient
    constructor(client: ErineClient) {
        if(!client) throw new SyntaxError('Missing client')
        this.client = client
    }
    isType<T, R>(obj: any, func: (obj: R) => boolean): obj is T {
        return func(obj)
    }
    convertParamType(input: string, param: BaseParam, ctx: Context) {
        if(param.type === ApplicationCommandOptionType.String) return { break: false, value: input }
        else if(param.type === ApplicationCommandOptionType.Number) {
            let n = Number(input)
            if(isNaN(n)) { ctx.bot.emit('contextError', new Errors.NotParamNumber(ctx, param)); return { break: true, value: null } }
            else return { break: false, value: Number(input) }
        }
    }
}

export { Coreback }