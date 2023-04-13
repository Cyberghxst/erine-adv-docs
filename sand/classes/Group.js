"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Group = void 0;
const main_1 = require("../main");
class Group {
    bot;
    options;
    public;
    constructor(bot, options) {
        this.bot = bot;
        this.options = options;
    }
    addCommand(command) {
        let cls = new main_1.Command(this.bot, command);
    }
}
exports.Group = Group;
