import { ApplicationCommandOptionType } from "discord.js";
import { BaseParam } from "@types";

export interface StringParam extends BaseParam {
    choices?: { name: string, value: string }[]
    max_length?: number
    min_length?: number
}

export interface NumberParam extends BaseParam {
    max_value?: number
    min_value?: number
    choices?: { name: string, value: string }[]
}

export class ParamsBuilder {
    strings: StringParam[]
    numbers: NumberParam[]
    params: BaseParam[]
    constructor() {
        this.strings = []
        this.numbers = []
        this.params = []
    }
    addString(param: StringParam): ParamsBuilder {
        param.type = ApplicationCommandOptionType.String
        this.params.push(param)
        return this
    }
    addNumber(param: NumberParam): ParamsBuilder {
        param.type = ApplicationCommandOptionType.Number
        this.params.push(param)
        return this
    }
    addBoolean(param: BaseParam): ParamsBuilder {
        param.type = ApplicationCommandOptionType.Boolean
        this.params.push(param)
        return this
    }
}