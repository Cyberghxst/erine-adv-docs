import { Erine, CommandObject, GroupObject, BaseParam, InitialInteractionContent, CommandInteraction, CreateMessageOptions, Guild, Member, Message, User, AnyTextChannelWithoutGroup } from '../main';

export class Context {
    public bot: Erine
    public data: CommandInteraction | Message
    public command: CommandObject | null
    public params: BaseParam[] | null
    public parent: GroupObject | null
    public args: string[] | null
    constructor(bot: Erine, data: CommandInteraction | Message) {
        this.bot = bot
        this.data = data
        this.args = this.data instanceof Message ? [] : null
        this.command = null
        this.params = this.data instanceof Message ? [] : null
        this.parent = null
    }
    /**
     * Points to the message
     * @returns The message executing this command (if any)
     */
    get message(): Message | null {
        return this.data instanceof Message ? this.data: null
    }
    /**
     * Points to the interaction
     * @returns The interaction executhing this command (if any)
     */
    get interaction(): CommandInteraction | null {
        return this.data instanceof Message ? null: this.data
    }
    /**
     * Points to the author (Erine.User) that used this command
     */
    get author(): User {
        return this.data instanceof Message ? this.data.author: this.data.user
    }
    /**
     * Points to the channel where this command was executed (if any)
     */
    get channel(): AnyTextChannelWithoutGroup | null {
        return this.data.channel || null
    }
    /**
     * Points to the member author (Erine.Member) that used this command
     */
    get member(): Member | null {
        return this.data.member || null
    }
    /**
     * Points to the guild where this command was executed (if any)
     */
    get guild(): Guild | null {
        return this.data.guild
    }
    /**
     * If a prefix command was used this is equivalent to 'AnyTextChannelWithoutGroup.createMessage()', otherwise 'CommandInteraction.createMessage()'
     * @param options The options to send the reply 
     * @returns The message object
     */
    async send(options: string | CreateMessageOptions | InitialInteractionContent): Promise<Message | null> {
        if(this.data instanceof Message) return await this.channel?.createMessage(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop) || null
        else {
            await this.data.createMessage(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop)
            return await this.data.getOriginal().catch(this.bot.core.noop)
        }
    }
    /**
     * If a prefix command was used this is equivalent to 'AnyTextChannelWithoutGroup.sendTyping()', otherwise 'CommandInteraction.defer()'
     * @param options The defer options
     */
    async defer(options?: { ephemeral?: boolean }) {
        if(this.data instanceof Message) await this.channel?.sendTyping().catch(this.bot.core.noop)
        else await this.data.defer(options?.ephemeral ? 64 : undefined).catch(this.bot.core.noop)
    }
    async followUp(options: string | CreateMessageOptions | InitialInteractionContent): Promise<Message | null> {
        if(this.data instanceof Message) return await this.channel?.createMessage(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop) || null
        else {
            await this.data.createFollowup(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop) || null
            return await this.data.getOriginal().catch(this.bot.core.noop)
        }
    }
    /**
     * Get a parameter value
     * @param param The parameter name, you have to use Param decorator before
     * @param defaultValue If there is not a value for that parameter this value will be returned
     * @returns The parameter value, an attachment, string, number, boolean, role, member, channel or null
     */
    get<T>(param: string, defaultValue: any = null): T | null {
        if(this.data instanceof Message) return this.params?.find(p => p.name.toLowerCase() === param.toLowerCase())?.value || defaultValue;
        else {
            return this.data['data'].options.getAttachment(param.toLowerCase()) ??
            this.data['data'].options.getMember(param.toLowerCase()) ??
            this.data['data'].options.getChannel(param.toLowerCase()) ??
            this.data['data'].options.getRole(param.toLowerCase()) ??
            this.data['data'].options.getNumber(param.toLowerCase()) ??
            this.data['data'].options.getBoolean(param.toLowerCase()) ??
            this.data['data'].options.getString(param.toLowerCase()) ??
            defaultValue;
        }
    }
}