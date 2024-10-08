import Context from "../entities/Context";
import Response from "../entities/Response";

export default function(context: Context) {
  context.setResponseHeaders({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Methods": "*"
  });

  if(context.request.method === "OPTIONS") {
    return new Response(200, "OK");
  }
}
