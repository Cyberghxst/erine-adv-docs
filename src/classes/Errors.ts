import { BaseParam } from "@types";
import { ChannelType, PermissionResolvable } from "discord.js";
import { Context } from "../classes/Context";
import { ChannelParam } from "./builders/ParamsBuilder";

class GuildOnly {
    public ctx: Context
    constructor(context: Context) {
        this.ctx = context
    }
    get user() {
        return this.ctx.author
    }
}

class NotOwner {
    public ctx: Context
    constructor(context: Context) {
        this.ctx = context
    }
    get user() {
        return this.ctx.author
    }
}

class CommandNotFound {
    public ctx: Context
    public provided: string
    constructor(context: Context, provided: string) {
        this.ctx = context
        this.provided = provided
    }
}

class UnknownCommandError {
    public ctx: Context
    public error: any
    constructor(context: Context, error: any) {
        this.ctx = context
        this.error = error
    }
}

class MissingRequiredParam {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class NotParamNumber {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class NotParamBoolean {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class InvalidParamChoice {
    public ctx: Context
    public param: BaseParam
    public choices: { name: string, value: any }[]
    constructor(context: Context, param: BaseParam, choices: { name: string, value: any }[]) {
        this.ctx = context
        this.param = param
        this.choices = choices
    }
}

class InvalidParamMember {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class InvalidParamChannel {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class InvalidParamRole {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class InvalidChannelType {
    public ctx: Context
    public param: ChannelParam
    public provided: ChannelType
    public expected: ChannelType[]
    constructor(context: Context, param: ChannelParam, provided: ChannelType, expected: ChannelType[]) {
        this.ctx = context
        this.param = param
        this.provided = provided
        this.expected = expected
    }
}

class MissingPermission {
    public ctx: Context
    public permission: PermissionResolvable
    constructor(context: Context, perm: PermissionResolvable) {
        this.ctx = context
        this.permission = perm
    }
}

export {
    GuildOnly,
    NotOwner,
    CommandNotFound,
    UnknownCommandError,
    MissingRequiredParam,
    NotParamNumber,
    InvalidParamChoice,
    MissingPermission,
    NotParamBoolean,
    InvalidParamMember,
    InvalidParamChannel,
    InvalidParamRole,
    InvalidChannelType
}