import { Erine, ClientEvents, CommandObject, InteractionObject, ContextMenuObject } from "../main";

export class Maker {
    public bot: Erine
    public commands: CommandObject[]
    public interactions: InteractionObject[]
    public contexts: ContextMenuObject[]
    constructor(bot: Erine) {
        this.bot = bot
        this.commands = []
        this.interactions = []
        this.contexts = []
    }
    /**
     * Add all commands, interactions, events and context menus to the cache in this maker
     */
    __start__() {
        for(const key of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) {
            const descriptor = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(this), key)
            if(!descriptor || typeof descriptor.value !== "function" || !descriptor.value.__type__) continue;
            if(descriptor.value.__type__ === "command") {
                const COMMAND: CommandObject = {
                    name: descriptor.value.__builder__?.name,
                    description: descriptor.value.__builder__?.description,
                    aliases: descriptor.value.__builder__?.aliases || [],
                    plugins:descriptor.value.__plugins__ || [],
                    params: descriptor.value.__params__?.reverse() || [],
                    group: descriptor.value.__group__ || null,
                    allowed: descriptor.value.__allowed__,
                    key,
                    maker: this
                }
                for(const extra of Object.keys(descriptor.value.__builder__ || {})) {
                    if(!(extra in COMMAND)) COMMAND[extra as keyof CommandObject] = descriptor.value.__builder__[extra]
                }
                this.commands.push(COMMAND)
            } else if(descriptor.value.__type__ === "event") {
                this.bot.on(key as keyof ClientEvents, (...args) => descriptor.value.call(this, ...args))
            } else if(descriptor.value.__type__ === "interaction") {
                this.interactions.push({ id: key, maker: this })
            } else if(descriptor.value.__type__ === "context") {
                this.contexts.push({ name: key, type: descriptor.value.__component__, maker: this })
            }
        }
        return this
    }
    __getCommands__() {
        return this.commands
    }
    __getInteractions__() {
        return this.interactions
    }
    __getContexts__() {
        return this.contexts
    }
}