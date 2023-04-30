"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Erine = void 0;
const main_1 = require("../main");
const oceanic_js_1 = require("oceanic.js");
class Erine extends oceanic_js_1.Client {
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
    async load(dir) {
        this.fold.load(dir);
    }
    async connect() {
        await this.fold.load("./sand/events");
        if (this.ops.autoSync)
            await this.fold.sync();
        await super.connect();
    }
}
exports.Erine = Erine;
