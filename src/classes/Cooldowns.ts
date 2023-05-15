import { Collection, Erine, Bucket } from '../main';

export class Cooldowns {
    bot: Erine
    track: Collection<string, number> = new Collection()
    constructor(bot: Erine) {
        this.bot = bot
    }
    async getCooldownSource(command: string, id: string, bucket: Bucket) {
        return this.track.get(`${command}#${bucket}#${id}`)
    }

    async setCooldownSource(command: string, id: string, bucket: Bucket, time: number) {
        this.track.set(`${command}#${bucket}#${id}`, Date.now())
        setTimeout(() => this.track.delete(`${command}#${bucket}#${id}`), time)
    }

    async check(command: string, id: string, cooldown: number, bucket: Bucket) {
        let found = await this.getCooldownSource(command, id, bucket)
        if(!found) return null
        if((Date.now() - found) < cooldown) return { command, id, time: cooldown, bucket, left: cooldown - (Date.now() - found) }
        else return null
    }
}