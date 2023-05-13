"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erine = void 0;
const main_1 = require("../main");
const oceanic_js_1 = require("oceanic.js");
const path_1 = require("path");
class Erine extends oceanic_js_1.Client {
    /**
     * Setup the bot class with options.
     */
    ops;
    core;
    fold;
    constructor(options) {
        super(options);
        this.ops = options;
        this.fold = new main_1.Fold(this);
        this.core = new main_1.Core(this);
    }
    getContext(data) {
        return new (this.ops.context || main_1.Context)(this, data);
    }
    async load(dir, providingCwd) {
        await this.fold.load(dir, providingCwd);
    }
    async connect() {
        await this.load((0, path_1.join)(__dirname, "..", "events"), true);
        if (this.ops.autoSync)
            await this.fold.sync();
        await super.connect();
    }
}
exports.Erine = Erine;
