"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = exports.ParamType = exports.Param = exports.Plugins = exports.Errors = exports.Context = exports.Group = exports.Core = exports.Event = exports.ContextMenu = exports.Dispatch = exports.Command = exports.Fold = exports.Erine = exports.Maker = exports.Collectors = exports.Builders = exports.Cooldowns = exports.Bucket = void 0;
const tslib_1 = require("tslib");
const Collectors = tslib_1.__importStar(require("oceanic-collectors"));
exports.Collectors = Collectors;
const Builders = tslib_1.__importStar(require("@oceanicjs/builders"));
exports.Builders = Builders;
const Cooldowns_1 = require("./classes/Cooldowns");
Object.defineProperty(exports, "Cooldowns", { enumerable: true, get: function () { return Cooldowns_1.Cooldowns; } });
const Bot_1 = require("./classes/Bot");
Object.defineProperty(exports, "Erine", { enumerable: true, get: function () { return Bot_1.Erine; } });
const CommandMacro_1 = require("./decorators/CommandMacro");
Object.defineProperty(exports, "Command", { enumerable: true, get: function () { return CommandMacro_1.Command; } });
const GroupMacro_1 = require("./decorators/GroupMacro");
Object.defineProperty(exports, "Group", { enumerable: true, get: function () { return GroupMacro_1.Group; } });
const InteractionMacro_1 = require("./decorators/InteractionMacro");
Object.defineProperty(exports, "Dispatch", { enumerable: true, get: function () { return InteractionMacro_1.Dispatch; } });
const ContextMenuMacro_1 = require("./decorators/ContextMenuMacro");
Object.defineProperty(exports, "ContextMenu", { enumerable: true, get: function () { return ContextMenuMacro_1.ContextMenu; } });
const EventMacro_1 = require("./decorators/EventMacro");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return EventMacro_1.Event; } });
const Core_1 = require("./classes/Core");
Object.defineProperty(exports, "Core", { enumerable: true, get: function () { return Core_1.Core; } });
const Context_1 = require("./classes/Context");
Object.defineProperty(exports, "Context", { enumerable: true, get: function () { return Context_1.Context; } });
const Fold_1 = require("./classes/Fold");
Object.defineProperty(exports, "Fold", { enumerable: true, get: function () { return Fold_1.Fold; } });
const Maker_1 = require("./classes/Maker");
Object.defineProperty(exports, "Maker", { enumerable: true, get: function () { return Maker_1.Maker; } });
const ParamsMacro_1 = require("./decorators/ParamsMacro");
Object.defineProperty(exports, "Param", { enumerable: true, get: function () { return ParamsMacro_1.Param; } });
Object.defineProperty(exports, "ParamType", { enumerable: true, get: function () { return ParamsMacro_1.ParamType; } });
const HelpCommand_1 = require("./classes/HelpCommand");
Object.defineProperty(exports, "HelpCommand", { enumerable: true, get: function () { return HelpCommand_1.HelpCommand; } });
const Errors = tslib_1.__importStar(require("./classes/Errors"));
exports.Errors = Errors;
const Plugins = tslib_1.__importStar(require("./decorators/PluginsMacro"));
exports.Plugins = Plugins;
var Bucket;
(function (Bucket) {
    Bucket["Member"] = "MEMBER";
    Bucket["User"] = "USER";
    Bucket["Guild"] = "GUILD";
    Bucket["Channel"] = "CHANNEL";
})(Bucket = exports.Bucket || (exports.Bucket = {}));
tslib_1.__exportStar(require("oceanic.js"), exports);
exports.default = { Cooldowns: Cooldowns_1.Cooldowns, ParamType: ParamsMacro_1.ParamType, Param: ParamsMacro_1.Param, Builders, Collectors, Erine: Bot_1.Erine, Fold: Fold_1.Fold, Command: CommandMacro_1.Command, HelpCommand: HelpCommand_1.HelpCommand, Dispatch: InteractionMacro_1.Dispatch, ContextMenu: ContextMenuMacro_1.ContextMenu, Event: EventMacro_1.Event, Core: Core_1.Core, Group: GroupMacro_1.Group, Context: Context_1.Context, Errors, Plugins, Maker: Maker_1.Maker };
