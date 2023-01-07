"use strict";

const { generateMessage } = require("../../chat-generator");

/**
 *
 * @param {import('fastify').FastifyInstance} fastify
 * @param {*} opts
 */
module.exports = async function (fastify, opts) {
  fastify.get("/", { websocket: true }, function (connection, req) {
    broadcast(
      JSON.stringify({
        message: "A new User has been joined.",
        color: "purple",
        type: "admin-message",
        user: {
          name: "ADMIN",
        },
      })
    );

    connection.socket.on("message", (message) => {
      try {
        broadcast(message.toString("utf8"));
      } catch (e) {
        console.error("Failed to parse message", e);
      }
      console.log({ message: message.toString("utf8") });
    });
  });
  setInterval(() => {
    broadcast(JSON.stringify(generateMessage()));
  }, 4000);

  function broadcast(message) {
    for (const client of fastify.websocketServer.clients) {
      if (client.OPEN) {
        client.send(message);
      }
    }
  }
};
