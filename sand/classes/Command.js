"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    bot;
    options;
    name;
    aliases;
    description;
    withPrefix;
    withSlash;
    parent;
    constructor(bot, options) {
        this.bot = bot;
        this.options = options;
        this.name = options.data.name;
        this.aliases = options.data.aliases;
        this.description = options.data.description;
        this.withPrefix = options.data.as_prefix;
        this.withSlash = options.data.as_slash;
        this.parent = null;
    }
    async code(ctx) {
        console.log("Command executed: ", this.name);
    }
}
exports.Command = Command;
