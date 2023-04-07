"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fold = void 0;
const path_1 = require("path");
const process_1 = require("process");
const fs_1 = require("fs");
const oceanic_js_1 = require("oceanic.js");
class Command {
}
class Fold {
    data = { universal: new oceanic_js_1.Collection(), group: new oceanic_js_1.Collection() };
    client;
    constructor(client) {
        this.client = client;
    }
    async load(dir) {
        const files = (0, fs_1.readdirSync)((0, path_1.join)((0, process_1.cwd)(), dir));
        for (const file of files) {
            let stat = (0, fs_1.lstatSync)((0, path_1.join)((0, process_1.cwd)(), dir, file));
            if (stat.isDirectory()) {
                this.load((0, path_1.join)(dir, file));
                continue;
            }
            const MODULE = require((0, path_1.join)((0, process_1.cwd)(), dir, file))?.data;
            if (!MODULE)
                continue;
            if (MODULE instanceof Command) { }
        }
    }
}
exports.Fold = Fold;
