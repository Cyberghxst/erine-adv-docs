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
    getAllCommands() {
        return this.makers.map(m => m.__getCommands__()).reduce((a, b) => a.concat(b))
    }
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
        await this.client.application.bulkEditGlobalCommands(parsed)
    }
}