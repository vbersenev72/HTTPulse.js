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
class Response {
    /* Define Response vars */
    dataStream = new stream.Readable();
    statusCode = 200;
    headers = {};
    contentType = "application/octet-stream";
    /* Define Response */
    constructor(statusCode, data, headers) {
        if (Buffer.isBuffer(data)
            || data instanceof stream.Readable) {
            this.dataStream = stream.Readable.from(data);
        }
        else if (typeof data === "string") {
            this.dataStream = stream.Readable.from(String(data));
            this.contentType = "text/plain";
        }
        else if (["number", "boolean"].includes(typeof data)) {
            this.dataStream = stream.Readable.from(String(data));
            this.contentType = "application/json";
        }
        else if (typeof data === "object" || data === null) {
            this.dataStream = stream.Readable.from(JSON.stringify(data));
            this.contentType = "application/json";
        }
        /* Set Response vars */
        this.statusCode = statusCode;
        this.headers["Content-Type"] = headers?.["Content-Type"] ?? this.contentType;
        if (headers)
            this.headers = {
                ...this.headers,
                ...headers
            };
    }
}
exports.default = Response;
//# sourceMappingURL=index.js.map