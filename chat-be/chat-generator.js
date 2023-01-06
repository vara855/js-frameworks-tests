const Chance = require("chance");

const chance = new Chance();

const generateMessage = () => {
  return {
    message: chance.sentence(),
    type: "message",
    color: chance.color(),
    user: {
      name: chance.name(),
      email: chance.email(),
    },
  };
};

module.exports = {
  generateMessage,
};
