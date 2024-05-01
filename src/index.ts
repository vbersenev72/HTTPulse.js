import * as http from "http";

export class Server {
  readonly port: number;
  readonly server: http.Server;
  readonly callback: void | undefined;

  constructor(port: number, callback: undefined | void) {
    this.port = port;
    this.callback = callback;
    this.server = http.createServer((request, response) => {});
  }

  GET() {}

  POST() {}

  PUT() {}

  DELETE() {}

  PATCH() {}
}
