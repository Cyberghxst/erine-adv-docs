import { join } from 'path';
import { cwd } from 'process';
import { lstatSync, readdirSync } from 'fs';
import { Erine, Maker } from '../main';

export class Fold {
    public client: Erine
    public makers: Maker[] = []
    constructor(client: Erine) {
        this.client = client
    }
    /**
     * Loads a Maker directory
     * @param dir The directory that contains the Makers
     * @param withCwd If the provided directory contains the home path 'process.cwd()'
     */
    async load(dir: string, withCwd?: boolean): Promise<void> {
        const files = readdirSync(join(!withCwd ? cwd(): "", dir));
        for(const file of files) {
            let stat = lstatSync(join(!withCwd ? cwd(): "", dir, file));
            if(stat.isDirectory()) { this.load(join(dir, file)); continue }
            if(file.endsWith(".d.ts")) continue
            const MODULE = require(join(!withCwd ? cwd(): "", dir, file))?.data
            if(!MODULE || !this.client.core.isClass(MODULE)) continue;
            const CLS = new MODULE(this.client)
            if(CLS instanceof Maker) this.makers.push(CLS.__start__())
        }
    }
    /**
     * Get all makers commands into a single array
     * @returns An array of CommandObject
     */
    getAllCommands() {
        try {
            return this.makers.map(m => m.__getCommands__()).reduce((a, b) => a.concat(b))
        } catch {
            return []
        }
    }
    /**
     * Get all makers interactions into a single array 
     * @returns An array of InteractionObject
     */
    getAllInteractions() {
        try {
            return this.makers.map(m => m.__getInteractions__()).reduce((a, b) => a.concat(b))
        } catch {
            return []
        }
    }
    /**
     * Get all makers context menus into a single array
     * @returns An array of ContextMenuObject
     */
    getAllContexts() {
        try {
            return this.makers.map(m => m.__getContexts__()).reduce((a, b) => a.concat(b))
        } catch {
            return []
        }
    }
    /**
     * Uploads the application commands (slashes and context menus) to the discord API
     */
    async sync(): Promise<void> {
        let ingroup = this.getAllCommands().filter(c => c.group && c.group.name)
        let withoutgroup = this.getAllCommands().filter(c => !c.group?.name)
        let parsed: any[] = []
        if(withoutgroup.length) {
            withoutgroup.forEach(x => {
                if(!x.allowed.includes("slash")) return
                let obj: Record<string, any> = { ...x }
                obj.options = x.params
                parsed.push(obj)
            })
        }
        if(ingroup.length) {
            ingroup.forEach(x => {
                if(!x.allowed.includes("slash")) return
                let g = x.group!
                let obj: Record<string, any> = { ...g, isgroup: true }
                let i = parsed.findIndex(o => o.name == obj.name && o.isgroup)
                if(i>-1) {
                    if(!parsed[i].options) parsed[i].options = []
                    let nn: Record<string, any> = { ...x }
                    nn.type = 1
                    nn.options = x.params
                    parsed[i].options.push(nn)
                } else {
                    let nn: Record<string, any> = { ...x }
                    nn.type = 1
                    nn.options = x.params
                    obj.options = [nn]
                    parsed.push(obj)
                }
            })
        }
        await this.client.application.bulkEditGlobalCommands(parsed.concat(this.getAllContexts()))
    }
}