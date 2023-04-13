"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
class Event {
    bot;
    event;
    constructor(bot, event) {
        this.bot = bot;
        this.event = "ready";
    }
    async code(...args) {
        console.log(this.event + " was executed!");
    }
    async run() {
        this.bot.on(this.event, this.code);
    }
}
exports.Event = Event;
