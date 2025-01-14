//*** HTTP SERVER ***

const HTTP = require("http");

//custom libraries
const CONSTANTS = require("./custom_lib/websocket_constants");
const FUNCTIONS = require("./custom_lib/websocket_methods");

//http web-server object
const HTTP_SERVER = HTTP.createServer((req, res) => {
  res.writeHead(200);
  res.end(
    'Hello, I hope you enjoy the "under-the-hood" WebSocket implementation'
  );
});

//start server
HTTP_SERVER.listen(CONSTANTS.PORT, () => {
  console.log(`http server is listening on port: ${CONSTANTS.PORT}`);
});

// ERROR HANDLING
CONSTANTS.CUSTOM_ERRORS.forEach((errorEvent) => {
  process.on(errorEvent, (err) => {
    console.log(`Error event: ${errorEvent}. Error object:`, err);
    //exit the process
    process.exit(1);
  });
});

HTTP_SERVER.on("upgrade", (req, socket, head) => {
  //grab required request headers
  const upgradeHeaderCheck =
    req.headers["upgrade"].toLocaleLowerCase() === CONSTANTS.UPGRADE;
  const connectionHeaderCheck =
    req.headers["connection"].toLocaleLowerCase() === CONSTANTS.CONNECTION;
  const methodCheck = req.method === CONSTANTS.METHOD;

  //check the origin
  const origin = req.headers["origin"];
  const originCheck = FUNCTIONS.isOriginAllowed(origin);

  //perform final check that all request headers are okay

  if (
    FUNCTIONS.check(
      socket,
      upgradeHeaderCheck,
      connectionHeaderCheck,
      methodCheck,
      originCheck
    )
  ) {
    upgradeConnection(req, socket, head);
  }
});

function upgradeConnection(req, socket, head) {
  //get client key
  const clientKey = req.headers["sec-websocket-key"];

  //generate response headers
  const headers = FUNCTIONS.createUpgradeHeaders(clientKey);
  socket.write(headers);

  //if everything works, we got a valid websocket connection
  startWebSocketConnection(socket);
}

function startWebSocketConnection(socket) {}
