import { CommandInteraction, Message, User, TextBasedChannel, GuildMember, APIInteractionGuildMember, Guild, MessagePayload, MessageCreateOptions, InteractionReplyOptions, InteractionResponse, ClientUser } from "discord.js";

class Context {
    private data: CommandInteraction | Message
    public type: "PREFIX" | "HYBRID" | "SLASH"
    constructor(data: CommandInteraction | Message, type: "PREFIX" | "HYBRID" | "SLASH" = "PREFIX") {
        this.data = data
        this.type = type
    }
    get message(): Message | null {
        return this.data instanceof Message ? this.data: null
    }
    get interaction(): CommandInteraction | null {
        return this.data instanceof CommandInteraction ? this.data: null
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
        return this.guild
    }

    get bot(): ClientUser {
        return this.bot
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
}

export { Context }