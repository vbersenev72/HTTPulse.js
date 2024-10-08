import * as http from "http";
import * as stream from "stream";
import * as url from "url";

export default class Context {

  /* Define Context vars */
  readonly request: http.IncomingMessage;
  private responseHeaders: http.OutgoingHttpHeaders = {};

  /* Define Context */
  constructor(request: http.IncomingMessage) {

    /* Set Context vars */
    this.request = request;

    /* Basic validation of request */
    if(!request.method) {
      throw new Error("No request method");
    }
  }

  /* Parse request body function */
  async parseBody() {

    if(["POST", "PUT"].includes(this.request.method as string)) {
      const bodyBuffer = await new Promise<Buffer>((resolve) => {
        const bodyBuffer: any[] = [];

        this.request.on("data", (chunk: any) => bodyBuffer.push(chunk));
        this.request.on("end", () => resolve(Buffer.concat(bodyBuffer)));
      });

      /* If request body is JSON */
      if(this.request.headers["content-type"] === "application/json") {
        return JSON.parse(bodyBuffer.toString());
      }

      /* Otherwise, return stream */
      return stream.Readable.from(bodyBuffer);
    } else if(["GET", "DELETE"].includes(this.request.method as string)) {
      const params = new url.URLSearchParams((this.request.url as string).replaceAll(/^.*\?/g, ""));

      const paramsObject: {[key: string]: string} = {};

      for(const [key, value] of params.entries()) {
        paramsObject[key] = value;
      }

      return paramsObject;
    } else {
      throw new Error("Unrecognized HTTP method. This is HTTPulse Framework error");
    }
  }

  /* Define "get/set response headers" method */
  setResponseHeaders(headers: http.OutgoingHttpHeaders) {
    this.responseHeaders = headers;
  }

  getResponseHeaders() {
    return this.responseHeaders;
  }
}
