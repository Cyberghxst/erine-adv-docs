import { Erine } from "main";

const bot = new Erine({
    auth: 'TOKEN',
    gateway: {
        intents: [
            'GUILDS',
            'GUILD_MESSAGES',
            'MESSAGE_CONTENT'
        ]
    },
    owners: [],
    prefix: '!'
});
// i don't know watermelon sugar