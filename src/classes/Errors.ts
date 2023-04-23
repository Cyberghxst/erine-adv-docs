import { BaseParam, ChannelParam, Context, Channel, ChannelTypes, PermissionName } from '../main';

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

class InvalidParamNumber {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class InvalidParamBoolean {
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
    public provided: ChannelTypes
    public expected: ChannelTypes[]
    constructor(context: Context, param: ChannelParam, provided: ChannelTypes, expected: ChannelTypes[]) {
        this.ctx = context
        this.param = param
        this.provided = provided
        this.expected = expected
    }
}

class InvalidParamAttachment {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        this.ctx = context
        this.param = param
    }
}

class MissingPermission {
    public ctx: Context
    public permissions: PermissionName
    constructor(context: Context, perm: PermissionName) {
        this.ctx = context
        this.permissions = perm
    }
}

class MissingChannelPermission {
    public ctx: Context
    public permissions: PermissionName
    public channel: Channel
    constructor(context: Context, perm: PermissionName, channel: Channel) {
        this.ctx = context
        this.permissions = perm
        this.channel = channel
    }
}

class MissingBotPermission {
    public ctx: Context
    public permissions: PermissionName
    constructor(context: Context, perm: PermissionName) {
        this.ctx = context
        this.permissions = perm
    }
}

class MissingBotChannelPermission {
    public ctx: Context
    public permissions: PermissionName
    public channel: Channel
    constructor(context: Context, perm: PermissionName, channel: Channel) {
        this.ctx = context
        this.permissions = perm
        this.channel = channel
    }
}

class NotNSFW {
    public ctx: Context
    constructor(context: Context) {
        this.ctx = context
    }
}

class NotInChannelType {
    public ctx: Context
    public types: ChannelTypes[]
    public channel: Channel
    constructor(ctx: Context, types: ChannelTypes[], channel: Channel) {
        this.ctx = ctx
        this.types = types
        this.channel = channel
    }
}

class OnlyForIDs {
    public ctx: Context
    public snowflakes: string[]
    constructor(context: Context, snowflakes: string[]) {
        this.ctx = context
        this.snowflakes = snowflakes
    }
}

class CommandInCooldown {
    public ctx: Context
    public timeLeft: number
    constructor(context: Context, timeLeft: number) {
        this.ctx = context
        this.timeLeft = timeLeft
    }
}

class InvalidParam {
    public ctx: Context
    public metadata: Record<string, any>
    constructor(context: Context, metadata: Record<string, any>) {
        this.ctx = context
        this.metadata = metadata
    }
}

export {
    InvalidParam,
    GuildOnly,
    NotOwner,
    CommandNotFound,
    UnknownCommandError,
    MissingRequiredParam,
    InvalidParamNumber,
    InvalidParamChoice,
    MissingPermission,
    MissingChannelPermission,
    MissingBotPermission,
    MissingBotChannelPermission,
    InvalidParamBoolean,
    InvalidParamMember,
    InvalidParamChannel,
    InvalidParamRole,
    InvalidChannelType,
    InvalidParamAttachment,
    NotNSFW,
    NotInChannelType,
    OnlyForIDs,
    CommandInCooldown
}