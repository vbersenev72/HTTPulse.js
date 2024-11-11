# HTTPulse - basic implementation of the HTTP API

## Quick start

```typescript
import HTTPulse, {Response} from "@vbersenev72/HTTPulse.js";
import Context from "@vbersenev72/HTTPulse.js/types/entities/Context"

const HTTP_SERVER_PORT = 8000;
const HTTP_SERVER_HOST = '127.0.0.1';

const HTTPulseServer = new HTTPulse(HTTP_SERVER_PORT, HTTP_SERVER_HOST);

/* Handle GET request */
HTTPulseServer.on('GET', '/', () => {
  return new Response(200, 'Hello World');
})

/* Handle POST request */
HTTPulseServer.on('POST', '/', async (ctx: Context) => {

  /* Get POST data */
  const data = await ctx.parseBody()

  /* Show POST data */
  console.log(data);

  /* Respond with string */
  return new Response(200, 'Hello World');
});

HTTPulseServer.start({
    enableLogHandlers: true
  }).then(() => {
  console.log(`HTTP server started at http://${HTTP_SERVER_HOST}:${HTTP_SERVER_PORT}`);
});
```
