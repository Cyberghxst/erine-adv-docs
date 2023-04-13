"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamsBuilder = void 0;
const oceanic_js_1 = require("oceanic.js");
class ParamsBuilder {
    strings;
    numbers;
    params;
    constructor() {
        this.strings = [];
        this.numbers = [];
        this.params = [];
    }
    addString(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.STRING;
        this.params.push(param);
        return this;
    }
    addNumber(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.NUMBER;
        this.params.push(param);
        return this;
    }
    addBoolean(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.BOOLEAN;
        this.params.push(param);
        return this;
    }
    addMember(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.USER;
        this.params.push(param);
        return this;
    }
    addChannel(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.CHANNEL;
        this.params.push(param);
        return this;
    }
    addRole(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.ROLE;
        this.params.push(param);
        return this;
    }
    addAttachment(param) {
        param.type = oceanic_js_1.ApplicationCommandOptionTypes.ATTACHMENT;
        this.params.push(param);
        return this;
    }
}
exports.ParamsBuilder = ParamsBuilder;
