import { Command, SkyfoldManagerOptions, ErineCollected, Types, Event, BaseParam } from "@types";
import { ApplicationCommandOptionType, Collection, REST, Routes, SlashCommandBuilder, Snowflake } from "discord.js";
import { readdirSync, lstatSync } from "node:fs";
import { join } from "path";
import { ErineClient } from "./Base";
import { HybridBuilder } from "./builders/HybridBuilder";
import { HybridGroup } from "./builders/HybridGroupBuilder";
import { PrefixBuilder } from "./builders/PrefixBuilder";

class Skyfold {
    public client: ErineClient
    public commands: ErineCollected
    public listeners: Collection<string, Event> | null
    constructor(options: SkyfoldManagerOptions) {
        if(!(options?.client instanceof ErineClient)) throw new SyntaxError("Invalid client provided in options")
        this.client = options.client
        this.commands = { PrefixType: null, HybridType: null, SlashType: null, HybridGroupType: null }
        this.listeners = null
    }
    async load_commands(dir: string): Promise<void> {
        if(!dir) throw new SyntaxError("Missing directory to load commands")
        const MODULES = readdirSync(join(process.cwd(), dir))
        for(const file of MODULES) {
            if(lstatSync(join(process.cwd(), dir, file)).isDirectory()) { this.load_commands(join(dir, file)); continue }
            delete require.cache[join(process.cwd(), dir, file)]
            let cmd: Command<Types> = require(join(process.cwd(), dir, file)).body
            if(!cmd) continue
            if(this.client.coreback.isType<Command<Types.Prefix>, Command<Types>>(cmd, c => c.data instanceof PrefixBuilder)) {
                if(!this.commands.PrefixType) this.commands.PrefixType = new Collection()
                this.commands.PrefixType.set(cmd.data.names[0], cmd)
            } else if(this.client.coreback.isType<Command<Types.Hybrid>, Command<Types>>(cmd, c => c.data instanceof HybridBuilder)) {
                if(!this.commands.HybridType) this.commands.HybridType = new Collection()
                this.commands.HybridType.set(cmd.data instanceof PrefixBuilder ? cmd.data.names[0]: cmd.data.name, cmd)
            } else if(this.client.coreback.isType<Command<Types.Slash>, Command<Types>>(cmd, c => c.data instanceof SlashCommandBuilder)) {
                if(!this.commands.SlashType) this.commands.SlashType = new Collection()
                this.commands.SlashType.set(cmd.data.name, cmd)
            } else if(this.client.coreback.isType<Command<Types.HybridGroup>, Command<Types>>(cmd, cmd => cmd.data instanceof HybridGroup)) {
                if(!this.commands.HybridGroupType) this.commands.HybridGroupType = new Collection()
                this.commands.HybridGroupType.set(cmd.data.name, cmd)
            }
        }
    }

    async load_events(dir: string): Promise<void> {
        const MODULES = readdirSync(join(process.cwd(), dir))
        for(const file of MODULES) {
            if(lstatSync(join(process.cwd(), dir, file)).isDirectory()) { this.load_events(join(dir, file)); continue }
            let event: Event = require(join(process.cwd(), dir, file)).event
            if(!event) continue;
            // @ts-ignore
            this.client.on(event.name, event.code)
        }
    }
    
    async sync(token: string, app_id: Snowflake): Promise<void> {
        const rest = new REST({ version: "10" }).setToken(token);
        let slash = this.commands.SlashType?.map(s => s.data.toJSON())
        let hybrid = this.commands.HybridType
        let hybrid_groups = this.commands.HybridGroupType
        let parsed: any[] = []
        if(hybrid) {
            hybrid.forEach(x => {
                let obj = x.data.toJSON()
                // @ts-ignore
                obj.options = x.params?.params || []
                parsed.push(obj)
            })
        }
        if(hybrid_groups) {
            hybrid_groups.forEach(x => {
                let obj = x.data.toJSON()
                let subs: any[] = []
                for(const y of x.data.commands) {
                    let obj2 = y.data.toJSON()
                    // @ts-ignore
                    obj2.options = y.params?.params || []
                    obj2.type = 1
                    subs.push(obj2)
                }
                obj.options = subs
                parsed.push(obj)
            })
        }
        let f = (slash || []).concat(parsed)
        let final = slash && hybrid ? slash.concat(parsed): slash && !hybrid ? slash: parsed
        rest.put(Routes.applicationCommands(app_id), {
            body: f
        })
    }
}

export { Skyfold }