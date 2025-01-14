module.exports = {
  //connection related
  PORT: 8080,

  //errors
  CUSTOM_ERRORS: ["uncaughtException", "unhandledRejection", "SIGINT"],

  //upgrade checks
  METHOD: "GET",
  VERSION: 13,
  CONNECTION: "upgrade",
  UPGRADE: "websocket",
  ALLOWED_ORIGINS: [
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "null", // this allows the FILE protocol to view html and establish a WS connection
  ],

  //RFC GUID
  GUID: "258EAFA5-E914-47DA-95CA-C5AB0DC85B11",
};
