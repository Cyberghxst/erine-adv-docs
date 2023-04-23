import { join } from 'path';
import { cwd } from 'process';
import { lstatSync, readdirSync } from 'fs';
import { Collection, CommandBuilder, Command, Event, Erine } from '../main';

export interface FoldCollections {
    universal: Collection<string, Command>
    group: Collection<string, any>
}

export class Fold {
    public data: FoldCollections = { universal: new Collection(), group: new Collection() }
    public client: Erine
    constructor(client: Erine) {
        this.client = client
    }
    async load(dir: string): Promise<void> {
        const files = readdirSync(join(cwd(), dir));
        for(const file of files) {
            let stat = lstatSync(join(cwd(), dir, file));
            if(stat.isDirectory()) { this.load(join(dir, file)); continue; }
            const MODULE = require(join(cwd(), dir, file))?.data;
            if(!MODULE || !this.client.core.isClass(MODULE)) continue;
            const CLS = new MODULE(this.client)
            if(CLS instanceof Command) {
                this.data.universal.set(CLS.name, MODULE)
            } else if(CLS instanceof Event) {
                CLS.run().then(this.client.core.noop).catch(console.log)
            }
        }
    }
    async sync(guildId: string = ''): Promise<void> {
        if(!guildId) {
            // Global cmds sync
            const parsed: any[] = [];
            await this.client.application.bulkEditGlobalCommands(parsed);
        } else {
            // Guild cmds sync
        }
    }
}