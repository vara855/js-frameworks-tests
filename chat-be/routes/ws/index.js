"use strict";

const { generateMessage } = require("../../chat-generator");

module.exports = async function (fastify, opts) {
  fastify.get("/", { websocket: true }, function (connection, req) {
    connection.socket.on("message", (message) => {});

    setInterval(() => {
      connection.socket.send(JSON.stringify(generateMessage()));
    }, 4000);
  });
};
