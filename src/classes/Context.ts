import type { Erine, Command, Group } from '../main';
import { InitialInteractionContent, CommandInteraction, CreateMessageOptions, Guild, Member, Message, User, AnyTextChannelWithoutGroup } from 'oceanic.js';

export class Context {
    public bot: Erine
    public data: CommandInteraction | Message
    public command: Command | null
    public parent: Group | null
    public args: string[] | null
    constructor(bot: Erine, data: CommandInteraction | Message) {
        this.bot = bot
        this.data = data
        this.args = this.data instanceof Message ? []: null
        this.command = null
        this.parent = null
    }
    get message(): Message | null {
        return this.data instanceof Message ? this.data: null
    }
    get interaction(): CommandInteraction | null {
        return this.data instanceof Message ? null: this.data
    }
    get author(): User {
        return this.data instanceof Message ? this.data.author: this.data.user
    }
    get channel(): AnyTextChannelWithoutGroup | null {
        return this.data.channel || null
    }
    get member(): Member | null {
        return this.data.member || null
    }
    get guild(): Guild | null {
        return this.data.guild
    }
    async send(options: string | CreateMessageOptions | InitialInteractionContent): Promise<Message | null> {
        if(this.data instanceof Message) return await this.channel?.createMessage(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop) || null
        else {
            await this.data.createMessage(typeof options == "string" ? { content: options } : options).catch(this.bot.core.noop)
            return await this.data.getOriginal().catch(this.bot.core.noop)
        }
    }
    async defer(options?: { ephemeral?: boolean }) {
        if(this.data instanceof Message) await this.channel?.sendTyping().catch(this.bot.core.noop)
        else await this.data.defer(options?.ephemeral ? 64 : undefined).catch(this.bot.core.noop)
    }
}