import * as http from "http";
export default class Context {
    readonly request: http.IncomingMessage;
    private responseHeaders;
    constructor(request: http.IncomingMessage);
    parseBody(): Promise<any>;
    setResponseHeaders(headers: http.OutgoingHttpHeaders): void;
    getResponseHeaders(): http.OutgoingHttpHeaders;
}
