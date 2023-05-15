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
    /**
     *
     * @param {CommandInteraction | Message} data The iterator to create the Context
     * @returns The Context class initializated
     */
    getContext(data) {
        return new (this.ops.context || main_1.Context)(this, data);
    }
    /**
     *
     * @param {string} dir The directory with the Makers
     * @param {boolean} providingCwd If the directory already contains the home directory 'process.cwd()'
     */
    async load(dir, providingCwd) {
        await this.fold.load(dir, providingCwd);
    }
    /**
     * Starts the erine client
     */
    async connect() {
        await this.load((0, path_1.join)(__dirname, "..", "events"), true);
        await super.connect();
        if (this.ops.autoSync)
            await this.fold.sync();
    }
}
exports.Erine = Erine;
