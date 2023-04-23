import { ApplicationCommandOptionTypes, ChannelTypes } from '../../main';

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
        param.type = ApplicationCommandOptionTypes.STRING
        this.params.push(param)
        return this
    }
    addNumber(param: NumberParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.NUMBER
        this.params.push(param)
        return this
    }
    addBoolean(param: BaseParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.BOOLEAN
        this.params.push(param)
        return this
    }
    addMember(param: BaseParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.USER
        this.params.push(param)
        return this
    }
    addChannel(param: ChannelParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.CHANNEL
        this.params.push(param)
        return this
    }
    addRole(param: BaseParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.ROLE
        this.params.push(param)
        return this
    }
    addAttachment(param: BaseParam): ParamsBuilder {
        param.type = ApplicationCommandOptionTypes.ATTACHMENT
        this.params.push(param)
        return this
    }
}

export interface BaseParam {
    name: string
    description: string
    required: boolean
    type?: ApplicationCommandOptionTypes
    value?: any
    long?: boolean
}
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

export interface ChannelParam extends BaseParam {
    channel_types?: ChannelTypes[]
}