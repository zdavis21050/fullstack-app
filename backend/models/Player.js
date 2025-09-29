const mongoose = require("mongoose");

const PlayerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  game1: { type: Number, default: 0 },
  game2: { type: Number, default: 0 },
  game3: { type: Number, default: 0 }
});

module.exports = mongoose.model("Player", PlayerSchema);

