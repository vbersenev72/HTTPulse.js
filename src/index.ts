import * as http from "http";

export type HTTP_METHODS = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export class Server {
  readonly port: number;
  readonly server: http.Server;

  constructor(port: number) {
    this.port = port;
    this.server = http.createServer((request, response) => {});
  }
}
