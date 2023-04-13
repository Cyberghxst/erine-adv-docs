"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandBuilder = void 0;
class CommandBuilder {
    name;
    aliases;
    description;
    as_prefix;
    as_slash;
    constructor(options) {
        this.name = options?.name || "";
        this.aliases = options?.aliases || [];
        this.description = options?.description || '...';
        this.as_prefix = true;
        this.as_slash = true;
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setDescription(description) {
        this.description = description;
        return this;
    }
    setAliases(...aliases) {
        this.aliases = aliases;
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
exports.CommandBuilder = CommandBuilder;
