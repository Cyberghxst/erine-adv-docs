import { BaseParam, Command, Types } from "@types";
import { CommandInteraction, Message, User, TextBasedChannel, GuildMember, APIInteractionGuildMember, Guild, MessagePayload, MessageCreateOptions, InteractionReplyOptions, InteractionResponse, ClientUser } from "discord.js";
import { ErineClient } from "./Base";

class Context {
    private data: CommandInteraction | Message
    public args: string[] | null
    public bot: ErineClient
    public params: BaseParam[] | null
    public parent: Command<Types.HybridGroup> | null
    constructor(data: CommandInteraction | Message, bot: ErineClient) {
        this.data = data
        this.bot = bot
        this.args = this.data instanceof Message ? []: null
        this.params = this.data instanceof Message ? []: null
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
    get channel(): TextBasedChannel | null {
        return this.data.channel
    }
    get member(): GuildMember | APIInteractionGuildMember | null {
        return this.data.member
    }
    get guild(): Guild | null {
        return this.data.guild
    }

    async send(options: string | MessagePayload | MessageCreateOptions | InteractionReplyOptions): Promise<Message | null> {
        if(this.data instanceof Message) {
            // @ts-ignore
            return (await this.data.channel?.send(options).catch(e=>null))
        } else {
            // @ts-ignore
            return (await this.data.reply(options).catch(e=>null))
        }
    }

    async defer(options?: { ephemeral?: boolean }): Promise<void | InteractionResponse> {
        if(this.data instanceof Message) return this.data.channel.sendTyping()
        else return this.data.deferReply({ ephemeral: !!options?.ephemeral })
    }

    get<T>(param: string, defaultValue: any = null): T {
        // @ts-ignore
        if(this.data instanceof Message) return this.params?.find(p => p.name.toLowerCase() === param.toLowerCase())?.value || defaultValue
        else return this.data.options.get(param)?.value || defaultValue
    }
}

export { Context }