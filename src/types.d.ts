import Context from "./entities/Context";
import Response from "./entities/Response";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE"
export type HttpStatusCode = number
export type Handler = (context: Context) => Promise<Response>
export type Middleware = (context: Context) => Promise<Response | undefined>
