import { Erine, Events, CommandObject } from "../main";

export class Maker {
    public bot: Erine
    public commands: CommandObject[]
    constructor(bot: Erine) {
        this.bot = bot
        this.commands = []
    }
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
                this.bot.on(key as keyof Events, (...args) => descriptor.value.call(this, ...args))
            }
        }
        if(this.bot.ops.autoSync) this.bot.fold.sync()
        return this
    }
    __getCommands__() {
        return this.commands
    }
}