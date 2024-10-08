import * as http from "http";
import * as stream from "stream";

import {HttpStatusCode} from "../../types";

type ResponseData = Buffer
  | stream.Readable
  | string
  | number
  | object
  | boolean
  | null

export default class Response {

  /* Define Response vars */
  dataStream: stream.Readable = new stream.Readable();
  statusCode: HttpStatusCode = 200;
  headers: http.OutgoingHttpHeaders = {};

  private contentType: string = "application/octet-stream";

  /* Define Response */
  constructor(statusCode: HttpStatusCode, data: ResponseData, headers?: http.OutgoingHttpHeaders) {

    if(
      Buffer.isBuffer(data)
      || data instanceof stream.Readable
    ) {
      this.dataStream = stream.Readable.from(data);
    } else if(typeof data === "string") {
      this.dataStream = stream.Readable.from(String(data));
      this.contentType = "text/plain";
    } else if(["number", "boolean"].includes(typeof data)) {
      this.dataStream = stream.Readable.from(String(data));
      this.contentType = "application/json";
    } else if(typeof data === "object" || data === null) {
      this.dataStream = stream.Readable.from(JSON.stringify(data));
      this.contentType = "application/json";
    }

    /* Set Response vars */
    this.statusCode = statusCode;
    this.headers["Content-Type"] = headers?.["Content-Type"] ?? this.contentType;
    if(headers) this.headers = {
      ...this.headers,
      ...headers
    };
  }
}
