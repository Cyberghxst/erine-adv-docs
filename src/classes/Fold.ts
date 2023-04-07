import { join } from 'path';
import { cwd } from 'process';
import { lstatSync, readdirSync } from 'fs';
import { Collection, Client } from 'oceanic.js';

class Command {}

export interface FoldCollections {
    universal: Collection<string, any>
    group: Collection<string, any>
}

export class Fold {
    public data: FoldCollections = { universal: new Collection(), group: new Collection() }
    public client: Client
    constructor(client: Client) {
        this.client = client
        // hey pene, ya me voy a la mierda, subo cambios y no se si sigues
    } // oks
    async load(dir: string): Promise<void> {
        const files = readdirSync(join(cwd(), dir));
        for (const file of files) {
            let stat = lstatSync(join(cwd(), dir, file));
            if (stat.isDirectory()) { this.load(join(dir, file)); continue; }
            const MODULE = require(join(cwd(), dir, file))?.data; // Esto deberia servir con module.exports y export default
            if (!MODULE) continue;
            if(MODULE instanceof Command) {}
        }
    }
}
// pero lo dejamos como body o data o que nombre
// XD, las constantes siempre me da por ponerlas en mayuscula no c pq, siento q se ven sexys, o minimo pon otro nombre q no sea module u otra keyword
// me dan cancer las mayusculas, ya se que es buena practica en py, pro eto es js
// se ven de la super mierda pero oks
// existe Collection aqui? xd creo que si
// ya me voy a la mierda