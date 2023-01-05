"use strict";

module.exports = async function (fastify, opts) {
  fastify.get("/", { websocket: true }, function (connection, req) {
    connection.socket.on("message", (message) => {
      console.log("Message received", { message });
    });
  });
};
