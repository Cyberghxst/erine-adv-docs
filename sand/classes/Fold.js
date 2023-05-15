"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Fold = void 0;
const path_1 = require("path");
const process_1 = require("process");
const fs_1 = require("fs");
const main_1 = require("../main");
class Fold {
    client;
    makers = [];
    constructor(client) {
        this.client = client;
    }
    /**
     * Loads a Maker directory
     * @param dir The directory that contains the Makers
     * @param withCwd If the provided directory contains the home path 'process.cwd()'
     */
    async load(dir, withCwd) {
        const files = (0, fs_1.readdirSync)((0, path_1.join)(!withCwd ? (0, process_1.cwd)() : "", dir));
        for (const file of files) {
            let stat = (0, fs_1.lstatSync)((0, path_1.join)(!withCwd ? (0, process_1.cwd)() : "", dir, file));
            if (stat.isDirectory()) {
                this.load((0, path_1.join)(dir, file));
                continue;
            }
            if (file.endsWith(".d.ts"))
                continue;
            const MODULE = require((0, path_1.join)(!withCwd ? (0, process_1.cwd)() : "", dir, file))?.data;
            if (!MODULE || !this.client.core.isClass(MODULE))
                continue;
            const CLS = new MODULE(this.client);
            if (CLS instanceof main_1.Maker)
                this.makers.push(CLS.__start__());
        }
    }
    /**
     * Get all makers commands into a single array
     * @returns An array of CommandObject
     */
    getAllCommands() {
        try {
            return this.makers.map(m => m.__getCommands__()).reduce((a, b) => a.concat(b));
        }
        catch {
            return [];
        }
    }
    /**
     * Get all makers interactions into a single array
     * @returns An array of InteractionObject
     */
    getAllInteractions() {
        try {
            return this.makers.map(m => m.__getInteractions__()).reduce((a, b) => a.concat(b));
        }
        catch {
            return [];
        }
    }
    /**
     * Get all makers context menus into a single array
     * @returns An array of ContextMenuObject
     */
    getAllContexts() {
        try {
            return this.makers.map(m => m.__getContexts__()).reduce((a, b) => a.concat(b));
        }
        catch {
            return [];
        }
    }
    /**
     * Uploads the application commands (slashes and context menus) to the discord API
     */
    async sync() {
        let ingroup = this.getAllCommands().filter(c => c.group && c.group.name);
        let withoutgroup = this.getAllCommands().filter(c => !c.group?.name);
        let parsed = [];
        if (withoutgroup.length) {
            withoutgroup.forEach(x => {
                if (!x.allowed.includes("slash"))
                    return;
                let obj = { ...x };
                obj.options = x.params;
                parsed.push(obj);
            });
        }
        if (ingroup.length) {
            ingroup.forEach(x => {
                if (!x.allowed.includes("slash"))
                    return;
                let g = x.group;
                let obj = { ...g, isgroup: true };
                let i = parsed.findIndex(o => o.name == obj.name && o.isgroup);
                if (i > -1) {
                    if (!parsed[i].options)
                        parsed[i].options = [];
                    let nn = { ...x };
                    nn.type = 1;
                    nn.options = x.params;
                    parsed[i].options.push(nn);
                }
                else {
                    let nn = { ...x };
                    nn.type = 1;
                    nn.options = x.params;
                    obj.options = [nn];
                    parsed.push(obj);
                }
            });
        }
        await this.client.application.bulkEditGlobalCommands(parsed.concat(this.getAllContexts()));
    }
}
exports.Fold = Fold;
