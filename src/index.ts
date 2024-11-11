// noinspection ExceptionCaughtLocallyJS,JSUnusedGlobalSymbols,HttpUrlsUsage

import * as http from "http";
import * as url from "url";

import Context from "./entities/Context";
import Response from "./entities/Response";

import {Handler, HttpMethod, Middleware} from "./types";
import corsMW from "./utils/corsMW";
import { logHandlers } from "./utils/logs";

export default class HTTPulse {

  /* Define global HTTP server */
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

  /* Define server vars */
  port: number;
  host: string;
  handlers = new Map<string, Handler>();
  middlewares: Middleware[] = [];

  /* Create an HTTP server instance */
  constructor(port: number, host = "127.0.0.1") {
    this.port = port;
    this.host = host;

    /* Call handler on HTTP request */
    this.server = http.createServer(async (request, response) => {
      try {

        /* Define request url */
        if(request.url === undefined) {
          throw new Error("Cannot handle this request: Request URL is not provided");
        }

        /* Define request method */
        if(request.method === undefined) {
          throw new Error("Cannot handle this request: Request method is missing");
        }

        /* Parse request path */
        const requestPath = new url.URL(`http://${this.host}:${this.port}${request.url}`);

        /* Create context */
        const context = new Context(request);

        /* Do all middlewares */
        for(const middleware of this.middlewares) {
          const middleWareResult = await middleware(context);

          if(middleWareResult instanceof Response) {
            return this.respond(middleWareResult, response, context);
          }
        }

        /* Define request handler */
        const handler = this.handlers.get(`${request.method.toUpperCase()}#${requestPath.pathname}`);
        if(!handler) {
          response.statusCode = 404;
          response.end("Cannot find handler for this request");
          return;
        }

        /* Get handler Response instance */
        const $response: Response = await handler(context);

        /* Respond with handler */
        this.respond($response, response, context);
      } catch(error: Error | unknown) {
        console.error(error);

        response.statusCode = 500;
        response.end(error instanceof Error ? error.message : "Unknown error");
      }
    });
  }

  /* Define middlewares */
  use(fn: Middleware) {
    this.middlewares.push(fn);
  }

  /* Define REST API methods function */
  on(method: HttpMethod, path: string, handler: Handler) {
    this.handlers.set(`${method}#${path}`, handler);
  }

  /* Start HTTP server function */
  start(
    options? : {
      enableLogHandlers: boolean
    }
  ) {
    return new Promise<void>((done) => {
      if (options?.enableLogHandlers) logHandlers(this.handlers)
      this.server.listen(this.port, this.host, () => done());
    });
  }

  /* Define "respond" method */
  private respond($response: Response, response: http.ServerResponse, $context: Context) {

    /* Send response to HTTP client */
    for(const [header, value] of Object.entries($response.headers)) {
      if(!value) continue;

      response.setHeader(header, value);
    }

    for(const [header, value] of Object.entries($context.getResponseHeaders())) {
      if(!value) continue;

      response.setHeader(header, value);
    }

    response.statusCode = $response.statusCode;
    $response.dataStream.pipe(response);
  }
}

/* Exports */
export {
  Response,
  corsMW
};
