import { BaseParam, ChannelParam, Context, Channel, ChannelTypes, PermissionName } from '../main';

class GuildOnly extends Error {
    public ctx: Context
    constructor(context: Context) {
        super("This command is only available in guilds.")
        this.ctx = context
    }
    get user() {
        return this.ctx.author
    }
}

class NotOwner extends Error {
    public ctx: Context
    constructor(context: Context) {
        super("Someone that is not register as owner tried to use this command.")
        this.ctx = context
    }
    get user() {
        return this.ctx.author
    }
}

class CommandNotFound extends Error {
    public ctx: Context
    public provided: string
    constructor(context: Context, provided: string) {
        super("That command doesn't exist.")
        this.ctx = context
        this.provided = provided
    }
}

class UnknownCommandError extends Error {
    public ctx: Context
    public error: any
    constructor(context: Context, error: any) {
        super()
        this.ctx = context
        this.error = error
    }
}

class MissingRequiredParam extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("You have to provide all required parameters.")
        this.ctx = context
        this.param = param
    }
}

class InvalidParamNumber extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't a valid number.")
        this.ctx = context
        this.param = param
    }
}

class InvalidParamBoolean extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't boolean.")
        this.ctx = context
        this.param = param
    }
}

class InvalidParamChoice extends Error {
    public ctx: Context
    public param: BaseParam
    public choices: { name: string, value: any }[]
    constructor(context: Context, param: BaseParam, choices: { name: string, value: any }[]) {
        super("Some parameter in that command isn't a valid choice.")
        this.ctx = context
        this.param = param
        this.choices = choices
    }
}

class InvalidParamMember extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't a valid member.")
        this.ctx = context
        this.param = param
    }
}

class InvalidParamChannel extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't a valid channel.")
        this.ctx = context
        this.param = param
    }
}

class InvalidParamRole extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't a valid role.")
        this.ctx = context
        this.param = param
    }
}

class InvalidChannelType extends Error {
    public ctx: Context
    public param: ChannelParam
    public provided: ChannelTypes
    public expected: ChannelTypes[]
    constructor(context: Context, param: ChannelParam, provided: ChannelTypes, expected: ChannelTypes[]) {
        super("Some parameter in that command isn't a valid channel type allowed.")
        this.ctx = context
        this.param = param
        this.provided = provided
        this.expected = expected
    }
}

class InvalidParamAttachment extends Error {
    public ctx: Context
    public param: BaseParam
    constructor(context: Context, param: BaseParam) {
        super("Some parameter in that command isn't a valid attachment.")
        this.ctx = context
        this.param = param
    }
}

class MissingPermission extends Error {
    public ctx: Context
    public permissions: PermissionName[]
    constructor(context: Context, perms: PermissionName[]) {
        super("The command author doesn't have permissions enough to execute this command.")
        this.ctx = context
        this.permissions = perms
    }
}

class MissingChannelPermission extends Error {
    public ctx: Context
    public permissions: PermissionName
    public channel: Channel
    constructor(context: Context, perm: PermissionName, channel: Channel) {
        super("The command author doesn't have permissions enough in a channel to execute this command.")
        this.ctx = context
        this.permissions = perm
        this.channel = channel
    }
}

class MissingBotPermission extends Error {
    public ctx: Context
    public permissions: PermissionName[]
    constructor(context: Context, perms: PermissionName[]) {
        super("I don't have permissions enough to execute this command.")
        this.ctx = context
        this.permissions = perms
    }
}

class MissingBotChannelPermission extends Error {
    public ctx: Context
    public permissions: PermissionName
    public channel: Channel
    constructor(context: Context, perm: PermissionName, channel: Channel) {
        super("I don't have permissions enough in that channel to execute this command.")
        this.ctx = context
        this.permissions = perm
        this.channel = channel
    }
}

class NotNSFW extends Error {
    public ctx: Context
    constructor(context: Context) {
        super("This command can only be executed in a NSFW channel.")
        this.ctx = context
    }
}

class NotInChannelType extends Error {
    public ctx: Context
    public types: ChannelTypes[]
    public channel: Channel
    constructor(ctx: Context, types: ChannelTypes[], channel: Channel) {
        super("This command can only be executed in certain channel types.")
        this.ctx = ctx
        this.types = types
        this.channel = channel
    }
}

class OnlyForIDs extends Error {
    public ctx: Context
    public snowflakes: string[]
    constructor(context: Context, snowflakes: string[]) {
        super("This command can only be used by specified users.")
        this.ctx = context
        this.snowflakes = snowflakes
    }
}

class CommandInCooldown extends Error {
    public ctx: Context
    public timeLeft: number
    constructor(context: Context, timeLeft: number) {
        super("This command is in cooldown.")
        this.ctx = context
        this.timeLeft = timeLeft
    }
}

class InvalidParam extends Error {
    public ctx: Context
    public metadata: Record<string, any>
    constructor(context: Context, metadata: Record<string, any>) {
        super("Some parameter is invalid in arguments provided.")
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