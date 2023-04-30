import { Erine, CommandObject, GroupObject, BaseParam, InitialInteractionContent, CommandInteraction, CreateMessageOptions, Guild, Member, Message, User, AnyTextChannelWithoutGroup } from '../main';
export declare class Context {
    bot: Erine;
    data: CommandInteraction | Message;
    command: CommandObject | null;
    params: BaseParam[] | null;
    parent: GroupObject | null;
    args: string[] | null;
    constructor(bot: Erine, data: CommandInteraction | Message);
    get message(): Message | null;
    get interaction(): CommandInteraction | null;
    get author(): User;
    get channel(): AnyTextChannelWithoutGroup | null;
    get member(): Member | null;
    get guild(): Guild | null;
    send(options: string | CreateMessageOptions | InitialInteractionContent): Promise<Message | null>;
    defer(options?: {
        ephemeral?: boolean;
    }): Promise<void>;
    followUp(options: string | CreateMessageOptions | InitialInteractionContent): Promise<Message | null>;
    get<T>(param: string, defaultValue?: any): T | null;
}
