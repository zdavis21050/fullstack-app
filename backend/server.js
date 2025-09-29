const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Todo = require("./models/Todo"); // ✅ import model

const app = express();
app.use(cors());
app.use(express.json());


// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.send("Backend is working with MongoDB + Todos!");
});

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create new todo
app.post("/todos", async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// Update todo (mark done/undone)
app.put("/todos/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(
    req.params.id,
    { done: req.body.done },
    { new: true }
  );
  res.json(updated);
});

// Delete todo
app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const Player = require("./models/Player");

// Get all players
app.get("/players", async (req, res) => {
  const players = await Player.find();
  res.json(players);
});

// Add a player
app.post("/players", async (req, res) => {
  const { name, game1, game2, game3 } = req.body;
  const player = new Player({ name, game1, game2, game3 });
  await player.save();
  res.json(player);
});

// Update a player’s scores
app.put("/players/:id", async (req, res) => {
  const { game1, game2, game3 } = req.body;
  const updated = await Player.findByIdAndUpdate(
    req.params.id,
    { game1, game2, game3 },
    { new: true }
  );
  res.json(updated);
});

// Delete a player
app.delete("/players/:id", async (req, res) => {
  await Player.findByIdAndDelete(req.params.id);
  res.json({ message: "Player deleted" });
});
