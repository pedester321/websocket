const CONSTANTS = require("./websocket_constants");
const crypto = require("crypto");

function isOriginAllowed(origin) {
  return CONSTANTS.ALLOWED_ORIGINS.includes(origin);
}

function check(
  socket,
  upgradeHeaderCheck,
  connectionHeaderCheck,
  methodCheck,
  originCheck
) {
  if (
    upgradeHeaderCheck &&
    connectionHeaderCheck &&
    methodCheck &&
    originCheck
  ) {
    return true;
  } else {
    const message =
      "400 bad request. the HTTP headers do not comply with the RFC6455 spec.";
    const messageLength = message.length;
    const response =
      `HTTP/1.1 400 Bad Request\r\n` +
      `Content-Type: text/plain\r\n` +
      `Content-Length: ${messageLength}\r\n` +
      `\r\n` +
      message;
    socket.write(response);
    socket.end(); // this will close the TCP connection
  }
}

//define server openming handshake headers function
function createUpgradeHeaders(clientKey) {
  //generate the server accept key
  let serverKey = generarateServerKey(clientKey);

  let headers = [
    "HTTP/1.1 101 Switching Protocols",
    "Upgrade: Websocket",
    "Connection: Upgrade",
    `Sec-WebSocket-Accept: ${serverKey}`,
  ];
  const upgradeHeaders = headers.join("\r\n") + "\r\n\r\n";
  return upgradeHeaders;
}

function generarateServerKey(clientKey) {
  //1- concat client key and guid
  let data = clientKey + CONSTANTS.GUID;

  //2- SHA-1 hash the data
  const hash = crypto.createHash("sha1");
  hash.update(data);

  //3- digest to base 64
  let serverKey = hash.digest("base64");
  return serverKey;
}

//export methods

module.exports = {
  isOriginAllowed,
  check,
  createUpgradeHeaders,
};
