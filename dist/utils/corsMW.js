"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const Response_1 = __importDefault(require("../entities/Response"));
function default_1(context) {
    context.setResponseHeaders({
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "*"
    });
    if (context.request.method === "OPTIONS") {
        return new Response_1.default(200, "OK");
    }
}
//# sourceMappingURL=corsMW.js.map