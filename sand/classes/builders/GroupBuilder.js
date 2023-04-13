"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupBuilder = void 0;
class GroupBuilder {
    name;
    description;
    commands;
    as_slash;
    as_prefix;
    constructor() {
        this.name = '';
        this.description = '...';
        this.commands = [];
        this.as_slash = true;
        this.as_prefix = true;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    addCommand(command) {
        this.commands.push(command);
        return this;
    }
    allowPrefix(allow) {
        this.as_prefix = allow;
        return this;
    }
    allowSlash(allow) {
        this.as_slash = allow;
        return this;
    }
}
exports.GroupBuilder = GroupBuilder;
