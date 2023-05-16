import { Command, Param, Context, CommandObject, GroupObject } from "../main";
import { Maker } from "./Maker";

export interface CommandHelpingObject extends CommandObject {
    full?: string
    regexp?: RegExp
}

export interface GroupHelpingObject extends GroupObject {
    subcommands: CommandHelpingObject[]
}

export class HelpCommand extends Maker {

    @Command({ description: "Shows this command", aliases: ["h"] })
    @Param(3, { name: "query", "description": "An optional command/group/subcommand name", required: false, ellipsis: true })
    async help(ctx: Context) {
        if(!ctx.get<string>("query")) return this.sendEmptyHelp(ctx)
        let command = this.getCommand(ctx.get<string>("query")!)
        if(command) return this.sendCommandHelp(ctx, command)
        let group = this.getGroup(ctx.get<string>("query")!)
        if(group) return this.sendGroupHelp(ctx, group)
        else return await ctx.send("I was unable to find something related to that!")
    }

    codeblock(text: string) {
        return `\`\`\`\n${text.slice(0, 1990)}\`\`\``
    }
    async sendEmptyHelp(ctx: Context) {
        await ctx.send(this.codeblock(`Welcome to ${ctx.bot.user.username}'s help, these are my commands:\n` + this.getWalkCommands().map(c => `${c.full || c.name} :: ${c.description}`).join("\n").slice(0, 1990)))
    }
    async sendCommandHelp(ctx: Context, command: CommandHelpingObject) {
        let cmd = command.aliases.length ? `[${[command.name].concat(command.aliases).join("|")}]`: command.name
        let grp = command.group ? command.group!.aliases?.length ? `[${[command.group!.name].concat(command.group!.aliases).join("|")}] `: command.group!.name + " ": ""
        let params = command.params.map(p => `  ${p.name}${p.required ? "*": "?"} - ${p.description}`)
        let s = `${grp}${cmd}\n\n${command.description}${params.length ? "\n\nArguments:\n" + params.join("\n"): ""}`
        await ctx.send(this.codeblock(s))
    }
    async sendGroupHelp(ctx: Context, group: GroupHelpingObject) {
        let t = group.aliases?.length ? `[${[group.name].concat(group.aliases).join("|")}] `: group!.name
        let subcmds = group.subcommands.map(c => ` ${group.name} ${c.name} :: ${c.description}`)
        await ctx.send(this.codeblock(`${t}\n${group.description}\n\n${subcmds.length ? "\n\nSubcommands:\n" + subcmds.join("\n"): ""}`))
    }

    getCommands() {
        return this.bot.fold.getAllCommands()
    }
    getWalkCommands(): CommandHelpingObject[] {
        let groupCommands = this.getCommands().filter(c => c.group).map(c => { return { ...c, "regexp": new RegExp(`^(${(c.group!.aliases || []).concat(c.group!.name).join("|")})( +)(${(c.aliases || []).concat(c.name).join("|")})$`, "gi"), "full": `${c.group!.name} ${c.name}` } })
        return this.getCommands().filter(c => !c.group).concat(groupCommands).sort()
    }
    getCommand(q: string) {
        let arr: CommandHelpingObject[] = this.getCommands()
        let c; q = this.c(q)
        c = arr.find(c => !c.group && this.c(c.name) == q || c.aliases.map(this.c).includes(q))
        if(c) return c
        arr = arr.filter(c => c.group).map(c => { return { ...c, "regexp": new RegExp(`^(${(c.group!.aliases || []).concat(c.group!.name).join("|")})( +)(${(c.aliases || []).concat(c.name).join("|")})$`, "gi"), "full": `${c.group!.name} ${c.name}` } })
        c = arr.find(c => c.regexp!.test(q))
        if(c) return c
        else return null
    }
    getGroup(q: string) {
        q = this.c(q)
        let arr = this.getCommands().filter(c => c.group).map(c => c.group!)
        let group = arr.find(g => this.c(g.name) == q || g.aliases?.map(this.c).includes(q))
        if(!group) return null
        let subcommands = this.getCommands().filter(c => c.group && (c.group.name == group!.name)).map(c => { return { ...c, "regexp": new RegExp(`^(${(c.group!.aliases || []).concat(c.group!.name).join("|")})( +)(${(c.aliases || []).concat(c.name).join("|")})$`, "gi"), "full": `${c.group!.name} ${c.name}` } })
        return { ...group, subcommands }
    }
    c(q: string) {
        return q.toLowerCase().trim()
    }
}