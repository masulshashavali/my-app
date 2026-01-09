require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const ItemSchema = new mongoose.Schema({ name: String });
const Item = mongoose.model("Item", ItemSchema);

app.post("/add", async (req, res) => {
  const item = new Item({ name: req.body.name });
  await item.save();
  res.json({ message: "Item saved!", item });
});

app.get("/items", async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Health check
app.get("/health", async (req, res) => {
  try {
    await mongoose.connection.db.admin().ping();
    res.json({ status: "ok", db: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", db: "disconnected" });
  }
});

app.listen(process.env.PORT || 5050, () =>
  console.log(`Backend running on port ${process.env.PORT || 5050}`)
);
