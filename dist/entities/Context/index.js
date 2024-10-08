"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const stream = __importStar(require("stream"));
const url = __importStar(require("url"));
class Context {
    /* Define Context vars */
    request;
    responseHeaders = {};
    /* Define Context */
    constructor(request) {
        /* Set Context vars */
        this.request = request;
        /* Basic validation of request */
        if (!request.method) {
            throw new Error("No request method");
        }
    }
    /* Parse request body function */
    async parseBody() {
        if (["POST", "PUT"].includes(this.request.method)) {
            const bodyBuffer = await new Promise((resolve) => {
                const bodyBuffer = [];
                this.request.on("data", (chunk) => bodyBuffer.push(chunk));
                this.request.on("end", () => resolve(Buffer.concat(bodyBuffer)));
            });
            /* If request body is JSON */
            if (this.request.headers["content-type"] === "application/json") {
                return JSON.parse(bodyBuffer.toString());
            }
            /* Otherwise, return stream */
            return stream.Readable.from(bodyBuffer);
        }
        else if (["GET", "DELETE"].includes(this.request.method)) {
            const params = new url.URLSearchParams(this.request.url.replaceAll(/^.*\?/g, ""));
            const paramsObject = {};
            for (const [key, value] of params.entries()) {
                paramsObject[key] = value;
            }
            return paramsObject;
        }
        else {
            throw new Error("Unrecognized HTTP method. This is HTTPulse Framework error");
        }
    }
    /* Define "get/set response headers" method */
    setResponseHeaders(headers) {
        this.responseHeaders = headers;
    }
    getResponseHeaders() {
        return this.responseHeaders;
    }
}
exports.default = Context;
//# sourceMappingURL=index.js.map