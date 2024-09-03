const express = require("express");
const connectDB = require("./configs/db");
const app = express();

const PORT = process.env.PORT || 8000;

connectDB(); //mongodb connection

app.get("/", (req, res) => res.status(200).json({ message: "Hitted Root" }));

app.listen(PORT, () =>
  console.log(`==> Server(🚀): http://localhost:${PORT} `)
);
