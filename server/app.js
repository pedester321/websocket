//*** HTTP SERVER ***

const HTTP = require("http");

//custom libraries
const CONSTANTS = require("./custom_lib/websocket_constants");
const METHODS = require("./custom_lib/websocket_methods");

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
CONSTANTS.CUSTOM_ERRORS.forEach( errorEvent => {
    process.on(errorEvent, (err) =>{
        console.log(`Error event: ${errorEvent}. Error object:`, err)
        //exit the process
        process.exit(1)
    })
} )